---
title: 'KBA-10: Atualizações falham'
sidebar_position: 20
description: Leia o erro de atualização e verifique assinatura, conectividade e hora.
---

# KBA-10: Atualizações falham

**Sintoma.** Uma atualização ou download de listas falha.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Leia a mensagem: ela diz se o servidor está em manutenção, a assinatura não é válida ou o endereço do repositório não está definido.
2. Verifique internet, DNS e o relógio:

   ```sh
   date
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. Faça backup antes de tentar de novo. Veja [Sistema](../infrastructure/system.md).

## Não resolveu?

Internet ou DNS falha: [KBA-03](kba-03-no-internet.md) ou [KBA-05](kba-05-dns.md). Nada explica: [KBA-17](kba-17-support-package.md).
