describe('show carers profile details', () => {
    const nombre = 'Pruebas'; 

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('Send application to a user that has disponibility', () => {
        const pruebas = 'pruebas';
        const email = 'luis@ucm.es';
        const password = 'luisucmes';
  
        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();
  
        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);
  
        cy.get('#searchInput').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();
  
        cy.get('#sendApplicationBtn').click();

        const daterangepicker = cy.get('#datesDisponibility');

        cy.get('.ranges li').contains('21/05/2023 - 27/05/2023').click();
        
        cy.get('#applicationButton').click();

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });

    it('Send application to a user that hasn`t disponibility', () => {
        const pruebas = 'prueba2';
        const email = 'luis@ucm.es';
        const password = 'luisucmes';
  
        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();
  
        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);
  
        cy.get('#searchInput').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();
  
        cy.get('#sendApplicationBtn').click();
        cy.get('#noDisponibility').should('be.visible');
        
        cy.reload();

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
})