---
title: O que é o UCI, e por que ele importa
sidebar_position: 5
description: O sistema de configuração por trás da interface web, da API e da linha de comando, e como usá-lo para gerenciamento e solução de problemas.
---

# O que é o UCI, e por que ele importa

UCI, a Unified Configuration Interface, é o sistema de configuração que o OpenWrt criou para que todo serviço do
sistema — rede, firewall, DHCP, VPNs, e todas as funcionalidades específicas do Nexwall — seja configurado da mesma
forma, em vez de cada daemon inventar o próprio formato de arquivo. O Nexwall Firewall é construído sobre o OpenWrt
e mantém esse sistema, e quase tudo que a interface web faz acaba virando uma mudança em um arquivo UCI. Entender
como ele funciona torna o comportamento da interface previsível, e dá a você uma segunda forma de olhar e corrigir
uma unidade quando a interface web não é suficiente.

## O que ele traz

- **Uma sintaxe única para tudo.** Aprenda uma vez e você consegue ler ou editar a configuração de qualquer
  serviço, não só os que já conhece.
- **Uma única fonte de verdade.** A interface web, a API e a ferramenta de linha de comando `uci` leem e escrevem
  exatamente os mesmos arquivos. Nada fica em cache ou duplicado entre elas — veja por que as interfaces nunca discordam, mais abaixo.
- **Mudanças em estágio.** Edições feitas com a ferramenta `uci` ficam separadas da configuração ativa até você
  confirmá-las (`commit`), então uma mudança pela metade não pode deixar um arquivo num estado quebrado.
- **Estrutura que um editor de texto sozinho não dá.** Os arquivos de configuração são organizados em seções
  tipadas, com opções e listas nomeadas, e é isso que permite que ferramentas gerem, validem e comparem
  configurações em vez de só concatenar texto.
- **Um formato natural para backup.** Como a configuração é só um conjunto de pequenos arquivos de texto num único
  diretório, fazer backup, restaurar, ou comparar duas unidades entre si é simples. Veja [Backup e
  recuperação](../infrastructure/backup-recovery.md).

## O modelo de dados

Um arquivo de configuração UCI é chamado de **pacote**, e fica em `/etc/config/<pacote>` — por exemplo
`/etc/config/network`, `/etc/config/firewall`, `/etc/config/dpi`. Dentro de um pacote:

- Uma **seção** agrupa opções relacionadas e tem um **tipo** (por exemplo uma seção `zone` no pacote firewall, ou
  uma seção `interface` no pacote network). Uma seção pode ser **nomeada** (`config interface 'lan'`) ou
  **anônima**, caso em que o UCI dá a ela um nome interno como `@interface[0]` baseado na posição.
- Uma **opção** guarda um único valor: `option proto 'static'`.
- Uma **lista** guarda vários valores para o mesmo nome de opção: várias linhas `list network 'lan'` sob uma zona
  de firewall, por exemplo.

Um exemplo curto, parte de `/etc/config/network`:

```
config interface 'lan'
	option device 'br-lan'
	option proto 'static'
	option ipaddr '192.168.1.1'
	option netmask '255.255.255.0'
```

## Usando pela linha de comando

| Tarefa | Comando |
|---|---|
| Mostrar tudo de um pacote | `uci show network` |
| Mostrar uma opção | `uci get network.lan.ipaddr` |
| Mudar uma opção | `uci set network.lan.ipaddr='192.168.2.1'` |
| Adicionar um valor a uma lista | `uci add_list firewall.@zone[0].network='guest'` |
| Remover um valor de uma lista | `uci del_list firewall.@zone[0].network='guest'` |
| Criar uma seção anônima nova | `uci add firewall rule` |
| Dar nome a uma seção | `uci rename network.@interface[-1]='guest'` |
| Remover uma seção ou opção | `uci delete network.guest` |
| Ver o que ainda não foi confirmado | `uci changes` |
| Gravar as mudanças em estágio no disco | `uci commit network` |
| Descartar as mudanças em estágio | `uci revert network` |
| Exportar um pacote inteiro como texto | `uci export network` |
| Extrair toda a configuração para um chamado de suporte | `uci show` (sem nome de pacote, tudo) |

## Mudanças em estágio versus confirmadas

