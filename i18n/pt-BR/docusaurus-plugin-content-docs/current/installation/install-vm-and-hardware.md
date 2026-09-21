---
title: Instalar em uma máquina virtual ou em hardware
sidebar_position: 2
description: Grave a imagem em um disco ou execute-a no VMware, KVM ou Proxmox.
---

# Instalar em uma máquina virtual ou em hardware

## Em hardware

1. Descompacte a imagem e grave-a no disco de destino. No Linux, substitua `/dev/sdX` pelo disco correto. Confira o
   nome duas vezes, pois isso apaga o disco:

   ```bash
   gunzip -k nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
   sudo dd if=nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img of=/dev/sdX bs=4M status=progress conv=fsync
   ```

   No Windows, use uma ferramenta de gravação de disco como Rufus ou balenaEtcher com a imagem descompactada.

2. Se o disco for maior que a imagem, o espaço livre é usado para dados.
3. Inicie a máquina com UEFI. Na configuração do firmware, garanta que a ordem de boot começa pelo novo disco e que o
   Secure Boot está desativado.
4. Conecte o cabo da LAN à interface que será a LAN e continue com o
   [Início rápido](../getting-started/quick-start.md).

## No VMware Workstation, Fusion ou ESXi

O VMware não consegue iniciar uma imagem bruta diretamente, então converta-a primeiro para um disco VMDK. Em qualquer
máquina Linux com `qemu-utils`:

```bash
gunzip -k nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
qemu-img resize -f raw nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img 32G
qemu-img convert -f raw -O vmdk -o subformat=monolithicSparse \
  nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img nexwall.vmdk
```

A etapa de redimensionamento dá à unidade um disco de 32 GB. Sem ela, o disco teria apenas o tamanho da imagem.

Crie a máquina virtual:

1. Escolha uma configuração personalizada, **Linux**, versão **Other Linux 6.x kernel 64-bit**.
2. Dê a ela 2 CPUs e 4 GB de memória.
3. Quando pedir um disco, escolha **Use an existing virtual disk** e selecione `nexwall.vmdk`. Use um controlador SATA.
4. Adicione **dois adaptadores de rede**: o primeiro é a LAN, o segundo é a WAN. Conecte cada um à rede virtual que
   corresponde à sua função.
5. Antes do primeiro boot, abra as configurações da máquina e defina o tipo de firmware como **UEFI**. Desative o
   **Secure Boot**.

No ESXi, envie o VMDK para um datastore e converta-o com `vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin`; depois,
anexe o disco convertido a uma VM com firmware UEFI.

:::tip Se os adaptadores de rede não forem detectados
Altere o tipo de adaptador para E1000E nas configurações da máquina.
:::

## No KVM, libvirt ou Proxmox

Essas plataformas usam discos raw ou qcow2 diretamente:

1. Descompacte a imagem e, se quiser mais espaço, redimensione-a: `qemu-img resize -f raw <imagem> 32G`.
2. Crie uma VM com firmware UEFI (OVMF), duas ou mais vCPUs e 4 GB de memória.
3. Importe a imagem como disco da VM (`qm importdisk` no Proxmox, ou aponte o disco do libvirt para o arquivo).
4. Adicione dois dispositivos de rede e defina a ordem de boot para o disco importado.

## Após o primeiro boot

O console mostra um prompt de login. A unidade fica acessível em `192.168.1.1` a partir da LAN. Se a interface web não
responder:

- Verifique se o seu computador está no lado da LAN e tem um endereço em `192.168.1.0/24`.
- Entre no console como `root` e confira o endereço com `ip -4 addr`.
- Veja [Solução de problemas](../help/troubleshooting.md).

Continue com o [Início rápido](../getting-started/quick-start.md).
