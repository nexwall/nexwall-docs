---
title: Solução de problemas
sidebar_position: 1
description: Encontre a causa de um problema a partir do que você observa.
---

# Solução de problemas

Comece pelo sintoma. Cada seção lista as causas mais prováveis na ordem em que vale a pena verificá-las. A maioria das
verificações usa a interface web; as poucas que precisam da linha de comando remetem a
[Linha de comando e perguntas frequentes](command-line-and-faq.md).

## Não consigo abrir a interface web

1. Verifique se o seu computador está no lado da **LAN** e tem um endereço na rede da LAN (`192.168.1.0/24` por padrão).
2. Use `https://` e o endereço da unidade. Aceite o aviso do certificado autoassinado.
3. Se você alterou as configurações de acesso no assistente ou na página Sistema, verifique se a sua rede tem permissão
   para alcançar a interface web.
4. No console, entre como `root` e execute `ip -4 addr` para confirmar o endereço da LAN.
5. Se você perdeu a senha, use o console para redefini-la ou restaure um backup.

## A LAN está sem internet

1. Abra **Operação e Análises > Painel** e olhe o cartão da conexão de internet.
2. Em **Rede > Interfaces**, verifique se a WAN tem endereço, gateway e servidores DNS. Com uma WAN estática, é necessário
   pelo menos um encaminhador de DNS em **Rede > DNS e DHCP**.
3. Verifique se existe uma regra de mascaramento para a LAN em **Políticas > NAT**.
4. Verifique a política e as regras de LAN para WAN em **Políticas > Zonas e Políticas** e **Políticas > Regras de
   Firewall**.
5. Com vários links WAN, verifique os hosts de monitoramento em **Rede > SD-WAN**: se nenhum responder, o link é
   considerado fora do ar.
6. Use [Conexões](../operation-analytics/monitor-connections.md) para ver se as conexões estão sendo criadas.

## Os nomes não resolvem

- Confirme que os clientes usam a unidade como servidor DNS, ou um servidor que funcione.
- Verifique os encaminhadores em **Rede > DNS e DHCP**.
- Se a filtragem de DNS estiver ativa, verifique se o nome está em uma lista de bloqueio e adicione-o aos domínios
  permitidos se ele não deveria ser bloqueado.
- Verifique se um dispositivo com DNS criptografado próprio não está contornando a unidade.

## Um serviço está bloqueado ou inacessível

1. Ative o registro na regra ou na zona e olhe os [Logs](../operation-analytics/logs.md).
2. Verifique a ordem das regras: a primeira correspondência vence.
3. Para um serviço publicado, confirme o redirecionamento de porta, o destino e se a política da zona permite o tráfego.
4. Se o [bloqueio de IP e geolocalização](../security-services/ip-geo-blocking.md) estiver ativo, verifique se o endereço
   está em uma lista ou em um país bloqueado. Adicione-o à lista de permissão se ele deve ser alcançável.
5. Se o [IPS](../security-services/ips.md) estiver ativo, veja os eventos em busca de tráfego bloqueado.

## O controle de aplicações não faz nada

- Confirme que o serviço está habilitado, que a regra está habilitada e que as alterações foram aplicadas.
- Verifique nos fluxos em tempo real se a aplicação é reconhecida. Se aparecer como **Desconhecido**, ela não pode ser
  bloqueada.
- Verifique se a regra está na interface por onde o tráfego passa.
- Verifique se o endereço não está nas exceções.

## Uma VPN não conecta

| Sintoma | Verifique |
|---|---|
| Nenhum handshake | A porta está aberta na WAN e o endereço público ou o nome na configuração está correto |
| Conecta, mas não alcança nada | As rotas ou as redes na definição do túnel e as regras de firewall da zona da VPN |
| Erros de certificado | O relógio nos dois lados e se o certificado expirou ou foi renovado |
| O IPsec não sobe | Os identificadores estão invertidos nas duas pontas, a chave pré-compartilhada e os parâmetros de segurança coincidem, e o serviço foi reiniciado após alterar redes |
| O peer WireGuard está mudo | O peer tem a configuração mais recente após uma alteração no servidor |

Use os [Logs](../operation-analytics/logs.md) e pesquise pelo nome do serviço de VPN.

## A unidade não se registra ou não conecta ao controlador

1. A unidade precisa de internet de saída e de **hora** correta. Um relógio errado faz os certificados falharem.
2. Verifique se a unidade resolve nomes e alcança os serviços Nexwall e o endereço do controlador.
3. Verifique o token ou o código de adesão: ele deve ser recente e não usado.
4. Pesquise nos [Logs](../operation-analytics/logs.md) pelo serviço de registro.

Para os comandos exatos a executar na unidade e no controlador, e o que cada mensagem de erro significa, veja
[Solução de problemas de registro no controlador](controller-registration-troubleshooting.md).

## As atualizações falham

- A mensagem informa o motivo: o servidor de atualizações está em manutenção, a assinatura não é válida ou o endereço do
  repositório não está definido.
- Verifique a conexão de internet, o DNS e a hora.
- Faça backup antes de tentar de novo. Veja [Sistema](../infrastructure/system.md).

## A unidade está lenta

1. Veja a carga e a memória em [Desempenho](../operation-analytics/performance.md).
2. Desative, um de cada vez, os recursos de inspeção habilitados recentemente para encontrar o que mais custa: o sistema
   de prevenção de intrusões e o controle de aplicações.
3. Use o bypass e as exceções para tráfego confiável de alto volume.
4. Verifique nos alertas se o disco não está cheio.

## Os gráficos mostram que o banco de dados não está acessível

O serviço de métricas pode ter parado. Reinicie-o pela linha de comando, veja
[Linha de comando e perguntas frequentes](command-line-and-faq.md).

## Quando você precisar pedir ajuda

Reúna, antes de contatar o suporte: a versão da unidade, o que você estava fazendo, a mensagem exata e as linhas
relevantes do log. Se o seu plano incluir, abra uma sessão de suporte remoto em **Administração > Licenciamento**.
