---
title: Proxy reverso
sidebar_position: 5
description: Publique aplicações web internas pelo firewall via HTTPS.
---

# Proxy reverso

**Rede > Proxy Reverso** publica aplicações web que vivem na sua rede interna. Os visitantes se conectam ao firewall via
HTTPS, e o firewall encaminha as requisições ao servidor interno. Isso permite publicar vários sites atrás de um único
endereço público e terminar a criptografia em um só lugar.

O proxy reverso funciona **somente na porta TCP 443 (HTTPS)**.

## Requisitos

- A porta TCP 443 deve estar aberta e acessível na WAN. Se não estiver, a página informa e pede que você verifique suas
  regras em [Regras de firewall](../policy/firewall-rules.md).
- Um certificado válido para os nomes que você publica. Configure os certificados em
  [Certificados](../infrastructure/certificates.md); a página lembra você quando nenhum está configurado.

## Criando uma regra

| Campo | Significado |
|---|---|
| Correspondência | Um **nome de site** (um nome de domínio totalmente qualificado) ou um **caminho de recurso** que começa com `/` |
| Destino | O endereço interno para o qual encaminhar, por exemplo `http://servidor:8080/app` |
| Certificado | O certificado apresentado aos visitantes |
| Redes permitidas | Opcional. Somente essas redes IPv4 ou IPv6 podem usar a regra |

As regras que correspondem a um nome de site são usadas para sites inteiros. As regras que correspondem a um caminho
publicam uma parte de um site.

## Dicas

- Restrinja aplicações administrativas com **Redes permitidas**.
- Teste com um navegador de fora e verifique os [Logs](../operation-analytics/logs.md) se uma regra não responder.
- Lembre-se de que a interface web do firewall também usa a porta 443. Um nome publicado não deve conflitar com o nome
  que acessa o próprio firewall.

## Páginas relacionadas

- [NAT e redirecionamento de portas](../policy/nat-port-forwarding.md) para serviços que não são HTTPS
