describe('show carers profile details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');   
  });
  
  it('Displays dog watcher that accepted an application', () => {
    cy.get('input').type(`${'Jaime'}{enter}`);
    cy.get('#showProfile').click();

    cy.get("img[alt='Foto de perfil del usuario']").should("not.have.attr", "src", "/images/noImageUser.png");

    // Verificar que se muestra el nombre del usuario
    cy.get('#profileName').should('contain', 'Jaime')
    cy.get('#profileDirection').should('contain', 'Madrid')
    cy.get('#profileEmail').should('be.visible');
    cy.get('#profilePhone').should('be.visible');
    cy.get('#noDescription').should('not.exist');
  });

  it('Displays dog watcher that didnt accepted an application but with data', () => {
    cy.get('input').type(`${'Miguel'}{enter}`);
    cy.get('#showProfile').click();

    // Verificar que se muestra la imagen de perfil del usuario
    cy.get("img[alt='Foto de perfil del usuario']").should("not.have.attr", "src", "/images/noImageUser.png");
    cy.get('#profileName').should('contain', 'Miguel');
    cy.get('#profileDirection').should('contain', 'Barcelona');
    cy.get('#profilePhone').should('not.exist');
    cy.get('#profileEmail').should('not.exist');
    cy.get('#noDescription').should('not.exist');
  });

  it('Displays dog watcher that didnt accepted an application with no data', () => {
    cy.get('input').type(`${'Martin'}{enter}`);
    cy.get('#showProfile').click();

    // Verificar que se muestra la imagen de perfil del usuario
    cy.get("img[alt='Imagen predefinida']").should("have.attr", "src", "/images/noImageUser.png");
    cy.get('#profileName').should('contain', 'Martin');
    cy.get('#profileDirection').should('contain', 'Sevilla');
    cy.get('#profilePhone').should('not.exist');
    cy.get('#profileEmail').should('not.exist');
    cy.get('#noDescription').should('be.visible');
  });
})
  