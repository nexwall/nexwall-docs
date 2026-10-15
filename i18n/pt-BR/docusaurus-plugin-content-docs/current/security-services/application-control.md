---
title: Controle de aplicações (DPI)
sidebar_position: 1
description: Reconheça aplicações e protocolos e bloqueie-os por interface.
---

# Controle de aplicações (DPI)

**Serviços de Segurança > Controle de aplicações (DPI)** bloqueia o tráfego pelo que ele é, e não apenas pela porta que usa. A unidade inspeciona
as conexões com inspeção profunda de pacotes (DPI). Um mecanismo reconhece o protocolo de cada fluxo e, quando consegue,
a aplicação que o produziu, por exemplo um serviço de streaming ou um aplicativo de mensagens. Você então escreve regras
que bloqueiam as que não deseja em uma rede.

![Regras do Controle de aplicações](/img/docs/appcontrol-en.png)

## Como funciona

1. O mecanismo observa o tráfego e classifica cada conexão usando o protocolo e os nomes que ela carrega, como o nome do
   servidor em uma conexão criptografada.
2. As regras que você define são comparadas com o resultado.
3. Quando uma conexão corresponde a uma regra de bloqueio, a unidade a rejeita e continua rejeitando por um período.

A classificação precisa dos primeiros pacotes de uma conexão, então uma conexão bloqueada é interrompida assim que a
aplicação é reconhecida, e não antes de a conexão começar.

## O catálogo

As aplicações que você pode selecionar vêm do **catálogo** instalado na unidade. O catálogo base reconhece um conjunto de
aplicações comuns e muitos protocolos. Quando o seu plano inclui um catálogo estendido, ele adiciona muitas outras
aplicações. A página informa quando o número de aplicações é limitado pela falta de uma assinatura.

:::note
O tráfego que o mecanismo não consegue classificar aparece como *Desconhecido* nos fluxos em tempo real. Ele nunca é
bloqueado por uma regra de aplicação.
:::

## Perfis

Em vez de escolher as aplicações uma a uma você pode aplicar um **perfil**: **Padrão**, **Escola** ou **Restrito**. Um perfil cria as
regras de aplicações e, junto com elas, as regras da [Proteção web](web-protection.md) (categorias de sites, antivírus,
SafeSearch e restrições do YouTube, e um perfil de filtro de conteúdo). Uma unidade nova começa com o perfil **Padrão** já aplicado.
As regras que um perfil cria são marcadas **De um perfil**; escolher outro perfil substitui só essas regras, nunca as suas. Novas
conexões também são bloqueadas enquanto o mecanismo de inspeção não dá conta, de modo que nada passa sem inspeção.

## A chave do motor e a sobrecarga

Em **Configurações** a chave **Controle de aplicações** liga ou desliga o motor de inspeção por completo. Desligado, o tráfego é encaminhado
sem inspeção e nenhuma regra de aplicações, categorias ou da primeira camada do Web Protection é aplicada; as regras continuam salvas.
É também o jeito rápido de recuperar a rede se o motor falhar. Ativar a [Proteção web](web-protection.md) liga a chave de novo, porque a
primeira camada dela reconhece os sites com este motor.

Quando o motor não dá conta (a fila está cheia) ou não está em execução, a configuração **Sobrecarga do motor de inspeção** decide o que acontece
com as novas conexões: **Permitir o tráfego** (o padrão e a recomendação: as conexões continuam funcionando, sem inspeção nesse meio tempo) ou
**Bloquear novas conexões** (nada passa sem inspeção, mas as conexões falham até o motor voltar).

## Regras

Abra a aba **Regras**. Uma regra vale para **uma interface**: apenas o tráfego que passa por ela está sujeito à regra.

1. Adicione uma regra e escolha a interface.
2. Pesquise e selecione as aplicações, os protocolos ou as categorias a bloquear. A pesquisa mostra mais resultados à
   medida que você digita.
3. Escolha se deseja registrar as conexões bloqueadas.
4. Salve e **Aplicar alterações**.

As regras podem ser ativadas e desativadas, editadas e excluídas. Excluir uma regra encerra o bloqueio naquela interface.

## Exceções

Use a aba **Exceções** para isentar endereços do bloqueio de aplicações, por exemplo o gateway ou uma infraestrutura
importante. O tráfego de ou para um endereço isento nunca é bloqueado por essas regras.

## Dicas

- Comece com poucas regras e confira o resultado no [Monitoramento](../operation-analytics/monitor-connections.md).
- Combine o controle de aplicações com a [filtragem de DNS](dns-filtering.md): um trabalha com nomes, o outro com o que
  o tráfego é.
- Se uma regra parecer não ter efeito, verifique se o serviço está habilitado, se a regra está habilitada, se você
  aplicou as alterações e se a aplicação aparece como reconhecida nos fluxos em tempo real.

## Páginas relacionadas

- [Proteção web](web-protection.md)
- [Análise de Tráfego](../operation-analytics/traffic-analytics.md)
- [Licenciamento e conta](../administration/licensing-account.md)
