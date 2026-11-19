---
title: 'KBA-04: Um site ou serviço está bloqueado ou inacessível'
sidebar_position: 14
description: Encontre a regra, lista ou recurso de inspeção que bloqueia um destino ou serviço publicado.
---

# KBA-04: Um site ou serviço está bloqueado ou inacessível

**Sintoma.** Um destino não abre, ou um serviço publicado não é acessível de fora.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Ative o log na regra ou na zona e veja os [Logs](../operation-analytics/logs.md).
2. Verifique a ordem das regras: vale a primeira que casar.
3. Para um serviço publicado, confirme o redirecionamento de porta, o destino e se a política da zona permite o tráfego.
4. Se o [bloqueio de IP e geo](../security-services/ip-geo-blocking.md) estiver ativo, veja se o endereço está em lista ou país bloqueado. Inclua na lista de permitidos se deve ser acessível.
5. Se o [IPS](../security-services/ips.md) estiver ativo, veja os eventos de tráfego bloqueado.
6. Teste a porta a partir do firewall:

   ```sh
   nc -zv -w3 <ip-destino> 443
   ```


## Não resolveu?

Porta fechada ou timeout também do firewall: [KBA-14](kba-14-connectivity.md) (MTU, pacotes). Funciona por IP mas não por nome: [KBA-05](kba-05-dns.md).
