---
title: Painel
sidebar_position: 1
description: A página de visão geral da unidade.
---

# Painel

**Operação e Análises > Painel** é a primeira página que você vê depois de entrar. Ela resume o estado da unidade e
aponta o que precisa de atenção.

## O que os cartões mostram

| Cartão | Conteúdo |
|---|---|
| Sistema | Nome de host, versão, tempo de atividade e as médias de carga de 1, 5 e 15 minutos |
| Conexão de internet | Se a unidade alcança a internet, por link WAN |
| Tráfego da WAN | Tráfego recente nas interfaces WAN |
| Armazenamento e memória | Uso da partição do sistema, da partição de dados e da memória |
| Serviços | Quais serviços estão habilitados e em execução, por exemplo SD-WAN, o mecanismo de classificação de tráfego, o portal cativo e o Threat Shield |
| VPN | Clientes de acesso remoto conectados e o número de túneis habilitados e conectados |
| Segurança | Endereços bloqueados pelo Threat Shield no período recente e pacotes bloqueados |
| Hosts conhecidos | Dispositivos que a unidade viu em suas redes |

Cada cartão leva à página onde você pode se aprofundar.

## Avisos que você pode ver

O painel destaca problemas comuns de configuração:

- **Nome de host padrão.** A unidade ainda se chama `Nexwall`. Altere em **Infraestrutura > Sistema** e aplique a
  alteração.
- **Sem encaminhador de DNS.** Um link WAN com endereço estático precisa de pelo menos um encaminhador de DNS.
  Configure um em **Rede > DNS e DHCP**.
- **O monitoramento de ameaças está desativado.** As estatísticas de ameaças dependem de logs. Ative o registro em pelo
  menos uma cadeia em **Políticas > Zonas e Políticas**.

## Páginas relacionadas

- [Monitoramento e conexões](monitor-connections.md) para o tráfego em tempo real.
- [Desempenho](performance.md) para histórico e alertas.
