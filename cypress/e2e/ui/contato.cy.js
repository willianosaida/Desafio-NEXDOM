const contatoPage = require('../../pages/contato.page');

describe('Formulario de contato NEXDOM', () => {
  beforeEach(() => {
    contatoPage.acessar();
  });

  it('Cenario 3 - deve validar o formulario sem enviar mensagem real', () => {
    contatoPage.preencherFormulario();
    contatoPage.validarCamposPreenchidos();
    contatoPage.prepararEnvioSeguro();
    contatoPage.enviarSemContatoReal();
  });
});
