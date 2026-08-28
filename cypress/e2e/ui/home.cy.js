const homePage = require('../../pages/home.page');
const solucoesPage = require('../../pages/solucoes.page');

describe('Verificacao da navegacao do site NEXDOM', () => {
  beforeEach(() => {
    homePage.acessar();
  });

  it('Cenario 1 - deve carregar os elementos principais da pagina inicial', () => {
    homePage.validarElementosPrincipais();
  });

  it('Cenario 2 - deve navegar para uma pagina de Solucoes', () => {
    homePage.abrirSolucoes();
    solucoesPage.validarPaginaDeSolucao();
  });
});
