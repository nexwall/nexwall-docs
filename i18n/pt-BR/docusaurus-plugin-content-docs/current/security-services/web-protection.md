---
title: Proteção web
sidebar_position: 5
description: Bloqueie sites por categoria, leia as páginas com um filtro de conteúdo, inspecione o tráfego criptografado onde importa, analise downloads e force SafeSearch e as restrições do YouTube.
---

# Proteção web

**Serviços de segurança > Web Protection** controla quais sites seus usuários podem acessar e o que podem baixar. Funciona em
camadas que você pode usar separadamente ou juntas:

1. **Categorias de sites** (bloqueio). Os sites são classificados em categorias como conteúdo adulto, apostas, drogas, redes
   sociais, streaming, jogos, malware e phishing. Uma regra bloqueia as categorias que você escolher para suas redes ou dispositivos.
   A primeira camada não precisa de certificado nos dispositivos.
2. **Página de bloqueio.** Quando um site é bloqueado, o usuário vê uma página que explica o motivo em vez de um erro de conexão.
3. **Filtro de conteúdo.** As palavras de uma página são lidas e pontuadas; uma página com pontuação alta demais para o perfil é bloqueada.
4. **Inspeção do tráfego criptografado.** Para as categorias que você escolher, o firewall abre a conexão HTTPS por meio do seu proxy web,
   verifica o certificado do site, aplica a página de bloqueio e o filtro de conteúdo, e deixa o antivírus analisar os
   downloads. Os dispositivos precisam confiar no certificado de inspeção do firewall.
5. **Antivírus e sandbox.** ClamAV e YARA analisam os arquivos baixados; os arquivos que eles não conseguem decidir podem ser abertos em um sandbox
   (**Intelligent Threat Block**).

O Web Protection faz parte do Security Bundle (veja [Licenciamento e conta](../administration/licensing-account)). Uma unidade em
período de teste pode usá-lo.

## Padrões em uma unidade nova

Na primeira vez que uma unidade inicia, os **padrões seguros** são aplicados uma única vez, mesmo que você nunca execute o assistente: o IPS, o filtro
DNS, a proteção de IP e países, e o perfil **Padrão** do Controle de aplicações, que cria as regras do Web Protection desse perfil
(com seu perfil de filtro de conteúdo, e o antivírus quando a licença o inclui e existe o armazenamento de dados).
Execute o assistente ou abra **Controle de aplicações** para escolher outro perfil. Nada é aplicado de novo nas inicializações seguintes.

## Perfis: o caminho rápido

No assistente de configuração (e em **Controle de aplicações**) você pode escolher um perfil. Uma única escolha cria as regras de aplicações **e** as de
sites:

| Perfil | Sites bloqueados | Inspecionado e analisado | Opções familiares | Filtro de conteúdo |
|---|---|---|---|---|
| **Padrão** | malware, phishing, hacking, cryptojacking, stalkerware, conteúdo adulto, anonimizadores VPN e proxy, DNS criptografado, pirataria | compartilhamento de arquivos, hospedagem, encurtadores de URL, webmail, fóruns | desligadas | Work |
| **Escola** | Padrão mais apostas, drogas, violência, relacionamento, redes sociais, streaming, jogos, entretenimento | Padrão mais serviços de IA | SafeSearch ligado, YouTube Estrito | School |
| **Restrito** | Escola mais compras, esportes, acesso remoto, compartilhamento de arquivos, publicidade, criptomoedas, encurtadores de URL | hospedagem, webmail, fóruns, serviços de IA | SafeSearch ligado, YouTube Moderado | Private |

As regras criadas por um perfil são marcadas **De um perfil** na lista. Você pode editá-las; escolher outro perfil substitui
somente as regras que um perfil criou, nunca as suas.

## As abas

| Aba | Para que serve |
|---|---|
| **Regras** | As regras: onde se aplicam, o que bloqueiam, inspecionam ou forçam |
| **Políticas TLS** | Versão mínima de TLS, cifras e verificações de certificado, e o que acontece quando uma falha |
| **Filtro de conteúdo** | Os três perfis de conteúdo (School, Private, Work): modo, limite, assuntos e alcance |
| **Exceções** | Sites que sempre são permitidos ou nunca inspecionados, e a lista gerenciada de sites que nunca são inspecionados |
| **Configurações** | O módulo, a inspeção SSL e sua CA, as listas de categorias, as atualizações automáticas, o antivírus, o sandbox e o monitor do motor |

## Regras

Abra a aba **Regras**.

