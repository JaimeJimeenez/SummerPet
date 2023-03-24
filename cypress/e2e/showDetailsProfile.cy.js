describe('show carers profile details', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('input').type(`${'Maria'}{enter}`);
      })
  
    /*it('displays name, location & profile pic', () => {
      // Hacer clic en el botón de "ver detalles"
    cy.get('a.btn.btn-primary').click()

    // Verificar que se muestra la imagen de perfil del usuario
    cy.get("img[alt='Foto de perfil del usuario']").should("have.attr", "src", "/image/123");


    // Verificar que se muestra el nombre del usuario
    cy.get('#profileName').should('contain', 'Maria')

  // Verificar que se muestra la ubicación del usuario
    cy.get('#profileDirection').should('contain', 'Madrid')
  })*/
   
  it('displays name, location & generic pic', () => {
    // Hacer clic en el botón de "ver detalles"
  cy.get('a.btn.btn-primary').click()

  // Verificar que se muestra la imagen de perfil del usuario
  cy.get("img[alt='Imagen predefinida']").should("have.attr", "src", "/images/noImageUser.png");


  // Verificar que se muestra el nombre del usuario
  cy.get('#profileName').should('contain', 'Maria')

  // Verificar que se muestra la ubicación del usuario
  cy.get('#profileDirection').should('contain', 'Madrid')

  cy.get('#profilePhone').should('not.exist')
  cy.get('#profileEmail').should('not.exist')
})
   
})
  