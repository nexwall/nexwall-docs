---
title: Análise de Tráfego
sidebar_position: 3
description: O serviço opcional de análise na nuvem, alimentado com metadados de tráfego.
---

# Análise de Tráfego

**Operação e Análises > Análise de Tráfego** conecta a unidade a um serviço de análise na nuvem. O serviço transforma os
metadados sobre o seu tráfego, produzidos pelo mecanismo local de classificação, em relatórios de mais alto nível sobre a
sua rede.

## O que é enviado

São enviados apenas metadados: quais aplicações e protocolos foram vistos e informações resumidas sobre os fluxos. O
conteúdo das conexões não é enviado. O serviço é opcional e vem **desativado por padrão**.

:::caution Decida antes de ativar
Ativar o serviço significa que metadados sobre a sua rede saem da unidade. Revise antes as suas obrigações de
privacidade.
:::

## Como ativar

1. Abra a página e ative o **envio de metadados**. Isso deve ser feito antes de a unidade ser provisionada.
2. Aplique as alterações.
3. A página mostra o **identificador do agente** da unidade. Use-o, a partir do portal de análise, para adicionar a
   unidade à sua conta.
4. Abra o portal pelo link da página e entre. O serviço é fornecido pela plataforma de serviços Nexwall e exige uma
   assinatura.

## Quando não há nada para ver

Se o mecanismo de classificação de tráfego não estiver em execução, a página informa. O mecanismo também alimenta os
fluxos em tempo real do [Monitoramento](monitor-connections.md), então verifique lá primeiro.

## Desativando

Desative o envio de metadados e aplique as alterações. A unidade para de enviar imediatamente.
