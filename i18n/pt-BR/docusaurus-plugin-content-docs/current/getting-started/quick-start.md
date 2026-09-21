---
title: Início rápido
sidebar_position: 2
description: De uma unidade recém-instalada a um firewall funcionando e protegido.
---

# Início rápido

Esta página leva uma unidade recém-instalada a um firewall protegido que encaminha tráfego. Ela pressupõe que você já
gravou a imagem em um disco ou criou uma máquina virtual; se não, comece por
[Instalação](../installation/requirements-and-images.md).

## Antes de começar

- Um computador conectado à interface de rede **LAN** da unidade. Dê a ele um endereço em `192.168.1.0/24` (por
  exemplo `192.168.1.10`) caso ele não receba um automaticamente.
- A interface **WAN** conectada à sua conexão de internet.
- As credenciais padrão: usuário `root`, senha `Nexwall,1234`.

:::warning Altere a senha padrão imediatamente
A senha padrão é pública. O assistente de configuração pede que você a substitua, e você deve fazê-lo antes de conectar
a unidade a uma rede não confiável.
:::

## 1. Abra a interface web

Abra `https://192.168.1.1` em um navegador. A unidade usa inicialmente um certificado autoassinado, então o navegador
mostra um aviso; aceite-o para continuar. Você pode substituir o certificado depois, veja
[Certificados](../infrastructure/certificates.md).

Entre como `root`.

## 2. Execute o assistente de configuração

No primeiro login, um assistente conduz você por uma base segura. Recomenda-se fazer isso enquanto a unidade ainda não
está conectada à internet.

1. Escolha **Seguro por padrão** para aplicar as configurações recomendadas, ou o caminho personalizado para decidir
   cada etapa por conta própria.
2. **Altere a senha do root.** Use pelo menos 8 caracteres com letras maiúsculas e minúsculas, um número e um caractere
   especial. Recomendam-se catorze ou mais caracteres.
3. **Configure o acesso SSH.** Você pode permitir SSH pela LAN e pela WAN, escolher a porta TCP e desativar o login com
   senha para o usuário root. Se desativar o login com senha, você deve enviar uma chave pública SSH; caso contrário,
   ficará sem acesso por SSH.
4. **Configure o acesso à interface web.** Escolha de quais redes a interface web pode ser acessada e se a WAN pode
   acessá-la.
5. Revise o resumo e conclua. O assistente aplica tudo e recarrega a interface.

## 3. Verifique a rede

Abra **Rede > Interfaces**. Confirme que:

- a interface LAN tem o endereço esperado e pertence à zona `lan`;
- a interface WAN tem um endereço do seu provedor (DHCP), ou configure um endereço estático ou PPPoE se o seu provedor
  exigir.

Veja [Interfaces e roteamento](../network/interfaces-routing.md) para conhecer as opções.

## 4. Verifique o DNS e o DHCP

Abra **Rede > DNS e DHCP**. A interface LAN entrega endereços aos seus clientes por padrão. Se a sua WAN usa um endereço
estático, configure pelo menos um encaminhador de DNS; caso contrário, a resolução de nomes falha. O painel avisa sobre
isso.

## 5. Dê um nome à unidade

O nome de host padrão é `Nexwall`. Defina um nome significativo em **Infraestrutura > Sistema**, na aba Geral. O painel
lembra você até que isso seja feito.

## 6. Aplique e verifique

As alterações feitas na maioria das páginas ficam pendentes primeiro. Use **Aplicar alterações** no aviso que aparece
para ativá-las. A partir de um cliente da LAN, verifique se você consegue navegar na internet e se
**Operação e Análises > Painel** mostra a conexão de internet como ativa.

## Próximos passos

- Entenda como regras e zonas funcionam: [Zonas e políticas](../policy/zones-policies.md) e
  [Regras de firewall](../policy/firewall-rules.md).
- Ative a proteção: [Serviços de Segurança](../security-services/ips.md).
- Faça um primeiro backup: [Backup e recuperação](../infrastructure/backup-recovery.md).
