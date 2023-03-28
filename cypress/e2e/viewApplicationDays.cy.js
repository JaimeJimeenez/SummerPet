describe('See view days application', () => {
    beforeEach(() => {
      //cy.visit('https://summerpet.azurewebsites.net/');
      cy.visit('http://localhost:3000');
  
    });
    
    it('Displays Modal days application', () => {
      const jaime = 'jaime';
  
      cy.get('input').type(`${jaime}{enter}`);
      cy.get('a.btn.btn-primary').click();
  
      cy.get('#myApplicsButton').click();
      cy.get('#infoApplication').should('have.length', 1);
      cy.get('#showApplicationBtn').click();
      cy.get('#showApplication').should('be.visible');
    });
  
});