---
title: Prevenção de intrusões (IPS / IDS)
sidebar_position: 2
description: Detecte e bloqueie ataques com o Snort.
---

# Prevenção de intrusões (IPS / IDS)

**Serviços de Segurança > IPS / IDS** executa o sistema de prevenção de intrusões Snort sobre o tráfego que passa pelo
firewall. O Snort compara o tráfego com um conjunto de **regras** que descrevem ataques conhecidos. O tráfego que
corresponde a uma regra ativa é bloqueado, ou gera um alerta, conforme a regra.

## Ativando o IPS

1. Abra a aba **Configurações** e ative o IPS.
2. Escolha a política de regras que atende às suas necessidades. Uma política mais rígida bloqueia mais e pode gerar mais
   falsos positivos.
3. Opcionalmente, informe um **Oinkcode**. O Oinkcode é um identificador pessoal que dá acesso aos conjuntos de regras
   oficiais mais recentes. Você o obtém registrando uma conta gratuita no site do Snort. Sem ele, são usadas as regras da
   comunidade.
4. Defina suas **redes locais**: as redes que você protege. As regras as usam para distinguir o interno do externo.
5. Salve e **Aplicar alterações**.

As regras são atualizadas automaticamente uma vez por dia, durante a madrugada.

## Eventos

A aba **Eventos** lista o que o IPS viu: o tráfego que ele bloqueou e os alertas que gerou. Cada evento mostra a hora, a
regra, os endereços e a ação. Use essa lista para decidir o que ajustar.

## Ajustes

Nenhum conjunto de regras é perfeito. Quando uma regra interfere no tráfego legítimo, você tem três ferramentas:

| Ferramenta | Efeito |
|---|---|
| **Regras desativadas** | A regra é removida do conjunto para todos. Use quando uma regra é, em geral, rígida demais para o seu ambiente |
| **Alertas suprimidos** | A regra continua ativa, mas ignora um endereço ou rede em uma direção. Use quando uma regra é boa em geral, mas um host a dispara legitimamente |
| **Bypass** | O tráfego de um endereço não é inspecionado. Use com moderação, por exemplo para um servidor de backup que move grandes volumes de dados |

Para desativar uma regra ou suprimir um alerta, comece pelo evento que mostra o problema.

## Desempenho

Inspecionar todo o tráfego consome poder de processamento e memória. Se você notar carga alta após ativar o IPS, consulte a
página [Desempenho](../operation-analytics/performance.md), use o bypass para fluxos confiáveis de alto volume e considere
uma política com menos regras.

## Páginas relacionadas

- [Bloqueio de IP e geolocalização](ip-geo-blocking.md)
- [Regras de firewall](../policy/firewall-rules.md)
