---
title: Logs
sidebar_position: 6
description: Leitura e pesquisa nos logs do sistema, e o Visualizador de logs.
---

# Logs

**Operação e Análises > Logs** mostra o log do sistema da unidade: mensagens do firewall, dos serviços, da
rede e do kernel. O log ocupa toda a largura e a altura da página. O botão **Abrir o Visualizador de logs** abre o
Visualizador de logs, uma visão com pesquisa dos mesmos eventos com abas para cada parte do firewall.

## Ler o log

- Escolha quantas linhas carregar.
- Ative **quebrar linhas** para ver mensagens longas sem rolar para os lados.
- Use a caixa de pesquisa para deixar só as linhas que coincidem. A pesquisa aceita expressões regulares.
- Ative **seguir** para ver as mensagens novas à medida que chegam.

O log é silencioso de propósito. A API de gerenciamento não escreve uma linha para cada leitura da interface web; escreve
as autorizações que falham e cada requisição que muda algo (adicionar, editar, excluir, definir, ...), que é a trilha de
auditoria. As consultas DNS também não são escritas, apenas as respostas do filtro DNS.

## Visualizador de logs

O Visualizador de logs tem estas abas:

| Aba | O que mostra |
|---|---|
| Tráfego do firewall | Pacotes aceitos ou bloqueados pelas regras do firewall, com o motivo |
| Tráfego e aplicações | As conexões com a aplicação, o nome do site, a origem e o destino, os bytes em cada sentido e a duração. Só registra enquanto o Visualizador de logs está aberto e começa com as conexões abertas naquele momento; nada é escrito no log do sistema |
| Bloqueio de IP e geografia | Endereços e países bloqueados pelo Threat Shield IP |
| Proteção de rede (IPS) | Os alertas e bloqueios do motor de prevenção de intrusões |
| Controle de aplicações (DPI) | Fluxos bloqueados pelo Controle de aplicações |
| Proteção DNS | Domínios bloqueados pelo filtro DNS |
| Web Protection | Todo o tráfego web tratado pelo proxy, permitido ou bloqueado: páginas de bloqueio, arquivos barrados pelo antivírus ou pelo sandbox, bloqueios do filtro de conteúdo e requisições que o proxy recusou. Uma caixa de seleção inclui as mensagens dos serviços do Web Protection. Clique em um dispositivo para pesquisá-lo |
| VPN, Alta disponibilidade, Proxy reverso | Os eventos de cada serviço |
| Autenticação, Atividade de administração | Logins e logins que falharam; as alterações feitas pela interface web |
| Logs do sistema | Todo o log do sistema |
| Rastreio de regras ao vivo, Caminho do pacote, Pacotes descartados | Rastreios ao vivo do que acontece com um pacote, para diagnóstico |

Escolha o intervalo de tempo, filtre por ação (bloqueado ou permitido) e pesquise por texto. As tabelas podem ser exportadas.

Os relatórios de tráfego de **Operação e Análises** guardam os totais por hora por 35 dias.

## Pesquisas úteis

| Objetivo | Pesquisar |
|---|---|
| Pacotes bloqueados | o nome da zona, ou o prefixo de log que a regra usa |
| Problemas de VPN | `openvpn`, `charon` ou `wireguard` |
| Atividade de DHCP | `dnsmasq-dhcp` |
| Bloqueios do Threat Shield IP | `banIP` |
| Problemas de atualização ou registro | o nome do serviço, por exemplo `ns-plug` |

## Manter os logs após reiniciar

Por padrão o log vive em memória e é perdido ao reiniciar. Para guardar uma cópia, conecte um disco ou uma unidade USB e configure-o
em **Administração > Sistema**, na aba Armazenamento. A unidade então também escreve os logs nesse dispositivo. Veja
[Sistema](../infrastructure/system.md).

Quando uma unidade está conectada a um controlador, os logs também são enviados a ele, veja
[Gerenciamento central](../administration/central-management.md).

## Pela linha de comando

O mesmo log está disponível por SSH com `logread`. Veja [Linha de comando e perguntas frequentes](../help/command-line-and-faq.md).
