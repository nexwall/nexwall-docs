---
title: Linha de comando e perguntas frequentes
sidebar_position: 2
description: Comandos úteis por SSH, onde ficam as coisas e perguntas frequentes.
---

# Linha de comando e perguntas frequentes

## Acessando a linha de comando

Use SSH com o usuário `root`, ou o console da máquina virtual ou do hardware. As configurações de SSH ficam em
**Infraestrutura > Sistema**, na aba SSH. Entre com uma chave se você desativou o login com senha.

O sistema é baseado em OpenWrt, então suas ferramentas são as desse ecossistema.

## A configuração

A configuração fica em arquivos de texto simples em `/etc/config`, gerenciados com a ferramenta `uci`.

```bash
uci show network            # tudo sobre a rede
uci show firewall           # zonas, regras, redirecionamentos
uci get system.@system[0].hostname
uci changes                 # o que está pendente
```

A interface web grava nos mesmos arquivos. As alterações que você faz pela linha de comando com `uci set` devem ser salvas
com `uci commit <configuração>`, e o serviço afetado deve ser recarregado.

## Comandos do dia a dia

| Objetivo | Comando |
|---|---|
| Ler o log | `logread`, e `logread -f` para acompanhá-lo |
| Reiniciar um serviço | `/etc/init.d/<serviço> restart` |
| Listar os serviços | `ls /etc/init.d` |
| Endereços das interfaces | `ip -4 addr`, `ip -6 addr` |
| Rotas | `ip route` |
| Estado da interface | `ifstatus wan` e `ifstatus lan` |
| Regras de firewall como carregadas | `nft list ruleset` |
| Rastreamento de conexões | `conntrack -L` |
| Testar a internet | `ping -c 3 1.1.1.1`, depois `ping -c 3 example.com` |
| Versão | `cat /etc/os-release` |
| Disco e memória livres | `df -h`, `free -m` |

Reiniciar "um serviço" significa o certo para o que você está resolvendo, nem sempre o mesmo. Veja a
[Referência de comandos de serviço e log](service-and-log-reference.md) para saber qual serviço sustenta cada
funcionalidade da interface web, e o que procurar no log dele. Quase tudo que você pode mudar também vive num arquivo de configuração UCI, o que é o que faz a
interface web, a API e a linha de comando sempre concordarem — veja
[O que é o UCI, e por que ele importa](understanding-uci.md).

## Onde ficam as coisas

| O quê | Onde |
|---|---|
| Configuração | `/etc/config/` |
| Scripts de inicialização | `/etc/init.d/` |
| Certificados do servidor web | gerenciados em **Infraestrutura > Certificados** |
| Dados de classificação de tráfego | `/etc/netifyd/` |
| Log do sistema | na memória, lido com `logread` |

## Perguntas frequentes

**Qual é o endereço e a senha padrão?**
A LAN responde em `192.168.1.1`. O usuário é `root` e a senha é `Nexwall,1234`. Altere-a no primeiro login.

**Posso executá-lo em uma máquina virtual?**
Sim. Use firmware UEFI, dê a ele pelo menos dois adaptadores de rede e 4 GB de memória. Veja
[Instalar em uma máquina virtual ou em hardware](../installation/install-vm-and-hardware.md).

**Por que a minha alteração não está ativa?**
A maioria das alterações fica pendente. Use **Aplicar alterações** no aviso. Veja
[Usando a interface web](../getting-started/web-interface.md).

**Perdi as alterações que fiz antes de uma reinicialização.**
As alterações pendentes que não foram aplicadas são perdidas quando a unidade reinicia. As alterações aplicadas são
mantidas.

**Funciona sem assinatura?**
Sim. O firewall, as VPNs, o sistema de prevenção de intrusões, as listas gratuitas do Threat Shield e o catálogo base de
aplicações funcionam sem uma. Uma assinatura adiciona os recursos listados em
[Licenciamento e conta](../administration/licensing-account.md).

**Para onde os meus dados são enviados?**
Para lugar nenhum, a menos que você ative um recurso que precise disso. A Análise de Tráfego envia metadados de tráfego
quando você a ativa, e uma unidade conectada a um controlador envia seus logs e métricas a esse controlador.

**Como movo uma configuração para outra unidade?**
Faça um backup e restaure-o na nova unidade. Veja [Backup e recuperação](../infrastructure/backup-recovery.md).

**Como conecto vários sites?**
Use [túneis site a site](../vpn/site-to-site-tunnels.md) ou [WireGuard](../vpn/wireguard.md) e gerencie as unidades com o
[gerenciamento central](../administration/central-management.md).

**Como volto a um estado conhecido?**
Use a aba **Restauração de fábrica** e restaure um backup depois.
