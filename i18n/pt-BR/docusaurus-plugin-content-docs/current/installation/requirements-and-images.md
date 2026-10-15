---
title: Requisitos e mídia de instalação
sidebar_position: 1
description: O que você precisa para executar uma unidade e o que é a ISO do instalador.
---

# Requisitos e mídia de instalação

## Requisitos de hardware e de máquina virtual

| Item | Requisito |
|---|---|
| Arquitetura | x86 de 64 bits (x86_64) |
| Firmware | **UEFI**. O sistema instalado não inicia em BIOS legado |
| Memória | 4 GB recomendados. Sistemas menores podem executar o firewall básico, mas recursos como o sistema de prevenção de intrusões, o controle de aplicações e o banco de métricas precisam de memória |
| Disco | 16 GB ou mais. 32 GB é um bom começo; acrescente mais se quiser guardar logs e backups localmente |
| Rede | Pelo menos duas interfaces de rede, uma para a WAN e outra para a LAN |
| CPU | Dois núcleos ou mais. Mais núcleos ajudam ao inspecionar tráfego em velocidades maiores |

## A ISO do instalador

O Nexwall é instalado a partir de um único arquivo, a ISO do instalador:

```
NEXWALL-Installer-<versão>.iso
```

Ao lado dela está um arquivo `.sha256` com a sua soma de verificação. A mesma ISO serve em qualquer lugar:

- em uma **máquina virtual**, conecte-a como unidade de CD/DVD;
- em um **servidor ou equipamento dedicado**, grave-a em um pendrive;
- em um servidor de rack com **console remoto** (iDRAC, iLO, IPMI), monte-a como mídia virtual.

A ISO contém o sistema Nexwall e um pequeno instalador. O instalador verifica a imagem do sistema antes de tocar em qualquer
disco, nunca oferece como destino o pendrive de onde iniciou, pede que você digite `INSTALL` antes de apagar o disco escolhido
e confere o que gravou. Ele fala inglês, espanhol e português.

### Onde baixar

Cada versão tem uma página nas notas de versão, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/). A seção
**Downloads** no fim da página lista os arquivos da versão com o tamanho e a soma SHA-256. A página de downloads do site,
[releasenotes.nexwall.com.br/download](https://releasenotes.nexwall.com.br/download/), lista todas as versões.

### Confira o download

Compare sempre a soma do arquivo com a da tabela **Downloads** (ou com a do arquivo `.sha256`):

```bash
sha256sum -c NEXWALL-Installer-<versão>.iso.sha256
```

No Windows, no PowerShell: `Get-FileHash .\NEXWALL-Installer-<versão>.iso -Algorithm SHA256`. No macOS:
`shasum -a 256 NEXWALL-Installer-<versão>.iso`.

:::info A imagem de disco
A versão também publica a imagem de disco bruta (`.img.gz`) que a ISO carrega. Normalmente você não precisa dela. Se tiver de
gravar a imagem por conta própria, por exemplo para clonar um disco em uma fábrica ou para importá-la em uma plataforma que não
consegue iniciar uma ISO, siga [Instalar a partir da imagem de disco](../help/install-from-image.md).
:::

## Versões e canais

As versões seguem o padrão `AA.M.P`, opcionalmente com um sufixo de candidata como `26.0.0-rc1`. As atualizações são publicadas
em canais; o canal padrão é `stable`. Veja [Sistema](../infrastructure/system.md) para saber como as atualizações são
verificadas, agendadas e instaladas.

## Antes de instalar

- Decida o plano de endereços da sua LAN. A LAN padrão é `192.168.1.0/24`; se conflitar com uma rede existente, você pode
  alterá-la após o primeiro acesso.
- Reúna o que o seu provedor informou para a WAN: DHCP, ou um endereço, um gateway e servidores DNS, ou as credenciais PPPoE.
- Tenha um computador e um cabo prontos para ligar à interface LAN.
- Tenha um pendrive de 2 GB ou mais, ou uma forma de conectar a ISO à sua máquina virtual.
- O instalador **apaga o disco que você escolher**. Faça antes um backup do que precisar dele.

Continue com [Instalar com a ISO](install-vm-and-hardware.md).
