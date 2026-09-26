---
title: Gerenciamento central
sidebar_position: 1
description: Gerencie muitas unidades a partir de um só controlador.
---

# Gerenciamento central

Um **controlador** é um servidor ao qual muitas unidades se conectam. A partir dele, um administrador pode encontrar
qualquer unidade, abrir sua interface web, ver suas métricas e logs e gerenciá-la, sem ter um caminho de rede direto até
cada local. É isso que torna prático para um provedor de serviços cuidar de muitos clientes.

## Conectando uma unidade

1. No controlador, adicione uma nova unidade. O controlador gera um **código de adesão**.
2. Na unidade, abra **Administração > Gerenciamento Central**.
3. Informe o endereço do controlador e cole o **código de adesão**.
4. Dê à unidade um **nome** fácil de encontrar no controlador. Usar o nome de domínio totalmente qualificado do firewall é
   um bom hábito. Você também pode adicionar uma **descrição**.
5. Conecte. A conexão é estabelecida em poucos segundos.

A descrição leva até quinze minutos para aparecer no controlador, e alterá-la reinicia a conexão.

## O que o controlador recebe

Quando uma unidade está conectada, seus **logs são transmitidos ao controlador** para armazenamento, monitoramento e
análise do uso da rede, e suas métricas são mantidas lá. Se você não quer que esses dados saiam da unidade, não a conecte.
A página informa isso antes de você conectar.

## O que você pode fazer pelo controlador

- Ver todas as unidades com seu estado e organizá-las em **grupos de unidades**.
- Abrir a interface web de uma unidade pelo controlador.
- Abrir uma **sessão de terminal** em uma unidade.
- Acompanhar métricas e logs de muitas unidades.
- Gerenciar os **usuários** do controlador.
- Gerenciar as configurações da sua própria conta.

## Desconectando

Desconecte a unidade pela página. Ela deixa de ser alcançável pelo controlador. Sua própria configuração não é alterada.

## Requisitos

- A unidade deve alcançar o controlador pela internet, então é necessária conectividade de saída.
- Alguns recursos, como as descrições, exigem uma versão recente do controlador. A página informa quando é o caso.
- Gerenciar mais do que um número limitado de unidades pode exigir uma assinatura.

## Páginas relacionadas

- [Licenciamento e conta](licensing-account.md)
- [Desempenho](../operation-analytics/performance.md)
- [Solução de problemas de registro no controlador](../help/controller-registration-troubleshooting.md)
