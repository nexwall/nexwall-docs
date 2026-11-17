---
title: Microsoft Teams ou Microsoft 365 não faz login
sidebar_position: 4
description: Um caso real, passo a passo. O Teams mostra "Algo deu errado" atrás do firewall. Encontre os nomes da Microsoft bloqueados com uma captura de DNS, adicione-os em Domínios permitidos e verifique o estado "offline" do Windows.
---

# Microsoft Teams ou Microsoft 365 não faz login

**Aplica-se a:** Nexwall Firewall com filtragem DNS ativada · **Público:** administradores e suporte

Este artigo acompanha um caso real do laboratório, do primeiro sintoma até as verificações. O mesmo método serve para
qualquer aplicativo que funciona com conexão direta e falha atrás do firewall.

## Sintoma

Um computador Windows atrás do firewall funciona com a internet e com a VPN corporativa, mas o novo Microsoft Teams mostra
**"Algo deu errado"** e não faz login. Reiniciar o Teams ou o computador não resolve. Com o computador ligado direto à
internet, ou por uma VPN que não passa pelo firewall, o Teams funciona.

Os detalhes do erro no Teams são assim:

```text
NoNetwork ... "Domain":"com.microsoft.oneauth","ErrorCode":"2606",
"Message":"Invalid authentication credentials for a proxy server. Authentication proxy issue.","SubStatus":"6101"
```

:::note
Apesar de dizer "proxy server", esta mensagem é o Windows informando que não tem uma rede utilizável para o login. Ela não
prova que existe um proxy configurado. Use os passos abaixo para ver o que realmente acontece.
:::

## Passo 1: Descarte o óbvio no firewall

1. Em **Web Protection**, desative a **inspeção SSL** para o teste. Se o Teams continuar falhando, a inspeção não é a causa.
2. No log do firewall, confirme que nada do computador é descartado.
3. Na unidade, veja o log do proxy para o endereço do computador. Troque `192.168.1.100`:

```bash
grep 192.168.1.100 /var/log/squid/access.log | tail -50
```

Linhas como `TCP_TUNNEL/200 CONNECT teams.microsoft.com:443` indicam que a conexão foi permitida. No caso real não houve
requisições negadas, nem de autenticação (`407`), nem descartes, então a causa não era o proxy nem as regras do firewall.

## Passo 2: Capture o DNS do computador e procure nomes bloqueados

A filtragem DNS responde "não encontrado" para um nome da lista. Um aplicativo que precisa desse nome falha, e o erro que
ele mostra raramente diz isso. O jeito mais rápido de achar é capturar o DNS do computador enquanto o problema é reproduzido.

Na unidade, inicie uma captura na interface LAN. Ela para sozinha após 120 segundos:

```bash
timeout 120 tcpdump -i br-lan -n -s 200 -w /tmp/dns.pcap host 192.168.1.100 and port 53
```

Enquanto roda, feche o Teams por completo e abra de novo, e espere o erro. Leia a captura:

```bash
tcpdump -nn -r /tmp/dns.pcap | grep -E "NXDomain|NXDOMAIN"
```

Uma resposta `NXDomain` para um nome da Microsoft é a pista. Você também pode testar um nome diretamente, primeiro na
unidade e depois em um servidor público, e comparar:

```bash
dig @127.0.0.1 events.data.microsoft.com
dig @8.8.8.8 events.data.microsoft.com
```

Se o servidor público responde com um endereço e a unidade não, uma lista de bloqueio contém o nome.

No caso real a captura mostrou três nomes da Microsoft respondidos com `NXDomain`:

| Nome | Usado por |
|---|---|
| `events.data.microsoft.com` | Telemetria e diagnóstico de login da Microsoft |
| `config.edge.skype.com` | Configuração do Teams |
| `fp.msedge.net` | Edge e WebView2, usado dentro do Teams |

Para saber qual lista contém um nome, procure nas listas da unidade:

```bash
grep -rl "events.data.microsoft.com" /mnt/data/threat-feeds/*/ | head
```

Os nomes estavam na categoria **publicidade e rastreamento**. As listas de bloqueio são amplas de propósito, e alguns nomes
que os aplicativos da Microsoft precisam estão em categorias feitas para telemetria e publicidade.

## Passo 3: Adicione os nomes em Domínios permitidos

1. Abra **Filtragem DNS** e vá em **Domínios permitidos**.
2. Adicione cada nome, um por entrada, e salve.
3. **Aplique as alterações.**
4. Espere cerca de um minuto para o filtro recarregar e teste de novo os nomes com `dig @127.0.0.1 <nome>`. Agora devem
   retornar um endereço.

