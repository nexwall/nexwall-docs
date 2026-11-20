---
title: 'KBA-0013: O Windows mostra "sem internet" e o login da Microsoft falha'
sidebar_position: 27
description: Um computador Windows que chega ao firewall por um adaptador virtual pode mostrar o ícone offline, e o Teams não faz login, mesmo com a navegação funcionando. O que foi verificado, o que foi descartado e um contorno.
---

# KBA-0013: O Windows mostra "sem internet" e o login da Microsoft falha

**Aplica-se a:** computadores Windows 10 e 11 atrás do firewall · **Público:** administradores e suporte

Este artigo continua [Microsoft Teams ou Microsoft 365 não faz login](teams-microsoft-365-signin.md). Descreve um caso real em
que o firewall funcionava corretamente e o problema estava em como o Windows decidia que o computador estava offline.

## Sintoma

- O ícone de rede do Windows mostra **offline** ("sem internet"), embora as páginas web abram.
- O novo Microsoft Teams informa que não consegue autenticar e pede para verificar a conexão de rede ou o proxy.
- Os detalhes do erro mostram `NoNetwork`, código `2606`, "Invalid authentication credentials for a proxy server".

## Por que acontece

O Windows decide se uma rede tem internet com uma pequena verificação de conectividade (NCSI) que executa **para cada rede que
conhece**. O login da Microsoft (WAM, usado pelo Teams e pelo Office) pergunta primeiro ao Windows e nem tenta a rede quando o
Windows diz que não há internet.

No caso real, o computador é um host Windows que executa o firewall como máquina virtual. Ele chega ao firewall por um
adaptador virtual (VMware `VMnet 1`), e o adaptador Wi-Fi real não tem gateway. O que foi visto:

- `Get-NetConnectionProfile` listava **só a rede Wi-Fi**, como "Rede não identificada" com `IPv4Connectivity: LocalNetwork`.
- O adaptador virtual estava ativo e tinha a única rota padrão (`0.0.0.0/0` pelo firewall), mas **o Windows não tinha um
  perfil de rede para ele**, então nunca o verificava.
- Depois de reiniciar o serviço "Network Location Awareness", uma captura no firewall não mostrou **nenhuma verificação de
  conectividade** do computador (nem consulta de `dns.msftncsi.com` ou `www.msftconnecttest.com`, nem requisição HTTP na porta
  80). O restante do tráfego, incluindo o DNS de `login.microsoftonline.com`, chegava normalmente ao firewall.
- O firewall não descartou nada, o log do proxy não tinha requisições negadas nem de autenticação (`407`), e
  `netsh winhttp show proxy` dizia acesso direto.

## Como verificar

No computador Windows, em um PowerShell de administrador:

```powershell
Get-NetConnectionProfile | Format-List Name,InterfaceAlias,IPv4Connectivity
Get-NetRoute -DestinationPrefix 0.0.0.0/0
Get-NetAdapter | Format-Table Name,Status,InterfaceDescription,Virtual
netsh winhttp show proxy
```

Se o adaptador que tem a rota padrão é virtual, não aparece em `Get-NetConnectionProfile`, e as redes listadas mostram
`LocalNetwork` ou `NoTraffic`, este artigo se aplica.

No firewall, capture enquanto reinicia o serviço no computador (`Restart-Service NlaSvc`) e procure as verificações:

```bash
timeout 120 tcpdump -nn -i br-lan host 192.168.1.100 and \( port 53 or port 80 \)
```

Um computador saudável consulta `dns.msftncsi.com` e requisita `www.msftconnecttest.com/connecttest.txt` na porta 80. Se
nenhuma aparece, o Windows não está verificando o caminho pelo firewall.

## O que foi descartado

- **Regras e descartes do firewall:** nada foi descartado para o computador.
- **Proxy e Web Protection:** sem requisições negadas nem `407`; a inspeção SSL estava desligada.
- **Filtragem DNS de nomes da Microsoft:** os nomes foram permitidos (veja o artigo anterior) e o login continuou falhando.
- **`dns.google`:** o computador repetia consultas e recebia "não encontrado" porque ele está na lista de bloqueio de DoH/VPN.
  Depois de permiti-lo no firewall, e com só o firewall como servidor DNS, o ícone e o Teams continuaram falhando. Não era a causa.
- **Um proxy do sistema:** `netsh winhttp show proxy` dizia acesso direto.

## Contorno que funcionou

Adicionar **8.8.8.8 como servidor DNS secundário** no adaptador de rede do computador fez o ícone voltar a conectado e o Teams
fazer login. O motivo não é compreendido. O firewall redireciona todo o DNS da LAN para o próprio resolvedor, então isso não
contorna o filtro. Use como contorno.

## Outras opções

Não foram testadas neste caso:

- **Testar com um adaptador físico.** Conecte o computador à LAN do firewall por uma placa de rede real em vez de um adaptador
  virtual. O Windows cria um perfil de rede normal para ela.
- **Desligar a verificação ativa de conectividade** (reversível; reinicie o serviço depois). O Windows deixa de depender da verificação:

```powershell
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet' -Name EnableActiveProbing -Value 0 -Type DWord
Restart-Service NlaSvc
```

  Desfaça com `-Value 1`.

## Resumo

Foi um comportamento do Windows em um computador de testes que chega ao firewall por um adaptador virtual. Não é uma falha do
firewall, e um computador normal com placa de rede física não precisa de nada disso. Se o login da Microsoft falha e o ícone
mostra offline, verifique o perfil de rede do Windows antes de mudar o firewall.

## Páginas relacionadas

- [Microsoft Teams ou Microsoft 365 não faz login](teams-microsoft-365-signin.md)
- [Filtragem DNS](pathname:///docs/security-services/dns-filtering)
- [Ferramentas de solução de problemas de rede](network-troubleshooting-tools.md)
