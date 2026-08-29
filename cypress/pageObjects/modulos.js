const { pages } = require('./pages');

// fluxos completos, encadeando varios metodos de pages em chamada única
const modulos = {
  moduloVerificaPaginaInicial() {
    pages.verificarElementosPrincipais();
  },

  moduloNavegaParaGestaoPlanos() {
    // abre o menu (fica atras do botao hamburguer) e clica na solucao escolhida 
    // depois verifica se a pagina foi carregada corretamente
    pages.abrirMenu();
    pages.clicarGestaoPlanos();
    pages.verificarPaginaGestaoPlanos();
  },

  moduloPreencheFormularioContato(dados) {
    pages.preencherNome(dados.nome);
    pages.preencherEmail(dados.email);
    pages.preencherEmpresa(dados.empresa);
    pages.preencherCargo(dados.cargo);
    pages.preencherTelefone(dados.telefone);
    pages.preencherAssunto(dados.assunto);
    pages.aceitarTermos();
  },

  moduloValidaFormularioSemEnvioReal(dados) {
    // preenche tudo, confere os valores e so entao bloqueia e clica em enviar
    // a ordem importa: o bloqueio tem que estar ativo antes do clique
    modulos.moduloPreencheFormularioContato(dados);
    pages.verificarCamposPreenchidos(dados);
    pages.bloquearEnvioReal();
    pages.clicarEnviar();
  },
};

module.exports = { modulos };
