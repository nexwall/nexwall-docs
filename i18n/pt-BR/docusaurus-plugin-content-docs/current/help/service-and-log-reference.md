---
title: Referência de comandos de serviço e log
sidebar_position: 4
description: Qual serviço está por trás de cada funcionalidade, como reiniciá-lo e onde encontrar seus logs, por SSH.
---

# Referência de comandos de serviço e log

Cada página da interface web é sustentada por um ou mais serviços do sistema. Quando uma funcionalidade se comporta
mal e a interface web não diz por quê, reiniciar o serviço certo ou ler o log dele diretamente costuma ser o
caminho mais rápido. Esta página é essa tabela de consulta. Para o básico da linha de comando, veja
[Linha de comando e perguntas frequentes](command-line-and-faq.md); para ler logs pela interface web, veja
[Logs](../operation-analytics/logs.md).

Todos os comandos rodam como `root`, por SSH ou pelo console.

## Serviços por funcionalidade

| Funcionalidade (interface web) | Serviço | Reiniciar | Encontre no log |
|---|---|---|---|
| Regras de Firewall, NAT, Zonas e Políticas | `firewall` | `/etc/init.d/firewall reload` (só regras) ou `restart` | o nome da zona, ou o prefixo de log definido na regra |
| DNS e DHCP | `dnsmasq` | `/etc/init.d/dnsmasq restart` | `dnsmasq-dhcp` |
| Controle de aplicações (DPI) | `netifyd`, `dpi` | `/etc/init.d/netifyd restart`, `/etc/init.d/dpi restart` | `netifyd` |
| Prevenção de intrusão (IPS/IDS) | `snort` | `/etc/init.d/snort restart` | `snort` |
| Filtragem de DNS (Threat Shield DNS) | `ns-flashstart` | `/etc/init.d/ns-flashstart restart` | `ns-flashstart` |
| Bloqueio de IP e geolocalização (Threat Shield IP) | `banip` | `/etc/init.d/banip restart` | `banIP` |
| SD-WAN | `mwan3` | `/etc/init.d/mwan3 restart` | `mwan3` |
| Portal cativo | `dedalo`, `dedalo_users_auth` | `/etc/init.d/dedalo restart` | `dedalo` |
| OpenVPN (acesso remoto, site a site) | `openvpn` | `/etc/init.d/openvpn restart` | `openvpn` |
| Túneis IPsec | `ipsec` | `/etc/init.d/ipsec restart` | `charon` |
| WireGuard | gerenciado como uma interface de rede | `ifdown <interface>` e depois `ifup <interface>` | `wireguard` |
| Vínculo por MAC | `ns-binding` | `/etc/init.d/ns-binding restart` | `ns-binding` |
| Redirecionamento de portas via NAT reflection | `ns-netmap` | `/etc/init.d/ns-netmap restart` | `ns-netmap` |
| Gerenciamento central (conexão com o controlador) | `ns-plug` | `/etc/init.d/ns-plug restart` | `ns-plug` — veja [Solução de problemas de registro no controlador](controller-registration-troubleshooting.md) |
| Alta disponibilidade | `keepalived`, gerenciado via `ns-ha-config` | não reinicie o `keepalived` diretamente, use `ns-ha-config`, veja [Alta disponibilidade](../infrastructure/high-availability.md) | `keepalived` |
| Interface web | `ns-ui` | `/etc/init.d/ns-ui restart` | `ns-ui` |
| Encaminhamento de log do sistema | `rsyslog` | `/etc/init.d/rsyslog restart` | — |
| Agente de monitoramento MSP | `check_mk_agent` | `/etc/init.d/check_mk_agent restart` | `check_mk_agent` |

Um `restart` interrompe o serviço por um instante; um `reload`, quando disponível, aplica a configuração sem
reiniciar tudo, e vale a pena tentar primeiro numa unidade em produção.

## Comandos de diagnóstico além de restart e logread

Estes leem o estado ao vivo de um serviço, em vez de (ou além de) seu log.

| Tarefa | Comando |
|---|---|
| Estado dos links e políticas de SD-WAN | `mwan3 status`, `mwan3 interfaces` |
| Estado dos túneis IPsec | `ipsec statusall` |
| Estado dos pares WireGuard e handshakes | `wg show` |
| IPS: status do serviço, uso de memória, contadores de regras ativas | `snort-mgr status` |
| IPS: validar a configuração gerada sem aplicá-la | `snort-mgr check` |
| IPS: relatório de incidentes recentes | `snort-mgr report`, adicione `-n 10` para só os dez mais frequentes |
| OpenVPN: listar clientes conectados pelo socket de gerenciamento | `openvpn-status <caminho-do-socket>` — encontre o socket primeiro com `find /var/run /var/etc -iname '*openvpn*.sock' 2>/dev/null` |
| Estado da conexão com o controlador | `ubus call ns.plug status` |
| Estado do par de alta disponibilidade | `ns-ha-config status` |

## Forçando atualizações de assinaturas e regras do DPI

O banco de dados de controle de aplicações e sua verificação de licença rodam na própria agenda, via cron. Para
forçar uma atualização imediatamente em vez de esperar:

```bash
/etc/init.d/dpi-data-update start     # banco de dados de assinaturas de aplicações
/etc/init.d/dpi-license-update start  # verificação da licença de assinatura
```

Para o conjunto de regras do IPS, use `snort-mgr update-rules` em vez de reiniciar um serviço; ele baixa o
conjunto de regras e reescreve a configuração que o `snort` lê na próxima vez que iniciar.

## Lendo a configuração de um serviço como o UCI a vê

Todo serviço acima é configurado por `/etc/config/<nome>`, geralmente com o mesmo nome do pacote UCI (por exemplo
`uci show dpi`, `uci show mwan3`, `uci show snort`). Nem todo nome de serviço bate exatamente com o nome do pacote
UCI — `ns-flashstart` e `banip` batem — verifique `ls /etc/config/` se um nome desta tabela não retornar nada.

## Páginas relacionadas

- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
- [Solução de problemas de registro no controlador](controller-registration-troubleshooting.md)
- [Logs](../operation-analytics/logs.md)
- [Alta disponibilidade](../infrastructure/high-availability.md)
