---
title: "Support Packets: diagnósticos executados pelo controlador"
sidebar_position: 25
description: O que são os Support Packets, o que podem e o que não podem fazer no firewall e como executá-los na tela Suporte do controlador em nuvem.
---

# Support Packets: diagnósticos executados pelo controlador

**O que é.** Um Support Packet é um diagnóstico fixo e documentado que o firewall carrega dentro da imagem. O controlador em nuvem pode pedir ao firewall que execute um deles e traga o resultado, com os dados sensíveis removidos e em um arquivo zip, para o chamado de suporte. É a mesma informação que os artigos de linha de comando desta seção coletam manualmente (por exemplo [KBA-0001](kba-01-health-check) e [KBA-0017](kba-17-support-package)), sem abrir um terminal.

**Aplica-se a.** Nexwall Firewall 26.2.2 ou posterior, gerenciado pelo Nexwall Cloud Controller. Versões anteriores mostram "esta versão do firewall não suporta diagnósticos remotos".

## O que um pacote pode e não pode fazer

- São 26 pacotes, em grupos: saúde, conectividade, DNS, serviços e logs, inspeção e desempenho, Threat Shield, licença e certificado, e capturas de pacotes. A lista completa, com as entradas e o artigo de cada um, está publicada em [support.nexwall.com.br](https://support.nexwall.com.br/pt-BR/#packets), na aba **Support Packets**.
- Um pacote apenas lê. As capturas (classe R1) observam o tráfego correspondente por alguns segundos e terminam sozinhas. Nada altera a configuração.
- O firewall executa somente os pacotes instalados com a imagem. Aceita o nome de um pacote e as entradas desse pacote (um endereço, um nome, uma porta, um número de linhas); qualquer outra coisa é recusada. Nunca executa uma linha de comando livre.
- Cada execução tem limite de tempo e de tamanho da saída, e só um pacote roda por vez.
- Senhas, chaves e tokens são removidos do resultado antes de ele sair do controlador.

No firewall os pacotes são arquivos somente leitura em `/usr/share/nexwall/support-packets` (um `.sh` e um `.json` por pacote). Você pode lê-los ali, e `ubus call ns.support list` mostra quais estão instalados.

## Executar um pacote pelo controlador

1. Abra **Suporte** no menu do controlador e selecione o firewall.
2. Em **Selecione Support Packet**, escolha um pacote. A documentação dele aparece no painel central: o que verifica, as entradas, os limites e o artigo para ler.
3. Preencha as entradas, marque a caixa de confirmação e selecione **Executar**. O botão fica desabilitado até a caixa ser marcada.
4. Leia o resultado no painel central. **Baixar** (canto superior direito do painel) salva os resultados da sessão em um arquivo zip.
5. Para pedir ajuda, anexe o zip ao seu chamado no painel de chat, colando ou escolhendo um arquivo.

## Qual pacote executar

| Sintoma | Pacotes, nesta ordem |
|---|---|
| Não sabe por onde começar | `health-check`, depois `links-routes` |
| Sem internet ou lento | `links-routes`, `ping`, `dns-resolve`, `path-mtu`, `throughput` |
| Um site ou aplicação está bloqueado | `packet-1` (quem descartou), depois `packet-2` ou `packet-3`, `dpi-unknown`, `threat-shield` |
| As conexões caem ou travam | `dpi-stall`, `conntrack`, `fastpath-state`, `path-mtu` |
| Os nomes não resolvem | `dns-resolve`, `dns-config`, `dns-trace` |
| Uma porta ou serviço não responde | `port-test`, `https-check`, `listening`, `traceroute` |
| Interface web ou certificado | `web-cert`, `services-state`, `service-detail` |
| Licença | `license-state` |
| A equipe pede um relatório completo | `support-package` |

Nas capturas de pacotes, inicie o pacote e depois repita o problema (abra o site, faça ping a partir do cliente) enquanto ele executa.

## Artigos relacionados

[KBA-0001](kba-01-health-check), [KBA-0014](kba-14-connectivity), [KBA-0016](kba-16-services), [KBA-0017](kba-17-support-package).
