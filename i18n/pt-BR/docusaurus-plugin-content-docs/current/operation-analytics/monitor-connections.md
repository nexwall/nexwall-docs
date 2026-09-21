---
title: Monitoramento e conexões
sidebar_position: 2
description: Tráfego em tempo real, maiores consumidores, conectividade, VPN, segurança e a tabela de conexões.
---

# Monitoramento e conexões

## Monitoramento

**Operação e Análises > Monitoramento** oferece uma visão em tempo real do que está acontecendo na unidade. Ele está
organizado em abas.

| Aba | O que responde |
|---|---|
| Tráfego diário | Quanto tráfego passou hoje e quando |
| Fluxos em tempo real | Quais conexões estão ativas agora, com suas taxas de transferência |
| Maiores consumidores | Quais hosts locais, aplicações, hosts remotos e protocolos usam mais tráfego |
| Conectividade | O estado e o tráfego de cada link WAN, com latência e entrega de pacotes |
| VPN | Sessões de acesso remoto e o estado dos túneis |
| Segurança | Ameaças bloqueadas ao longo do tempo, por direção e categoria, e os endereços mais bloqueados |

:::note Onde os dados ficam
Os dados de monitoramento ficam na memória e recomeçam após uma reinicialização. Quando a unidade está conectada a um
controlador, as métricas também são armazenadas lá, e o histórico sobrevive às reinicializações. Veja
[Gerenciamento central](../administration/central-management.md).
:::

### Fluxos em tempo real

Cada linha é um fluxo ativo. Você vê os pontos de origem e destino, o protocolo, a aplicação reconhecida quando há uma,
a taxa e o volume total. Use os filtros para restringir a lista a um host, uma aplicação ou uma direção. Dois rótulos de
direção ajudam a ler a tabela:

- **Saída**: a conexão foi iniciada a partir de uma rede local em direção à internet.
- **Remota**: a conexão foi iniciada a partir da internet em direção ao firewall ou a um host atrás dele.

Algumas configurações da página controlam como os fluxos são mantidos. Você pode manter um fluxo visível por um curto
período depois que ele termina, o que é útil para investigar uma conexão que foi aberta e fechada rapidamente.

Se a lista estiver vazia, o motivo é mostrado:

- o serviço de fluxos em tempo real está desativado: habilite-o nas configurações da página;
- ele acabou de ser habilitado: aplique as alterações e espere alguns segundos para que inicie;
- ele não está em execução: verifique os logs do sistema, veja [Logs](logs.md).

O tráfego que o mecanismo não consegue classificar é mostrado como **Desconhecido**. O conjunto de aplicações
reconhecidas depende do catálogo instalado na unidade, veja
[Controle de aplicações](../security-services/application-control.md).

## Conexões

**Operação e Análises > Conexões** mostra a tabela de rastreamento de conexões do kernel. O rastreamento de conexões é
o mecanismo que permite ao firewall acompanhar o estado de cada conexão, e é o que torna possíveis as regras com estado
e o NAT.

Para cada entrada você vê a origem, o destino, o protocolo e o estado. Você pode pesquisar na tabela e pode excluir uma
entrada. Excluir uma entrada derruba aquela conexão: os dois hosts precisam estabelecê-la novamente. Isso é útil para
fazer uma regra alterada valer para uma conexão que já estava estabelecida.

## Páginas relacionadas

- [Análise de Tráfego](traffic-analytics.md)
- [Regras de firewall](../policy/firewall-rules.md)
