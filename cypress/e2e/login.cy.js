//Rodar com:
//npx cypress run --spec "cypress/e2e/login.cy.js"

//Buscar cookie para valicdação da chave

describe('Login via UI', () => {
  it('Faz login e salva o cookie em session', () => {
    // Visita a página de login e preenche os dados
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Aguarda redirecionamento e salva cookie

    // Redireciona para '/dashboard'
    cy.url().should('include', '/dashboard')
    // Pega o cookie gerado e salva o valor em um arquivo json chamado "session.json"
    cy.getCookie('orangehrm').then((cookie) => {
      cy.writeFile('cypress/fixtures/session.json', {
        cookie: cookie.value
      });
    });
    cy.screenshot();
  });
});

