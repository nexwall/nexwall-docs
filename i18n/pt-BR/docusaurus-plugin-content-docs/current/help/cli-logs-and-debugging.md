---
title: Logs e depuração pela linha de comando
sidebar_position: 7
description: Onde as cópias de log realmente ficam, como pesquisá-las e acompanhá-las, como consultar o VictoriaLogs e como fazer um serviço específico registrar mais.
---

# Logs e depuração pela linha de comando

Esta unidade não usa o `logread` do BusyBox — esse comando não existe aqui. O registro de logs passa pelo
`rsyslogd`, que por padrão mantém o `/var/log/messages` na memória e, em uma unidade com armazenamento persistente
configurado, também grava uma cópia que sobrevive a uma reinicialização e alimenta o
[VictoriaLogs](https://docs.victoriametrics.com/victorialogs/), um pequeno banco de dados de logs. Esta página
cobre onde essas cópias ficam, como pesquisá-las e como fazer um serviço específico registrar mais. Para saber qual
serviço sustenta qual funcionalidade e seu comando de reinício em uma linha, veja
[Referência de comandos de serviço e log](service-and-log-reference.md); para o básico da linha de comando em si, veja
[Linha de comando e perguntas frequentes](command-line-and-faq.md).

Todos os comandos são executados como `root` via SSH ou console.

## Onde os logs realmente ficam

Por padrão, o `/var/log` fica na memória: isso protege o dispositivo de armazenamento contra desgaste ou lotação,
mas também significa que o `/var/log/messages` não sobrevive sozinho a uma reinicialização.

| Cópia | Caminho | Quando existe |
|---|---|---|
| Padrão, em memória | `/var/log/messages` | Sempre. Rotacionado por `/usr/sbin/rotate-messages` ao passar de aproximadamente 98 MB; apenas a rotação anterior é mantida, como `messages.1.gz`. |
| Persistente | `/mnt/data/log/messages` | Assim que o armazenamento persistente é configurado na aba Armazenamento da página [Sistema](../infrastructure/system.md#storage). O mesmo fluxo é gravado ali também, sem o limite de 98 MB. |
| VictoriaLogs | consultado via HTTP, não é um arquivo comum — veja abaixo | Junto com a cópia persistente: o `rsyslogd` encaminha cada mensagem para ele via UDP assim que o armazenamento persistente é configurado, e ele mantém um índice de 30 dias no mesmo dispositivo de armazenamento. |

Alguns serviços mantêm seu próprio estado à parte disso, fora do fluxo de logs — por exemplo,
`/mnt/data/dnsmasq/dhcp.leases` e, por instância de VPN, um banco de dados de rastreamento de conexões em
`/mnt/data/openvpn/<instância>/connections.db`. São arquivos de estado, não logs, mas vale conhecê-los quando o
comportamento de um serviço não bate com o que seu log diz.

## Acompanhando e pesquisando

```bash
tail -f /var/log/messages
grep openvpn /var/log/messages | tail -20
```

Se o armazenamento persistente estiver configurado, `/mnt/data/log/messages` guarda o mesmo fluxo por mais tempo —
confira `ls /mnt/data/log/` primeiro para confirmar que existe nesta unidade antes de contar com ele.

Para o prefixo de log que cada serviço realmente usa, veja a tabela em
[Referência de comandos de serviço e log](service-and-log-reference.md#services-by-feature).

## Consultando o VictoriaLogs

Onde estiver em execução, o VictoriaLogs responde a consultas na porta 9428 usando sua própria linguagem de
consulta, o LogsQL. Uma palavra-chave simples pesquisa o texto da mensagem:

```bash
curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

Cada resultado é um objeto JSON com campos como `_msg`, `_time`, `app_name`, `hostname`, `level` e `severity`, o
que facilita filtrar com mais precisão do que um simples grep permitiria:

```bash
# apenas este serviço
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=app_name:nethsecurity-api' --data-urlencode 'limit=20'

# apenas erros, de todos os serviços
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=level:error' --data-urlencode 'limit=20'

# apenas os últimos cinco minutos
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=_time:5m' --data-urlencode 'limit=50'
```

Se esse `curl` não retornar nada ou der "connection refused", o VictoriaLogs não está em execução nesta unidade —
verifique `/etc/init.d/victoria-logs status` e confirme se o armazenamento persistente está configurado, já que é
isso que o habilita.

## O que a página Logs da interface web chama

A página **Logs** da interface web é uma camada fina sobre uma única chamada `ubus`, que você pode usar
diretamente — útil em um script, ou quando quiser o mesmo comportamento de busca da página sem abrir um navegador:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

## Aumentando o detalhamento de um serviço específico

O volume de log padrão costuma ser silencioso demais para depurar um problema específico. Cada item abaixo aumenta
o detalhamento de um serviço; volte ao normal assim que tiver o que precisa — um rastreamento completo do IKE ou o
nível máximo de verbosidade do OpenVPN produz muita saída muito rápido, o que aproxima o `/var/log/messages` do seu
ponto de rotação mais cedo.

| Serviço | Como aumentar o detalhamento | Depois |
|---|---|---|
| OpenVPN | `uci set openvpn.<instância>.verb='5'` (`0` silencioso a `11` muito detalhado; `3` é o padrão de fábrica) | `uci commit openvpn && /etc/init.d/openvpn restart` |
| dnsmasq (DNS/DHCP) | `uci set dhcp.@dnsmasq[0].logqueries='1'` para registrar cada consulta DNS, adicione `.logdhcp='1'` para transações DHCP também | `uci commit dhcp && /etc/init.d/dnsmasq restart` |
| IPsec (charon) | Edite `/etc/strongswan.d/charon-logging.conf` — aumente um subsistema específico (por exemplo `ike = 2`) ou o `default` para tudo | `/etc/init.d/ipsec restart` |
| nftables (firewall) | Adicione `log` a uma regra (é exatamente o que o botão de registro por regra da interface web faz) para um registro persistente, ou execute `nft monitor trace` para um rastreamento de pacotes ao vivo e sem filtro | Mudanças de regra precisam de `/etc/init.d/firewall reload`; `monitor trace` roda imediatamente em primeiro plano |

A opção de registro de consultas DNS acima é também o que as próprias configurações de DNS da interface web
expõem — `uci get dhcp.@dnsmasq[0].logqueries` é o mesmo valor que o botão de registro de consultas da página
[DNS e DHCP](../network/dns-dhcp.md) lê e grava.

## Páginas relacionadas

- [Referência de comandos de serviço e log](service-and-log-reference.md)
- [Ferramentas de solução de problemas de rede](network-troubleshooting-tools.md)
- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
- [Sistema](../infrastructure/system.md)
- [Logs](../operation-analytics/logs.md)
