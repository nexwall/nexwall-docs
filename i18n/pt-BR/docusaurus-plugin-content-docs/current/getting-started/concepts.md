---
title: Conceitos
sidebar_position: 4
description: O vocabulário usado em toda a documentação.
---

# Conceitos

## Zonas

Uma **zona** é um grupo de interfaces de rede que compartilham um nível de segurança. As regras não falam de
interfaces, falam de zonas. A unidade começa com estas:

| Zona | Significado |
|---|---|
| `lan` (verde) | Sua rede interna confiável |
| `wan` (vermelha) | O exterior não confiável, normalmente a internet |
| `guest` (azul) | Uma rede isolada para visitantes |
| `dmz` (laranja) | Uma rede para servidores que precisam ser acessíveis de fora |

Você decide quais zonas podem se comunicar com quais. Veja [Zonas e políticas](../policy/zones-policies.md).

## Regras e sua ordem

Uma **regra de firewall** diz o que fazer com o tráfego que atende a certas condições. As regras são lidas de cima para
baixo, e a primeira que corresponde decide. Há três listas: regras para o tráfego que atravessa o firewall
(encaminhamento), regras para o tráfego destinado ao próprio firewall (entrada) e regras para o tráfego que o próprio
firewall inicia (saída). Veja [Regras de firewall](../policy/firewall-rules.md).

## NAT e redirecionamento de portas

O **NAT** reescreve endereços à medida que o tráfego passa. O caso comum é o mascaramento: muitos hosts privados
compartilham o endereço público da WAN. O **redirecionamento de portas** é o oposto: ele envia as conexões que chegam a
um endereço público para um host interno. Veja [NAT e redirecionamento de portas](../policy/nat-port-forwarding.md).

## Objetos

Um **objeto** é uma lista nomeada de endereços ou domínios que você define uma vez e reutiliza em regras,
redirecionamentos de portas e regras de SD-WAN. Quando a lista muda, tudo o que a usa acompanha. Veja
[Objetos](../policy/objects.md).

## Interfaces e dispositivos

Um **dispositivo** é uma placa de rede física ou virtual, ou uma lógica, como uma bridge, um bond ou uma VLAN. Uma
**interface** é a configuração associada a um dispositivo: seu endereço, sua zona, seu protocolo. Veja
[Interfaces e roteamento](../network/interfaces-routing.md).

## Controle de aplicações

Em vez de portas, o controle de aplicações reconhece o que uma conexão é: um serviço de streaming, um aplicativo de
mensagens, um protocolo. Você pode então bloqueá-lo. Veja
[Controle de aplicações](../security-services/application-control.md).

## Threat Shield

Threat Shield é o nome da proteção baseada em listas de bloqueio. O **Threat Shield DNS** bloqueia domínios
indesejados na resolução de nomes. O **Threat Shield IP** bloqueia conexões de e para endereços hostis. Veja
[Filtragem de DNS](../security-services/dns-filtering.md) e
[Bloqueio de IP e geolocalização](../security-services/ip-geo-blocking.md).

## Unidades e o controlador

Uma **unidade** é um firewall. Um **controlador** é um servidor ao qual muitas unidades se conectam para que um
administrador possa alcançar todas elas a partir de um só lugar. Veja
[Gerenciamento central](../administration/central-management.md).

## Assinatura

Uma **assinatura** ativa recursos extras em uma unidade, como um catálogo maior de aplicações. Todo o restante funciona
sem ela. Veja [Licenciamento e conta](../administration/licensing-account.md).
