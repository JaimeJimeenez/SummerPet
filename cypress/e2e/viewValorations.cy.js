describe('View valorations', () => {
    beforeEach(() => {
      //cy.visit('https://summerpet.azurewebsites.net/');
      cy.visit('http://localhost:3000');
  
    });
    
    it('View user with valorations', () => {
      const pruebas = 'pruebas';
      const email = 'jaime@ucm.es';
      const password = 'jaimeucm';

        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#searchInput').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#valorationsBtn').click();
        cy.get('#listValorations').should('be.visible');

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });

    it('View user with no valorations', () => {
        const pruebas = 'prueba2';
        const email = 'jaime@ucm.es';
        const password = 'jaimeucm';
        
        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();
        cy.get('#signInForm').should('be.visible');        
      
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);
      
        cy.get('#searchInput').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#valorationsBtn').click();
        cy.get('#noValorations').should('be.visible');

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
  
});