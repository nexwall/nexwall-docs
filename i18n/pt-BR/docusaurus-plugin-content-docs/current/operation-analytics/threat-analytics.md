---
title: Análise de ameaças
sidebar_position: 2
description: O que o firewall barrou ou detectou, quais dispositivos estão em risco e o relatório executivo.
---

# Análise de ameaças

**Operação e Análises > Análise de ameaças** conta o que as proteções do firewall fizeram: o que foi bloqueado ou
detectado, quando, de onde vinha, quais dispositivos da rede foram afetados e por quê. Funciona no próprio firewall,
sem serviço na nuvem.

![Análise de ameaças](/img/docs/threats-en.png)

Escolha **Hoje**, **7 dias** ou **30 dias** no canto superior direito.

## A história de uma ameaça

O primeiro bloco acompanha as camadas que uma ameaça encontra, em ordem:

| Camada | O que conta |
|---|---|
| Bloqueio | Barrado na borda: bloqueio de IP e geolocalização, filtragem DNS, IPS e a política web (categorias e filtro de conteúdo) |
| Antivírus | Arquivos infectados encontrados no tráfego web |
| Sandbox | Arquivos desconhecidos abertos em uma máquina segura, veja [Proteção web](../security-services/web-protection.md) |
| Advanced Threat Protection | Vereditos aprendidos de muitas análises. Ainda não disponível: o bloco mostra **Em breve** |
| Collective Defense (Loop) | O que uma análise encontra é bloqueado em todos os firewalls. Ainda não disponível: o bloco mostra **Em breve** |

Uma camada que não está no seu plano mostra **Não incluída no seu plano**.

## O que mais há na página

- **Ameaças ao longo do tempo**, barradas ou detectadas, com a variação em relação ao período anterior.
- **Dispositivos em risco**: uma pontuação por dispositivo (peso da proteção que atuou, pela gravidade, pelo número de
  eventos). Os pesos são impressos abaixo da tabela.
- **Categorias web**: o tráfego por categoria de site. Também informa que parte do tráfego está em uma categoria, pois
  sites que não estão em nenhuma lista não são contados em uma.
- **Dispositivos mais afetados**, **principais origens de ameaças** e **principais motivos**.
- **Eventos**: cada evento com sua hora, dispositivo, endereço remoto, proteção, ação (bloqueado, detectado ou permitido),
  motivo e detalhe. Pesquise por dispositivo, endereço ou motivo e abra um evento para ver seu detalhe.

Os eventos são mantidos no firewall por 35 dias. O histórico começa quando a versão que introduziu esta página foi instalada.

## Relatório executivo

**Relatório executivo** (botão no alto) gera um PDF do período escolhido: um resumo executivo, os eventos de ameaças,
os dispositivos em risco, o tráfego, as categorias web, o estado das proteções e recomendações. É gratuito em todos os
planos e leva apenas uma pequena marca *Powered by Nexwall*.

Por padrão os dispositivos aparecem como *Dispositivo 1*, *Dispositivo 2* e assim por diante. Ative **Incluir nomes e endereços dos dispositivos** para ver
seus nomes e endereços.

## Páginas relacionadas

- [Painel](dashboard.md)
- [Análise de Tráfego](traffic-analytics.md)
- [Logs](logs.md) para os eventos brutos no Visualizador de logs.