- **Onde se aplica**: uma ou mais zonas (por exemplo LAN) e, se quiser, apenas alguns dispositivos ou redes (objetos).
- **Bloquear estas categorias**: as categorias a bloquear. Use **Permitir somente estas categorias** para uma lista de permitidos; as
  categorias de infraestrutura (redes de distribuição de conteúdo, atualizações de software) ficam abertas para a rede continuar funcionando.
- **Inspecionar**: bloquear e inspecionar são duas escolhas separadas. Bloquear nunca precisa do proxy: é decidido pelo nome do servidor
  e quase não custa nada. Inspecionar é o que abre uma categoria no proxy (descriptografa). Na coluna **PERMITIDAS**, inspecionar deixa o
  antivírus, o filtro de conteúdo e a política TLS olharem dentro do tráfego; na coluna **BLOQUEADAS**, deixa o proxy mostrar uma página
  de bloqueio em vez de um erro de conexão. Cada coluna tem uma chave **Inspecionar tudo** no alto e cada categoria tem seu próprio botão
  **Inspecionar**, assim você abre só o necessário e o resto fica fora do proxy.
- **Filtro de conteúdo**: o perfil de conteúdo da regra, ou nenhum.
- **Forçar SafeSearch** e **Modo restrito do YouTube**: veja abaixo.

Para excluir uma regra abra o **menu de três pontos** da regra e escolha **Excluir**. Não há botão de excluir na linha de propósito,
para que uma regra não seja removida por um clique acidental.

As categorias seguem o catálogo: um site novo adicionado a uma categoria fica coberto sem mexer na regra. O catálogo é
baixado do servidor de licenças da Nexwall e atualizado automaticamente; **Configurações** mostra sua versão e permite atualizá-lo
agora. Somente as categorias que suas regras usam são instaladas no firewall.

:::note
Os sites que não estão em nenhuma categoria são permitidos. Para sempre permitir ou nunca inspecionar um site, adicione-o como **exceção**.
:::

## A página de bloqueio

Quando você **inspeciona** categorias bloqueadas, um site bloqueado mostra ao usuário uma página que explica o motivo (em português, espanhol ou inglês, com a
categoria, a regra e um código de referência) em vez de um erro de conexão. O tráfego web dos clientes da regra passa então pelo
proxy do firewall.

- Sites por **HTTP** sempre mostram a página.
- Sites por **HTTPS** a mostram apenas aos dispositivos que confiam no certificado de inspeção do firewall. Sem o certificado, o
  navegador mostra seu próprio aviso de segurança, pois a página não pode ser exibida sem abrir a conexão. As categorias grandes demais para o
  proxy, e as aplicações, continuam sendo bloqueadas como antes, sem página.
- Se o proxy estiver fora do ar, as conexões bloqueadas ainda são cortadas pela primeira camada (o classificador de tráfego). Uma resposta muito pequena pode chegar
  antes de o classificador decidir, então não conte com isso como garantia.

## Filtro de conteúdo

O **Filtro de conteúdo** lê as palavras de uma página ao passar pelo proxy e dá uma pontuação de 0 a 100 em seis assuntos: conteúdo
adulto, violência, drogas, apostas, discurso de ódio e automutilação. Uma página cuja pontuação atinge o limite do perfil é substituída pela
página de bloqueio (com o assunto e a pontuação) ou apenas registrada, conforme o modo.

| Perfil | Limite | Sensibilidade | Assuntos | Páginas lidas por padrão |
|---|---|---|---|---|
| **School** | 45 | alta | os seis | fóruns e blogs, notícias, entretenimento, portais, esportes, redes sociais, jogos |
| **Private** | 60 | média | adulto, violência, drogas, ódio, automutilação | fóruns e blogs, notícias, entretenimento, portais, esportes |
| **Work** | 85 | baixa | adulto, ódio | fóruns e blogs, notícias, portais |

Na aba **Filtro de conteúdo** você pode mudar, para cada perfil, o modo (**bloquear** ou **apenas registrar**), o limite (20 a 95), os
assuntos e o alcance (certas categorias ou todos os sites). **Voltar aos padrões** restaura o perfil. Uma regra escolhe um perfil.

Como a pontuação funciona, em resumo: cada assunto tem uma lista de palavras e frases em inglês, espanhol e português com pesos; quanto mais
palavras e mais pesadas, maior a pontuação. Uma página longa conta menos, palavras de estudo, saúde ou notícias ao redor do assunto reduzem a
pontuação e, para automutilação, palavras de ajuda a reduzem bastante. Páginas com menos de 25 palavras não são julgadas e as com mais de 2 MB não são lidas.

