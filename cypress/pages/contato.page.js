class ContatoPage {
  acessar() {
    cy.visit('/contato/');
  }

  preencherFormulario() {
    cy.get('#form-field-name').type('Teste Automatizado');
    cy.get('#form-field-email').type('qa.teste@example.com');
    cy.get('#form-field-message').type('Empresa de teste');
    cy.get('#form-field-field_67e0483').type('Analista de QA');
    cy.get('#form-field-field_5778e7b').type('11999999999');
    cy.get('#form-field-field_f77a763').type('Teste de formulario sem envio real');
    cy.get('#form-field-field_7651528').check();
  }

  validarCamposPreenchidos() {
    cy.get('#form-field-name').should('have.value', 'Teste Automatizado');
    cy.get('#form-field-email').should('have.value', 'qa.teste@example.com');
    cy.get('#form-field-field_7651528').should('be.checked');
  }

  prepararEnvioSeguro() {
    cy.get('form[name="Formulário Contato"]').then(($form) => {
      $form[0].addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
    });
  }

  enviarSemContatoReal() {
    cy.get('form[name="Formulário Contato"]').find('button[type="submit"]').click();
    cy.url().should('include', '/contato/');
  }
}

module.exports = new ContatoPage();
