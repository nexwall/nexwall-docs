---
title: WireGuard
sidebar_position: 3
description: Túneis rápidos e modernos para sites e usuários.
---

# WireGuard

**VPN > WireGuard** cria túneis com o protocolo WireGuard: leve, moderno e amplamente disponível em muitas plataformas.
Ele serve tanto para conectar sites quanto para dar acesso a dispositivos individuais.

## Túneis de servidor

Um túnel de servidor aceita conexões de **peers**.

1. Adicione um túnel e defina seu **nome**, a **porta de escuta** e a **rede VPN**, uma rede privada usada pelos peers.
   Escolha uma rede que não seja usada em nenhum outro lugar. A rede VPN não pode ser alterada após a primeira
   configuração.
2. Adicione os **peers**. Para cada um, defina um nome, o endereço que ele recebe, as redes atrás dele (se for um site) e
   se ele envia todo o seu tráfego pelo túnel.
3. Salve e **Aplicar alterações**.
4. Para cada peer, **baixe a configuração** ou mostre o código QR e entregue-o ao peer.

:::caution As alterações só chegam aos peers quando eles se atualizam
Quando você edita o servidor ou um peer, os peers devem baixar a configuração atualizada ou ser ajustados manualmente. A
página avisa.
:::

Excluir um túnel também exclui seus peers e os desconecta. Excluir um peer o desconecta.

## Túneis de peer (lado cliente)

Para conectar esta unidade a outro servidor WireGuard, abra o lado cliente da página e **importe** o arquivo de
configuração gerado por esse servidor, ou informe os parâmetros manualmente. Isso funciona com qualquer dispositivo que
suporte WireGuard.

## Dicas

- Use peers de curta duração, por pessoa, para usuários, e um peer por site.
- Controle o que os usuários do túnel podem alcançar com [regras de firewall](../policy/firewall-rules.md).
- Verifique o estado do túnel no [Monitoramento](../operation-analytics/monitor-connections.md).

## Páginas relacionadas

- [Túneis site a site](site-to-site-tunnels.md)
- [Acesso remoto (OpenVPN)](remote-access-openvpn.md)
