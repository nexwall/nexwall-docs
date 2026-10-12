---
title: Portal cativo
sidebar_position: 2
description: Exija que os convidados se autentiquem antes de usar a rede.
---

# Portal cativo

**Acesso e Identidade > Portal Cativo** transforma uma interface de rede em uma rede de convidados com uma página de
login. Os dispositivos que se conectam são interceptados até que o usuário se autentique, por exemplo com um código, um
voucher ou um login social, conforme o que o gerenciador de hotspot oferecer. Ele se destina a hotéis, cafés, salas de
espera e escritórios com visitantes.

## Como funciona

A unidade executa a parte do portal cativo que intercepta as conexões. O gerenciamento da experiência do convidado
(páginas, vouchers, sessões e estatísticas) é feito em um **gerenciador de hotspot** no qual a unidade se registra.

### Passo a passo

1. Um convidado se conecta à interface de convidados e recebe um endereço do hotspot (não do DHCP da LAN).
2. O componente de hotspot da unidade (Dedalo, baseado no CoovaChilli) retém o convidado: o tráfego dele ainda não é encaminhado à internet,
   apenas o necessário para chegar à página de login.
3. O navegador do convidado é redirecionado para a página de login, servida pelo gerenciador de hotspot (Icaro), não pelo firewall.
4. O convidado se autentica lá (código, voucher, login social...). O gerenciador avisa à unidade que aquele dispositivo pode sair e por quanto tempo
   (a troca RADIUS entre a unidade e o gerenciador trafega sobre HTTP).
5. A partir daí o tráfego desse dispositivo é encaminhado conforme suas regras de firewall, até a sessão terminar ou expirar.

### Por baixo dos panos

- O hotspot tem seu próprio dispositivo de rede (`tun-dedalo`) e sua própria zona de firewall, `hotspot`. Uma regra descarta o encaminhamento da interface
  de convidados para dispositivos não autenticados; a zona é onde você decide o que os convidados autenticados podem alcançar.
- A unidade se registra no gerenciador com o endpoint e as credenciais da aba **Configurações**. O gerenciador é um servidor externo: se ele
  estiver inacessível, novos convidados não conseguem entrar, enquanto os já autenticados mantêm a sessão até ela terminar.
- As regras de firewall, a [QoS](../network/qos.md) e a proteção de conteúdo da [Proteção web](../security-services/web-protection.md) se aplicam
  à zona hotspot como a qualquer outra.

## Configurando

1. Abra a aba **Configurações** e entre: informe o **endpoint** do gerenciador de hotspot e o usuário e a senha que você
   recebeu.
2. Escolha o **dispositivo de rede** no qual o hotspot escuta. Ele intercepta todas as conexões dessa interface e exige
   autenticação.
3. Escolha o **endereço de rede** do hotspot. Os convidados recebem endereços dentro dessa rede.
4. Defina o **limite de DHCP**, o número máximo de concessões. O primeiro endereço do intervalo DHCP é calculado para
   você.
5. Salve. Todas as alterações pendentes na configuração do firewall e da rede são confirmadas.

## Sessões

A aba **Status** mostra as sessões dos clientes conectados a esta unidade.

## Removendo a unidade do gerenciador

**Cancelar registro** separa a unidade do gerenciador de hotspot. A configuração local do firewall e da rede não é
alterada, então remova você mesmo a rede do hotspot se não precisar mais dela.

## Boas práticas

- Coloque o hotspot em uma zona própria, separada da LAN. Veja [Zonas e políticas](../policy/zones-policies.md).
- Limite o que os convidados podem alcançar com [regras de firewall](../policy/firewall-rules.md) e limite a banda com
  [QoS](../network/qos.md).
- Em um par de alta disponibilidade, o hotspot funciona somente em uma interface física, e as sessões ativas não
  sobrevivem a uma troca, veja [Alta disponibilidade](../infrastructure/high-availability.md).