Limites, com honestidade:

- Lê **palavras, não imagens**. As imagens não são cobertas.
- Uma lista de palavras pode errar nos dois sentidos (uma página médica sobre drogas, uma página inofensiva que menciona uma marca de apostas). O modo **apenas registrar**
  e o limite existem para isso: comece registrando, revise o log e depois bloqueie.
- Somente páginas HTML são lidas. As páginas HTTPS são lidas só onde o proxy descriptografa (as categorias do perfil, ou todos os sites se você escolher esse alcance,
  o que custa mais processador e pode quebrar aplicações que recusam uma conexão descriptografada). As redes sociais enviam seu texto como dados, não como
  página, então use regras de categoria, SafeSearch e o Modo restrito do YouTube para elas.
- A verificação falha aberta: se o serviço dela estiver fora do ar, o proxy continua funcionando e as páginas não são julgadas.

## Inspeção do tráfego criptografado

Somente as categorias que você marcar como **Inspecionar** passam pelo proxy. Cada firewall cria sua própria autoridade certificadora (CA) na primeira vez em que a inspeção é necessária. Instale este certificado em cada
dispositivo cujo tráfego é inspecionado; caso contrário o navegador mostra um aviso:

1. Abra **Serviços de segurança > Web Protection > Configurações**, seção **Inspeção SSL**, e baixe o certificado da CA.
2. Instale-o como autoridade raiz confiável nos dispositivos (Windows: gerenciador de certificados; macOS: Acesso às Chaves; Linux e
   Android: o repositório de certificados do sistema ou o do navegador; as empresas o distribuem com a gestão de dispositivos).
3. Verifique um dispositivo abrindo um site inspecionado: o certificado exibido é emitido por *Nexwall Firewall Inspection CA*.

Vale saber:

- Depois de restaurar um backup em um firewall novo ou reinstalado, as regras e os perfis voltam, mas o firewall cria uma CA de inspeção **nova**: instale o novo certificado nos dispositivos novamente. As listas de categorias, as assinaturas do antivírus e as regras YARA são baixadas de novo após a primeira verificação de licença (alguns minutos).
- A chave privada da CA fica no firewall e não é incluída em backups nem em imagens. **Gire** a CA na mesma
  seção se suspeitar que ela foi exposta; os dispositivos deverão então confiar no novo certificado.
- Sites que nunca devem ser abertos (bancos, governo, saúde, educação) não estão nas categorias inspecionadas dos
  perfis. Adicione outros sites sensíveis como exceções.
- Se o proxy web parar de responder, o firewall remove o redirecionamento por conta própria e as conexões vão direto para a internet
  (sem inspeção), e registra uma mensagem. Quando o proxy volta a responder, o redirecionamento retorna.
- Os navegadores podem tentar QUIC (UDP porta 443). Para os dispositivos inspecionados o firewall o recusa para que o navegador use a
  conexão TLS inspecionada.
- Aplicações que fixam seus certificados (alguns clientes bancários e de atualização) falham ao serem inspecionadas: adicione-as como exceções.
- A inspeção usa processador em proporção ao tráfego que abre. Comece com as categorias de que realmente precisa.

## Antivírus

Em **Configurações**, seção **Antivírus**.

- **Motores**: ClamAV (assinaturas dos espelhos do ClamAV, atualizadas várias vezes ao dia) e YARA (regras do servidor de licenças da Nexwall,
  atualizadas semanalmente). Ambos analisam cada arquivo; qualquer um pode barrá-lo.
- **Armazenamento**: as assinaturas do ClamAV precisam de cerca de 300 MB e o motor de cerca de 1 GB de memória. O antivírus precisa do armazenamento de
  dados do firewall e não inicia sem ele. A primeira inicialização baixa as assinaturas (alguns minutos); a página
  mostra a data delas e o estado de cada motor.
- **Tamanho máximo de análise**: arquivos maiores não são analisados. Escolha se são **permitidos** ou **bloqueados**.
- **Quando o analisador não está disponível**: escolha **falhar aberto** (os downloads continuam) ou **falhar fechado** (os downloads são
  recusados). Se apenas um motor está fora, o outro continua decidindo e a página mostra *degradado*.
- **Detecções**: as últimas detecções são listadas com o cliente, o tamanho do arquivo e a assinatura ou regra que coincidiu.

