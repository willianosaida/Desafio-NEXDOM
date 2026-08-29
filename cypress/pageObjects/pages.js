const { el } = require('./elements/el');

// acoes simples de cada tela, uma por metodo
// sempre lendo o seletor de el.ids, nunca declarando um seletor aqui
const pages = {
  // Home
  acessarHome() {
    cy.visit('/');
  },

  verificarElementosPrincipais() {
    // confere titulo, texto da marca, presenca de imagem e link de contato
    cy.title().should('contain', 'nexdom');
    cy.get('body').should('contain.text', 'NEXDOM');
    cy.get('img').should('exist');
    cy.get(el.ids.home.linkContato).should('exist');
  },

  abrirMenu() {
    // o menu de Solucoes fica escondido atras do botao hamburguer
    cy.get(el.ids.home.btnMenu).filter(':visible').first().click();
  },

  clicarGestaoPlanos() {
    cy.get(el.ids.home.linkGestaoPlanos).first().click({ force: true });
  },

  // Solucoes
  verificarPaginaGestaoPlanos() {
    cy.url().should('include', '/gestao-de-planos-de-saude/');
    cy.title().should('contain', 'Gestão de planos de saúde');
  },

  // Contato
  acessarContato() {
    cy.visit('/contato/');
  },

  preencherNome(valor) {
    cy.get(el.ids.contato.inputNome).type(valor);
  },

  preencherEmail(valor) {
    cy.get(el.ids.contato.inputEmail).type(valor);
  },

  preencherEmpresa(valor) {
    cy.get(el.ids.contato.inputEmpresa).type(valor);
  },

  preencherCargo(valor) {
    cy.get(el.ids.contato.inputCargo).type(valor);
  },

  preencherTelefone(valor) {
    cy.get(el.ids.contato.inputTelefone).type(valor);
  },

  preencherAssunto(valor) {
    cy.get(el.ids.contato.inputAssunto).type(valor);
  },

  aceitarTermos() {
    cy.get(el.ids.contato.checkboxTermos).check();
  },

  verificarCamposPreenchidos(dados) {
    cy.get(el.ids.contato.inputNome).should('have.value', dados.nome);
    cy.get(el.ids.contato.inputEmail).should('have.value', dados.email);
    cy.get(el.ids.contato.checkboxTermos).should('be.checked');
  },

  bloquearEnvioReal() {
    // o form e real e manda e-mail de verdade pra NEXDOM, entao a gente
    // captura o submit e cancela ele antes de sair da pagina
    cy.get(el.ids.contato.form).then(($form) => {
      $form[0].addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
    });
  },

  clicarEnviar() {
    cy.get(el.ids.contato.form).find(el.ids.contato.btnEnviar).click();
    // se o submit foi bloqueado direito, a gente continua na mesma pagina
    cy.url().should('include', '/contato/');
  },
};

module.exports = { pages };