Os domínios permitidos têm prioridade sobre todas as listas e continuam quando as listas são atualizadas. Permita só os
nomes que você viu bloqueados, não categorias inteiras. Veja [Filtragem DNS](pathname:///docs/security-services/dns-filtering).

Se um computador precisa de DNS sem filtro por outro motivo, use a aba **Bypass do filtro** em vez de permitir nomes.

## Passo 4: Verifique se o Windows acha que está offline

No caso real, depois de permitir os três nomes, eles resolveram e as conexões do próprio Teams funcionaram, mas o Teams
continuou falhando. O ícone de rede do Windows mostrava **sem internet**. Isso importa: o serviço de login do Teams pergunta
ao Windows se a rede é utilizável, e não envia nenhuma requisição quando o Windows diz "offline". Uma captura no firewall
confirmou que, enquanto o Teams era reaberto, o computador não enviou nenhuma consulta DNS para
`login.microsoftonline.com` nem nenhuma verificação de conectividade do Windows. O login falhava no computador antes de
enviar um único pacote.

O computador do caso é um host Windows que chega ao firewall por um adaptador de rede VMware, enquanto também há um
adaptador Wi-Fi conectado sem gateway. O Windows faz a verificação de conectividade no adaptador que considera o melhor, e
com dois adaptadores pode escolher o que não alcança a internet. Verifique no computador Windows, em um PowerShell como
administrador:

```powershell
Get-NetIPConfiguration | Format-List InterfaceAlias,IPv4Address,IPv4DefaultGateway,DNSServer
Get-NetIPInterface -AddressFamily IPv4 | Sort InterfaceMetric | Format-Table InterfaceAlias,InterfaceMetric,ConnectionState
netsh winhttp show proxy
```

O que procurar:

- O adaptador voltado para o firewall deve ter o firewall como **gateway** e **servidor DNS**, e a **menor métrica de
  interface**.
- Os outros adaptadores, como um Wi-Fi sem uso, não devem ter gateway padrão e devem ter métrica maior.
- `netsh winhttp show proxy` deve dizer `Direct access`. Um proxy deixado por uma VPN quebra o login do mesmo jeito.
- Um cliente VPN desconectado pode deixar um adaptador virtual, uma rota ou um proxy. Feche o cliente por completo.

Depois de corrigir, reinicie o serviço de localização de rede e abra o Teams de novo:

```powershell
Restart-Service NlaSvc
```

O ícone do Windows deve mostrar a rede como conectada antes de o Teams conseguir fazer login.

## Resultado no caso real

Depois de adicionar **8.8.8.8 como servidor DNS secundário** no computador Windows, que até então tinha só o firewall
(`192.168.1.1`) como DNS, o Teams fez login e o ícone do Windows se recuperou.

O que a captura mostra em torno dessa mudança:

- O computador repetia consultas de `dns.google` (tipo `A` e `HTTPS`) muitas vezes por segundo, e o firewall respondia
  `NXDomain` todas as vezes, porque `dns.google` está na lista de bloqueio de DoH/VPN.
- O firewall redireciona todo o DNS da LAN para o próprio resolvedor, então uma consulta enviada ao `8.8.8.8` também é
  respondida pelo firewall. Portanto, o servidor secundário não contorna o filtro, e a mudança não precisava disso.

O mecanismo exato não está provado. O provável é a atualização automática do Windows para DNS sobre HTTPS em servidores
conhecidos como `8.8.8.8`, que faz o Windows procurar `dns.google`. Seja qual for o motivo, quando um cliente Windows falha
com só o firewall como DNS, um segundo servidor DNS no cliente é um contorno rápido. Se quiser que o cliente use só o
firewall, permita `dns.google` em **Domínios permitidos** e teste de novo.

## Lista rápida

1. O Teams funciona com conexão direta? Se sim, continue.
2. Algo é descartado, negado ou autenticado nos logs do firewall e do proxy? Normalmente não.
3. Capture o DNS do computador ao reproduzir e procure `NXDomain` em nomes da Microsoft.
4. Encontre a lista que contém o nome, adicione só esse nome em **Domínios permitidos** e aplique.
5. Confirme que o nome resolve na unidade.
6. Se o Teams ainda falhar, confirme que o Windows informa a rede como conectada e revise adaptadores, métricas e proxy.

## Páginas relacionadas

- [Filtragem DNS](pathname:///docs/security-services/dns-filtering)
- [Web Protection](pathname:///docs/security-services/web-protection)
- [Ferramentas de solução de problemas de rede](network-troubleshooting-tools.md)
- [Solução de problemas](troubleshooting.md)
