---
title: Monitoramento e conexões
sidebar_position: 4
description: Fluxos ao vivo, maiores consumidores, links WAN, VPN e a tabela de conexões.
---

# Monitoramento e conexões


![A página Monitoramento com os fluxos ao vivo](/img/docs/monitor-en.png)

## Monitoramento

**Operação e Análises > Monitoramento** dá uma visão em tempo real do que acontece na unidade. É organizado em abas.

| Aba | O que responde |
|---|---|
| Fluxos ao vivo | Quais conexões estão ativas agora, com suas velocidades de transferência |
| Principais consumidores | Quais equipamentos locais, aplicações e protocolos usam mais tráfego neste momento: o total, o dispositivo, a aplicação e o protocolo mais ativos, e um cartão ordenado para cada um com a velocidade de cada linha |
| Uplinks WAN | O estado de cada link WAN, seu tráfego, e a latência e a perda de pacotes para os hosts que monitora |
| VPN | As sessões de acesso remoto e o estado dos túneis |

O tráfego do dia, por hora, dispositivo e aplicação, agora está em [Análise de Tráfego](traffic-analytics.md), e o que foi
barrado está em [Análise de ameaças](threat-analytics.md).

:::note Onde os dados ficam guardados
Os dados de monitoramento são guardados no firewall. Com um disco de dados sobrevivem a reinicializações; sem ele ficam em memória e recomeçam
após reiniciar. Quando a unidade está conectada a um controlador, as métricas também são guardadas lá. Veja
[Gerenciamento central](../administration/central-management.md).
:::

### Fluxos ao vivo

Cada linha é um fluxo ativo. Você vê as pontas local e remota, o protocolo, a aplicação reconhecida quando
há uma, a velocidade e o volume total. Use os filtros para restringir a lista por aplicação, protocolo, etiqueta, origem ou destino.
A tabela preenche a página até o fim da janela e rola dentro do próprio quadro, então os controles de página (número de linhas e páginas)
ficam sempre à vista. Dois rótulos de direção ajudam a ler a tabela:

- **Saída**: a conexão foi iniciada de uma rede local para a internet.
- **Remota**: a conexão foi iniciada da internet para o firewall ou um equipamento atrás dele.

Algumas configurações da página controlam como os fluxos são mantidos. Você pode manter um fluxo visível por pouco tempo depois que ele termina, o que
ajuda a investigar uma conexão que abriu e fechou rápido.

Se a lista está vazia, o motivo é mostrado:

- o serviço de fluxos ao vivo está desativado: ative nas configurações da página;
- acabou de ser ativado: aplique as alterações e aguarde alguns segundos até iniciar;
- não está funcionando: verifique os logs do sistema, veja [Logs](logs.md).

O tráfego que o motor não consegue classificar aparece como **Desconhecido**. O conjunto de aplicações reconhecidas depende do
catálogo instalado na unidade, veja [Controle de aplicações](../security-services/application-control.md).

### Uplinks WAN

Para cada link WAN a aba mostra seu estado e endereço público, os eventos do link (ativo e inativo), seu tráfego e,
para cada host que monitora, a **latência** e a **perda de pacotes**. Escolha os hosts na aba Configurações de
[Desempenho](performance.md).

Escolha a **janela de tempo** no alto: 1 hora (a padrão), 6 horas, 12 horas, 24 horas, 7 dias ou 30 dias. Nas
janelas longas cada ponto de um gráfico é o valor mais alto do seu intervalo, então um pico curto de perda, latência ou tráfego continua
visível. O histórico é guardado por 7 dias, ou um ano quando o firewall tem um disco de dados; sem disco de dados
a janela de 30 dias mostra os últimos 7 dias.

Cada gráfico é um cartão com o valor atual, o máximo e a média de cada série sobre a linha.

## Conexões

**Operação e Análises > Conexões** mostra a tabela de rastreamento de conexões do kernel. O rastreamento de conexões é o
mecanismo que permite ao firewall acompanhar o estado de cada conexão, e é o que torna possíveis as regras com estado e o NAT.

![A tabela de conexões](/img/screenshots/operation-connections-content.png)

*A tabela de rastreamento de conexões.*

De cada entrada você vê a origem, o destino, o protocolo e o estado. Você pode pesquisar na tabela e pode excluir
uma entrada. Excluir uma entrada corta aquela conexão: os dois equipamentos precisam estabelecê-la de novo. É útil para que
uma regra alterada tenha efeito sobre uma conexão que já está estabelecida.

## Páginas relacionadas

- [Análise de Tráfego](traffic-analytics.md)
- [Regras de firewall](../policy/firewall-rules.md)
- [Ferramentas de diagnóstico de rede](../help/network-troubleshooting-tools.md) para a mesma tabela de rastreamento de conexões
  pela linha de comando, com `conntrack`
