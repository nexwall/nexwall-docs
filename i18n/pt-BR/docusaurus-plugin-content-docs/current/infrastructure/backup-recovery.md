---
title: Backup e recuperação
sidebar_position: 1
description: Faça backup, restaure, migre e restaure de fábrica uma unidade.
---

# Backup e recuperação

**Infraestrutura > Backup e Recuperação** protege a sua configuração. Ele tem quatro abas: Backup, Restauração, Migração
e Restauração de fábrica.

## Backup

Um backup contém as configurações e os dados da unidade. Ele é a sua salvaguarda contra um disco com falha, um erro ou
uma substituição.

- **Baixe um backup** para o seu computador a qualquer momento.
- **Criptografe-o.** Informe uma **senha (passphrase)** e o backup é criptografado com GPG. Se você deixar a senha vazia,
  o backup é armazenado em texto claro.

:::warning Guarde bem a senha
Se você perder a senha, não conseguirá ler um backup criptografado, e ela não pode ser recuperada. Alterar a senha afeta
apenas os backups feitos depois; para restaurar um backup mais antigo, você precisa da senha que estava em vigor quando
ele foi feito.
:::

Com uma assinatura, a unidade também pode **criar backups criptografados automaticamente** e mantê-los na nuvem. O
sistema gerencia até dez backups. Você pode iniciar um a qualquer momento com **Executar backup na nuvem**.

## Restauração

Escolha de onde vem o backup: um arquivo no seu computador ou um dos backups na nuvem. Se ele estiver criptografado,
informe a senha. A unidade aplica a configuração e reinicia.

A restauração substitui a configuração atual, então faça um backup antes se puder precisar voltar.

## Migração

A aba Migração importa um arquivo de migração produzido a partir de uma máquina de origem compatível e mapeia suas
interfaces de rede para as interfaces desta unidade. Siga as instruções da página e revise o resultado antes de aplicá-lo.

## Restauração de fábrica

A **restauração de fábrica** remove todos os pacotes instalados e todas as configurações personalizadas e devolve a
unidade ao estado que tinha logo após a instalação. Ela restaura a versão atualmente instalada, não uma mais antiga.

Isso é permanente e não pode ser desfeito. A página pede confirmação antes de prosseguir. Use-a quando reaproveitar ou
desativar uma unidade, ou quando quiser recomeçar.

## Boas práticas

- Faça um backup antes de cada atualização e de cada mudança importante.
- Mantenha pelo menos um backup fora da unidade.
- Teste uma restauração em uma unidade reserva de tempos em tempos.

## Páginas relacionadas

- [Sistema](system.md), para atualizações
- [Licenciamento e conta](../administration/licensing-account.md), para backups na nuvem
