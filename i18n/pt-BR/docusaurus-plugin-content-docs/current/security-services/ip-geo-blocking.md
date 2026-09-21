---
title: Bloqueio de IP e geolocalização (Threat Shield IP)
sidebar_position: 4
description: Bloqueie endereços hostis, países, tentativas de força bruta e inundações.
---

# Bloqueio de IP e geolocalização (Threat Shield IP)

**Serviços de Segurança > Bloqueio de IP e Geolocalização** bloqueia novas conexões de e para endereços conhecidos como
hostis. Ele atua na camada de rede, antes de uma conexão alcançar qualquer serviço, e também pode bloquear países
inteiros.

## Estado e listas de bloqueio

Ative o serviço na aba **Configurações**. Depois, abra a página de listas de bloqueio.

Uma **lista de bloqueio** é uma lista de endereços compilada por alguém e agrupada por finalidade. Cada uma tem um nome
claro que informa quem a mantém e o que ela visa. Escolha as listas a habilitar e, para cada uma, a direção em que é
aplicada (entrada, saída ou ambas). Algumas listas exigem uma assinatura que inclua o Threat Shield.

As conexões bloqueadas são registradas com uma etiqueta que inclui a direção, a zona e a ação, para que você possa
procurá-las em [Logs](../operation-analytics/logs.md).

## Suas próprias entradas

| Lista | Efeito |
|---|---|
| Lista de bloqueio local | Endereços, redes, nomes de host ou endereços MAC que devem ser sempre bloqueados |
| Lista de permissão | Entradas que devem ser sempre permitidas, mesmo que uma lista de bloqueio as contenha |

Uma entrada pode ser um endereço IPv4 ou IPv6 (com CIDR opcional), um nome de host totalmente qualificado ou um endereço
MAC na forma `xx:xx:xx:xx:xx:xx`.

:::warning Evite ficar sem acesso
Adicione à lista de permissão o endereço a partir do qual você administra a unidade e os endereços da sua VPN antes de
habilitar listas de bloqueio agressivas.
:::

## Bloqueio por geolocalização

Você pode bloquear o tráfego de e para países ou regiões. Selecione-os nas configurações de bloqueio por geolocalização.
Use isso quando um serviço não tem usuários legítimos em algumas partes do mundo.

## Proteção contra força bruta e inundações

O serviço também pode reagir a abusos:

- A **proteção contra força bruta** bane uma origem que falha repetidamente ao entrar em um serviço. Você escolhe
  quantas falhas causam um banimento e por quanto tempo.
- A **proteção contra inundações** limita inundações de ICMP, TCP SYN e UDP por segundo.

## Endereços banidos

A visualização **Endereços banidos** lista os endereços que estão bloqueados no momento. Você pode pesquisar um endereço
para ver qual lista o contém e remover um banimento.

## Registro e painel

As estatísticas de ameaças mostram apenas o que foi registrado. Habilite o registro nas configurações para alimentá-las.
Veja [Painel](../operation-analytics/dashboard.md).

## Páginas relacionadas

- [Filtragem de DNS](dns-filtering.md)
- [Prevenção de intrusões](ips.md)
