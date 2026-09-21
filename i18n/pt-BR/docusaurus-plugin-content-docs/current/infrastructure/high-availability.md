---
title: Alta disponibilidade
sidebar_position: 4
description: Execute duas unidades como um par, para que uma falha não interrompa a rede.
---

# Alta disponibilidade

Um par de alta disponibilidade (HA) usa duas unidades, uma **primária** e uma **de reserva**, que compartilham um
**endereço IP virtual**. Se a primária falha, a de reserva assume esse endereço e a interface WAN em instantes, e a rede
continua funcionando.

Nesta versão, o HA é configurado pela linha de comando com a ferramenta `ns-ha-config`. O status e os logs também estão
disponíveis por lá.

## Requisitos

- As duas unidades têm os **mesmos dispositivos de rede**.
- As duas estão conectadas à mesma LAN.
- Na LAN, somente **endereços IPv4 estáticos** são suportados.

## O que é suportado

As conexões WAN podem ser IPv4 ou IPv6 estático, ou IPv4 por DHCP, em interfaces físicas, bonds, bridges, VLANs (inclusive
sobre bonds e bridges) e PPPoE (inclusive sobre VLANs).

A configuração que é sincronizada com a unidade de reserva inclui regras de firewall e redirecionamentos de portas, DHCP e
DNS, o servidor SSH, os serviços de VPN (OpenVPN, IPsec, WireGuard), rotas estáticas, QoS, SD-WAN, regras de controle de
aplicações, Threat Shield, o proxy reverso e certificados, bancos de dados de usuários, configurações de NAT, configurações
de backup, a conexão com um controlador e o portal cativo.

O estado das conexões ativas também é sincronizado, então a maioria das sessões sobrevive a uma troca.

## Limites

- Pacotes extras que não fazem parte da imagem padrão não são suportados.
- A configuração do servidor de logs não é sincronizada. Use um controlador para manter os logs das duas unidades.
- Após a primeira sincronização, a unidade de reserva passa a ter o mesmo nome de host da primária.
- O portal cativo funciona somente em interfaces físicas. As sessões ativas dos convidados ficam na memória e são perdidas
  quando as unidades trocam de função, então os convidados podem precisar entrar novamente.

## Configurando

O exemplo usa `192.168.100.238` para a primária, `192.168.100.239` para a de reserva e `192.168.100.240/24` como endereço
virtual.

1. Ligue a **de reserva** e dê à sua LAN um endereço estático. Depois faça o mesmo na **primária**. Esses endereços
   alcançam cada unidade diretamente, mesmo com o cluster desligado.
2. Na primária, verifique os requisitos:

   ```bash
   ns-ha-config check-primary-node lan
   ```

   Se a primária executa um servidor DHCP, a opção de gateway deve ser o endereço virtual, e deve ser definido um servidor
   DNS que os clientes consigam alcançar mesmo quando a primária estiver fora do ar.
3. Verifique a de reserva a partir da primária:

   ```bash
   ns-ha-config check-backup-node 192.168.100.239 lan
   ```

4. Inicialize a primária e depois a de reserva:

   ```bash
   ns-ha-config init-primary-node 192.168.100.238 192.168.100.239 192.168.100.240/24 lan
   ns-ha-config init-backup-node lan
   ```

A configuração prepara o tráfego de HA na LAN, o endereço virtual com uma senha aleatória e um canal SSH na porta 65022
usado somente para sincronizar dados com autenticação por chave.

A partir daí, configure a primária. Suas alterações são sincronizadas com a de reserva, exceto a configuração de rede da
LAN.

## Operando o par

| Tarefa | Comando |
|---|---|
| Verificar o estado | `ns-ha-config status` |
| Mostrar a configuração | `ns-ha-config show-config` |
| Adicionar ou remover uma interface LAN | `ns-ha-config add-lan-interface` e `ns-ha-config remove-interface` |
| Adicionar ou remover um endereço virtual | `ns-ha-config add-vip` e `ns-ha-config remove-vip` |
| Abrir um shell na de reserva | `ns-ha-config ssh-remote` |
| Atualizar a de reserva | `ns-ha-config upgrade-remote` |
| Desativar ou ativar o cluster | `ns-ha-config disable` e `ns-ha-config enable` |
| Remover a configuração | `ns-ha-config reset` |

Teste um failover antes de confiar no par, desligando a primária e verificando se o tráfego continua.

## Páginas relacionadas

- [Backup e recuperação](backup-recovery.md)
- [Linha de comando e perguntas frequentes](../help/command-line-and-faq.md)
