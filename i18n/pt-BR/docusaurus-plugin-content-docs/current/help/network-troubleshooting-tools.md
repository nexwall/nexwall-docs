---
title: Ferramentas de solução de problemas de rede
sidebar_position: 6
description: As ferramentas de linha de comando que a unidade traz para diagnosticar conectividade, roteamento, NAT e DNS além do que a interface web mostra.
---

# Ferramentas de solução de problemas de rede

A interface web não tem uma ferramenta de ping ou traceroute embutida, então para qualquer coisa além de "o link
está ativo", o acesso SSH e essas ferramentas de linha de comando são o caminho. Esta página vai camada por camada,
da placa de rede até o DNS, com as ferramentas que esta unidade realmente traz. A maioria já vem instalada; algumas
são pacotes opcionais, indicado onde for o caso.

## Interfaces e estado do link

| Tarefa | Comando |
|---|---|
| Listar endereços de toda interface | `ip -4 addr`, `ip -6 addr` |
| Estado da interface e da portadora | `ip link` |
| Velocidade do link, duplex, e se um cabo está de fato detectado | `ethtool <interface>` |
| Throughput ao vivo por interface | `bwm-ng` |

O `ethtool` é a forma mais rápida de distinguir um problema de cabeamento ou auto-negociação de qualquer coisa mais
acima na pilha — verifique `Link detected` e `Speed` antes de olhar qualquer outro lugar se uma interface inteira
parece estar com problema.

## O segmento local: ARP

| Tarefa | Comando |
|---|---|
| Ver o que a unidade já resolveu no segmento local | `ip neigh` |
| Perguntar ativamente a um host específico se ele responde | `arping -I <interface> <ip>` |
| Varrer uma rede local inteira para ver o que realmente está presente | `arp-scan --interface=<interface> --localnet` |

O `arp-scan` é a ferramenta para "existe um IP duplicado nessa rede" ou "o que está realmente plugado nesse switch",
já que ele pergunta no nível do ARP e recebe resposta mesmo de hosts que bloqueiam ICMP.

## Roteamento e roteamento por política

| Tarefa | Comando |
|---|---|
| Tabela de roteamento principal | `ip route` |
| Qual rota um destino específico realmente tomaria | `ip route get <destino>` |
| Regras de roteamento por política (muito usadas quando o SD-WAN está configurado) | `ip rule` |
| Uma tabela de roteamento específica pelo número | `ip route show table <id>` |

