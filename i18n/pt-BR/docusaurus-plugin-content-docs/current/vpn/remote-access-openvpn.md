---
title: Acesso remoto (OpenVPN)
sidebar_position: 1
description: Permita que os usuários se conectem com segurança de qualquer lugar com um servidor OpenVPN road warrior.
---

# Acesso remoto (OpenVPN)

**VPN > Acesso Remoto (OpenVPN)** configura um servidor OpenVPN **road warrior**. Os usuários remotos, em notebooks ou
celulares, se conectam a ele de qualquer lugar da internet e obtêm acesso seguro às suas redes privadas.

## Antes de começar

- Crie um **banco de dados de usuários** com as pessoas que podem se conectar, veja
  [Usuários e grupos](../access-identity/users-groups.md).
- Decida a **rede VPN**: uma rede privada usada somente pelos clientes VPN. Escolha uma que não se sobreponha a nenhuma
  outra rede que você use, inclusive as redes domésticas dos seus usuários, se você puder prevê-las.
- Garanta que o endereço público ou um nome DNS da unidade seja conhecido dos seus usuários.

## Criando o servidor

Escolha **Adicionar servidor** (ou configure o padrão) e defina:

| Configuração | Significado |
|---|---|
| Banco de dados de usuários | De onde vêm as contas |
| Autenticação | O que os usuários apresentam: uma senha, um certificado ou ambos. Você também pode exigir um código de uso único |
| Protocolo e porta | UDP é preferido pelo desempenho; TCP consegue passar por redes restritivas |
| Rede VPN | A rede virtual dos clientes |
| Endereços públicos | Os nomes ou endereços que os clientes usam para alcançar o servidor |
| Rotas | As redes que os clientes podem alcançar. Adicione as redes da sua LAN ou envie **todo o tráfego** pela VPN |
| Cliente a cliente | Se os clientes podem se alcançar |
| Opções DHCP | Opções extras enviadas aos clientes, úteis para alcançar uma rede Windows pela VPN |

Ao criar o servidor, você também pode optar por criar as contas de todos os usuários do banco de dados de uma vez. Essa
escolha está disponível somente na criação. Os certificados criados têm validade de dez anos.

A unidade abre automaticamente no firewall a porta necessária.

## Contas

A lista de contas mostra quem pode se conectar. Dependendo do modo de autenticação, um usuário precisa de uma senha, de
um certificado válido ou de ambos. As alterações entram em vigor imediatamente.

Para cada conta você pode:

- **Baixar a configuração do cliente** e entregá-la ao usuário. Alguns clientes também aceitam um código QR.
- **Reservar um endereço** para que o usuário sempre receba o mesmo endereço VPN.
- **Renovar o certificado.** Isso revoga o anterior, então o usuário deve baixar o novo certificado para se reconectar.
- **Desativar ou excluir** a conta. Excluir uma conta também exclui o seu certificado.

## Clientes conectados e histórico

A página mostra quem está conectado agora, há quanto tempo e quanto transferiu. O histórico lista as sessões passadas e
pode ser filtrado por usuário e por intervalo de datas.

## Excluindo o servidor

Excluir o servidor exclui todas as contas associadas a ele, e não pode ser desfeito. Exporte antes o que você precisar.

## Software cliente

Use qualquer cliente compatível com OpenVPN. A configuração baixada contém o que o cliente precisa. Peça aos usuários que
instalem um cliente, importem o arquivo e se conectem.

## Páginas relacionadas

- [Usuários e grupos](../access-identity/users-groups.md)
- [Regras de firewall](../policy/firewall-rules.md), para controlar o que os usuários da VPN podem alcançar
