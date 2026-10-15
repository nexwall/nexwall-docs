---
title: Instalar com a ISO
sidebar_position: 2
description: Inicie o instalador a partir da ISO em um servidor, um equipamento dedicado ou uma máquina virtual e instale o Nexwall no disco interno.
---

# Instalar com a ISO

## Antes de começar

- Baixe a ISO do instalador e confira a sua soma de verificação, veja [Requisitos e mídia de instalação](requirements-and-images.md).
- O instalador **apaga o disco que você escolher**.
- A máquina deve iniciar em modo **UEFI**, com o **Secure Boot desligado** na configuração do firmware.

## Passo 1. Prepare a mídia de instalação

**Máquina virtual.** Conecte a ISO à unidade de CD/DVD da máquina, veja as seções de cada plataforma abaixo.

**Servidor ou equipamento dedicado.** Grave a ISO em um pendrive de 2 GB ou mais. O pendrive é apagado.

- **Rufus** (Windows): selecione a ISO e o pendrive e grave. Se o Rufus perguntar como, escolha **Gravar no modo imagem DD**
  (o modo ISO também funciona).
- **balenaEtcher** (Windows, macOS, Linux): **Flash from file**, selecione a ISO e o pendrive.
- **Linux**: substitua `/dev/sdX` pelo pendrive. Confira o nome duas vezes, porque isto apaga o disco:

  ```bash
  sudo dd if=NEXWALL-Installer-<versão>.iso of=/dev/sdX bs=4M status=progress conv=fsync
  ```

**Servidor de rack com console remoto.** Monte a ISO como mídia virtual no console do servidor.

## Passo 2. Inicie o instalador

Inicie a máquina pelo pendrive, ou pelo CD/DVD virtual, em modo UEFI. Use o menu de boot do firmware se ela não iniciar sozinha.
Se a máquina tiver Secure Boot, desligue-o na configuração do firmware.

## Passo 3. Siga o instalador

1. **Idioma.** Escolha English, Español ou Português. Todas as mensagens seguintes aparecem nesse idioma.
2. **Introdução.** O instalador informa que instala o Nexwall `<versão>` em um disco interno e que todos os dados do disco
   selecionado serão apagados. Escolha **Sim** para continuar para a seleção do disco.
3. **Verificação.** *Verificando a imagem de instalação...* O instalador confere a imagem do sistema que a ISO carrega. Se
   informar que a imagem está danificada ou falhou na verificação SHA-256, não instale: baixe a ISO novamente.
4. **Disco.** O instalador lista os discos que pode usar: internos, não removíveis e grandes o bastante, com tamanho, barramento
   e modelo. **O pendrive ou CD de onde iniciou não aparece.** Escolha o disco que será apagado.
5. **Confirmação.** O instalador mostra o disco, a versão e o tamanho e pede que você **digite `INSTALL`** em maiúsculas.
   Qualquer outra coisa cancela e nada é gravado.
6. **Gravação.** *Gravando o Nexwall no disco. Não desligue o equipamento nem retire o pendrive. Isso leva alguns minutos.* Ao
   terminar, o instalador lê o disco de volta e compara a sua soma com a esperada (*Verificando o que foi gravado...*).
7. **Concluído.** *O Nexwall `<versão>` foi gravado e verificado.* Retire o pendrive ou a ISO virtual e escolha **Sim** para
   reiniciar. Se escolher **Não**, você pode desligar, retirar a mídia e iniciar pelo disco interno.

## Primeiro início

O primeiro início do novo sistema mostra o login do console. A unidade responde em `192.168.1.1` a partir da LAN. Continue com
o [Início rápido](../getting-started/quick-start.md), que abre o assistente de configuração.

Se a interface web não responder:

- Confira se o seu computador está do lado da LAN e tem um endereço em `192.168.1.0/24`.
- Entre no console como `root` e confira o endereço com `ip -4 addr`.
- Veja [Solução de problemas](../help/troubleshooting.md).

## Em uma máquina virtual

A ISO funciona igual em todas as plataformas. Crie a máquina com firmware UEFI, **2 CPUs ou mais, 4 GB de memória, um disco
virtual de 16 GB ou mais (32 GB é confortável)** e **dois adaptadores de rede**: o primeiro é a LAN, o segundo a WAN. Conecte a
ISO como CD/DVD, inicie por ela e siga o Passo 3. Depois da instalação, desconecte a ISO.

### VMware Workstation, Fusion ou ESXi

1. Crie uma máquina nova com configuração personalizada, **Linux**, versão **Other Linux 6.x kernel 64-bit**.
2. Dê a ela 2 CPUs e 4 GB de memória, um disco virtual novo de 32 GB e dois adaptadores de rede ligados às redes virtuais da LAN
   e da WAN.
3. Nas configurações da máquina defina o tipo de firmware como **UEFI** e desligue o **Secure Boot**.
4. Para a unidade de CD/DVD escolha **Use ISO image file** e selecione a ISO do Nexwall. No ESXi, envie a ISO para um datastore e
   escolha **Datastore ISO file**. Conecte a unidade ao ligar.
5. Ligue a máquina e siga o Passo 3.

:::tip Se os adaptadores de rede não forem detectados
Altere o tipo do adaptador para E1000E nas configurações da máquina.
:::

### KVM, libvirt e Proxmox

1. Crie uma VM com firmware **UEFI (OVMF)**, duas ou mais vCPUs, 4 GB de memória, um disco de 16 GB ou mais e dois dispositivos
   de rede. No Proxmox use **BIOS: OVMF (UEFI)** e adicione um disco EFI com **Pre-Enroll keys** desligado, para que o Secure
   Boot fique desligado.
2. Conecte a ISO como unidade de CD/DVD e coloque-a primeiro na ordem de boot.
3. Inicie a VM e siga o Passo 3. Ao terminar, retire a ISO da unidade.

## Se o instalador informar um problema

| O que você vê | O que fazer |
|---|---|
| A máquina não inicia pelo pendrive | Inicie em modo UEFI pelo menu de boot do firmware, desligue o Secure Boot e grave o pendrive de novo em modo imagem DD |
| *Installer payload is incomplete*, *A imagem incluída está danificada* ou *falhou na verificação SHA-256* | A ISO está danificada ou incompleta. Baixe-a novamente e confira a soma |
| *Nenhum disco interno elegível foi encontrado* | O disco deve ser detectado pela máquina, não ser removível e ter pelo menos o tamanho que a mensagem informa. Em uma VM acrescente um disco virtual de 16 GB ou mais. Em hardware verifique o modo de armazenamento do firmware (use AHCI, não um modo RAID que esconda o disco) |
| *Não foi possível identificar o pendrive de instalação, então ele NÃO é excluído da lista* | Leia com cuidado os nomes e tamanhos dos discos antes de escolher. O disco escolhido é apagado |
| *A verificação de segurança bloqueou o pendrive de instalação como destino* | Você escolheu a mídia de onde o instalador iniciou. Escolha o disco interno |
| *Falha ao gravar a imagem* | Tente de novo. Se repetir, o disco pode estar com defeito: tente outro. A mensagem informa o arquivo de log |
| *A verificação de leitura falhou. Não use este disco.* | Os dados no disco não são os gravados. Tente de novo e depois com outro disco |
