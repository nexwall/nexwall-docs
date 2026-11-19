---
title: 'Guias práticas'
sidebar_position: 0
description: 'Guias passo a passo para configurar cada módulo da interface web do Nexwall Firewall.'
---

# Guias práticas

Guias orientados a tarefas para administradores: cada um diz onde clicar, o que digitar e como confirmar que funcionou. Todos usam a interface web e mostram capturas das telas reais. A resolução de problemas está em **Ajuda e KBAs**.

## Políticas

- [Como permitir ou bloquear tráfego com uma regra de firewall](policy/firewall-rule.md) — Crie uma regra de encaminhamento, entrada ou saída, escolha a ação e coloque-a na posição certa.
- [Como publicar um servidor interno (redirecionamento de portas)](policy/port-forward.md) — Envie as conexões que chegam ao endereço público para um host da sua LAN.
- [Como criar uma regra de NAT (mascaramento ou NAT de origem)](policy/nat-rule.md) — Reescreva o endereço de origem do tráfego de saída ou exclua tráfego da tradução.
- [Como criar uma zona e definir sua política](policy/zone.md) — Agrupe interfaces em uma zona e controle quem pode falar com quem.
- [Como criar objetos reutilizáveis (conjuntos de hosts e de domínios)](policy/object.md) — Nomeie um grupo de hosts, redes ou domínios uma vez e reutilize em regras, redirecionamentos e SD-WAN.

## Rede

- [Como configurar uma interface de rede (WAN, LAN, VLAN)](network/interface.md) — Atribua uma porta livre a uma zona, defina endereço e protocolo ou crie um dispositivo VLAN.
- [Como adicionar uma rota estática](network/route.md) — Diga ao firewall qual gateway alcança uma rede à qual ele não está diretamente conectado.
- [Como ativar e ajustar o servidor DHCP](network/dhcp-server.md) — Entregue endereços a uma rede, defina faixa e tempo de concessão, adicione opções DHCP e restrinja quem pode conectar.
- [Como reservar um endereço IP fixo para um dispositivo](network/dhcp-reservation.md) — Entregue sempre o mesmo endereço a um servidor, impressora ou câmera.
- [Como definir servidores DNS e nomes DNS locais](network/dns-record.md) — Escolha os servidores DNS externos e crie nomes que resolvam para endereços locais.
- [Como usar dois links de internet (failover ou balanceamento)](network/sd-wan.md) — Crie uma política SD-WAN padrão, monitore cada link e adicione regras para tráfego específico.
- [Como limitar e dividir a banda (QoS)](network/qos.md) — Aplique gerenciamento inteligente de filas em um link WAN para que nenhuma conexão prejudique as demais.
- [Como publicar uma aplicação web com o proxy reverso](network/reverse-proxy.md) — Encaminhe requisições HTTPS por caminho ou domínio a um servidor web interno.

## Serviços de segurança

- [Como bloquear aplicativos e protocolos (Controle de aplicativos)](security/app-control.md) — Crie uma regra que bloqueie apps como jogos ou streaming e adicione exceções para hosts específicos.
- [Como filtrar sites por categoria (Proteção web)](security/web-protection.md) — Bloqueie ou permita categorias web para uma zona, rede ou grupo de hosts.
- [Como ativar a prevenção de intrusões (IPS)](security/ips.md) — Ative a proteção de rede, escolha a política de regras e ignore endereços confiáveis.
- [Como bloquear domínios maliciosos (Filtragem de DNS)](security/dns-filtering.md) — Ative listas de bloqueio DNS, force os clientes a usar o DNS do firewall e gerencie uma lista local de permitidos e bloqueados.
- [Como bloquear endereços IP e países maliciosos (Bloqueio de IP e Geolocalização)](security/ip-geo-blocking.md) — Ative listas de IP, escolha o que registrar e gerencie listas locais de permitidos e bloqueados.
- [Como ativar a Proteção Avançada e Coletiva](security/atp.md) — Pontue dispositivos por comportamento suspeito e use as listas compartilhadas de Defesa Coletiva.

## VPN

- [Como permitir que usuários conectem de casa (acesso remoto OpenVPN)](vpn/openvpn-remote-access.md) — Crie o servidor de acesso remoto, adicione contas e entregue aos usuários o arquivo de configuração.
- [Como conectar dois escritórios com OpenVPN (site a site)](vpn/openvpn-site-to-site.md) — Crie um túnel servidor em um site e importe o túnel cliente no outro.
- [Como criar um túnel IPsec com outro firewall ou roteador](vpn/ipsec-site-to-site.md) — Crie um túnel IPsec site a site com chave pré-compartilhada, compatível com a maioria dos fabricantes.
- [Como configurar o WireGuard (servidor com peers ou túnel de peer)](vpn/wireguard.md) — Crie um servidor WireGuard e seus peers para usuários, ou um túnel de peer para outro servidor WireGuard.

## Acesso e identidade

- [Como criar usuários e conectar um diretório (LDAP / Active Directory)](access/user.md) — Adicione usuários locais para acesso VPN ou conecte uma base remota LDAP ou Active Directory.
- [Como transformar uma rede em rede de convidados com página de login (Portal Cativo)](access/captive-portal.md) — Registre a unidade em um gerenciador de portal cativo e publique uma rede para convidados.

## Administração

- [Como definir o nome do host, o fuso horário e o NTP](admin/system-settings.md) — Dê nome à unidade, defina o fuso horário e sincronize o relógio.
- [Como gerenciar o acesso SSH](admin/ssh.md) — Altere a porta SSH e permita ou proíba o login com senha.
- [Como atualizar o firewall (agora ou agendado)](admin/update.md) — Verifique se há uma versão nova, faça backup e instale imediatamente ou no horário escolhido.
- [Como fazer backup e restaurar a configuração](admin/backup-restore.md) — Baixe um backup criptografado, execute um backup na nuvem e restaure.
- [Como instalar um certificado web confiável (Let's Encrypt ou importado)](admin/certificate.md) — Substitua o certificado autoassinado por um confiável para a interface web e o proxy reverso.
- [Como conectar o firewall ao Cloud Controller](admin/central-management.md) — Una a unidade a um controlador com um código de adesão para gerenciá-la remotamente.
- [Como registrar a licença e verificar a assinatura](admin/licensing.md) — Registre a unidade no servidor de licenças e veja o plano, a expiração e os recursos.
- [Como reiniciar ou desligar o firewall com segurança](admin/reboot-shutdown.md) — Reinicie ou desligue a unidade pela interface web.

## Monitoramento e logs

- [Como ler o painel](monitor/dashboard.md) — Entenda a saúde, o tráfego e os serviços da primeira página.
- [Como pesquisar nos logs](monitor/logs.md) — Abra o visualizador de logs, acompanhe eventos ao vivo e filtre com uma expressão regular.
- [Como ver e derrubar conexões ativas](monitor/connections.md) — Leia a tabela de rastreamento de conexões, filtre e exclua uma conexão.
- [Como ver quem usa a rede (Traffic Analytics)](monitor/traffic-analytics.md) — Encontre os dispositivos, aplicativos, sites e horários de maior tráfego.
- [Como revisar as ameaças bloqueadas e os dispositivos em risco](monitor/threat-analytics.md) — Leia a linha do tempo de ameaças, as proteções que atuaram e os dispositivos que precisam de atenção.
