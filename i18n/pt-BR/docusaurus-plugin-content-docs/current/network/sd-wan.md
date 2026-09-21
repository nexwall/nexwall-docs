---
title: SD-WAN
sidebar_position: 2
description: Use vários links de internet com failover, balanceamento e roteamento baseado em políticas.
---

# SD-WAN

**Rede > SD-WAN** gerencia vários links WAN. Ele monitora cada link, desvia o tráfego de um que falha e pode distribuir ou
direcionar o tráfego conforme a política.

## Conceitos

- **Gateway:** uma interface WAN que participa do SD-WAN.
- **Política:** como o tráfego é distribuído entre os gateways, por exemplo "use o link A, com o B como reserva" ou
  "balanceie entre A e B".
- **Regra:** atribui uma política a um determinado tráfego.

## Políticas

Abra a aba **Políticas**. Com mais de uma WAN, a **política padrão** é obrigatória e não pode ser excluída. Crie outras
políticas para casos especiais, como "videoconferência sempre pelo link mais rápido". Uma política lista seus gateways com
um **peso** ou uma ordem, conforme você queira balancear ou ter um principal e um reserva.

## Regras

As regras escolhem qual política se aplica a qual tráfego. Corresponda por origem, destino, protocolo e portas (você pode
usar [objetos](../policy/objects.md)) e depois escolha a política. A regra padrão fica no fim da lista, então **coloque
suas regras acima dela**. As regras são avaliadas em ordem.

A opção **persistente (sticky)** mantém o tráfego da mesma origem no mesmo link da sessão anterior por um período (dez
minutos por padrão). Ela evita problemas com serviços sensíveis à mudança do endereço de origem.

## Monitoramento

Para cada WAN, a unidade envia ping a um conjunto de hosts para decidir se o link funciona. O link continua ativo enquanto
**pelo menos um** host responder. Configure:

- os hosts a testar (endereços ou nomes). Escolha hosts confiáveis e que você não se importe de testar;
- com que frequência fazer o ping e quanto tempo esperar;
- quantos testes com falha derrubam um link e quantos testes bem-sucedidos o recolocam no ar.

Os valores padrão atendem à maioria das conexões. Altere-os somente se os links oscilarem ou demorarem a se recuperar.

## Páginas relacionadas

- [Interfaces e roteamento](interfaces-routing.md)
- [Desempenho](../operation-analytics/performance.md) para o histórico de latência
