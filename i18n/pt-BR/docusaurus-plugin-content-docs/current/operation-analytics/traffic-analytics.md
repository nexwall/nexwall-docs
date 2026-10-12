---
title: Análise de Tráfego
sidebar_position: 3
description: "Para onde vai o tráfego do firewall: quanto, quando e quais dispositivos, aplicações, sites e protocolos."
---

# Análise de Tráfego

**Operação e Análises > Análise de Tráfego** mostra para onde vai o tráfego. É construída a partir dos relatórios horários de tráfego do
motor de classificação local e funciona no firewall: nada sai da unidade. O conteúdo das conexões nunca é
registrado, apenas quais aplicações e protocolos foram vistos e quantos bytes transportaram.

Escolha **Hoje**, **7 dias** ou **30 dias** no canto superior direito. Os relatórios são mantidos por 35 dias.

## O que a página mostra

- **Quatro números**: o tráfego total, a hora de maior tráfego, a aplicação principal e o dispositivo principal.
- **Tráfego por hora**: uma barra por hora do dia. Para 7 ou 30 dias as horas de todos os dias são somadas. Hoje é
  atualizado a cada minuto.
- **Listas ordenadas** dos equipamentos locais (dispositivos), das aplicações, dos equipamentos remotos e dos protocolos, cada linha com seu
  volume e sua parte do total.
- **Categorias web**: o tráfego por categoria de site.

O próprio firewall não é contado como dispositivo nem como equipamento remoto. Com o proxy web ativado, tudo o que o proxy baixa
para seus dispositivos sai do endereço do firewall, e contá-lo mostraria o firewall como o dispositivo com mais tráfego e contaria
o tráfego duas vezes.

## Seguir uma linha

Clique em uma linha de uma lista para filtrar toda a página por ela, por exemplo por um dispositivo. O filtro aparece no alto como uma etiqueta;
clique no **x** da etiqueta, ou em **Remover**, para retirá-lo. Os filtros se combinam: um dispositivo, depois uma de suas aplicações, depois um
equipamento remoto. Os filtros ficam no endereço da página, então você pode salvar ou compartilhar um link para uma visão.

## Quando não há nada para ver

Se o motor de classificação de tráfego não está funcionando, a página não tem dados. O motor também alimenta os fluxos ao vivo do
[Monitor](monitor-connections.md), então verifique lá primeiro. Aproximação que vale lembrar: para 7 e 30 dias cada dia contribui com sua própria
lista de principais, então algo que é pequeno todos os dias pode faltar nos totais das listas.

## Páginas relacionadas

- [Análise de ameaças](threat-analytics.md)
- [Monitoramento e conexões](monitor-connections.md)
- [Controle de aplicações](../security-services/application-control.md)
