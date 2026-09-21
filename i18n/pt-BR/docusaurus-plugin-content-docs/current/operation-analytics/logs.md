---
title: Logs
sidebar_position: 5
description: Leitura e pesquisa dos logs do sistema.
---

# Logs

**Operação e Análises > Logs** mostra o log do sistema da unidade: mensagens do firewall, dos serviços, da rede e do
kernel.

## Lendo o log

- Escolha quantas linhas carregar.
- Ative **quebrar linhas** para ver mensagens longas sem rolar para o lado.
- Use a caixa de pesquisa para manter apenas as linhas que correspondem. A pesquisa aceita expressões regulares.
- Ative **acompanhar** para ver as novas mensagens à medida que chegam.

## Pesquisas úteis

| Objetivo | Pesquise por |
|---|---|
| Pacotes bloqueados | o nome da zona, ou o prefixo de log usado pela regra |
| Problemas de VPN | `openvpn`, `charon` ou `wireguard` |
| Atividade de DHCP | `dnsmasq-dhcp` |
| Bloqueios do Threat Shield IP | `banIP` |
| Problemas de atualização ou registro | o nome do serviço, por exemplo `ns-plug` |

## Mantendo os logs entre reinicializações

Por padrão, o log fica na memória e é perdido na reinicialização. Para guardar uma cópia, conecte um disco ou uma unidade
USB e configure-o em **Infraestrutura > Sistema**, na aba Armazenamento. A unidade então também grava os logs nesse
dispositivo. Veja [Sistema](../infrastructure/system.md).

Quando uma unidade está conectada a um controlador, os logs também são transmitidos a ele, veja
[Gerenciamento central](../administration/central-management.md).

## Pela linha de comando

O mesmo log está disponível por SSH com `logread`. Veja [Linha de comando e perguntas frequentes](../help/command-line-and-faq.md).
