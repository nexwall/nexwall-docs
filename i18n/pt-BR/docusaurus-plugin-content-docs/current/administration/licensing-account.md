---
title: Licenciamento e conta
sidebar_position: 2
description: Ative uma assinatura e gerencie a sua própria conta.
---

# Licenciamento e conta

## Licenciamento

**Administração > Licenciamento** mostra o estado da assinatura da unidade e permite ativar uma assinatura.

### O que uma assinatura libera

O firewall funciona sem assinatura. Uma assinatura adiciona recursos que dependem dos serviços Nexwall:

- um catálogo de aplicações estendido para o [controle de aplicações](../security-services/application-control.md), quando
  o plano inclui um;
- as listas avançadas do [Threat Shield](../security-services/dns-filtering.md);
- backups remotos (na nuvem), criptografados, veja [Backup e recuperação](../infrastructure/backup-recovery.md);
- a [Análise de Tráfego](../operation-analytics/traffic-analytics.md);
- o gerenciamento de um número ilimitado de unidades a partir de um controlador;
- bancos de dados remotos de usuários de VPN;
- sessões de suporte remoto, nos planos que as incluem.

### Ativando

1. Obtenha um **token de autenticação** para a unidade na sua conta Nexwall.
2. Cole o token na página Licenciamento e salve. A unidade se registra na plataforma de serviços Nexwall.
3. A página mostra o plano, a validade e o identificador de sistema da unidade.

Se a unidade não sincronizou desde que iniciou, a página informa, e você pode forçar uma sincronização com
**Sincronizar agora**.

### Sessões de suporte

Você pode abrir uma **sessão de suporte remoto** para que o suporte o ajude. A sessão é encerrada automaticamente no
horário mostrado, e você pode interrompê-la a qualquer momento.

### Cancelando

Se você cancelar a assinatura de uma unidade, perde os recursos extras do seu plano. O firewall básico continua
funcionando.

## Sua conta

Abra **Configurações da conta** no menu do usuário.

### Senha

Altere a sua senha. Se você alterar a senha do usuário `root`, também altera a senha usada para o acesso ao shell.

### Idioma

Escolha o idioma da interface: inglês, português (Brasil) ou espanhol.

### Autenticação de dois fatores

A autenticação de dois fatores adiciona uma segunda etapa ao login: um código gerado no seu celular.

1. Instale um aplicativo autenticador no seu celular ou tablet, por exemplo o FreeOTP.
2. Em Configurações da conta, escolha configurar a autenticação de dois fatores e leia o código QR.
3. Informe o código de seis dígitos que o aplicativo mostra.
4. **Guarde os códigos de recuperação.** Cada um pode ser usado uma vez se você perder o acesso ao aplicativo.

Para gerar novos códigos de recuperação, revogue a autenticação de dois fatores e configure-a de novo. Revogá-la reduz a
segurança da conta, e os códigos deixam de ser solicitados no login.

## Páginas relacionadas

- [Usuários e grupos](../access-identity/users-groups.md)
- [Gerenciamento central](central-management.md)
