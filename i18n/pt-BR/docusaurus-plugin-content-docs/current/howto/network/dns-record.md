---
title: 'Como definir servidores DNS e nomes DNS locais'
sidebar_position: 20
description: 'Escolha os servidores DNS externos e crie nomes que resolvam para endereços locais.'
---

# Como definir servidores DNS e nomes DNS locais

O firewall responde DNS para a LAN. Encaminha nomes desconhecidos a servidores externos e responde ele mesmo os nomes locais.

**Onde:** **Rede** > **DNS e DHCP**

## Passos

1. Abra a página e escolha a aba **DNS**.
2. Em **Servidores de encaminhamento de DNS** clique em **Adicionar servidor DNS** e informe o endereço de cada servidor. Deixe vazio para usar os servidores da WAN.
3. Defina o **Domínio DNS** (sufixo local) se usar um. Mantenha **Proteção contra rebind** ligado e adicione em **Lista de domínios permitidos** os domínios que legitimamente resolvem para endereços privados.
4. Salve. Agora abra a aba **Registros DNS** e clique em **Adicionar registro DNS**.
5. Preencha o **Nome do host** (por exemplo `nas.empresa.local`) e o **Endereço IP**. Use **Registro DNS curinga** para responder por todos os subdomínios. Salve.

## Confirme que funcionou

- De um cliente, `nslookup nas.empresa.local 192.168.1.1` retorna o endereço.

## Se não funcionar

- Nomes não resolvem: [KBA-05](../../help/kba-05-dns.md) e [KBA-15](../../help/kba-15-dns-deep-dive.md).
- Um nome público deve resolver para endereço privado só para usuários internos: crie o registro aqui.

## Guias relacionados

- [Como ativar e ajustar o servidor DHCP](dhcp-server.md)
- [Como bloquear domínios maliciosos (Filtragem de DNS)](../security/dns-filtering.md)
