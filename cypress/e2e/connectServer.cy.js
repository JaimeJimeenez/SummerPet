// Identificador: SMPT-PI-1

describe('Connect to server', () => {
    beforeEach(() => {
      cy.visit('https://summerpet.azurewebsites.net/');
    })

    it('displays server', () => {
        cy.get('form').should('be.visible');
    });
});