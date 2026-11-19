---
title: 'KBA-07: O controle de aplicações não faz nada'
sidebar_position: 17
description: Por que uma regra de aplicação não bloqueia nem limita o tráfego.
---

# KBA-07: O controle de aplicações não faz nada

**Sintoma.** Uma regra de aplicação está ativa mas o tráfego continua passando.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Confirme que o serviço está ativo, a regra ativa e as mudanças aplicadas (banner **Aplicar alterações**).
2. Verifique nos fluxos ao vivo se a aplicação é reconhecida. Se aparecer como **Desconhecida**, não pode ser bloqueada.
3. Verifique se a regra está na interface por onde o tráfego passa.
4. Verifique se o endereço não está nas exceções.
5. Verifique se o serviço de classificação está rodando:

   ```sh
   /etc/init.d/netifyd status
   ```


## Não resolveu?

Serviço parado ou pouca memória: [KBA-16](kba-16-services.md) e [KBA-08](kba-08-slow.md).
