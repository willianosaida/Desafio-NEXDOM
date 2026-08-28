class HomePage {
  acessar() {
    cy.visit('/');
  }

  validarElementosPrincipais() {
    cy.title().should('contain', 'nexdom');
    cy.get('body').should('contain.text', 'NEXDOM');
    cy.get('img').should('exist');
    cy.get('a[href$="/contato/"]').should('exist');
  }

  abrirSolucoes() {
    cy.get('button[aria-label="Alternar menu"]').filter(':visible').first().click();
    cy.get('a[href*="/gestao-de-planos-de-saude/"]').first().click({ force: true });
  }
}

module.exports = new HomePage();
