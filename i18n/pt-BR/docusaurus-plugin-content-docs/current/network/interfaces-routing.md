---
title: Interfaces e roteamento
sidebar_position: 1
description: Configure dispositivos de rede, endereços, interfaces lógicas e rotas estáticas.
---

# Interfaces e roteamento

## Interfaces e dispositivos

**Rede > Interfaces** lista os **dispositivos** de rede da unidade e as **interfaces** configuradas neles. Um dispositivo
é uma placa de rede, ou um dispositivo lógico que você cria. Uma interface dá a um dispositivo um endereço, uma zona e um
protocolo.

### Configurando um dispositivo

Selecione um dispositivo e escolha **Configurar**. As principais escolhas são:

| Configuração | Significado |
|---|---|
| Zona | A zona à qual a interface pertence. Ela decide quais regras se aplicam, veja [Zonas e políticas](../policy/zones-policies.md) |
| Protocolo | Endereço estático, cliente DHCP ou PPPoE |
| IPv4 | Endereço e máscara e, para uma WAN, o gateway |
| IPv6 | Um endereço, ou deixe vazio para atribuição automática pelo provedor. O tamanho atribuído é 64 |
| DNS | Servidores usados por esta interface |
| MTU | Tamanho máximo do pacote, quando o seu provedor exige um valor específico |

:::note Nomes PPPoE
Os nomes de interface PPPoE têm um limite de comprimento. Se um nome for longo demais, remova a configuração do
dispositivo e configure-o novamente com um nome mais curto.
:::

Para deixar de usar um dispositivo, remova sua configuração; o dispositivo fica **não atribuído** e pode ser usado em
outro lugar.

### Dispositivos lógicos

| Tipo | Uso |
|---|---|
| Bridge | Une vários dispositivos em um só segmento de rede |
| Bond | Combina vários dispositivos para redundância ou vazão. Vários modos estão disponíveis, incluindo active-backup e LACP (802.3ad) |
| VLAN | Transporta uma rede marcada sobre um dispositivo. Você escolhe o identificador da VLAN e o dispositivo base |

Um bond pode ter um **endereço de gerenciamento** interno. Ele é para uso interno e não se torna o endereço principal do
bond; certifique-se de que ainda não é usado na sua rede. Excluir um bond libera seus dispositivos para outras
configurações.

### Aliases

Um **alias** adiciona outro endereço a uma interface existente, por exemplo para atender uma segunda sub-rede no mesmo
segmento.

## Roteamento

**Rede > Roteamento** mostra a tabela de roteamento e permite adicionar **rotas estáticas**. Uma rota diz por qual
interface e gateway um host ou rede é alcançado.

| Campo | Significado |
|---|---|
| Rede | O destino em notação CIDR. Use `0.0.0.0/0` (ou `::/0` para IPv6) para a rota padrão |
| Gateway | O próximo salto. Se você deixar vazio, é criada uma rota de escopo de enlace. Com `0.0.0.0` nenhum gateway é definido |
| Interface | A interface usada para alcançar a rede |
| Métrica | Prioridade quando várias rotas correspondem. A menor vence |
| On-link | Trata o gateway como alcançável mesmo que ele não esteja dentro de uma rede da interface |

As rotas de que os túneis VPN precisam são adicionadas e removidas automaticamente.

## Páginas relacionadas

- [SD-WAN](sd-wan.md) para vários links WAN
- [DNS e DHCP](dns-dhcp.md)
