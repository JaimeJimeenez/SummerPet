describe('first user history integration test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('displays lucia search', () => {
    const lucia = 'Lucia';

    cy.get('input').type(`${lucia}{enter}`);
    cy.get('li').should('have.length', 1);
  });

  it('displays Madrid search', () => {
    const madrid = 'Madrid';

    cy.get('input').type(`${madrid}{enter}`);
    cy.get('li').should('have.length', 2);
  });

  it('displays Madriz search', () => {
    const madriz = 'Madriz';

    cy.get('input').type(`${madriz}{enter}`);
    cy.get('li').should('have.length', 2);
  });

});