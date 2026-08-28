const apiUrl = () => Cypress.env('githubApiUrl');
const githubToken = () => Cypress.env('githubToken');
const githubUser = () => Cypress.env('githubUser');

describe('API do GitHub - ciclo de vida de um repositorio', () => {
  const repositoryName = `desafio-nexdom-${Date.now()}`;
  const issueTitle = 'Issue criada pelo teste automatizado';

  before(() => {
    if (!githubToken() || !githubUser()) {
      throw new Error('Preencha githubToken e githubUser no arquivo cypress.env.json.');
    }
  });

  const requestHeaders = () => ({
    Authorization: `Bearer ${githubToken()}`,
    Accept: 'application/vnd.github+json'
  });

  const repositoryUrl = () => `${apiUrl()}/repos/${githubUser()}/${repositoryName}`;

  const criarRepositorio = () => cy.request({
      method: 'POST',
      url: `${apiUrl()}/user/repos`,
      headers: requestHeaders(),
      body: {
        name: repositoryName,
        description: 'Repositorio temporario do desafio de QA NEXDOM',
        private: false,
        auto_init: true
      }
  });

  const consultarRepositorio = () => cy.request({
    method: 'GET',
    url: repositoryUrl(),
    headers: requestHeaders()
  });

  const criarIssue = () => cy.request({
    method: 'POST',
    url: `${repositoryUrl()}/issues`,
    headers: requestHeaders(),
    body: {
      title: issueTitle,
      body: 'Validacao do fluxo de issues.'
    }
  });

  const consultarIssue = (issueNumber) => cy.request({
    method: 'GET',
    url: `${repositoryUrl()}/issues/${issueNumber}`,
    headers: requestHeaders()
  });

  const excluirRepositorio = () => cy.request({
    method: 'DELETE',
    url: repositoryUrl(),
    headers: requestHeaders(),
    failOnStatusCode: false
  });

  const confirmarExclusao = () => cy.request({
    method: 'GET',
    url: repositoryUrl(),
    headers: requestHeaders(),
    failOnStatusCode: false
  });

  it('deve criar, consultar, usar e excluir um repositorio', () => {
    criarRepositorio().then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body.name).to.eq(repositoryName);
    });

    consultarRepositorio().then((repositoryResponse) => {
      expect(repositoryResponse.status).to.eq(200);
      expect(repositoryResponse.body.full_name).to.eq(`${githubUser()}/${repositoryName}`);
    });

    criarIssue().then((issueResponse) => {
      expect(issueResponse.status).to.eq(201);
      return consultarIssue(issueResponse.body.number);
    }).then((issueResponse) => {
      expect(issueResponse.status).to.eq(200);
      expect(issueResponse.body.title).to.eq(issueTitle);
    });

    excluirRepositorio().then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(204);
    });

    confirmarExclusao().then((deletedResponse) => {
      expect(deletedResponse.status).to.eq(404);
    });
  });
});
