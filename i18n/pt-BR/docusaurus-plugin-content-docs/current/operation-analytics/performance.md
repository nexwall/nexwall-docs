---
title: Desempenho
sidebar_position: 5
description: Gráficos históricos, alertas e monitoramento de latência.
---

# Desempenho

**Operação e Análises > Desempenho** mostra como a unidade se comporta ao longo do tempo. Tem três abas.

## Gráficos

Gráficos históricos de métricas do sistema: uso do processador e carga, memória, uso do disco e entrada e saída, processos em
execução, a tabela de conexões, pacotes de rede, o tráfego de cada interface e, para os hosts que você monitora, a
latência e a perda de pacotes. As métricas são coletadas por um agente e guardadas em um banco de séries temporais na unidade.

Escolha a **janela de tempo** com os botões no alto: 5 minutos, 30 minutos (a padrão), 1 hora, 12 horas, 24 horas, 7
dias ou 30 dias. Cada gráfico é um cartão com o valor atual, o máximo e a média de cada série sobre o gráfico, e o gráfico
continua sendo um gráfico: as linhas são suavizadas sem cortar os picos e, nas janelas longas, cada ponto é o valor mais alto
do seu intervalo (o mais baixo para a memória livre), então um pico curto de processador, memória, carga ou perda de pacotes continua
visível. O tráfego, os pacotes e a entrada e saída de disco são médias de cada intervalo.

O histórico é guardado por 7 dias, ou um ano quando o firewall tem um disco de dados; sem disco de dados a janela de 30 dias
mostra os últimos 7 dias.

Se os gráficos disserem que o banco de dados não está acessível, verifique se o serviço está em execução, veja
[Solução de problemas](../help/troubleshooting.md).

## Alertas

Alertas são condições avaliadas continuamente sobre as métricas, por exemplo um disco quase cheio. A aba
lista os alertas **pendentes** (a condição acabou de ser atendida) e **ativos** (se mantiveram por tempo suficiente). O
número de alertas ativos aparece no título da aba e no [Painel](dashboard.md).

## Configurações

Aqui você escolhe quais hosts a unidade pinga para medir a qualidade da rede. Adicione os endereços ou nomes dos
hosts que lhe interessam. Adicionar o endereço da outra ponta de um túnel VPN é uma boa forma de acompanhar a qualidade do túnel.

As medições aparecem como dois gráficos por host: **latência** (tempo de ida e volta, com mínimo, máximo e
média) e **perda de pacotes** (a parte dos pings que não receberam resposta; zero é um link saudável). Os mesmos gráficos estão na
aba **Links WAN** do [Monitoramento](monitor-connections.md).

## Páginas relacionadas

- [SD-WAN](../network/sd-wan.md) usa seus próprios hosts de acompanhamento para decidir quando um link WAN está fora.
- [Gerenciamento central](../administration/central-management.md) guarda um histórico mais longo das métricas.
