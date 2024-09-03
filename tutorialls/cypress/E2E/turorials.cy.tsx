describe('[E2E] | [DOMAIN] - [TUTORIAL]', () => {
  it('[E2E] | [CREATE] => [TUTORIAL]', () => {
    cy.visit('http://localhost:3000');

    const random = Number(Math.random() * 1000);

    cy.window().then(win => win.localStorage.removeItem('AUTH_TOKEN'));

    cy.get('h1').contains('WELCOME TO TUTORIALLS').should('be.visible');
    cy.get('a').contains('LOGIN').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:3000/login');

    cy.get('button').contains('SIGN UP').click();

    cy.get('input[type="email"]').last().type(`admin${random}@example.com`);
    cy.get('input[type="password"]').last().type('123456789');

    cy.get('button').last().contains('signup').click();

    cy.get('input')
      .first()
      .type('admin' + random + '@example.com');
    cy.get('input').last().type('123456789');

    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/tutorials');

    cy.window().then(win => {
      expect(win.localStorage.getItem('AUTH_TOKEN')).to.be.not.undefined;
    });

    cy.get('#btn_create_tutorial_modal').click();
    cy.get("input[name='title']").type('My First Tutorial');
    cy.get("textarea[name='content']").type('My First Tutorial Description');
    cy.get("input[name='author']").type('admin' + random + '@example.com');

    cy.get("button[type='submit']").last().click();
    cy.url().should('eq', 'http://localhost:3000/tutorials');

    cy.get("input[name='query']").type('My First Tutorial');
    cy.get("button[type='submit']").first().click();

    cy.get('div').contains('My First Tutorial').should('be.visible');
  });
});
