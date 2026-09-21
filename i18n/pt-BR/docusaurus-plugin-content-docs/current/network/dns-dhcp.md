---
title: DNS e DHCP
sidebar_position: 3
description: Entregue endereços, resolva nomes e gerencie concessões e registros locais.
---

# DNS e DHCP

**Rede > DNS e DHCP** configura o servidor DHCP que entrega endereços aos seus dispositivos e o serviço DNS que resolve
nomes para eles.

## DHCP

Cada interface com endereço estático pode servir DHCP. Para cada uma você define:

| Configuração | Significado |
|---|---|
| Habilitado | Liga o servidor para a interface |
| Intervalo | O primeiro e o último endereço distribuídos, ou o início e a quantidade de endereços |
| Tempo de concessão | Por quanto tempo um dispositivo mantém um endereço antes de pedir de novo. Use valores como `45m`, `12h`, `2d`, `1w` ou `infinite`. O padrão é uma hora para IPv4 |
| Opções | Opções DHCP extras enviadas aos clientes, por exemplo um gateway ou um servidor DNS diferente |

O intervalo deve caber dentro da rede da interface.

### Concessões estáticas

Uma concessão estática sempre entrega o mesmo endereço a um dispositivo. O dispositivo é identificado pelo seu **endereço
MAC**, e você também pode dar um nome a ele. Use concessões estáticas para impressoras, servidores e tudo o que você quer
alcançar em um endereço fixo.

### Concessões dinâmicas

A visualização **Concessões dinâmicas** lista os endereços em uso no momento: o dispositivo, seu endereço e quando a
concessão termina.

### Escanear a rede

A ferramenta **Escanear rede** descobre dispositivos em uma interface. Ela está disponível somente para interfaces com uma
rede de /20 ou menor.

### Vinculação de MAC

Você pode restringir uma interface para que somente os dispositivos com uma concessão estática recebam serviço. Combinada
com uma política rígida, isso mantém dispositivos desconhecidos fora da rede.

## DNS

A unidade atua como resolvedor para as suas redes.

| Configuração | Significado |
|---|---|
| Encaminhadores | Servidores DNS de origem para nomes que a unidade não conhece. Use `/domínio/servidor` para enviar as consultas de um domínio a um servidor específico |
| Domínio local | O sufixo adicionado aos nomes dos clientes DHCP. O padrão é `lan` |
| Proteção contra rebind | Descarta respostas da internet que apontam para endereços privados, o que impede um ataque em que um navegador é usado para sondar a sua rede |
| Registrar consultas | Grava as consultas DNS no log do sistema |

Se a sua WAN usa um endereço estático, configure pelo menos um encaminhador.

### Registros DNS locais

Os registros mapeiam um nome para um endereço na sua rede local. Eles não são necessários para hosts com concessões
estáticas. Use-os para nomes que apontam para outro host ou para registros **curinga (wildcard)**, que respondem por um
domínio e por todos os seus subdomínios.

## Páginas relacionadas

- [Filtragem de DNS](../security-services/dns-filtering.md)
- [Objetos](../policy/objects.md), onde reservas de DHCP e registros DNS podem ser usados
