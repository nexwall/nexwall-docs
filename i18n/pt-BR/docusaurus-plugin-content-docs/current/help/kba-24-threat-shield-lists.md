---
title: 'KBA-24: Threat Shield: de onde vêm as listas e quanto custam'
sidebar_position: 34
description: 'O que são as listas de bloqueio, como são entregues e verificadas, e quanta memória cada categoria precisa.'
---

# KBA-24: Threat Shield: de onde vêm as listas e quanto custam

**Aplica-se a.** Nexwall Firewall 26.2.1.

## O que é

O Threat Shield bloqueia dois tipos de coisas com listas que a Nexwall monta todo dia em seu próprio servidor a partir de fontes abertas verificadas:

- **Domínios** (filtro DNS): o servidor DNS do próprio firewall (dnsmasq, via adblock) responde "não encontrado" para um domínio listado e todos os seus subdomínios. Categorias: malware, phishing, ransomware, golpes e fraude, mineração de cripto, contorno por DoH/VPN/Tor/proxy, adulto, apostas, pirataria, drogas, publicidade e rastreamento, e um conjunto ampliado de malware.
- **Endereços IP** (bloqueio de IP): o banIP descarta tráfego de e para os endereços listados. Categorias: comando e controle de botnets, atacantes conhecidos.

Não há serviço DNS em nuvem envolvido: as listas são arquivos no firewall e o DNS permanece local. As listas são entregues pelo serviço de licenças (teste ou assinatura), assinadas e verificadas no firewall antes do uso. Sem licença nenhuma lista da Nexwall é fornecida.

## Como funciona

1. A cada 30 minutos (com atraso aleatório) o `nexwall-threat-feeds sync` pede ao servidor de licenças o catálogo assinado do pacote atual.
2. Verifica a assinatura e então baixa **somente as categorias ligadas**, conferindo o tamanho e o SHA-256 de cada arquivo (compactado e simples).
3. adblock e banIP leem as listas como arquivos locais (`file:///mnt/data/threat-feeds/<versao>/dns-<categoria>.txt`). São recarregados só quando algo mudou, não por temporizador.
4. Se o serviço de licenças não responde, as listas no firewall permanecem. Se a licença termina, as listas são retiradas uma vez.

Primeira partida: **todas** as categorias são ligadas (toda lista de endereços e toda categoria de domínios), mas só onde nada foi escolhido ainda e só quando as listas de domínios ocupam no máximo um quarto da memória instalada (75 bytes por domínio; o catálogo inteiro tem cerca de 3,3 milhões de domínios, 250 MB, então uma unidade com cerca de 1 GiB ou mais se qualifica). Uma unidade menor recebe só as categorias marcadas como padrão (malware, phishing, ransomware, golpes, C2 de botnets, atacantes conhecidos). O assistente de configuração também liga os serviços. As páginas Filtro DNS e Bloqueio de IP e geo têm uma chave **Ativar tudo** que controla as listas da Nexwall (as listas de terceiros do banIP não são tocadas). Escolhas feitas em versões anteriores são mantidas (adulto, apostas, pirataria, contorno por DoH/VPN, malware, listas de privacidade).

## Memória e velocidade

As listas DNS custam cerca de **75 bytes por domínio** no dnsmasq (medido: 1,8 milhão de domínios = 134 MB). Planeje antes de ligar categorias grandes:

| Categoria | Entradas (2026-10) | Aprox. |
|---|---|---|
| Malware (núcleo) | 195.000 | 15 MB |
| Phishing | 486.000 | 36 MB |
| Golpes e fraude | 186.000 | 14 MB |
| Ransomware, mineração de cripto, drogas, contorno, pirataria | 2.000 a 54.000 cada | 0,2 a 4 MB |
| Apostas | 226.000 | 17 MB |
| Publicidade e rastreamento | 408.000 | 31 MB |
| Adulto | 953.000 | 71 MB |
| Malware (ampliado, inclui o núcleo) | 735.000 | 55 MB |

O conjunto padrão tem cerca de 870.000 domínios (65 MB). Tudo junto são cerca de 3,3 milhões de domínios (250 MB), 12 % de uma unidade de 2 GiB: o aviso de memória da página DNS (20 % / 35 % da memória instalada) indica quando as listas ligadas são demais. Recarregar o dnsmasq com uma lista grande interrompe o DNS por alguns segundos (cerca de 10 segundos com 1,8 milhão de domínios); por isso as recargas acontecem só quando as listas mudam (normalmente uma vez por dia).

## Bloqueio geográfico e o aviso de memória

Os bloqueios por país (feed `country` do banIP) vêm do mesmo pacote assinado: `nexwall-threat-feeds status` lista `country_v4` e `country_v6`, e os arquivos ficam em `/mnt/data/threat-feeds/<pacote>/geo/`. Os dados são de alocação de registros, então alguns endereços podem estar em outro país que o de seus usuários. Sem licença o banIP mantém seu próprio download. Na página de listas de bloqueio DNS aparece um aviso quando as listas ligadas precisam de mais de um quinto da memória instalada, e um erro acima de um terço; desligue categorias grandes ou acrescente memória.
