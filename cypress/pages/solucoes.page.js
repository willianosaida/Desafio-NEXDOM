class SolucoesPage {
  validarPaginaDeSolucao() {
    cy.url().should('include', '/gestao-de-planos-de-saude/');
    cy.title().should('contain', 'Gestão de planos de saúde');
  }
}

module.exports = new SolucoesPage();
