describe('see carers accommodation for the pet test', () => {
  beforeEach(() => {
    cy.visit('https://summerpet.azurewebsites.net/');
    //cy.visit('http://localhost:3000');

  });
  
  it('displays pictures', () => {
    const jaime = 'jaime';

    cy.get('input').type(`${jaime}{enter}`);
    cy.get('a.btn.btn-primary').click();

    cy.get('#picturesBtn').click();
    cy.get('#noPhotos').should('not.exist');
  });

  it('displays pictures', () => {
    const miguel = 'Miguel';

    cy.get('input').type(`${miguel}{enter}`);
    cy.get('a.btn.btn-primary').click();

    cy.get('#picturesBtn').click();
    cy.get('#noPhotos').should('be.visible');
  });


});