---
title: Zonas e políticas
sidebar_position: 3
description: Agrupe interfaces em zonas e defina o que é permitido entre elas por padrão.
---

# Zonas e políticas

As zonas são a base do conjunto de regras. **Políticas > Zonas e Políticas** mostra todas as zonas, as interfaces que
elas contêm e seu comportamento padrão.

## Zonas padrão

| Zona | Função |
|---|---|
| `lan` | Rede interna confiável |
| `wan` | Exterior não confiável |
| `guest` | Rede isolada de visitantes |
| `dmz` | Servidores expostos ao exterior |

Você pode criar suas próprias zonas, por exemplo uma para uma rede de câmeras.

## A política de uma zona

A **política** de uma zona é o que acontece com o tráfego quando nenhuma regra corresponde. Para cada zona, você define o
que é permitido:

- o tráfego **da zona para o próprio firewall** (entrada);
- o tráfego **da zona para outras zonas** (encaminhamento);
- o tráfego **dentro da zona**, entre as suas próprias interfaces.

Uma política restritiva com regras de permissão explícitas é mais fácil de auditar do que uma política permissiva com
muitos bloqueios.

## Criando uma zona

1. Escolha **Adicionar zona**.
2. Informe um nome e escolha um tipo. Os tipos correspondem às zonas padrão: LAN, WAN, convidados, DMZ.
3. Selecione as interfaces e redes que pertencem à zona.
4. Escolha se deseja criar **regras predefinidas**. O sistema então adiciona regras que permitem o acesso aos serviços
   essenciais, por exemplo DHCP e DNS para uma LAN. Você pode vê-las e ajustá-las depois em
   **Políticas > Regras de Firewall > Regras de entrada**.
5. Salve e **Aplicar alterações**.

## Registro

Cada zona tem uma opção de registro que grava os pacotes que a política da zona bloqueia. As estatísticas de ameaças do
painel e do Monitoramento dependem de o registro estar habilitado em pelo menos uma cadeia. O registro em uma zona muito
movimentada pode gerar muitas mensagens, então habilite-o onde precisar.

## Páginas relacionadas

- [Regras de firewall](firewall-rules.md)
- [Interfaces e roteamento](../network/interfaces-routing.md)
