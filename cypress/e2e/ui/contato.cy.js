const { pages } = require('../../pageObjects/pages');
const { modulos } = require('../../pageObjects/modulos');

describe('Formulario de contato NEXDOM', () => {
  const dados = {
    nome: 'Nome teste',
    email: 'email.teste@example.com',
    empresa: 'NEXDOM Healthtech',
    cargo: 'Analista de testes/QA',
    telefone: '11999999999',
    assunto: 'Teste de formulario sem envio real',
  };

  beforeEach(() => {
    pages.acessarContato();
  });

  it('Cenario 3 - deve validar o formulario sem enviar mensagem real', () => {
    // o form e real (site em producao), entao o envio fica bloqueado
    // pra nao mandar contato falso pra caixa da NEXDOM - ver README
    modulos.moduloValidaFormularioSemEnvioReal(dados);
  });
});
