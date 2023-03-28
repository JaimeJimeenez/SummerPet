describe('Search by keyword test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('List applications from Jaime user', () => {

        const jaime = 'jaime';
        
        cy.get('input').type(`${jaime}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#myApplicsButton').click();
        cy.get('#infoApplication').should('exist');
    });

      
    it('List none applications', () => {

        const miguel = 'Miguel';
        
        cy.get('input').type(`${miguel}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#myApplicsButton').click();
        cy.get('#infoApplication').should('have.length', 0);
    });
            
});