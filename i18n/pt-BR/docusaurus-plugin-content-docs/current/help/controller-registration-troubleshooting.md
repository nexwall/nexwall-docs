---
title: Solução de problemas de registro no controlador
sidebar_position: 3
description: Diagnostique problemas de vínculo e conexão entre uma unidade e um controlador, dos dois lados, pela linha de comando.
---

# Solução de problemas de registro no controlador

Isso vai além da [verificação básica](troubleshooting.md) e exige acesso SSH à unidade e ao host do controlador. Use
quando uma unidade não consegue se vincular a um controlador, a conexão cai repetidamente, ou ela se conecta mas o
controlador não consegue alcançá-la.

## Como funciona o registro

1. No controlador, adicionar uma unidade gera um **código de vínculo**: uma string em base64 contendo o endereço do
   controlador, um token de registro e o ID da nova unidade. O controlador também emite um certificado de cliente
   OpenVPN para esse ID, mas a unidade ainda não o usou.
2. Na unidade, informar o código de vínculo inicia o `ns-plug`, que chama o endpoint de registro do controlador com o
   token e os dados da unidade.
3. O controlador verifica o token e o certificado que emitiu, armazena as credenciais da unidade e devolve a
   configuração da VPN.
4. A unidade abre um túnel OpenVPN até o controlador. Ao conectar, o controlador atribui a ela um endereço de VPN e
   cria uma rota no proxy para que sua interface web e API fiquem acessíveis pelo controlador.

Uma parada em qualquer etapa ajuda a localizar o problema: nenhuma resposta ao código de vínculo é um problema de
rede ou do lado da unidade; uma VPN conectada sem rota no proxy é um problema do lado do controlador.

## Na unidade

### Verifique o estado atual

```bash
ubus call ns.plug status
```

`status` é um de `unregistered`, `pending` (registrada, mas o túnel não está ativo) ou `connected`.
`push_last_sent` mostra quando as métricas foram enviadas ao controlador pela última vez, `-1` se nunca.

### Comandos de registro

```bash
# registrar com um código de vínculo
echo '{"join_code":"<código>","tls_verify":true,"unit_name":"fw1.exemplo.com","description":""}' | ubus call ns.plug register

# cancelar o registro e limpar o estado local
ubus call ns.plug unregister

# reiniciar o cliente sem alterar sua configuração
ubus call ns.plug restart
```

O código de vínculo é apenas um JSON em base64, então dá para inspecioná-lo sem se registrar:

```bash
echo '<código>' | base64 -d
# {"unit_id":"...","token":"...","fqdn":"controller.exemplo.com"}
```

Isso pega os dois erros mais comuns: um código copiado do controlador errado, ou um código velho porque a unidade já
foi removida e adicionada de novo no controlador desde que ele foi gerado.

### Serviço, configuração e logs

| O quê | Comando |
|---|---|
| Reiniciar o cliente | `/etc/init.d/ns-plug restart` |
| Configuração atual | `uci show ns-plug` |
| Logs do cliente | `logread \| grep -i ns-plug` |
| Configuração OpenVPN gerada | `cat /usr/share/ns-plug/client.conf` (só existe após um registro bem-sucedido) |
| Interface do túnel | `ip -4 addr show tun-nsplug` (só aparece depois que o túnel sobe) |

O `ns-plug` é supervisionado pelo `procd` e reinicia sozinho se travar, então uma unidade parada em `pending`
geralmente está tentando de novo em silêncio, não parada. O `logread` mostra cada tentativa e o resultado dela.

### Entendendo o comportamento de saída

O `ns-plug` falha rápido quando falta configuração e desiste depois de cinco tentativas sem sucesso de alcançar o
controlador:

| Código de saída | Significado |
|---|---|
| 1 | Nenhum endereço de controlador configurado |
| 2 | Nenhum ID de unidade configurado |
| 3 | Nenhum token configurado |
| 4 | O controlador respondeu `409` (esse ID de unidade já está registrado com outra conta); as credenciais locais são apagadas |
| 5 | Controlador inacessível depois de 5 tentativas (10 segundos) |

Os códigos 1–3 significam que o código de vínculo nunca chegou a ser aplicado — repita a etapa de registro. O
código 4 significa que a unidade foi removida e adicionada de novo no controlador, ou que o código de vínculo foi
reaproveitado; remova a unidade no controlador primeiro, ou use um código de vínculo novo. O código 5 é um problema
de rede: confirme que a unidade consegue resolver e alcançar o endereço do controlador na porta 443, e que o
relógio dela está certo (um relógio errado faz o handshake TLS falhar).

