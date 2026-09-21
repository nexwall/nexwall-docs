---
title: Visão geral
sidebar_position: 1
description: O que é o Nexwall Firewall e o que ele pode fazer.
---

# Visão geral

O Nexwall Firewall é um appliance de segurança de rede para organizações e para os provedores de serviços que cuidam
delas. Ele roda como uma imagem de disco pronta em hardware x86 comum ou em uma máquina virtual, e é administrado por
uma interface web. Por baixo, é construído sobre o OpenWrt, uma distribuição Linux madura projetada para dispositivos
de rede, e sobre componentes de código aberto conhecidos, como nftables, Snort, OpenVPN, strongSwan e WireGuard.

## O que ele faz

| Área | O que você pode fazer |
|---|---|
| Filtragem | Controlar o tráfego entre redes com regras baseadas em zonas, NAT e redirecionamento de portas |
| Proteção | Bloquear aplicações, impedir intrusões, filtrar domínios maliciosos e bloquear endereços hostis ou países inteiros |
| Conectividade | Usar vários links de internet com failover e balanceamento, controlar a banda e executar DHCP e DNS |
| Acesso remoto e filiais | Oferecer acesso remoto seguro aos usuários e conectar escritórios com túneis site a site |
| Visibilidade | Ver conexões em tempo real, estatísticas de tráfego, gráficos de desempenho e logs |
| Operação | Fazer backup, atualizar e restaurar unidades, mantê-las em alta disponibilidade e gerenciar muitas delas em um só lugar |

## Como a documentação está organizada

O guia de administração segue o menu da interface web, para que você encontre uma página procurando a entrada de menu
que está usando:

- **Primeiros passos** e **Instalação** explicam o que você precisa para colocar uma unidade em operação.
- **Operação e Análises** cobre o painel, o tráfego em tempo real, o desempenho e os logs.
- **Políticas** cobre regras, NAT, zonas e objetos.
- **Serviços de Segurança** cobre o controle de aplicações, o sistema de prevenção de intrusões, a filtragem de DNS e o
  bloqueio de IP ou de países.
- **Rede**, **VPN**, **Acesso e Identidade**, **Infraestrutura** e **Administração** cobrem o restante do menu.
- **Ajuda** reúne passos de solução de problemas organizados por sintoma e uma referência de linha de comando.

:::tip Comece por aqui
Se você está configurando uma unidade pela primeira vez, leia [Início rápido](quick-start.md) em seguida. Se quiser
entender os termos usados no restante do guia, leia [Conceitos](concepts.md).
:::

## Edições e recursos

Alguns recursos dependem de uma assinatura, por exemplo o catálogo maior de aplicações, os backups criptografados na
nuvem e as listas avançadas do Threat Shield. Quando uma página descreve um recurso assim, ela avisa. Veja
[Licenciamento e conta](../administration/licensing-account.md) para saber como uma assinatura é ativada.
