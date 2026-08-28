# Casos de teste em Gherkin
Feature: Site institucional NEXDOM

  Scenario: Verificar a pagina inicial
    Given que o usuario acessa a pagina inicial da NEXDOM
    Then os elementos principais da pagina devem ser carregados

  Scenario: Navegar para a pagina de Solucoes
    Given que o usuario esta na pagina inicial da NEXDOM
    When ele acessa uma solucao pelo menu principal
    Then a pagina da solucao deve ser apresentada

  Scenario: Validar o formulario de contato sem envio real
    Given que o usuario acessa a pagina de Contato
    When ele preenche todos os campos obrigatorios
    Then os valores informados devem permanecer preenchidos
    And o envio deve ser interceptado pelo teste para nao gerar contato real
