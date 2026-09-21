---
title: Desempenho
sidebar_position: 4
description: Gráficos históricos, alertas e monitoramento de latência.
---

# Desempenho

**Operação e Análises > Desempenho** mostra como a unidade se comporta ao longo do tempo. Ele tem três abas.

## Gráficos

Gráficos históricos de métricas do sistema: uso do processador e carga, memória, uso e entrada e saída de disco,
processos em execução, a tabela de conexões, pacotes de rede e o tráfego de cada interface. As métricas são coletadas
por um agente e armazenadas em um banco de dados de séries temporais na unidade. Escolha um intervalo de tempo para
alterar a janela mostrada por todos os gráficos.

Se os gráficos disserem que o banco de dados não está acessível, verifique se o serviço está em execução, veja
[Solução de problemas](../help/troubleshooting.md).

## Alertas

Alertas são condições avaliadas continuamente sobre as métricas, por exemplo um disco quase cheio. A aba lista os
alertas **pendentes** (a condição acabou de se tornar verdadeira) e **disparados** (ela permaneceu verdadeira por tempo
suficiente). O número de alertas ativos é mostrado no título da aba.

## Configurações

Aqui você escolhe quais hosts a unidade envia ping para medir a qualidade da rede. Adicione os endereços ou nomes dos
hosts que lhe interessam. Adicionar o endereço da outra ponta de um túnel VPN é uma boa forma de acompanhar a qualidade
do túnel.

As medições aparecem como dois gráficos na aba Gráficos: **latência** (tempo de ida e volta) e **entrega de pacotes** (a
parcela de pings que foram respondidos).

## Páginas relacionadas

- [SD-WAN](../network/sd-wan.md) usa seus próprios hosts de verificação para decidir quando um link WAN está fora do ar.
- O [Gerenciamento central](../administration/central-management.md) mantém um histórico mais longo das métricas.
