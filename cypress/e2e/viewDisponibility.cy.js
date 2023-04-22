describe('View disponibility', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it("Jaime's disponibility but with no session initiated", () => {
        const jaime = 'jaime';

        cy.get('input').type(`${jaime}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#signInForm').should('be.visible');
    });

    it("Pruebas's disponibility but with session initiated and have disponibility", () => {
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

        cy.get('#btn-calendar').click();
        cy.get('.daterangepicker').should('be.visible');
        cy.get('.ranges').children().should('have.length', 1);

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });

    it("Pruebas's disponibility but with session initiated and don't have disponibility", () => {
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

        cy.get('#btn-calendar').click();
        cy.get('.daterangepicker').should('be.visible');
        cy.get('.ranges').children().should('have.length', 1);
        cy.get('.ranges').children().should('contain', '');

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
});