## No controlador

### Encontre os logs

O contêiner da API registra cada tentativa de registro na saída de erro, com o prefixo `[RegisterUnit]` ou
`[AddUnit]`:

```bash
podman logs <nome-do-contêiner-api> 2>&1 | grep -i registerunit
# ou, com docker:
docker logs <nome-do-contêiner-api> 2>&1 | grep -i registerunit
```

Os logs do contêiner do servidor OpenVPN cobrem o túnel em si (erros de handshake e certificado), e os logs do
contêiner do proxy cobrem o roteamento depois que uma unidade se conecta.

### O que cada mensagem de erro significa

| Mensagem | Causa | Correção |
|---|---|---|
| `registration token required` | A unidade não enviou nenhum token | Build antigo ou corrompido do `ns-plug`; registre de novo com um código de vínculo novo |
| `invalid registration token` | O token no código de vínculo não bate com o token atual do controlador | O token de registro do controlador mudou desde que o código foi gerado, ou o código é de outro controlador |
| `unit not allowed, no certificate found` | O ID de unidade na requisição nunca foi adicionado no controlador | Adicione a unidade no controlador para gerar um código de vínculo novo, e use esse |
| `unit subscription is required` | O controlador exige assinaturas, mas a unidade não enviou nenhuma | Verifique o status de assinatura da unidade, ou a exigência de assinatura do controlador |
| `unit with subscription is not allowed` | O controlador não espera assinaturas, mas a unidade enviou uma | O erro oposto ao da linha acima |
| HTTP `409` (sem corpo de mensagem) | Já existe uma unidade com esse ID registrada com outro usuário | Remova a unidade existente no controlador antes de adicioná-la de novo |
| `cannot retrieve openvpn config: ...` / `cannot write credentials file` | O controlador não conseguiu ler seus próprios arquivos de PKI ou escrever no diretório de credenciais | Verifique as permissões e se o volume com a PKI do OpenVPN e o diretório de credenciais está montado e gravável |

### Confirme o registro da unidade

Com um token de administrador:

```bash
curl -s -H "Authorization: Bearer <token>" https://<controlador>/api/units/<id-da-unidade>
```

`registered` e `vpn_connected_since` mostram se o controlador considera a unidade registrada e atualmente
conectada. Se `vpn_connected_since` nunca atualiza depois que a unidade relata `connected` localmente, o problema
está do lado do controlador do túnel, não na unidade.

### Túnel e rota do proxy

- O contêiner da API espera pelo socket de gerenciamento do OpenVPN em `/etc/openvpn/run/mgmt.sock` antes de subir;
  se os logs dele mostrarem `Socket not found!`, o servidor OpenVPN ainda não estava de pé ou os dois contêineres
  não compartilham esse volume.
- Quando uma unidade se conecta, aparece um arquivo de rota em `/etc/openvpn/proxy/<id-da-unidade>.yaml` dentro do
  diretório de configuração do proxy. Se a unidade aparece como conectada mas esse arquivo não existe, o hook de
  conexão não terminou — verifique se o banco de dados de relatórios está acessível, já que o hook também
  atualiza ele.
- Verifique se o certificado não expirou: `openssl x509 -in /etc/openvpn/pki/issued/<id-da-unidade>.crt -noout
  -enddate`. Os certificados são renovados automaticamente quando faltam seis meses de validade, mas só enquanto o
  controlador está rodando para fazer isso.

### Repita um registro manualmente

Para distinguir um problema do lado da unidade de um problema do lado do controlador, chame o endpoint diretamente
a partir do host do controlador, com os mesmos campos que o `ns-plug` envia:

```bash
curl -s -H "Content-Type: application/json" -H "RegistrationToken: <token>" \
  https://<controlador>/api/units/register -X POST \
  --data '{"unit_id":"<id-da-unidade>","unit_name":"teste","username":"teste","password":"teste","version":"","subscription_type":""}'
```

Uma resposta aqui diferente da que a unidade recebe significa que a diferença está no que a unidade envia ou em
como ela alcança o controlador, não na lógica do próprio controlador.

## Páginas relacionadas

- [Gerenciamento central](../administration/central-management.md)
- [Logs](../operation-analytics/logs.md)
- [Linha de comando e perguntas frequentes](command-line-and-faq.md)
- [Referência de comandos de serviço e log](service-and-log-reference.md)
