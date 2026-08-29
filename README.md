# Desafio tecnico QA Pleno - NEXDOM

Projeto de testes automatizados em Cypress para os cenarios de front-end do site da NEXDOM e para o ciclo de vida de um repositorio na API do GitHub.

## Requisitos

- Node.js 20 ou superior
- npm
- Internet para acessar o site NEXDOM
- Token do GitHub somente para o teste de API (back-end)

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

Os Page Objects ficam em `cypress/pageObjects`: `elements/el.js` guarda os seletores, `pages.js` tem as acoes simples de cada tela e `modulos.js` encadeia essas acoes em fluxos completos. Os specs so chamam `modulos.*`, seguindo a arquitetura do exemplo fornecido no desafio.

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

O cenario de contato nao envia uma mensagem para a NEXDOM. Depois de preencher e validar os campos, o teste bloqueia o submit nativo do formulário via `addEventListener` e `preventDefault()`. Assim, o fluxo de submissao e validado sem poluir a caixa de entrada da empresa.

## Observacao sobre Solucoes

O site nao possui uma rota `/solucoes/` unica. O teste abre o menu `Soluções` e acessa a pagina real `Gestão de Planos de Saúde`, validando a navegacao pelo caminho disponivel em producao.

## Estrutura

```text
cypress/
  e2e/
    api/github.cy.js
    ui/home.cy.js
    ui/contato.cy.js
  pageObjects/
    elements/el.js
    pages.js
    modulos.js
features/desafio.feature
cypress.config.js
```

## Desafios encontrados

- O formulario esta em um site publico e em producao; por isso o envio foi bloqueado via cancelamento do evento de submit nativo, sem deixar a requisicao real sair.
- A navegacao de Solucoes e feita por um menu para paginas especificas, sem uma rota agregadora.
- O teste de API exige credencial externa e, por seguranca, nenhum token fica versionado no projeto.
