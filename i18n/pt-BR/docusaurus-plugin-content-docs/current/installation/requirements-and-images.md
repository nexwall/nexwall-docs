---
title: Requisitos e imagens
sidebar_position: 1
description: O que você precisa para executar uma unidade e o que é a imagem de disco.
---

# Requisitos e imagens

## Requisitos de hardware e de máquina virtual

| Item | Requisito |
|---|---|
| Arquitetura | x86 de 64 bits (x86_64) |
| Firmware | **UEFI**. A imagem não inicia em BIOS legado |
| Memória | 4 GB recomendados. Sistemas menores conseguem executar o firewall básico, mas recursos como o sistema de prevenção de intrusões, o controle de aplicações e o banco de métricas precisam de memória |
| Disco | 16 GB ou mais. 32 GB é um bom começo; adicione mais se quiser guardar logs e backups localmente |
| Rede | Pelo menos duas interfaces de rede, uma para a WAN e outra para a LAN |
| CPU | Dois núcleos ou mais. Mais núcleos ajudam ao inspecionar tráfego em velocidades maiores |

## A imagem de disco

A unidade é distribuída como uma imagem de disco bruta compactada:

```
nexwall-<versão>-x86-64-generic-squashfs-combined-efi.img.gz
```

Ao lado dela você encontra um arquivo `sha256sums`. Sempre verifique o download antes de usá-lo:

```bash
sha256sum -c sha256sums
```

Fatos importantes sobre a imagem:

- Ela é um disco completo, com partições para o gerenciador de boot, o sistema e os seus dados. **Não** é um instalador
  e não é uma ISO. Você a grava em um disco ou a anexa a uma máquina virtual como disco.
- Ela inicia somente com UEFI. Em máquinas virtuais, escolha o firmware UEFI e desative o Secure Boot, pois a imagem não
  é assinada para ele.
- O sistema roda a partir de uma base somente leitura com a sua configuração aplicada por cima. É isso que permite que
  uma restauração de fábrica volte ao estado instalado.
- Se você der ao disco mais espaço do que a imagem precisa, a partição de dados usa o espaço extra.

## Versões e canais

As imagens seguem o padrão `AA.M.P`, opcionalmente com um sufixo de release candidate, como `26.0.0-rc1`. As
atualizações são publicadas em canais; o canal padrão é `stable`. Veja [Sistema](../infrastructure/system.md) para saber
como as atualizações são verificadas, agendadas e instaladas.

## Antes de instalar

- Defina o plano de endereços da sua LAN. A LAN padrão é `192.168.1.0/24`; se ela entrar em conflito com uma rede
  existente, você pode alterá-la após o primeiro login.
- Reúna o que o seu provedor forneceu para a WAN: DHCP, ou um endereço, um gateway e servidores DNS, ou credenciais PPPoE.
- Deixe um computador e um cabo prontos para conectar à interface LAN.

Continue com [Instalar em uma máquina virtual ou em hardware](install-vm-and-hardware.md).
