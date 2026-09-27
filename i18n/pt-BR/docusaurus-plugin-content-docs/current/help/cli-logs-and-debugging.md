---
title: Logs e depuração pela linha de comando
sidebar_position: 7
description: Onde as cópias de log realmente ficam, como pesquisá-las e acompanhá-las, como fazer um serviço específico logar mais, e para que o VictoriaLogs serve — e não serve — nesta unidade.
---

# Logs e depuração pela linha de comando

Esta unidade não usa o `logread` do BusyBox — esse comando não existe aqui. O log roda pelo `rsyslogd` em vez
disso. Esta página cobre onde as cópias de log realmente ficam, como pesquisá-las pela linha de comando, e como
fazer um serviço específico logar mais. Para saber qual serviço sustenta qual funcionalidade e seu comando de
reinício, veja a [Referência de comandos de serviço e log](service-and-log-reference.md); para o básico da linha de
comando em si, veja [Linha de comando e perguntas frequentes](command-line-and-faq.md).

Todos os comandos rodam como `root`, por SSH ou pelo console.

## Onde os logs realmente ficam

Por padrão, `/var/log` é um diretório volátil, em memória — isso protege o sistema de arquivos raiz de desgaste ou
lotação, mas também significa que `/var/log/messages` não sobrevive sozinho a uma reinicialização.

| Cópia | Caminho | Rotação |
|---|---|---|
| Padrão, em memória | `/var/log/messages` | Rotacionado por `/usr/sbin/rotate-messages` assim que passa de 50 MB, ou 10% do tamanho de `/tmp` se isso for maior. Só a rotação anterior é mantida, como `messages.1.gz`. |
| Persistente, opcional | `/mnt/data/log/messages` | Só é escrito se um dispositivo de armazenamento persistente foi configurado na aba Armazenamento da página [Sistema](../infrastructure/system.md#armazenamento) — não é automático. Quando presente, o `logrotate` o rotaciona semanalmente e mantém 52 rotações compactadas, cerca de um ano. |

Uma tarefa cron diária separada (`5 1 * * * /usr/sbin/logrotate /etc/logrotate.conf`) cuida dos logs gerenciados
por `logrotate.conf` em geral, independente da rotação por tamanho acima.

Alguns serviços mantêm seu próprio estado à parte disso, fora do fluxo de log inteiramente — por exemplo
`/mnt/data/dnsmasq/dhcp.leases`, e, por instância de VPN, um banco de dados de rastreamento de conexões em
`/mnt/data/openvpn/<instância>/connections.db`. Esses são arquivos de estado, não logs, mas vale saber deles
quando o comportamento de um serviço não bate com o que o log dele diz.

## Acompanhando e pesquisando

```bash
tail -f /var/log/messages
grep openvpn /var/log/messages | tail -20
```

Se houver armazenamento persistente configurado, `/mnt/data/log/messages` guarda o mesmo fluxo por mais tempo para
trás — confira `ls /mnt/data/log/` primeiro para confirmar que existe nesta unidade antes de depender dele.

Para o prefixo de log que cada serviço realmente escreve, veja a tabela na seção de serviços por funcionalidade da [Referência de comandos de serviço e
log](service-and-log-reference.md).

## O que a página de Logs na interface web realmente faz

A página **Logs** da interface web é uma camada fina sobre uma única chamada `ubus`, que você pode usar
diretamente — útil num script, ou quando você quer o comportamento de busca exato da página sem abrir um
navegador:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

Isso pesquisa diretamente em `/var/log/messages` (efetivamente `grep <busca> /var/log/messages | tail -n
<limite>`) — não é sustentado por um banco de dados de log separado.

## VictoriaLogs: para que serve, e não serve, aqui

O [VictoriaLogs](https://docs.victoriametrics.com/victorialogs/) é um pacote opcional (`opkg install
victoria-logs`), fora da imagem padrão. Instalá-lo configura tudo que é preciso de uma vez: o pacote também
registra uma regra de encaminhamento do `rsyslogd`, então assim que ele é instalado, toda mensagem de log passa a
ser enviada para `127.0.0.1:5514` por TCP (com framing por contagem de octetos) conforme o `rsyslogd` a processa.
O que o VictoriaLogs **não é**, atualmente, é algo conectado a mais nada: nem a página de Logs da interface web
nem a API o consultam — a página de Logs continua funcionando do jeito descrito acima, direto do arquivo de texto
simples. Se você instalar o VictoriaLogs, recebe tudo que o `rsyslogd` vê a partir daquele ponto, consultável por
você mesmo com sua própria linguagem de consulta, LogsQL, por HTTP na porta 9428:

```bash
opkg update && opkg install victoria-logs
/etc/init.d/victoria-logs start

curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

Vale a pena fazer isso se você quer a filtragem do LogsQL (por intervalo de tempo, por campo, condições
combinadas) em vez de um `grep` simples — os nomes de campo exatos disponíveis dependem do modelo de syslog que o
`rsyslogd` usa ao encaminhar, então confira um resultado bruto primeiro (baixe `--data-urlencode 'limit=20'` para
`'limit=1'` para ver um) antes de montar uma consulta filtrada em torno de um campo específico. De qualquer forma,
é uma ferramenta que você mesmo consulta — não uma segunda cópia que a interface já mostra.

## Aumentando a verbosidade de um serviço específico

O volume de log padrão costuma ser silencioso demais para depurar um problema específico. Cada um destes aumenta a
verbosidade de um serviço; abaixe de novo depois de conseguir o que precisa — rastreamento IKE completo ou a
verbosidade máxima do OpenVPN produz bastante saída muito rápido, o que empurra `/var/log/messages` para o ponto
de rotação mais cedo.

| Serviço | Como aumentar a verbosidade | Depois |
|---|---|---|
| OpenVPN | `uci set openvpn.<instância>.verb='5'` (`0` silencioso a `11` muito detalhado; `3` é o padrão de fábrica) | `uci commit openvpn && /etc/init.d/openvpn restart` |
| dnsmasq (DNS/DHCP) | `uci set dhcp.@dnsmasq[0].logqueries='1'` para logar toda consulta DNS, adicione `.logdhcp='1'` para transações DHCP também | `uci commit dhcp && /etc/init.d/dnsmasq restart` |
| IPsec (charon) | Edite `/etc/strongswan.d/charon-logging.conf` — aumente um subsistema específico (por exemplo `ike = 2`) ou `default` para tudo | `/etc/init.d/ipsec restart` |
| nftables (firewall) | Adicione `log` a uma regra (é exatamente o que o alternador de log por regra da interface web faz) para um registro persistente, ou rode `nft monitor trace` para um rastreamento de pacotes ao vivo, sem filtro | Mudanças de regra precisam de `/etc/init.d/firewall reload`; `monitor trace` roda imediatamente em primeiro plano |

A opção de log de consultas DNS acima é também o que as próprias configurações de DNS da interface web expõem —
`uci get dhcp.@dnsmasq[0].logqueries` é o mesmo valor que o alternador de log de consultas da página [DNS e
DHCP](../network/dns-dhcp.md) lê e escreve.

## Páginas relacionadas

- [Referência de comandos de serviço e log](service-and-log-reference.md)
- [Ferramentas de solução de problemas de rede](network-troubleshooting-tools.md)
- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
- [Sistema](../infrastructure/system.md)
- [Logs](../operation-analytics/logs.md)
