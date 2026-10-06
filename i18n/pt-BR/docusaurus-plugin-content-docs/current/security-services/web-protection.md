---
title: Proteção web
sidebar_position: 5
description: Bloqueie sites por categoria, inspecione o tráfego criptografado onde importa, analise downloads em busca de vírus e force SafeSearch e as restrições do YouTube.
---

# Proteção web

**Serviços de segurança > Proteção web** controla quais sites os seus usuários podem acessar e o que podem baixar. Funciona em
três camadas que você pode usar separadamente ou juntas:

1. **Categorias de sites** (bloqueio). Os sites são classificados em 59 categorias, como conteúdo adulto, jogos de azar,
   drogas, redes sociais, streaming, jogos, malware e phishing. Uma regra bloqueia as categorias que você escolher para as suas
   redes ou dispositivos. Não é preciso nenhum certificado nos dispositivos.
2. **Inspeção do tráfego criptografado.** Para as categorias que você escolher, o firewall abre a conexão HTTPS pelo seu proxy web,
   confere o certificado do site e deixa o antivírus analisar os downloads. Os dispositivos precisam confiar no certificado de
   inspeção do firewall.
3. **Antivírus.** O ClamAV e as regras YARA analisam os arquivos baixados por conexões inspecionadas e os downloads web (HTTP)
   sem criptografia dos mesmos dispositivos. Um arquivo infectado é substituído por uma página de bloqueio e registrado.

A proteção web faz parte do pacote de segurança (veja [Licenciamento e conta](../administration/licensing-account)). Uma unidade
em período de teste pode usá-la.

## Perfis: o jeito rápido

No assistente de configuração (e em **Controle de aplicações**) você pode escolher um perfil. Uma única escolha cria as regras de
aplicações **e** as regras web:

| Perfil | Sites bloqueados | Inspecionado e analisado | Opções para a família |
|---|---|---|---|
| **Padrão** | malware, phishing, hacking, cryptojacking, stalkerware, conteúdo adulto, anonimizadores VPN e proxy, DNS criptografado, pirataria | compartilhamento de arquivos, hospedagem, encurtadores de URL, webmail, fóruns | desligadas |
| **Escola** | Padrão mais jogos de azar, drogas, violência, encontros, redes sociais, streaming, jogos, entretenimento | Padrão mais serviços de IA | SafeSearch ligado, YouTube Estrito |
| **Restrito** | Escola mais compras, esportes, acesso remoto, compartilhamento de arquivos, publicidade, criptomoedas, encurtadores de URL | hospedagem, webmail, fóruns, serviços de IA | SafeSearch ligado, YouTube Moderado |

As regras criadas por um perfil aparecem marcadas como **De um perfil** na lista. Você pode editá-las ou excluí-las; ao escolher outro
perfil, só são substituídas as regras que um perfil criou, nunca as suas.

## Regras

Abra **Serviços de segurança > Proteção web > Regras**.

- **Onde se aplica**: uma ou mais zonas (por exemplo LAN) e, se quiser, apenas alguns dispositivos ou redes (objetos).
- **Bloquear estas categorias**: as categorias a bloquear. Use **Permitir somente estas categorias** para uma lista de permissão; as
  categorias de infraestrutura (redes de entrega de conteúdo, atualizações de software) continuam abertas para a rede não quebrar.
- **Política TLS**: versão mínima do TLS, cifras e verificações de certificado, e o que acontece quando uma verificação falha.
- **Inspecionar o tráfego criptografado**: em uma regra com esta opção, as categorias listadas não são bloqueadas, são **inspecionadas**
  (descriptografadas, verificadas e analisadas). Use uma segunda regra para bloquear outras categorias dos mesmos dispositivos.
- **Forçar SafeSearch** e **Modo restrito do YouTube**: veja abaixo.

As categorias acompanham o catálogo: um site novo em uma categoria fica coberto sem mexer na regra. O catálogo é baixado do servidor de
licenças da Nexwall e atualizado automaticamente; **Configurações** mostra a versão e permite atualizar agora. No firewall só são
instaladas as categorias que as suas regras usam.

:::note
Sites que não estão em nenhuma categoria são permitidos. Para sempre permitir um site ou nunca inspecioná-lo, adicione-o como **exceção**.
:::

## Inspeção do tráfego criptografado

Cada firewall cria a sua própria autoridade certificadora (CA) na primeira vez que precisa inspecionar. Instale este certificado em
cada dispositivo cujo tráfego é inspecionado; caso contrário o navegador mostra um aviso:

1. Abra **Serviços de segurança > Proteção web > Inspeção** e baixe o certificado da CA.
2. Instale-o como autoridade raiz confiável nos dispositivos (Windows: gerenciador de certificados; macOS: Acesso às Chaves; Linux e
   Android: o repositório de certificados do sistema ou o do navegador; empresas o distribuem pela gestão de dispositivos).
