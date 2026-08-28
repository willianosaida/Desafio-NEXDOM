# Desafio tecnico QA Pleno - NEXDOM

Projeto de testes automatizados em Cypress para os cenarios de front-end do site da NEXDOM e para o ciclo de vida de um repositorio na API do GitHub.

## Requisitos

- Node.js 20 ou superior
- npm
- Internet para acessar o site NEXDOM
- Token do GitHub somente para o teste de API

## Instalacao

```bash
npm install
```

## Testes de front-end

```bash
npm run test:ui
```

Ou abra o Cypress para executar pela interface:

```bash
npm run cy:open
```

Os Page Objects ficam em `cypress/pages`. Os specs apenas organizam os cenarios e chamam os metodos das classes, seguindo a arquitetura do exemplo fornecido.

## Teste da API do GitHub

Crie um arquivo `cypress.env.json` na raiz do projeto. Esse arquivo e ignorado pelo Git e deve conter o token e o usuario do GitHub:

```json
{
  "githubToken": "seu_token",
  "githubUser": "seu_usuario"
}
```

O token precisa ter permissao para criar e excluir repositorios e criar issues. Depois, execute:

```bash
npx cypress run --spec cypress/e2e/api/github.cy.js
```

O teste cria um repositorio publico temporario, consulta o repositorio, cria e consulta uma issue, exclui o repositorio e confirma o retorno `404`. O nome recebe um timestamp para evitar colisao.

Nao versione o arquivo `cypress.env.json` e nunca compartilhe o token. Para ajudar na configuracao, o projeto possui o arquivo `.env.example` apenas como referencia de variaveis.


## Formulario de contato

O cenario de contato nao envia uma mensagem para a NEXDOM. Depois de preencher e validar os campos, o teste intercepta a chamada AJAX de envio e responde localmente. Assim, o fluxo de submissao e validado sem poluir a caixa de entrada de uma empresa real.

## Observacao sobre Solucoes

O site nao possui uma rota `/solucoes/` unica. O teste abre o menu `Soluções` e acessa a pagina real `Gestão de Planos de Saúde`, validando a navegacao pelo caminho disponivel em producao.

## Estrutura

```text
cypress/
  e2e/
    api/github.cy.js
    ui/home.cy.js
    ui/contato.cy.js
  pages/
    home.page.js
    solucoes.page.js
    contato.page.js
features/desafio.feature
cypress.config.js
```

## Desafios encontrados

- O formulario esta em um site publico e em producao; por isso o envio foi bloqueado com interceptacao de rede.
- A navegacao de Solucoes e feita por um menu para paginas especificas, sem uma rota agregadora.
- O teste de API exige credencial externa e, por seguranca, nenhum token fica versionado no projeto.