Quando o [SD-WAN](pathname:///pt-BR/docs/network/sd-wan) está ativo, o `mwan3` mantém suas próprias tabelas e regras de roteamento
por WAN — `ip rule` mostra qual tráfego é direcionado para qual tabela, e `ip route get <destino>` é a forma mais
rápida de confirmar por qual WAN um destino específico vai sair de fato. Para o estado que o próprio `mwan3` acha
que cada link está, veja a seção de comandos de diagnóstico na [Referência de comandos de serviço e
log](service-and-log-reference.md).

## Alcançabilidade

| Tarefa | Comando |
|---|---|
| Alcançabilidade básica | `ping <host>` |
| Alcançabilidade com um tamanho de pacote específico, sem fragmentar (teste de MTU/PMTU) | `ping -M do -s <tamanho> <host>` |
| Alcançabilidade no nível do ARP, sem roteamento IP envolvido | `arping -I <interface> <ip>` |

Esta unidade traz o `ping` completo do `iputils`, não o reduzido do BusyBox, especificamente para que `-M do -s`
funcione — é a forma padrão de descobrir a MTU real de um caminho, o que importa mais em túneis VPN: envie tamanhos
cada vez menores até um parar de precisar fragmentar, e essa é a MTU utilizável para aquele túnel.

## DNS

| Tarefa | Comando |
|---|---|
| Resolver um nome usando o próprio resolvedor da unidade | `dig <nome>` |
| Resolver usando um servidor específico, ignorando totalmente o resolvedor da unidade | `dig @<servidor> <nome>` |
| Rastrear a resolução a partir da raiz | `dig +trace <nome>` |
| Resolver via DNS sobre HTTPS | `dig +https <nome>` |

Consultar `@1.1.1.1` ou `@8.8.8.8` diretamente diz se um nome realmente não resolve, ou se o problema é específico
do resolvedor desta unidade — filtragem de DNS, um encaminhador mal configurado, ou o próprio `dnsmasq`. Veja a
[Referência de comandos de serviço e log](service-and-log-reference.md) para reiniciar o `dnsmasq` e ler o log dele.

## Captura de pacotes

```bash
tcpdump -i <interface> -n host <ip> and port <porta>
```

Alguns filtros que vale a pena conhecer além do básico:

| O que você quer ver | Filtro |
|---|---|
| Só um host | `host <ip>` |
| Só uma porta, em qualquer direção | `port <porta>` |
| Tráfego por um túnel VPN específico | `-i tun-nsplug`, `-i tun0`, ou o nome que a interface do túnel tiver |
| Salvar num arquivo para análise offline (por exemplo no Wireshark) | `-w /tmp/captura.pcap` |

Capturar na interface do lado LAN versus a do lado WAN da mesma conexão é como você confirma se o NAT e as regras
de firewall estão de fato sendo aplicados como esperado — o pacote deve parecer diferente (endereço de origem, e
frequentemente a porta) de cada lado.

## NAT, regras de firewall e estado de conexão

| Tarefa | Comando |
|---|---|
| O conjunto de regras nftables compilado, como o kernel realmente vê | `nft list ruleset` |
| O mesmo, na forma de mais alto nível do próprio `firewall4` | `fw4 print` |
| A tabela de rastreamento de conexões: o que o kernel considera uma conexão ativa agora | `conntrack -L` |
| Fluxo ao vivo de conexões sendo criadas e destruídas | `conntrack -E` |
| Filtrar a tabela de rastreamento para um host | `conntrack -L -s <ip>` ou `-d <ip>` |

O `conntrack -L` responde uma pergunta comum e específica que a página de
[Monitoramento e conexões](../operation-analytics/monitor-connections.md) da interface nem sempre deixa óbvia: se
uma conexão está de fato sendo rastreada e passando por NAT como esperado, ou se ela nunca chegou a alcançar o
conntrack (o que geralmente aponta para um bloqueio anterior, não um problema de NAT).

## Portas e processos

| Tarefa | Comando |
|---|---|
| O que está escutando, e em qual interface | `ss -tlnp`, `ss -ulnp` |
| Qual processo está segurando uma porta ou arquivo | `lsof -i :<porta>` |
| Qual processo matar para liberar uma porta | `fuser -k <porta>/tcp` |
| Testar manualmente se uma porta TCP ou UDP está aberta a partir daqui | `nc -zv <host> <porta>` |

O `nc -zv` é a forma mais rápida de separar "o caminho de rede está bom mas nada está escutando" de "o próprio
caminho de rede está bloqueado" — uma conexão recusada é o primeiro caso, um timeout é o segundo.

## Throughput e banda

| Tarefa | Comando |
|---|---|
| Visão ao vivo do throughput da interface | `bwm-ng` |
| Teste de velocidade da WAN pela linha de comando | `speedtestcpp` |
| Teste de throughput controlado entre esta unidade e outro host | `iperf3` |

`iperf3` e `nmap` são pacotes opcionais, não fazem parte da imagem padrão — instale primeiro com
`opkg update && opkg install iperf3` (ou `nmap`). Rode `iperf3 -s` de um lado e `iperf3 -c <servidor>` do outro
para medir o throughput real alcançável entre dois pontos específicos, o que separa um problema genuíno de banda ou
link de algo específico da aplicação.

## Juntando tudo

Uma ordem razoável para seguir, de baixo para cima na pilha, para você não perseguir um sintoma de DNS ou de
aplicação que na verdade é um cabo:

1. **Link**: `ethtool` — a interface está mesmo ativa, na velocidade esperada?
2. **Segmento local**: `ip neigh`, `arping`, `arp-scan` — a unidade consegue alcançar seus vizinhos imediatos?
3. **Roteamento**: `ip route get`, `ip rule` — o tráfego está sendo enviado para onde você espera?
4. **Firewall e NAT**: `nft list ruleset`, `conntrack -L` — o tráfego está permitido, e está sendo rastreado de
   fato?
5. **DNS**: `dig @<resolvedor público>` — o nome resolve, independente desta unidade?
6. **Aplicação**: `nc -zv`, `tcpdump`, `iperf3` — o serviço específico está alcançável, e o throughput é o
   esperado?

## Páginas relacionadas

- [Referência de comandos de serviço e log](service-and-log-reference.md)
- [O que é o UCI, e por que ele importa](understanding-uci.md)
- [SD-WAN](pathname:///pt-BR/docs/network/sd-wan)
- [Monitoramento e conexões](../operation-analytics/monitor-connections.md)
- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
