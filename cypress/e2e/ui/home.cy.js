const { pages } = require('../../pageObjects/pages');
const { modulos } = require('../../pageObjects/modulos');

describe('Verificacao da navegacao do site NEXDOM', () => {
  beforeEach(() => {
    pages.acessarHome();
  });

  it('Cenario 1 - deve carregar os elementos principais da pagina inicial', () => {
    modulos.moduloVerificaPaginaInicial();
  });

  it('Cenario 2 - deve navegar para a pagina de Solucoes', () => {
    // Solucoes e um menu com varias opcoes, nao uma pagina unica
    // aqui a gente valida o caminho ate "Gestao de planos de saude"
    modulos.moduloNavegaParaGestaoPlanos();
  });
});
