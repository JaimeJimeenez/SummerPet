describe('View disponibility', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it("Pruebas's photos but already have 3 photos", () => {
        const email = 'pruebas@ucm.es';
        const password = 'pruebasucm';

        cy.get('#signInBtn').click();

        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#options').click();
        cy.get('#establishPhotosBtn').click();
        cy.get('#noMorePhotos').should('be.visible');

        cy.reload();
        
        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });

    it("Pruebas2's photos and don't have 3 photos", () => {
        const email = 'pruebas2@ucm.es';
        const password = 'pruebasucm';

        cy.get('#signInBtn').click();
        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#options').click();
        cy.get('#establishPhotosBtn').click();
        cy.get('#uploadPhotos').should('be.visible');

        cy.reload();

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
});