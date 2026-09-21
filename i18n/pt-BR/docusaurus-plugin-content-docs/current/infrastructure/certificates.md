---
title: Certificados
sidebar_position: 3
description: Certificados para a interface web e o proxy reverso.
---

# Certificados

**Infraestrutura > Certificados** gerencia os certificados X.509 que o servidor web da unidade usa. Isso cobre a interface
web e o [proxy reverso](../network/reverse-proxy.md).

## O certificado padrão

Uma unidade nova usa um certificado autoassinado, no qual os navegadores não confiam. Você pode continuar usando-o dentro
de uma rede pequena, mas para qualquer outra coisa, substitua-o.

## Obtendo um certificado

| Método | Quando usar |
|---|---|
| Enviar | Você já tem um certificado, a sua chave privada e a sua cadeia de uma autoridade certificadora |
| Let's Encrypt | Você quer um certificado gratuito que se renova sozinho |

### Let's Encrypt

A unidade solicita um certificado para um ou mais nomes e o renova antes de expirar. O nome deve resolver para a unidade e
um dos dois métodos de validação deve funcionar:

- **Standalone (HTTP):** a autoridade se conecta à unidade na porta 80. A porta 80 deve estar acessível pela internet.
- **DNS:** a unidade prova a propriedade criando um registro na sua zona DNS. Não precisa de nenhuma porta de entrada e
  pode emitir certificados **wildcard**. Escolha o seu provedor de DNS e informe os dados de acesso que ele exige.

## Usando um certificado

Marque um certificado como o **padrão**. Ele é servido quando alguém acessa a unidade pelo seu nome de domínio totalmente
qualificado. Os outros certificados são selecionados nas regras do proxy reverso.

## Excluindo

Excluir um certificado é irreversível. Verifique antes se nada o usa.

## Páginas relacionadas

- [Proxy reverso](../network/reverse-proxy.md)
- [Sistema](system.md)
