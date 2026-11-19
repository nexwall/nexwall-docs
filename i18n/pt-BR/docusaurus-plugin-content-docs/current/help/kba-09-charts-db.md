---
title: 'KBA-09: Os gráficos dizem que o banco não está acessível'
sidebar_position: 19
description: Reinicie o serviço de métricas quando os gráficos continuam vazios.
---

# KBA-09: Os gráficos dizem que o banco não está acessível

**Sintoma.** Os gráficos do painel e da análise mostram que o banco de dados não está acessível.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Verifique o serviço de métricas:
2. Se estiver parado, inicie; se estiver rodando, reinicie:

   ```sh
   /etc/init.d/victoria-metrics status
   /etc/init.d/victoria-metrics restart
   ```

3. Aguarde um minuto e recarregue os gráficos.

## Não resolveu?

Continuam vazios: verifique disco e memória livres ([KBA-08](kba-08-slow.md)) e leia o log ([Logs e depuração](cli-logs-and-debugging.md)).
