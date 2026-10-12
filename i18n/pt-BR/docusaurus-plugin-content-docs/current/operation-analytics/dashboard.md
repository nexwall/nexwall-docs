---
title: Painel
sidebar_position: 1
description: "A página de resumo da unidade: proteção, tráfego e estado do firewall."
---

# Painel

**Operação e Análises > Painel** é a primeira página que você vê depois de entrar. Mostra o estado do firewall
à esquerda e o que o firewall protege e transporta à direita. Os dados são atualizados a cada 20 segundos.

## A coluna esquerda: o firewall

| Cartão | Conteúdo |
|---|---|
| Sistema | Nome, versão, tempo ligado e a carga média de 1, 5 e 15 minutos. Avisa enquanto a unidade mantém o nome de fábrica |
| Conectividade | Se a unidade alcança a internet, o estado de cada link WAN, o multi-WAN e o número de equipamentos conhecidos |
| VPN | Clientes de acesso remoto conectados e número de túneis habilitados e conectados |
| Acesso e continuidade | O portal cativo, as associações de endereço MAC, o backup remoto, a alta disponibilidade e o número de alertas ativos de [Desempenho](performance.md) |

Cada cartão leva à página onde você pode se aprofundar.

## A coluna direita: proteção e tráfego

- **Quatro números.** Endereços bloqueados na última hora, alertas do IPS nas últimas 24 horas, arquivos analisados pelo
  antivírus (e quantos estavam infectados) e quantos catálogos de proteção estão em dia. Uma proteção que não está
  ativa, ou que não está no seu plano, diz isso em vez de mostrar zero.
- **Camadas de proteção.** Um bloco por camada: Threat Shield, bloqueio de países, filtro DNS, IPS, Controle de aplicações e
  [Proteção web](../security-services/web-protection.md), cada um com seu estado (ativa, inativa, atrasada ou não incluída no seu plano)
  e seu número principal, por exemplo as regras ativas ou os alertas do dia. O bloco de Proteção web também avisa quando
  há regras que descriptografam tráfego, quando listas de categorias ficaram de fora por serem grandes demais e quando o proxy web ou o
  antivírus não está funcionando.
- **Intelligent Threat Block.** Até onde um arquivo chegou: analisado pelo antivírus, analisado pelo sandbox, vereditos
  maliciosos e indicadores aplicados. Informa quando o veredito é consultivo (o download não espera pelo sandbox).
- **Inteligência carregada neste firewall.** A versão, o tamanho e a última atualização do catálogo de aplicações, das regras do IPS,
  das categorias de sites e dos demais catálogos, e quais estão atrasados ou falhando.
- **O que seu firewall aprendeu hoje.** Os catálogos que foram atualizados e os arquivos bloqueados nas últimas 24 horas.
- **Tráfego.** Para hoje, 7 ou 30 dias: a largura de banda do primeiro link WAN na última hora (escolha outro link quando
  houver vários), o tráfego por hora, as aplicações e os dispositivos principais e as categorias web usadas. O link
  **Ver tudo em Análise de Tráfego** abre [Análise de Tráfego](traffic-analytics.md).

Os relatórios de tráfego são mantidos por 35 dias.

## Avisos que você pode ver

- **Nome de fábrica.** A unidade ainda tem o nome de host de fábrica. Altere em **Administração > Sistema** e aplique a
  mudança.
- **Sem encaminhador DNS.** Um link WAN com endereço estático precisa de ao menos um encaminhador DNS. Configure em
  **Rede > DNS e DHCP**.
- **O monitoramento de ameaças está desativado.** As estatísticas de ameaças dependem do registro. Ative o registro em ao menos uma cadeia em
  **Políticas > Zonas e políticas**.

## Páginas relacionadas

- [Análise de ameaças](threat-analytics.md) para saber o que foi barrado.
- [Análise de Tráfego](traffic-analytics.md) para saber para onde vai o tráfego.
- [Monitoramento e conexões](monitor-connections.md) para o tráfego ao vivo e os links WAN.
- [Desempenho](performance.md) para o histórico e os alertas.
