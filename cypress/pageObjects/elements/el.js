// seletores de todas as telas, agrupados por pagina
// nada de seletor solto dentro de pages.js, tudo passa por aqui
const el = {
  ids: {
    home: {
      btnMenu: 'button[aria-label="Alternar menu"]',
      linkContato: 'a[href$="/contato/"]',
      linkGestaoPlanos: 'a[href*="/gestao-de-planos-de-saude/"]',
    },
    contato: {
      form: 'form[name="Formulário Contato"]',
      inputNome: '#form-field-name',
      inputEmail: '#form-field-email',
      inputEmpresa: '#form-field-message',
      inputCargo: '#form-field-field_67e0483',
      inputTelefone: '#form-field-field_5778e7b',
      inputAssunto: '#form-field-field_f77a763',
      checkboxTermos: '#form-field-field_7651528',
      btnEnviar: 'button[type="submit"]',
    },
  },
};

module.exports = { el };
