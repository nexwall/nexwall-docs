---
title: Regras de firewall
sidebar_position: 1
description: Regras de encaminhamento, entrada e saída, e como escrevê-las.
---

# Regras de firewall

**Políticas > Regras de Firewall** é onde você decide qual tráfego é permitido. As regras são avaliadas do topo da lista
para baixo e **a primeira regra que corresponde vence**, então a ordem importa.

## As três listas

| Aba | Aplica-se a | Uso típico |
|---|---|---|
| Regras de encaminhamento | Tráfego que atravessa o firewall, de uma zona para outra | Deixar a LAN acessar um servidor na DMZ, bloquear uma rede de convidados em relação à LAN |
| Regras de entrada | Tráfego destinado ao próprio firewall | Permitir a interface web ou o SSH a partir de uma rede, permitir que uma VPN se conecte |
| Regras de saída | Tráfego que o próprio firewall inicia | Restringir quais destinos a própria unidade pode acessar |

O que não é correspondido por nenhuma regra cai na **política** da zona, veja [Zonas e políticas](zones-policies.md).

## As partes de uma regra

| Parte | Significado |
|---|---|
| Nome | Um rótulo para você e seus colegas |
| Origem | A zona de onde o tráfego vem e, opcionalmente, endereços. Escolha `Qualquer` para incluir todas as zonas |
| Destino | A zona para onde o tráfego vai e, opcionalmente, endereços. Em uma regra de encaminhamento, as zonas de origem e destino devem ser diferentes |
| Serviço | Os protocolos e as portas a corresponder |
| Ação | O que acontece com o tráfego correspondente: ele é aceito ou recusado |
| Registro | Se deve gravar uma linha de log para as correspondências |
| Habilitada | Uma regra desabilitada é mantida, mas ignorada |

### Endereços

Os campos de endereço aceitam uma ou várias entradas, cada uma podendo ser:

- um único endereço IPv4 ou IPv6;
- uma rede em notação CIDR, por exemplo `10.10.10.0/24`;
- um intervalo, por exemplo `10.10.10.1-10.10.10.5`;
- um [objeto](objects.md), que permite nomear e reutilizar um grupo de endereços.

### Portas

Informe uma porta, várias separadas por vírgulas (`8686, 9090`) ou intervalos (`5500-5600`).

## Tarefas comuns

### Permitir um serviço a partir de uma zona

1. Abra a aba certa. Para deixar a LAN acessar um servidor web na DMZ, use **Regras de encaminhamento**.
2. Adicione uma regra. Defina a zona de origem como `lan`, a zona de destino como `dmz`, o endereço de destino como o
   servidor, o serviço como TCP 443 e a ação como permitir.
3. Salve e depois **Aplicar alterações**.

### Alterar a ordem

As regras são processadas de cima para baixo. Mova uma regra com os controles de ordenação, ou adicione-a no topo ou no
fim. Coloque as regras específicas acima das gerais.

### Investigar o que uma regra faz

Ative o registro da regra e procure suas linhas em [Logs](../operation-analytics/logs.md).

## Regras criadas pelo sistema

Algumas regras são adicionadas automaticamente, por exemplo quando você cria uma zona com uma predefinição ou quando um
servidor VPN precisa de uma porta. Elas são marcadas para que você as reconheça. Você pode inspecioná-las, e deve
alterá-las com cuidado, pois o recurso que as criou pode deixar de funcionar.

## Páginas relacionadas

- [Zonas e políticas](zones-policies.md)
- [NAT e redirecionamento de portas](nat-port-forwarding.md)
- [Objetos](objects.md)
