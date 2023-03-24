// Identificador: SMPT-PI-1

describe('Connect to server', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    })

    it('displays server', () => {
        cy.get('form').should('be.visible');
    });
});