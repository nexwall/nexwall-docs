---
title: 'KBA-0005: Nomes não resolvem'
sidebar_position: 15
description: 'Verificações rápidas de DNS: clientes, encaminhadores, filtro DNS e bypass.'
---

# KBA-0005: Nomes não resolvem

**Sintoma.** Sites abrem por IP mas não por nome, ou só alguns nomes falham.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Confirme que os clientes usam a unidade como servidor DNS, ou um que funcione.
2. Consulte o resolvedor da unidade e depois um público, e compare:

   ```sh
   dig +short @127.0.0.1 example.com
   dig +short @8.8.8.8 example.com
   ```

3. Verifique os encaminhadores em **Rede > DNS e DHCP**.
4. Se o filtro DNS estiver ativo, veja se o nome está em lista de bloqueio e inclua nos domínios permitidos se não deve ser bloqueado.
5. Verifique se um dispositivo com DNS criptografado próprio não está contornando a unidade.

## Não resolveu?

Unidade falha e o público funciona: o problema é o upstream ou o resolvedor, veja [KBA-0015: DNS em profundidade](kba-15-dns-deep-dive.md).
