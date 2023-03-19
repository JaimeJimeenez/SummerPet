describe('first user history integration test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('displays maria search', () => {
    const maria = 'Maria';

    cy.get('input').type(`${maria}{enter}`);
    cy.get('li').should('have.length', 1);
  });

  it('displays Madrid search', () => {
    const madrid = 'Madrid';

    cy.get('input').type(`${madrid}{enter}`);
    cy.get('li').should('have.length', 2);
  });

});