Para testar o antivírus com segurança baixe o arquivo de teste EICAR (https://www.eicar.org/download-anti-malware-testfile/) de um
dispositivo coberto por uma regra que inspeciona: o download deve ser substituído pela página de bloqueio.

## Sandbox (Intelligent Threat Block)

Os arquivos que o antivírus não consegue decidir são abertos em uma máquina Windows isolada e julgados pelo que fazem.

- **Usar o sandbox** o liga (precisa da licença que o inclui). Escolha o **idioma da máquina de análise**.
- **Reter downloads de risco até o veredito**: desligado por padrão, o usuário recebe o arquivo na hora e um alerta se segue caso se revele
  malicioso. Ligado, o download espera o veredito até a **espera máxima** que você definir (15 a 300 segundos; uma análise normal
  leva cerca de 90 segundos); se não houver veredito a tempo, o arquivo é entregue.
- **Barrar também arquivos julgados suspeitos**: trata *suspeito* como *malicioso*.
- **Limites**: 60 arquivos por hora, 500 arquivos e 500 MB por dia, 20 MB por arquivo, 2 análises ao mesmo tempo (uma licença de teste recebe metade).
  Arquivos fora dos limites não são enviados e são entregues normalmente.
- A página mostra os arquivos analisados, os que aguardam, os maliciosos ou suspeitos e a última mensagem.

## SafeSearch e Modo restrito do YouTube

Uma regra pode forçar os modos seguros dos buscadores e do YouTube para seus dispositivos:

- **Forçar SafeSearch**: Google (todos os domínios por país), Bing e DuckDuckGo devolvem apenas resultados filtrados.
- **Modo restrito do YouTube**: **Estrito** oculta a maior parte do conteúdo adulto (para crianças), **Moderado** oculta menos (para adolescentes).

Como funciona: o firewall responde os nomes desses serviços com o endereço que os provedores publicam para seus modos seguros, somente
para os dispositivos da regra. As consultas desses dispositivos a **qualquer** servidor DNS são redirecionadas para ele, então trocar o servidor DNS no
dispositivo não adianta. Os perfis bloqueiam DNS sobre HTTPS e TLS. As opções não precisam do certificado de inspeção. O firewall
mantém os endereços do modo seguro fora do classificador de tráfego para que o Controle de aplicações não os corte.

Limites: as opções se aplicam a dispositivos, não a contas de usuário, ainda não há horários nem cotas de tempo, e uma criança que consiga
instalar sua própria VPN ou usar a rede móvel fica fora do firewall.

## Logs

No **Visualizador de logs**, a aba **Web Protection** mostra todo o tráfego web do proxy, permitido ou bloqueado: páginas de bloqueio, arquivos barrados
pelo antivírus ou pelo sandbox, bloqueios do filtro de conteúdo e requisições que o proxy recusou. Uma caixa de seleção inclui as mensagens dos serviços do Web
Protection. Clique em um dispositivo para pesquisá-lo. A aba **Tráfego e aplicações** mostra o que foi usado. O firewall guarda
os relatórios horários de tráfego por 35 dias, e [Análise de ameaças](../operation-analytics/threat-analytics) mostra o que foi barrado.

## Solução de problemas

| Sintoma | Verifique |
|---|---|
| Um site bloqueado ainda abre | O dispositivo não está nas zonas ou objetos da regra; o site está em uma exceção; a lista de categorias ainda não foi instalada (Configurações mostra o estado do catálogo); o site usa um nome que não está em nenhuma categoria. |
| Um site HTTPS bloqueado mostra aviso de certificado | A página de bloqueio sobre HTTPS precisa da CA de inspeção no dispositivo. Instale-a, ou aceite o aviso: o site está bloqueado de qualquer forma. |
| Avisos de certificado em sites inspecionados | A CA de inspeção não está instalada no dispositivo, ou o dispositivo não é o que você pensa (verifique o endereço). |
| Um site quebra só quando inspecionado | Ele fixa seu certificado: adicione-o como exceção. |
| Uma página inofensiva é bloqueada pelo filtro de conteúdo | Mude o perfil para **apenas registrar**, ou aumente o limite; a página de bloqueio mostra o assunto e a pontuação. |
| O antivírus não inicia | Falta o armazenamento de dados (página Armazenamento), a licença não inclui Antivírus / Sandbox, ou o primeiro download de assinaturas não terminou. |
| O SafeSearch não se aplica | O dispositivo não está no alcance da regra, a regra está desativada, ou o Web Protection está desligado (o aviso no alto da página informa). |
