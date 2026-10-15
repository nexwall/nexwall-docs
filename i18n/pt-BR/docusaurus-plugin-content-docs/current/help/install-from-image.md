---
title: Instalar a partir da imagem de disco (img.gz)
description: Baixe a imagem de disco de uma versão e grave-a em um disco ou importe-a em uma plataforma de virtualização, quando não for possível usar a ISO do instalador.
---

# Instalar a partir da imagem de disco (img.gz)

A forma recomendada de instalar o Nexwall é a ISO do instalador, veja [Instalar com a ISO](../installation/install-vm-and-hardware.md).
Use a imagem de disco apenas quando a ISO não servir ao seu caso, por exemplo quando você copia a mesma imagem para muitos discos
em uma fábrica, ou quando importa o sistema em uma plataforma que só aceita arquivos de disco.

A imagem é um **disco completo**: tabela de partições, partições e carregador de boot. Ela só inicia em modo **UEFI**; não inicia
em BIOS legado.

## Onde baixar a imagem

1. Abra as notas de versão, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/), e abra a página da versão que
   quer instalar.
2. Vá à seção **Downloads** no fim da página. Ela lista os arquivos da versão com o tamanho e a soma SHA-256.
3. Baixe o arquivo chamado `nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz`. Ele tem cerca de 1 GB.

Confira sempre o download com a soma da tabela:

```bash
sha256sum nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
```

No Windows, no PowerShell: `Get-FileHash .\nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz -Algorithm SHA256`.

## Copiar a imagem para um disco

1. Descompacte a imagem e grave-a no disco de destino. No Linux, substitua `/dev/sdX` pelo disco correto. Confira o nome duas
   vezes, porque isto apaga o disco:

   ```bash
   gunzip -k nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
   sudo dd if=nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img of=/dev/sdX bs=4M status=progress conv=fsync
   ```

   No Windows, use uma ferramenta de gravação de discos como Rufus ou balenaEtcher com a imagem descompactada.

2. Se o disco for maior que a imagem, o espaço livre é usado para dados.
3. Inicie a máquina em UEFI. Na configuração do firmware, garanta que a ordem de boot começa pelo disco novo e que o Secure Boot
   está desligado.
4. Ligue o cabo da LAN à interface que será a LAN e continue com o [Início rápido](../getting-started/quick-start.md).

## Usar a imagem no VMware

O VMware não inicia uma imagem bruta, então converta-a antes para um disco VMDK. Em qualquer máquina Linux com `qemu-utils`:

```bash
gunzip -k nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
qemu-img resize -f raw nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img 32G
qemu-img convert -f raw -O vmdk -o subformat=monolithicSparse \
  nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img nexwall.vmdk
```

O passo de ampliação dá à unidade um disco de 32 GB. Sem ele, o disco teria só o tamanho da imagem.

Crie a máquina virtual:

1. Escolha uma configuração personalizada, **Linux**, versão **Other Linux 6.x kernel 64-bit**.
2. Dê a ela 2 CPUs e 4 GB de memória.
3. Quando pedir um disco, escolha **Use an existing virtual disk** e selecione `nexwall.vmdk`. Use um controlador SATA.
4. Acrescente **dois adaptadores de rede**: o primeiro é a LAN, o segundo a WAN.
5. Antes do primeiro boot, defina o firmware como **UEFI** e desligue o **Secure Boot**.

No ESXi, envie o VMDK para um datastore, converta-o com `vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin` e conecte o disco
convertido a uma VM com firmware UEFI.

## Usar a imagem no KVM, libvirt ou Proxmox

Essas plataformas usam discos raw ou qcow2 diretamente:

1. Descompacte a imagem e, se quiser mais espaço, amplie-a: `qemu-img resize -f raw <imagem> 32G`.
2. Crie uma VM com firmware UEFI (OVMF), duas ou mais vCPUs e 4 GB de memória.
3. Importe a imagem como disco da VM (`qm importdisk` no Proxmox, ou aponte o disco do libvirt para o arquivo).
4. Acrescente dois dispositivos de rede e defina a ordem de boot para o disco importado.

## Depois do primeiro boot

A unidade responde em `192.168.1.1` a partir da LAN e o console mostra o login. Se a interface web não responder, veja
[Solução de problemas](troubleshooting.md).
