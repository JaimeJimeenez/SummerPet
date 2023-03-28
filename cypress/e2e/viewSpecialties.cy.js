describe('View specialties', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('Jaimes specialties', () => {

        const jaime = 'jaime';
        
        cy.get('input').type(`${jaime}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#specialtiesButton').click();
        cy.get('.labelBreed').should('exist');
        cy.get('.labelSizes').should('exist');
    });

    it('Miguel specialties', () => {
        const miguel = 'Miguel';
        
        cy.get('input').type(`${miguel}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('.labelBreed').should('not.exist');
        cy.get('.labelSizes').should('not.exist');
    });
            
});