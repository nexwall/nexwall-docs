---
title: Usuários e grupos
sidebar_position: 1
description: Bancos de usuários locais e de diretório, usados pela VPN e por outros serviços.
---

# Usuários e grupos

**Acesso e Identidade > Usuários e Grupos** gerencia os **bancos de dados de usuários**, e os usuários dentro deles, que
outros recursos usam para autenticar pessoas. Hoje eles são usados principalmente pelo
[servidor de acesso remoto OpenVPN](../vpn/remote-access-openvpn.md).

## Dois tipos de banco de dados

| Tipo | Quando usar |
|---|---|
| Local | Um pequeno número de usuários mantidos na própria unidade |
| LDAP ou Active Directory | Usuários já gerenciados em um diretório. A unidade o consulta, então as contas são mantidas em um só lugar |

## Banco de dados local

Crie o banco de dados e depois adicione usuários. Para cada usuário, defina um **nome**, um **nome de exibição** e uma
**senha**. Um usuário sem senha deve se autenticar de outra forma, por exemplo com um certificado. As senhas devem ter
pelo menos 8 caracteres e conter letras maiúsculas e minúsculas, um número e um caractere especial.

## Banco de dados remoto (LDAP ou Active Directory)

Informe como alcançar o diretório:

| Campo | Exemplo e significado |
|---|---|
| URI | `ldaps://ldap.exemplo.com`. Inclui o protocolo e a porta quando não é a padrão |
| Base DN | Onde as buscas começam, por exemplo `dc=exemplo,dc=com` |
| User DN | Onde estão os usuários, por exemplo `cn=Users,dc=exemplo,dc=com` |
| Atributo de exibição | O atributo com o nome completo. Use `displayName` para o Active Directory |
| Bind DN e senha | A conta que a unidade usa para pesquisar o diretório |
| Segurança | Se deve usar TLS e se deve verificar o certificado do servidor |

Salve e use o teste de conexão para confirmar que a unidade alcança o diretório e lê os usuários. Prefira uma conexão
criptografada.

## Bom saber

- Um banco de dados em uso por um recurso não pode ser excluído; remova-o primeiro desse recurso.
- Um usuário pode ser **definido como administrador**. Um administrador pode entrar na interface web e configurar a
  unidade. Mantenha esse conjunto pequeno e remova a função quando ela não for mais necessária.

## Páginas relacionadas

- [Acesso remoto (OpenVPN)](../vpn/remote-access-openvpn.md)
- [Licenciamento e conta](../administration/licensing-account.md)
