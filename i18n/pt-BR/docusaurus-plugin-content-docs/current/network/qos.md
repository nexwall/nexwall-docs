---
title: Qualidade de serviço (QoS)
sidebar_position: 4
description: Divida a banda de forma justa e combata o bufferbloat.
---

# Qualidade de serviço (QoS)

**Rede > QoS** mantém o seu link de internet responsivo quando ele está ocupado. A unidade distribui a banda disponível de
forma justa entre as conexões, ajusta os limites de acordo com as condições da rede e reduz o **bufferbloat**: o atraso
que aparece quando um link saturado enfileira pacotes demais.

## Configurando uma interface

O QoS é configurado para cada interface WAN.

1. Meça a velocidade real do link com um teste de velocidade, nos dois sentidos.
2. Habilite o QoS para a interface.
3. Informe a velocidade de **download** (entrada) e a de **upload** (saída), em Mbit por segundo.
4. Salve e **Aplicar alterações**.

:::tip Informe um pouco menos que a medição
Informe um valor de 5 a 10 por cento abaixo do que você mediu. Isso deixa uma margem para que a fila fique na unidade,
onde pode ser gerenciada, e não no seu provedor.
:::

## Quando usar

- Chamadas de vídeo ou voz travam enquanto alguém baixa um arquivo grande.
- As páginas web carregam devagar quando o link está saturado.
- Você compartilha um link entre muitos usuários e quer equidade.

## Páginas relacionadas

- [SD-WAN](sd-wan.md)
- [Desempenho](../operation-analytics/performance.md)
