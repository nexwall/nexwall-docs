---
title: "KBA-0017: Coletar um pacote de suporte"
sidebar_position: 24
description: Crie um arquivo com o estado e os logs recentes da unidade, sem senhas nem chaves, para anexar a um pedido de suporte.
---

# KBA-0017: Coletar um pacote de suporte

**Sintoma.** O suporte pediu "logs" ou "diagnóstico", ou você quer guardar evidências de um problema antes de alterar algo.

**Aplica-se a.** Nexwall Firewall 26.2.1. Somente leitura.

## 1. Crie o pacote

Cole o bloco como `root`. Ele gera `/tmp/support-<data>-<hora>.tgz` com estado do sistema, links, rotas, lista de serviços, status do controlador, as últimas 1000 linhas de log e a configuração sem nenhuma linha que cite password, secret, key, psk ou token.

```sh
D=/tmp/support-$(date +%Y%m%d-%H%M); mkdir -p $D
{ date; uptime; cat /etc/os-release; } > $D/system.txt
df -h > $D/disk.txt; free -m > $D/memory.txt
ip -br a > $D/links.txt; ip route > $D/routes.txt
ubus call service list > $D/services.json
ubus call ns.plug status > $D/controller.txt
tail -n 1000 /var/log/messages > $D/messages.txt
uci show 2>/dev/null | grep -viE 'password|secret|key|psk|token|passwd' > $D/config.txt
tar czf $D.tgz -C /tmp $(basename $D); ls -l $D.tgz
```

## 2. Copie para fora

Do seu computador (troque o endereço do firewall e o nome do arquivo):

```sh
scp root@<firewall-ip>:/tmp/support-YYYYMMDD-HHMM.tgz .
```

## 3. Revise antes de enviar

O filtro é conservador, mas não perfeito. Abra `messages.txt` e `config.txt` e remova o que não quiser compartilhar (IPs públicos, usuários, nomes de host). Não envie o arquivo por canais públicos; use o chamado de suporte.

## 4. Limpe

O pacote fica em `/tmp` e some no reboot, mas você pode apagá-lo agora:

```sh
rm -rf /tmp/support-*
```

## Relacionado

[KBA-0001 verificação de saúde](kba-01-health-check.md), [KBA-0016 serviços](kba-16-services.md), [Logs e depuração](cli-logs-and-debugging.md).
