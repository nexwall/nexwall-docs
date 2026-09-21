---
title: Sistema
sidebar_position: 2
description: Nome de host, hora, SSH, atualizações, armazenamento e reinicialização da unidade.
---

# Sistema

**Infraestrutura > Sistema** agrupa as configurações da própria unidade em cinco abas: Geral, Sincronização de hora, SSH,
Atualizações e Armazenamento. As ações de energia ficam em **Infraestrutura > Reiniciar e Desligar**.

## Geral

Defina o **nome de host** e uma descrição. Usar o nome de host padrão `Nexwall` não é recomendado, pois em uma rede com
várias unidades fica impossível distingui-las. O painel lembra você até que o nome seja alterado. Você também pode manter
aqui anotações livres sobre a unidade.

## Sincronização de hora

A hora correta importa para certificados, logs, VPNs e atualizações.

- Escolha o **fuso horário**.
- Confira a **hora local** que a unidade mostra e **sincronize-a com um servidor NTP** sob demanda.
- Ative o **cliente NTP** para que o relógio seja mantido correto automaticamente. Você pode usar os servidores anunciados
  pelo DHCP ou informar os seus.
- Opcionalmente, **forneça um servidor NTP** às suas redes, escolhendo as interfaces que o recebem.

## SSH

Controle o acesso SSH à linha de comando.

- Defina a **porta TCP** e se a autenticação por senha é permitida.
- Escolha se o usuário `root` pode entrar com senha. Desativar isso é mais seguro, mas você deve ter adicionado antes a sua
  chave pública SSH.
- Gerencie as **chaves públicas autorizadas**. As chaves permitem logins sem senha e são mais seguras que as senhas.
- Escolha se hosts remotos podem se conectar às portas encaminhadas da unidade.

:::warning Não fique sem acesso
Antes de desativar o login com senha, adicione a sua chave pública e verifique se consegue entrar com ela em uma segunda
sessão.
:::

## Atualizações

Há dois tipos de atualização:

| Tipo | O que contém | Como é entregue |
|---|---|---|
| Correções de segurança e de erros | Pequenas correções do software instalado | Pacotes |
| Novas versões | Novos recursos | Uma imagem completa do sistema |

A aba mostra se há uma nova versão disponível. Faça backup da sua configuração antes de atualizar. As configurações atuais
são mantidas. Você pode atualizar imediatamente, **agendar** a atualização para um horário conveniente ou cancelar uma
atualização agendada. Também é possível enviar você mesmo uma imagem compatível.

Se a aba informar que o servidor de atualizações não está acessível ou recusa o acesso, verifique a conexão de internet, a
hora e o estado da sua assinatura, veja [Solução de problemas](../help/troubleshooting.md).

## Armazenamento

Por padrão os logs ficam na memória. Na aba Armazenamento você configura um dispositivo persistente, como uma unidade USB
ou um segundo disco, onde a unidade também grava os logs. Isso ajuda na solução de problemas e guarda um registro da
atividade entre reinicializações. Você também pode deixar a unidade copiar dados extras para o dispositivo uma vez por
dia. Remover o armazenamento interrompe a gravação de logs nele.

## Reiniciar e desligar

**Reiniciar** reinicia a unidade, que fica indisponível por um curto período. **Desligar** a desliga, para manutenção,
mudança de local ou desativação. Ambas avisam quando há alterações pendentes, que são perdidas.

## Páginas relacionadas

- [Backup e recuperação](backup-recovery.md)
- [Certificados](certificates.md)
