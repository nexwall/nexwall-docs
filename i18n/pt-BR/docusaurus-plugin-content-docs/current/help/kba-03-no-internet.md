---
title: 'KBA-03: A LAN está sem internet'
sidebar_position: 13
description: Descubra por que os clientes da LAN não chegam à internet, do link WAN ao NAT e à política.
---

# KBA-03: A LAN está sem internet

**Sintoma.** Clientes da LAN não navegam; o próprio firewall pode ou não ter internet.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Abra **Operação e análise > Painel** e veja o cartão de conexão com a internet.
2. O próprio firewall tem internet? Na unidade:

   ```sh
   ip route | grep default
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. Em **Rede > Interfaces**, verifique se a WAN tem endereço, gateway e DNS. Com WAN estática, é preciso ao menos um encaminhador DNS em **Rede > DNS e DHCP**.
4. Verifique se existe regra de masquerade para a LAN em **Política > NAT**.
5. Verifique a política LAN para WAN em **Política > Zonas e políticas** e as regras em **Política > Regras de firewall**.
6. Com vários links WAN, veja os hosts de monitoramento em **Rede > SD-WAN**: se nenhum responde, o link é considerado fora.
7. Use [Conexões](../operation-analytics/monitor-connections.md) para ver se conexões estão sendo criadas.

## Não resolveu?

Firewall ok mas um cliente falha: [KBA-04](kba-04-site-unreachable.md). IP funciona mas nomes não: [KBA-05](kba-05-dns.md). Testes de pacotes e MTU: [KBA-14](kba-14-connectivity.md).
