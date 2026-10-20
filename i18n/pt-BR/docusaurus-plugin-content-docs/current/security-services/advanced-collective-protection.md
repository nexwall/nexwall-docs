---
title: Proteção Avançada e Coletiva (IA)
sidebar_position: 6
description: Avisos sobre dispositivos que se comportam como infectados e as listas compartilhadas dos firewalls Nexwall.
---

# Proteção Avançada e Coletiva (IA)

**Serviços de segurança > Proteção Avançada e Coletiva (IA)** reúne duas proteções em uma página. As duas precisam do
módulo de Proteção Avançada contra Ameaças do seu plano (ele está incluído no teste).

| Proteção | O que faz | Bloqueia? |
|---|---|---|
| **Proteção Avançada** | Pontua cada dispositivo das suas redes internas com um modelo de comportamento que roda neste firewall e gera um aviso, com o motivo em palavras, quando um age como uma máquina infectada | Não. Os avisos são informativos |
| **Proteção Coletiva** | Usa listas de endereços e nomes de domínio externos que vários firewalls Nexwall encontraram por trás de ataques e que a Nexwall revisou, e, se você permitir, envia relatórios do mesmo tipo | Sim, pelo Bloqueio de IP e Geografia e pela Filtragem de DNS, apenas para as entradas que a Nexwall aprovou |

No canto superior direito da página, um selo para cada proteção mostra o estado como o firewall realmente o tem, não só a
chave: **em execução** (verde), **degradada** (âmbar: funciona, mas algo está errado, e o aviso sob o selo diz o quê),
**não está em execução** (vermelho: ativada, mas o serviço está parado) ou **desativada**.

## Proteção Avançada

A cada minuto o firewall pontua cada dispositivo das redes internas com o modelo de comportamento. Ele observa quão
regulares são as conexões, quantos dados saem, portas incomuns, com quantos destinos novos o dispositivo se conecta e os
nomes DNS que ele pede (nomes de aparência gerada, consultas que falham). Nenhum conteúdo e nenhum endereço web completo é
lido.

Um dispositivo que parece infectado aparece como aviso em **Operação e Análise > Análise de Ameaças** (camada Proteção
Avançada) e na lista no fim desta página, com os motivos. O aviso é informativo: esta proteção não bloqueia nada.

Desative com a chave e **Salvar**, e depois aplique as alterações. O serviço de pontuação para; as outras proteções não são
afetadas. O monitor da página mostra a CPU e a memória do serviço, quantas conexões e nomes DNS ele lê por minuto, quanto
dura um ciclo de pontuação e quantos dispositivos ele acompanha.

## Proteção Coletiva

A Proteção Coletiva acrescenta duas listas às listas de ameaças da Nexwall: **Defesa Coletiva: endereços** (usada pelo
Bloqueio de IP e Geografia) e **Defesa Coletiva: domínios** (usada pela Filtragem de DNS). Elas são ativadas uma única vez,
quando o seu firewall as vê pela primeira vez; depois disso a sua escolha vale. Uma entrada só é publicada para todos os
firewalls depois que pelo menos três firewalls diferentes a informaram e a Nexwall a revisou, e ela expira catorze dias
depois do último relatório. Os serviços que aplicam as listas precisam estar ligados; a página avisa quando um está desligado.

### Relatórios

Com **Enviar relatórios para a Nexwall** ativado (o padrão), o firewall envia um relatório curto quando a Proteção Avançada
encontra um dispositivo agindo como infectado, para que os outros firewalls Nexwall sejam protegidos do mesmo atacante. Um
relatório contém apenas:

- o endereço ou nome de domínio **externo** que o dispositivo contatou ou pediu,
- o tipo de evidência (conexões periódicas ou um nome de aparência gerada) e uma pontuação,
- a versão do modelo e o dia.

Um relatório nunca contém dados: nem arquivos, nem tráfego, nem endereços ou páginas da web, nem nomes de usuário, nem
endereços ou nomes da sua rede interna ou do dispositivo. Endereços privados e nomes sob domínios de nível superior
privados (`.lan`, `.local`, `.internal`, ...) são removidos no firewall e de novo no servidor. Você pode desativar os
relatórios a qualquer momento; a proteção do firewall continua funcionando e continua recebendo as listas compartilhadas.
Leia o aviso de privacidade ligado ao lado da chave.

## Atualizações

O cartão **Atualizações do modelo e das listas** mostra o que o firewall tem do servidor da Nexwall: o modelo de
comportamento (nome, versão, quando foi treinado, a janela que observa e seus limiares), o pacote de listas de ameaças com o
número de endereços e domínios compartilhados, e o último relatório enviado. Tudo é assinado: o firewall confere a
assinatura e o hash antes de usar um arquivo e mantém o modelo anterior se um novo for recusado.

- **Atualizar agora** busca um modelo novo e listas novas na hora e envia um relatório pendente.
- **Atualizações automáticas do modelo**: escolha com que frequência o modelo é buscado (a cada 1, 3, 6, 12 ou 24 horas). As
  listas compartilhadas seguem o calendário das listas do Threat Shield (a cada 30 minutos). Os relatórios são enviados no
  máximo uma vez por hora.

## Quando o selo não está verde

| Aviso | Significado | O que fazer |
|---|---|---|
| O serviço de pontuação não está em execução ou parou de informar | A Proteção Avançada está ativada mas o serviço está parado | Aguarde um minuto; se continuar, veja o registro do sistema (`logread | grep nexwall-atp`) e fale com o suporte |
| Ainda não há modelo de comportamento instalado | O modelo não foi baixado | Use **Atualizar agora**; confira se o firewall alcança o servidor de licenças da Nexwall |
| Os nomes DNS não podem ser lidos | A visão de pacotes das redes internas não pôde ser aberta, por isso faltam os sinais de DNS | Confira se as interfaces internas existem; a visão é tentada de novo a cada dez minutos |
| O modelo não é verificado há muito tempo | O servidor da Nexwall não é alcançado ou a verificação falha | Confira a conexão com a Internet e o estado da licença |
| A lista compartilhada está desativada ou não foi baixada | A lista ainda não está em uso | Use **Atualizar agora**; as listas são ativadas na primeira atualização |
| O Bloqueio de IP e Geografia / Filtragem de DNS está desativado | A lista compartilhada não é aplicada por um serviço desligado | Ative o serviço em Serviços de segurança |

## O que ela não consegue fazer

O modelo de comportamento foi treinado com cenários de laboratório e é **informativo**. Ele pode deixar passar um
dispositivo infectado e pode avisar sobre um inofensivo, por exemplo um programa que se conecta em intervalos regulares.
Trate um aviso como um motivo para olhar o dispositivo, não como um veredito. Ele não substitui o IPS, o antivírus nem o
sandbox, e não vê o tráfego que não passa pelo firewall nem o DNS criptografado. Os números medidos estão nas notas da versão.

## Linha de comando

```
nexwall-atp status      # estado do serviço em JSON
nexwall-atp update      # buscar um modelo novo agora
nexwall-atp rollback    # voltar ao modelo anterior
nexwall-atp report      # enviar o relatório pendente agora
```
