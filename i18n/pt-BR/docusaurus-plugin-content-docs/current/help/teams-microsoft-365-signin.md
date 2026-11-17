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
continuou falhando e o ícone de rede do Windows mostrava **sem internet**. O serviço de login do Teams pergunta ao Windows se a
rede é utilizável, e não envia nada quando o Windows diz "offline". Uma captura no firewall confirmou que, enquanto o Teams era
reaberto, o computador não enviou no início nenhuma consulta de `login.microsoftonline.com` nem nenhuma verificação de
conectividade do Windows.

A causa estava no Windows, não no firewall. Veja
[O Windows mostra "sem internet" e o login da Microsoft falha](windows-offline-icon-sign-in.md) para as verificações, o que foi
descartado e o contorno que funcionou.

## Resultado no caso real

- Os três nomes da Microsoft estavam bloqueados pelas listas DNS. Permiti-los foi uma correção real para esses nomes.
- O Teams continuou falhando porque o Windows informava a rede como offline. Adicionar **8.8.8.8 como servidor DNS secundário**
  no computador fez o ícone e o Teams se recuperarem.
- O computador também repetia consultas de `dns.google`, que está na lista de bloqueio de DoH/VPN. Permiti-lo, e remover o
  8.8.8.8 de novo, **não** resolveu o problema, então `dns.google` não era a causa.

## Lista rápida

1. O Teams funciona com conexão direta? Se sim, continue.
2. Algo é descartado, negado ou autenticado nos logs do firewall e do proxy? Normalmente não.
3. Capture o DNS do computador ao reproduzir e procure `NXDomain` em nomes da Microsoft.
4. Encontre a lista que contém o nome, adicione só esse nome em **Domínios permitidos** e aplique.
5. Confirme que o nome resolve na unidade.
6. Se o Teams ainda falhar, confirme que o Windows informa a rede como conectada (veja o segundo artigo).

## Páginas relacionadas

- [Filtragem DNS](pathname:///docs/security-services/dns-filtering)
- [Web Protection](pathname:///docs/security-services/web-protection)
- [Ferramentas de solução de problemas de rede](network-troubleshooting-tools.md)
- [Solução de problemas](troubleshooting.md)