`uci set`, `uci add`, `uci delete` e as variantes `_list` não tocam `/etc/config/` na hora. Elas escrevem primeiro
numa área de mudanças pendentes, por isso o `uci changes` consegue mostrar o que está prestes a acontecer antes que
aconteça. Só o `uci commit` grava elas de fato no arquivo; o `uci revert` as descarta em vez disso.

Essa distinção só se aplica a mudanças feitas pela ferramenta `uci`. Se você editar `/etc/config/network`
diretamente com um editor de texto, essa mudança já está no arquivo — não existe uma etapa separada de commit, nem
um estado pendente para reverter.

## Depois de uma mudança: reinicie o serviço certo

Confirmar uma mudança no UCI atualiza o arquivo, mas o serviço que o lê normalmente continua rodando com o que já
tinha carregado até ser avisado para recarregar. Qual serviço reiniciar, e como, está coberto na
[Referência de comandos de serviço e log](service-and-log-reference.md) — a mesma tabela vale seja a mudança vinda
da interface web, da API, ou direto do `uci`.

## Por que a interface web, a API e a CLI nunca discordam

A interface web e a API do Nexwall não são uma camada em cima de um banco de dados que por acaso espelha a
configuração — elas leem e escrevem os arquivos UCI diretamente, pelas mesmas bindings `python3-uci` sobre as quais
a própria ferramenta de linha de comando `uci` é construída. Existe só uma cópia da configuração em disco. Um valor
que você define com `uci set` aparece na interface web assim que a página recarrega, e uma mudança feita na
interface web fica visível para o `uci get` imediatamente, sem nenhuma etapa de sincronização entre os dois e nada
para ficar dessincronizado.

## Solução de problemas com o UCI

- **Uma mudança na interface não parece ter feito efeito.** Verifique a opção diretamente com `uci get`, e
  verifique `uci changes` para aquele pacote — uma mudança feita pela API pode ficar em estágio sem ser confirmada
  se uma requisição foi interrompida no meio.
- **Uma funcionalidade se comporta diferente do que a interface mostra.** Compare `uci show <pacote>` com o que a
  página exibe. Se já discordam nesse nível, o problema está em como o valor é lido ou aplicado, não em como a
  interface web o exibe.
- **Você precisa passar sua configuração exata para o suporte**, sem entregar um backup completo: `uci show`
  extrai tudo, `uci show <pacote>` extrai um serviço só. Oculte segredos (PSKs, senhas) antes de compartilhar
  qualquer um dos dois.
- **Você mudou algo e um serviço não sobe mais.** Um arquivo de configuração editado à mão com um erro de digitação
  é uma causa comum. `uci show <pacote>` falha na hora com um arquivo malformado, o que costuma ser mais rápido do
  que ler primeiro a saída de erro do próprio serviço.
- **Você quer saber o que um backup realmente contém.** Um backup do Nexwall é feito com o `sysupgrade -b` padrão
  do OpenWrt, que sempre inclui tudo em `/etc/config/` — então restaurar um backup é, no fundo, recolocar um
  conjunto conhecido de arquivos UCI. Veja [Backup e recuperação](../infrastructure/backup-recovery.md).

## Editando o UCI diretamente, com segurança

Use um editor de texto em `/etc/config/<pacote>` quando a interface web em si estiver inacessível, ou quando você
precisar corrigir algo que a interface não tem controle para fazer. Algumas precauções:

- Faça um backup antes — veja [Backup e recuperação](../infrastructure/backup-recovery.md).
- Depois de salvar, rode `uci show <pacote>` antes de reiniciar qualquer coisa. Ele faz o parse do arquivo e falha
  na hora com um erro de sintaxe, um erro bem mais barato de pegar do que descobrir depois que um serviço não sobe.
- Reinicie só o serviço que lê aquele pacote — veja [Referência de comandos de serviço e
  log](service-and-log-reference.md) — em vez de reiniciar a unidade inteira.
- Tenha cuidado especial com `/etc/config/network`: um erro ali pode cortar a interface pela qual você está
  conectado. Mantenha uma sessão de console disponível (não só SSH pela rede que você está prestes a mudar) até
  confirmar que a nova configuração funciona.

## Páginas relacionadas

- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
- [Referência de comandos de serviço e log](service-and-log-reference.md)
- [Backup e recuperação](../infrastructure/backup-recovery.md)
- [Sistema](../infrastructure/system.md)
