---
title: 'KBA-02: Não consigo abrir a interface web'
sidebar_position: 12
description: Resolva uma unidade cuja interface web não carrega ou recusa o login.
---

# KBA-02: Não consigo abrir a interface web

**Sintoma.** A página não carrega, mostra erro de certificado ou não aceita a senha.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Seu computador deve estar no lado **LAN**, com endereço na rede LAN (`192.168.1.0/24` por padrão).
2. Use `https://` e o endereço da unidade. Aceite o aviso do certificado autoassinado.
3. No console, entre como `root` e confirme o endereço da LAN:

   ```sh
   ip -br a
   /etc/init.d/nginx status
   ```

4. Se você mudou o acesso no assistente ou na página Sistema, verifique se sua rede pode alcançar a interface web.
5. Sem senha? Redefina pelo console ou restaure um backup.

## Não resolveu?

Execute a [verificação de saúde (KBA-01)](kba-01-health-check.md) pelo console. Se o `nginx` estiver parado, veja [KBA-16: um serviço está parado](kba-16-services.md).
