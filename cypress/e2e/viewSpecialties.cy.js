describe('View specialties', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('Pruebas specialties', () => {
        const pruebas = 'Pruebas';
        
        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#specialtiesButton').click();
        cy.get('.labelBreed').should('exist');
        cy.get('.labelSizes').should('exist');

        //Aparecen las imágenes de todos los tamaños
        cy.get("img[alt='Imagen de perro grande']").should('have.attr', 'src', '/images/bigDog.png');
        cy.get("img[alt='Imagen de perro mediano']").should('have.attr', 'src', '/images/mediumDog.png');
        cy.get("img[alt='Imagen de perro pequenio']").should('have.attr', 'src', '/images/smallDog.png');

        //Aparecen todos los tamaños en texto
        cy.get('.labelSizes').should('contain', 'Grande');
        cy.get('.labelSizes').should('contain', 'Mediano');
        cy.get('.labelSizes').should('contain', 'Pequeño');

        //Aparecen las razas de perro
        cy.get('.labelBreed').should('contain', 'labrador');
        cy.get('.labelBreed').should('contain', 'Golden Retriever');
    });

    it('Pruebas2 specialties', () => {
        const pruebas2 = 'Prueba2';
        
        cy.get('input').type(`${pruebas2}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#specialtiesButton').click();
        cy.get('.labelBreed').should('not.exist');
        cy.get('.labelSizes').should('not.exist');

        cy.get("#sin-pref-razas").should('contain', pruebas2 + ' no tiene preferencia en ninguna raza de perro');
        cy.get('#sin-pref-tamanio').should('contain', pruebas2 + ' no tiene preferencia en el tamaño de los perros');
    });          
});