3. Verifique um dispositivo abrindo um site inspecionado: o certificado deve ser emitido por *Nexwall Firewall Inspection CA*.

O que vale saber:

- A chave privada da CA fica no firewall e não entra em backups nem em imagens. **Renove** a CA na mesma página se suspeitar que ela
  foi exposta; os dispositivos precisarão confiar no novo certificado.
- Sites que nunca devem ser abertos (bancos, governo, saúde, educação) não estão nas categorias inspecionadas dos perfis.
  Adicione outros sites sensíveis como exceções.
- Se o proxy web parar de responder, o firewall retira o redirecionamento sozinho, as conexões saem direto para a internet
  (sem inspeção) e uma mensagem é registrada. Quando o proxy volta a responder, o redirecionamento retorna.
- Os navegadores podem tentar QUIC (UDP porta 443). Para os dispositivos inspecionados o firewall o recusa e o navegador usa a
  conexão TLS inspecionada (opção `block_quic`, ligada por padrão).
- Aplicações que fixam o certificado (alguns clientes bancários e de atualização) falham quando inspecionadas: adicione-as como exceções.
- A inspeção usa CPU na proporção do tráfego que abre. Comece pelas categorias de que você realmente precisa.

## Antivírus

Abra **Serviços de segurança > Proteção web > Antivírus**.

- **Motores**: ClamAV (assinaturas dos espelhos do ClamAV, atualizadas várias vezes ao dia) e YARA (regras do servidor de licenças da
  Nexwall, atualizadas toda semana). Ambos analisam cada arquivo; qualquer um pode barrá-lo.
- **Armazenamento**: as assinaturas do ClamAV precisam de cerca de 300 MB e o motor de cerca de 1 GB de memória. O antivírus precisa do
  armazenamento de dados do firewall e não inicia sem ele. A primeira inicialização baixa as assinaturas (alguns minutos); a página
  mostra a data delas e o estado de cada motor.
- **Tamanho máximo de análise**: arquivos maiores não são analisados. Escolha se são **permitidos** ou **bloqueados**.
- **Quando o analisador não está disponível**: escolha **abrir em caso de falha** (os downloads continuam) ou **fechar em caso de falha**
  (os downloads são recusados). Se apenas um motor está parado, o outro continua decidindo e a página mostra *degradado*.
- **Detecções**: as últimas detecções são listadas com o cliente, o tamanho do arquivo e a assinatura ou regra que casou.

Para testar o antivírus com segurança baixe o arquivo de teste EICAR (https://www.eicar.org/download-anti-malware-testfile/) de um
dispositivo coberto por uma regra que inspeciona: o download deve ser substituído pela página de bloqueio.

## SafeSearch e modo restrito do YouTube

Uma regra pode forçar os modos seguros dos buscadores e do YouTube para os seus dispositivos:

- **Forçar SafeSearch**: Google (todos os domínios por país), Bing e DuckDuckGo devolvem apenas resultados filtrados.
- **Modo restrito do YouTube**: **Estrito** oculta a maior parte do conteúdo adulto (para crianças), **Moderado** oculta menos (para adolescentes).

Como funciona: o firewall responde os nomes desses serviços com o endereço que os provedores publicam para os modos seguros, só para os
dispositivos da regra. As consultas desses dispositivos a **qualquer** servidor DNS são redirecionadas para ele, então trocar o servidor
DNS no dispositivo não adianta. O DNS sobre HTTPS e TLS são bloqueados pelos perfis. As opções não precisam do certificado de inspeção.

Limites: as opções valem para dispositivos, não para contas de usuário, ainda não há horários nem cotas de tempo, e uma criança que
consiga instalar a própria VPN ou usar a rede móvel fica fora do firewall.

## Logs

Os sites bloqueados e as detecções do antivírus aparecem no **Visualizador de logs** (abas Controle de aplicações, Tráfego do firewall e
Sistema; a aba **Tráfego e aplicações** mostra o que foi usado). O firewall guarda os relatórios de tráfego por hora por 35 dias.

## Solução de problemas

| Sintoma | Verifique |
|---|---|
| Um site bloqueado continua abrindo | O dispositivo não está nas zonas ou objetos da regra; o site está em uma exceção; a lista da categoria ainda não foi instalada (Configurações mostra o estado do catálogo); o site usa um nome que não está em nenhuma categoria. |
| Avisos de certificado em sites inspecionados | A CA de inspeção não está instalada no dispositivo, ou o dispositivo não é o que você pensa (confira o endereço). |
| Um site quebra só quando inspecionado | Ele fixa o certificado: adicione-o como exceção. |
| O antivírus não inicia | Falta o armazenamento de dados (página Armazenamento), a licença não inclui Antivírus / Sandbox, ou o primeiro download das assinaturas não terminou. |
| O SafeSearch não se aplica | O dispositivo não está no escopo da regra, a regra está desativada ou a proteção web está desligada (o aviso no topo da página informa). |
