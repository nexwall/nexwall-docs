---
title: Objetos
sidebar_position: 4
description: Grupos nomeados de endereços e domínios que você reutiliza em toda a configuração.
---

# Objetos

**Políticas > Objetos** permite dar um nome a um conjunto de endereços ou domínios e usar esse nome sempre que a interface
pedir por eles. Quando você altera o objeto, todas as regras que o usam acompanham automaticamente.

## Conjuntos de hosts

Um conjunto de hosts é um host ou um grupo de hosts. Cada entrada nele pode ser:

- um endereço IP, uma rede em notação CIDR ou um intervalo de IP;
- uma reserva de DHCP;
- um registro DNS;
- um usuário de VPN;
- outro conjunto de hosts.

Todo conjunto de hosts tem uma **família de IP**, IPv4 ou IPv6, e todas as entradas devem corresponder a ela.

Os conjuntos de hosts são usados em regras de firewall, em regras de SD-WAN e em outras páginas que aceitam endereços.

## Conjuntos de domínios

Um conjunto de domínios é um domínio ou um grupo de domínios, por exemplo os sites de um serviço de vídeo. Use um em uma
regra para permitir ou bloquear o tráfego para esses domínios. Os domínios são resolvidos em endereços, e você escolhe se
deseja resolvê-los em endereços IPv4 ou IPv6, conforme o que a regra precisa.

## Onde um objeto é usado

A página mostra onde cada objeto é usado. Um objeto em uso não pode ser excluído; remova-o primeiro dos lugares que o
usam.

## Limites

- Conjuntos de hosts que contêm intervalos de IP, ou que contêm outros objetos, não podem ser usados em redirecionamentos
  de portas. A página informa qual redirecionamento de porta usa o conjunto.
- Os nomes devem ser formados por letras, números e separadores simples.

## Páginas relacionadas

- [Regras de firewall](firewall-rules.md)
- [NAT e redirecionamento de portas](nat-port-forwarding.md)
