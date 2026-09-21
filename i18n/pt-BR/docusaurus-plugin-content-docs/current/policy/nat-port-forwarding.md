---
title: NAT e redirecionamento de portas
sidebar_position: 2
description: Mascaramento, NAT de origem, mapeamento um a um, auxiliares de NAT e redirecionamentos de portas.
---

# NAT e redirecionamento de portas

A Tradução de Endereços de Rede, o NAT, altera os endereços dos pacotes à medida que eles passam pelo firewall. A unidade
oferece várias formas, cada uma em seu próprio lugar.

## NAT

**Políticas > NAT** lista as regras que traduzem endereços de origem.

| Tipo | O que faz |
|---|---|
| Mascaramento (Masquerade) | Os hosts de uma rede privada compartilham o endereço da interface de saída. É isso que dá à sua LAN acesso à internet |
| NAT de origem (SNAT) | Reescreve a origem do tráfego correspondente para um endereço que você escolhe |
| Sem NAT | Exclui um tráfego específico da tradução, por exemplo o tráfego entre dois sites por um túnel |

Crie uma regra escolhendo o tipo, o tráfego que ela corresponde (origem, destino, serviço) e, para SNAT, o endereço a
usar.

### NETMAP

O NETMAP faz uma tradução **um a um** de uma rede inteira. Cada host mantém sua posição na rede: um host `.15` em
`192.168.1.0/24` pode aparecer como `.15` em outra rede. Isso é usado tipicamente para conectar dois sites que usam os
mesmos endereços, sem renumerar nenhum deles.

### Auxiliares de NAT

Alguns protocolos carregam endereços dentro de seu conteúdo, o que quebra quando o NAT altera os cabeçalhos dos pacotes.
Os auxiliares de NAT são módulos do kernel que corrigem o conteúdo de protocolos específicos. A página os lista e permite
ativar ou desativar cada um.

:::note
Um auxiliar que você desativa pode continuar carregado no kernel porque outro módulo depende dele ou porque foi
carregado antes. A página informa quando isso acontece, e pode ser necessária uma reinicialização para descarregá-lo
totalmente.
:::

## Redirecionamento de portas

**Políticas > Redirecionamento de Portas** envia as conexões que chegam ao endereço público do firewall para um host de
uma rede interna. É como você publica um serviço, como um servidor web.

### Criando um redirecionamento de porta

| Campo | Significado |
|---|---|
| Nome | Um rótulo |
| Protocolo | TCP, UDP, ambos ou qualquer |
| Porta de origem | A porta à qual os clientes se conectam. Um intervalo é aceito |
| Endereço de destino | O host interno, ou um objeto, que recebe o tráfego |
| Porta de destino | A porta no host interno. Se você deixar em branco, é a mesma da porta de origem |
| Restringir acesso a partir de | Por padrão qualquer um pode se conectar. Adicione endereços ou redes para permitir somente eles |
| Reflexão | Permite que hosts da rede interna acessem o serviço usando o endereço público |
| Registro | Grava uma linha de log para as correspondências |

### O que saber

- **O protocolo `qualquer` redireciona tudo.** A página avisa: todo o tráfego desse tipo vai para o destino.
- **Redirecionar todo o tráfego** para um host contorna a proteção do firewall para esse host e torna inacessíveis, nesse
  endereço público, os serviços do próprio firewall, como a interface web ou o SSH.
- A lista de restrição aceita endereços, redes e a maioria dos objetos. Conjuntos de hosts que contêm intervalos de IP ou
  outros objetos não são compatíveis com redirecionamentos de portas.
- Um redirecionamento de porta abre o destino, mas você ainda pode precisar de uma regra de encaminhamento se a política
  da sua zona bloquear o tráfego. Veja [Regras de firewall](firewall-rules.md).

## Páginas relacionadas

- [Zonas e políticas](zones-policies.md)
- [Objetos](objects.md)
