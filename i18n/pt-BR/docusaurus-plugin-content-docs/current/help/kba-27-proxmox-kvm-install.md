---
title: 'KBA-0027: Instalar no Proxmox ou KVM: ajustes recomendados e redes LAN/WAN'
sidebar_position: 37
description: 'Ajustes recomendados da máquina virtual Proxmox/KVM para o Nexwall Firewall, qual placa é a LAN e qual é a WAN, e o que fazer quando o 192.168.1.1 não responde.'
---

# KBA-0027: Instalar no Proxmox ou KVM: ajustes recomendados e redes LAN/WAN

**Aplica-se a.** Nexwall Firewall 26.2.2 e posteriores (a imagem inicia em SeaBIOS e em UEFI).

## Sintoma

Você instalou o firewall no Proxmox ou em outro host KVM e o `192.168.1.1` não responde, ou a LAN e a WAN parecem estar na mesma rede.

## Qual placa é cada uma

| Na VM | Dentro do firewall | Função | Endereço |
|---|---|---|---|
| Primeira placa (`net0` no Proxmox) | `eth0`, parte da `br-lan` | **LAN** | `192.168.1.1/24`, fixo. O firewall serve DHCP aqui |
| Segunda placa (`net1`) | `eth1` | **WAN** | Por DHCP da sua rede ou do provedor |

O `192.168.1.1` existe dentro da VM mesmo sem cabo, mas só é alcançável por um computador ou VM que esteja na mesma bridge da **primeira** placa.

## Ajustes recomendados da VM no Proxmox

Use uma VM paravirtualizada:

| Ajuste | Valor |
|---|---|
| Memória | 4 GB ou mais (2 GB é o limite: já usa swap) |
| Processadores | 2 núcleos ou mais, 1 soquete; tipo `x86-64-v2-AES` |
| BIOS | SeaBIOS (padrão) ou OVMF (UEFI) |
| Máquina | i440fx (padrão) |
| Controlador SCSI | VirtIO SCSI single |
| Disco rígido | Barramento VirtIO Block, 32 GB, IO thread ligado |
| CD/DVD | A ISO da Nexwall. Retire-a depois da instalação |
| Rede | Dois dispositivos VirtIO, cada um em **sua própria bridge** |

## O desenho de rede que funciona

- **LAN (`net0`)**: uma bridge sem porta física (por exemplo `vmbr1`) ou uma VLAN, onde você liga o computador ou a VM usada para administrar o firewall.
- **WAN (`net1`)**: a bridge que chega à sua rede ou à internet (por exemplo `vmbr0`).

Se `net0` e `net1` estão na mesma bridge, a LAN e a WAN dividem uma só rede. A WAN recebe endereço do DHCP dessa rede, a LAN `192.168.1.1/24` se sobrepõe ao que existe ali, e um computador nessa bridge normalmente tem endereço em outra faixa, por isso não alcança o `192.168.1.1`.

## Confira pelo console da VM

Entre no console como `root` e execute:

```sh
ip -br link
ip -br addr
```

Você deve ver a `br-lan` com `192.168.1.1/24` e a `eth1` (a WAN) com um endereço da sua rede. Se a WAN recebeu um endereço da mesma faixa da LAN (`192.168.1.x`), troque o endereço da LAN (próxima seção).

## Trocar o endereço da LAN

Use outra faixa que não exista na sua rede, por exemplo `192.168.45.1/24`. Faça a troca permanente com:

```sh
uci set network.lan.ipaddr='192.168.45.1'
uci set network.lan.netmask='255.255.255.0'
uci commit network
/etc/init.d/network reload
ip -br addr show br-lan
```

:::note
O `ifconfig` do sistema não aceita a máscara no formato `/24` (responde *bad address*). Use `ifconfig br-lan 192.168.45.1 netmask 255.255.255.0` para uma troca que dura só até o próximo reinício, ou os comandos `uci` acima para uma troca permanente.
:::

O servidor DHCP da LAN acompanha o novo endereço. Dê ao seu computador um endereço na nova faixa, ou renove a concessão DHCP dele, e abra `https://192.168.45.1`.

## Se ainda não funcionar

- Confirme que o computador está na bridge da `net0` e não na da `net1`.
- Verifique se a ISO foi retirada e se a VM inicia pelo disco.
- Execute a [verificação de saúde](kba-01-health-check.md) e guarde a saída.
- Abra um chamado no portal de suporte com a saída de `ip -br addr` e `ip -br link`, e informe qual bridge cada placa usa.

## Veja também

- [Instalação em uma máquina virtual](../installation/install-vm-and-hardware.md)
- [Requisitos e imagens](../installation/requirements-and-images.md)
- [KBA-0002: A interface web não abre](kba-02-web-interface.md)
