---
title: 'KBA-0008: A unidade está lenta ou com pouca memória'
sidebar_position: 18
description: Descubra qual recurso custa mais e se disco ou memória são a causa.
---

# KBA-0008: A unidade está lenta ou com pouca memória

**Sintoma.** Interface web lenta, latência alta pelo firewall ou serviços reiniciando.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Veja a carga e a memória em [Desempenho](../operation-analytics/performance.md), ou na unidade:

   ```sh
   uptime; free -m | head -2; df -h / | tail -1; conntrack -C
   ```

2. Desative um a um os recursos de inspeção recentes (IPS, depois controle de aplicações) para achar o mais caro.
3. Use bypass e exceções para tráfego confiável de alto volume.
4. Verifique se o disco não está cheio (a linha `df` acima e os alertas).

## Não resolveu?

Memória quase esgotada: [KBA-0016](kba-16-services.md#9-pouca-memória-é-uma-causa-oculta-frequente). Conntrack perto do máximo: ache o cliente em [Conexões](../operation-analytics/monitor-connections.md).
