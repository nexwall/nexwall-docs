---
title: Usando a interface web
sidebar_position: 3
description: Navegação, alterações pendentes, abas, idioma e tema.
---

# Usando a interface web

## O menu

O menu à esquerda está organizado em seções. Todas as seções ficam sempre expandidas, então cada página está a um clique
de distância.

| Seção | Contém |
|---|---|
| Operação e Análises | Painel, Monitoramento, Análise de Tráfego, Conexões, Desempenho, Logs |
| Políticas | Regras de Firewall, NAT, Redirecionamento de Portas, Zonas e Políticas, Objetos |
| Serviços de Segurança | DPI, IPS / IDS, Filtragem de DNS, Bloqueio de IP e Geolocalização |
| Rede | Interfaces, Roteamento, SD-WAN, DNS e DHCP, QoS, Proxy Reverso |
| VPN | Acesso Remoto (OpenVPN), OpenVPN Site a Site, IPsec Site a Site, WireGuard |
| Acesso e Identidade | Usuários e Grupos, Portal Cativo |
| Infraestrutura | Backup e Recuperação, Sistema, Certificados, Reiniciar e Desligar |
| Administração | Gerenciamento Central, Licenciamento |

Configurações relacionadas são agrupadas como abas de uma mesma página. **Sistema** tem as abas Geral, Sincronização de
hora, SSH, Atualizações e Armazenamento, e **Backup e Recuperação** tem Backup, Restauração, Migração e Restauração de
fábrica. Favoritos antigos continuam funcionando: eles redirecionam para a aba correta.

## Abas

Muitas páginas têm abas no topo; por exemplo, **Regras de Firewall** tem regras de Encaminhamento, de Entrada e de
Saída. A aba selecionada é mantida na barra de endereços, então você pode compartilhar ou salvar um link para ela.

## Alterações pendentes

A maioria das alterações de configuração é gravada primeiro em uma configuração pendente. Enquanto há alterações
pendentes, um aviso oferece duas ações:

- **Aplicar alterações** ativa tudo o que está pendente.
- **Reverter alterações** descarta tudo.

Isso permite preparar várias alterações relacionadas, por exemplo uma nova zona e suas regras, e ativá-las juntas.

:::caution
As alterações pendentes são perdidas se a unidade for reiniciada ou desligada. As páginas de reinicialização e de
desligamento avisam quando há alterações não salvas.
:::

## Tabelas

As tabelas compartilham um conjunto comum de ferramentas: uma caixa de filtro, colunas ordenáveis, paginação e um menu de
ações em cada linha. Quando um filtro oculta tudo, uma mensagem orienta você a alterar o filtro.

## Confirmações

Ações destrutivas, como excluir uma regra ou um banco de dados, pedem confirmação. Algumas operações críticas, por
exemplo uma restauração de fábrica, pedem que você digite o nome da unidade antes de prosseguir.

## Sua conta

Abra o menu do usuário no canto superior direito para acessar as **Configurações da conta**. Ali você pode alterar sua
senha, escolher o idioma da interface e configurar a autenticação de dois fatores. Veja
[Licenciamento e conta](../administration/licensing-account.md).

## Idioma e tema

A interface está disponível em inglês, português (Brasil) e espanhol. Ela usa o idioma do seu navegador por padrão, e
você pode escolher outro nas configurações da conta. Os temas claro e escuro são alternados na barra superior.
