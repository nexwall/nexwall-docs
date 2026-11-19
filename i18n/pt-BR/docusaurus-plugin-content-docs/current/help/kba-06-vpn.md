---
title: 'KBA-06: A VPN não conecta'
sidebar_position: 16
description: Relacione o sintoma da VPN com a configuração que o causa (IPsec, WireGuard, OpenVPN).
---

# KBA-06: A VPN não conecta

**Sintoma.** Um túnel não sobe, ou sobe e não transporta nada.

Verificações somente leitura, salvo indicação. Os comandos rodam como `root` por SSH, console ou terminal remoto do controlador.

## Verifique, nesta ordem

1. Sem handshake: a porta está aberta na WAN e o endereço ou nome público na configuração está correto.
2. Conecta mas não alcança nada: as rotas ou redes na definição do túnel e as regras de firewall da zona VPN.
3. Erros de certificado: o relógio nos dois lados e se o certificado expirou ou foi renovado.
4. IPsec não sobe: os identificadores não estão invertidos nas duas pontas, a chave pré-compartilhada e os parâmetros conferem, e o serviço foi reiniciado após mudar redes.
5. Peer WireGuard mudo: o peer tem a configuração mais recente após mudança no servidor.
6. Veja o estado na unidade:

   ```sh
   swanctl --list-sas   # IPsec
   wg show               # WireGuard
   ```


## Não resolveu?

Procure nos [Logs](../operation-analytics/logs.md) o nome do serviço VPN. Comandos por recurso: [KBA-16](kba-16-services.md#8-status-específico-de-cada-recurso).
