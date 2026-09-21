---
title: Filtragem de DNS (Threat Shield DNS)
sidebar_position: 3
description: Bloqueie domínios indesejados e maliciosos na resolução de nomes.
---

# Filtragem de DNS (Threat Shield DNS)

**Serviços de Segurança > Filtragem de DNS** bloqueia sites impedindo a resolução de seus nomes. Quando um dispositivo
pede o endereço de um domínio bloqueado, a unidade não responde com um endereço utilizável, então o site não pode ser
acessado. É leve, funciona para todos os dispositivos da rede sem instalar nada e também bloqueia publicidade e
rastreadores.

## Listas de bloqueio

Uma **lista de bloqueio** é uma lista de domínios agrupados por finalidade e mantida por alguém. A página lista as fontes
disponíveis e permite habilitar as que você quiser. Elas cobrem categorias como malware e phishing, publicidade e
rastreadores, conteúdo adulto, jogos de azar, pirataria e serviços usados para contornar a filtragem. Algumas listas estão
disponíveis para todas as unidades; outras, apenas com uma assinatura que inclua o Threat Shield. A página informa qual é
qual.

As listas de bloqueio são atualizadas automaticamente.

## Ativando o filtro

1. Abra a aba **Configurações** e habilite o Threat Shield DNS.
2. Escolha as **zonas** cujo tráfego é redirecionado para o filtro. Os dispositivos dessas zonas são filtrados mesmo que
   estejam configurados com outro servidor DNS.
3. Escolha as **portas** a redirecionar. O DNS normalmente usa a porta 53.
4. Em **Fontes de listas de bloqueio**, habilite as listas que você quer.
5. Salve e **Aplicar alterações**.

## Suas próprias listas

- **Lista de bloqueio local:** domínios que você quer bloquear além das listas.
- **Domínios permitidos:** domínios que nunca devem ser bloqueados, mesmo que uma lista os contenha. Remover um domínio
  dessa lista pode fazer com que ele volte a ser bloqueado se uma lista o incluir, e a página avisa.

## Exceções para alguns dispositivos

Use a aba **Bypass do filtro** para deixar de filtrar endereços ou sub-redes específicos, por exemplo uma rede de
gerenciamento ou um servidor que precisa de acesso sem filtro.

## Limites a ter em mente

- A filtragem de DNS não vê o conteúdo das páginas, ela apenas bloqueia nomes. Um dispositivo que se conecta diretamente
  a um endereço sem nome não é afetado. Combine-a com o [bloqueio de IP e geolocalização](ip-geo-blocking.md) e com o
  [controle de aplicações](application-control.md).
- O DNS criptografado usado por uma aplicação pode contornar um resolvedor que não seja a unidade. Redirecionar as portas
  de DNS da zona e habilitar as listas que bloqueiam serviços usados para contornar a filtragem reduz esse risco.

## Páginas relacionadas

- [DNS e DHCP](../network/dns-dhcp.md)
- [Objetos](../policy/objects.md)
