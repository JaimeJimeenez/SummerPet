describe('show carers profile details', () => {
    const nombre = 'Jaime'; 

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('input').type(`${nombre}{enter}`);
        cy.get('a.btn.btn-primary').click();
        cy.get('#sendApplicationBtn').click();
    })

    it('endDate is sooner than startDate', () => {
        const startDate = '03/31/2023'; 
        const endDate = '03/30/2023';
    
        cy.get('[id=startDate]').type(`${startDate}{enter}`);
        cy.get('[id=endDate]').type(`${endDate}{enter}`);

        cy.get('[id=applicationButton]').should('be.disabled');
    });

    it('startDay is sooner than current date', () => {
        const startDate = '03/01/2023';
        cy.get('[id=startDate]').type(`${startDate}{enter}`);
        cy.get('[id=applicationButton]').should('be.disabled');
    });


    it('Application can be completed', () => {
        const startDate = '03/30/2023';
        const endDate = '03/31/2023'; 
    
        cy.get('[id=startDate]').type(`${startDate}{enter}`);
        cy.get('[id=endDate]').type(`${endDate}{enter}`);

        cy.get('[id=applicationButton]').should('be.enabled');
    }); 
})