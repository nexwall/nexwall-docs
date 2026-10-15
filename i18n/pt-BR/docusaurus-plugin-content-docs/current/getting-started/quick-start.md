---
title: Início rápido
sidebar_position: 2
description: De uma unidade recém-instalada a um firewall funcionando e protegido.
---

# Início rápido

Esta página leva uma unidade recém-instalada a um firewall protegido que encaminha tráfego. Ela supõe que você já gravou a imagem
em um disco ou criou uma máquina virtual; se não, comece por
[Instalação](../installation/requirements-and-images.md).

![O assistente de configuração](/img/docs/wizard-en.png)

## Antes de começar

- Um computador conectado à interface de rede **LAN** da unidade. A unidade entrega endereços aos seus clientes da LAN por padrão
  (DHCP), então o computador normalmente recebe um sozinho. Se não, dê a ele um endereço em
  `192.168.1.0/24` (por exemplo `192.168.1.10`).
- A interface **WAN** conectada ao seu acesso à internet. Em uma unidade nova a segunda porta de rede (`eth1`) é a WAN e pede
  um endereço ao seu provedor (DHCP) sozinha, mesmo antes de executar o assistente.
- As credenciais padrão: usuário `root`, senha `nexwall`.

:::warning Altere a senha padrão imediatamente
A senha padrão é pública. O assistente de configuração pede para substituí-la, e você deve fazê-lo antes de conectar a
unidade a uma rede não confiável.
:::

## O que a unidade já faz sozinha

Mesmo que você nunca execute o assistente, a primeira inicialização aplica uma única vez os **padrões seguros**: a Proteção de rede (IPS), o filtro
DNS, a proteção de IP e países, e o perfil **Padrão** do Controle de aplicações com suas regras do Web Protection (e o
antivírus, quando a licença o inclui e a unidade tem armazenamento de dados). A LAN oferece DHCP (endereços `192.168.1.100` a
`192.168.1.249`) e DNS, com o próprio firewall (`192.168.1.1`) como gateway e servidor DNS dos clientes. O assistente
permite mudar essas escolhas.

## 1. Abra a interface web

Abra `https://192.168.1.1` em um navegador. A unidade usa a princípio um certificado autoassinado, então o navegador mostra um
aviso; aceite-o para continuar. Você pode substituir o certificado depois, veja
[Certificados](../infrastructure/certificates.md).

Entre como `root`.

## 2. Execute o assistente de configuração

No primeiro login um assistente guia você por uma base segura. Mantenha a unidade conectada à internet durante a configuração, pois as
listas de proteção são baixadas nesse momento.

1. Escolha **Seguro por padrão** para aplicar as configurações recomendadas, ou o caminho personalizado para decidir cada passo
   você mesmo.
2. **Altere a senha do root.** Use ao menos 8 caracteres com maiúsculas e minúsculas, um número e um
   caractere especial. Recomendam-se catorze ou mais caracteres.
3. **Rede.** Escolha o nome do firewall (`FIREWALL` é o padrão e um bom nome se você tem uma só unidade) e como ele se conecta
   à internet: automático (DHCP), um endereço IP fixo ou PPPoE.
4. **Acesso SSH.** Você pode permitir SSH a partir da LAN e da WAN, escolher a porta TCP e desativar
   o login com senha do root. Se desativar, precisa enviar uma chave pública SSH; caso contrário
   fica sem acesso SSH.
5. **Acesso à interface web** nas portas TCP 9090 e 443. Escolha de quais redes a interface web pode ser acessada e se a WAN
   pode acessá-la.
6. **Serviços de segurança.** A Proteção de rede (IPS), a Filtragem DNS e o Bloqueio de IP e geografia vêm ligados por padrão; desligue o que não
   quiser e escolha os países a bloquear.
7. **Perfil do Controle de aplicações.** Escolha **Padrão**, **Escola** ou **Restrito**. A escolha cria as regras de aplicações e as do
   Web Protection (categorias de sites, antivírus, SafeSearch e o perfil de filtro de conteúdo). Veja
   [Proteção web](../security-services/web-protection.md).
8. Revise o resumo e conclua. O assistente aplica tudo e recarrega a interface.

## 3. Verifique a rede

Abra **Rede > Interfaces**. Confirme que:

- a interface LAN tem o endereço esperado e pertence à zona `lan`;
- a interface WAN tem um endereço do seu provedor (DHCP), ou configure um endereço estático ou PPPoE se seu provedor
  exigir.

Veja [Interfaces e roteamento](../network/interfaces-routing.md) para as opções.

## 4. Verifique DNS e DHCP

Abra **Rede > DNS e DHCP**. A interface LAN entrega endereços e DNS aos seus clientes por padrão. Se a sua WAN usa um endereço
estático, garanta que haja ao menos um encaminhador DNS configurado; caso contrário a resolução de nomes falha. O painel
avisa sobre isso.

## 5. Dê um nome à unidade

O nome de host padrão é `FIREWALL`. Se você usa várias unidades, defina um nome distinto em **Administração > Sistema**, aba Geral.
O painel lembra você enquanto a unidade mantiver o nome de fábrica.

## 6. Aplique e verifique

As alterações que você faz na maioria das páginas ficam primeiro em espera. Use **Aplicar alterações** no aviso que aparece para ativá-las.
De um cliente da LAN, verifique se consegue navegar na internet e se
**Operação e Análises > Painel** mostra a conexão com a internet como ativa.

## Próximos passos

- Entenda como regras e zonas funcionam: [Zonas e políticas](../policy/zones-policies.md) e
  [Regras de firewall](../policy/firewall-rules.md).
- Ative a proteção: [Serviços de segurança](../security-services/ips.md) e [Proteção web](../security-services/web-protection.md).
- Faça um primeiro backup: [Backup e recuperação](../infrastructure/backup-recovery.md).
