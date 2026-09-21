---
title: Túneis site a site (OpenVPN e IPsec)
sidebar_position: 2
description: Conecte duas redes de forma permanente com OpenVPN ou IPsec.
---

# Túneis site a site (OpenVPN e IPsec)

Um túnel site a site une duas redes pela internet como se fossem uma só. Use **OpenVPN Site a Site** quando as duas
pontas são unidades Nexwall ou quando quiser uma configuração simples. Use **IPsec Site a Site** para interoperabilidade
com a grande variedade de dispositivos que suportam IPsec.

## OpenVPN site a site

Uma unidade é o **servidor** e a outra é o **cliente**.

### No servidor

1. Abra **VPN > OpenVPN Site a Site** e crie um servidor de túnel.
2. Defina os **endpoints públicos** (endereços ou nomes que o cliente usará para alcançar o servidor), as **redes
   locais** (redes que devem ser alcançáveis a partir da outra ponta) e as **redes remotas** (redes atrás da outra
   ponta). As redes remotas se tornam rotas estáticas enquanto o túnel está ativo.
3. Salve e **Aplicar alterações**.
4. Exporte o túnel. Você pode baixar uma configuração pronta para importar em outra unidade Nexwall, ou os certificados e
   o material de chaves para montar o túnel com um dispositivo de terceiros.

### No cliente

Abra a mesma página na outra unidade, escolha o lado do cliente e **importe** o arquivo que você baixou. Você também pode
configurar o cliente manualmente para se conectar a qualquer dispositivo que fale OpenVPN.

Verifique se o túnel está ativo na lista e no [Monitoramento](../operation-analytics/monitor-connections.md).

## IPsec site a site

O IPsec é a melhor escolha quando o outro lado não é uma unidade Nexwall.

1. Abra **VPN > IPsec Site a Site** e adicione um túnel.
2. Informe o **endereço remoto**. Se o outro lado tiver endereço dinâmico, informe `any`.
3. Defina os **identificadores**. O identificador local é uma string que começa com `@` e identifica esta unidade; na
   outra ponta os identificadores são invertidos.
4. Informe ou gere a **chave pré-compartilhada**.
5. Defina as **redes locais** e **remotas** a conectar.
6. Escolha os parâmetros de segurança. As duas pontas devem concordar quanto à criptografia, à integridade e ao grupo de
   troca de chaves. Escolher um grupo Diffie-Hellman habilita o **sigilo perfeito de encaminhamento (PFS)**.
7. Escolha o que fazer quando o túnel falha: a **detecção de peer inativo (DPD)** define a ação após um tempo limite, e a
   **ação de fechamento** define o que acontece depois que o peer fecha o túnel (nada, reiniciar sob demanda ou reiniciar
   imediatamente).
8. Salve e **Aplicar alterações**.

:::note Reinicie após alterar redes
Adicionar ou remover redes de um túnel existente exige reiniciar o serviço IPsec. Isso reinicia todos os túneis, e a
página pede que você confirme.
:::

## Escolhendo entre eles

| | OpenVPN | IPsec |
|---|---|---|
| As duas pontas são Nexwall | Simples, importar e usar | Funciona |
| Dispositivo de terceiros | Possível com o material exportado | Melhor interoperabilidade |
| Atrás de redes restritivas | Pode usar TCP | Precisa que suas portas estejam abertas |

## Páginas relacionadas

- [WireGuard](wireguard.md)
- [Regras de firewall](../policy/firewall-rules.md)
