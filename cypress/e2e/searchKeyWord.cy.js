describe('Search by keyword test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays an owner search', () => {
    const maria = 'Maria';

    cy.get('input').type(`${maria}{enter}`);
    cy.get('li').should('have.length', 0);
  });

  it('displays Madrid search', () => {
    const madrid = 'Madrid';

    cy.get('input').type(`${madrid}{enter}`);
    cy.get('li').should('have.length', 1);
  });

  it('displays a dog watcher search', () => {
    const jaime = 'Jaime';

    cy.get('input').type(`${jaime}{enter}`);
    cy.get('li').should('have.length', 1);
  });
});