# Desafio técnico QA Pleno - NEXDOM

Projeto de testes automatizados em Cypress para os cenários de front-end do site da NEXDOM e para o ciclo de vida de um repositório na API do GitHub.

## Requisitos
- Node.js 20 ou superior
- npm
- Internet para acessar o site NEXDOM
- Token do GitHub somente para o teste de API (back-end)

## Instalação
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
Os Page Objects ficam em `cypress/pageObjects`: `elements/el.js` guarda os seletores, `pages.js` tem as ações simples de cada tela e `modulos.js` encadeia essas ações em fluxos completos. Os specs só chamam `modulos.*`, seguindo a arquitetura do exemplo fornecido no desafio.

## Teste da API do GitHub
Crie um arquivo `cypress.env.json` na raiz do projeto. Esse arquivo é ignorado pelo Git e deve conter o token e o usuário do GitHub:
```json
{
  "githubToken": "seu_token",
  "githubUser": "seu_usuario"
}
```
O token precisa ter permissão para criar e excluir repositórios e criar issues. Depois, execute:
```bash
npx cypress run --spec cypress/e2e/api/github.cy.js
```
O teste cria um repositório público temporário, consulta o repositório, cria e consulta uma issue, exclui o repositório e confirma o retorno `404`. O nome recebe um timestamp para evitar colisão.

Não versione o arquivo `cypress.env.json` e nunca compartilhe o token. Para ajudar na configuração, o projeto possui o arquivo `.env.example` apenas como referência de variáveis.

## Formulário de contato
O cenário de contato não envia uma mensagem para a NEXDOM. Depois de preencher e validar os campos, o teste bloqueia o submit nativo do formulário via `addEventListener` e `preventDefault()`. Assim, o fluxo de submissão é validado sem poluir a caixa de entrada da empresa.

## Observação sobre Soluções
O site não possui uma rota `/solucoes/` única. O teste abre o menu `Soluções` e acessa a página real `Gestão de Planos de Saúde`, validando a navegação pelo caminho disponível em produção.

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
- O formulário está em um site público e em produção; por isso o envio foi bloqueado via cancelamento do evento de submit nativo, sem deixar a requisição real sair.
- A navegação de Soluções é feita por um menu para páginas específicas, sem uma rota agregadora.
- O teste de API exige credencial externa e, por segurança, nenhum token fica versionado no projeto.
