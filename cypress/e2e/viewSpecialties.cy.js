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

        //Aparecen las imágenes de todos los tamaños
        cy.get("img[alt='Imagen de perro grande']").should('have.attr', 'src', '/images/bigDog.png');
        cy.get("img[alt='Imagen de perro mediano']").should('have.attr', 'src', '/images/mediumDog.png');
        cy.get("img[alt='Imagen de perro pequenio']").should('have.attr', 'src', '/images/smallDog.png');

        //Aparecen todos los tamaños en texto
        cy.get('.labelSizes').should('contain', 'Grande');
        cy.get('.labelSizes').should('contain', 'Mediano');
        cy.get('.labelSizes').should('contain', 'Pequeño');

        //Aparecen las razas de perro
        cy.get('.labelBreed').should('contain', 'Husky');
        cy.get('.labelBreed').should('contain', 'Golden Terrier');
        cy.get('.labelBreed').should('contain', 'Golden Retriever');
        cy.get('.labelBreed').should('contain', 'Salchicha');
        cy.get('.labelBreed').should('contain', 'Labrador');
    });

    it('Miguel specialties', () => {
        const miguel = 'Miguel';
        
        cy.get('input').type(`${miguel}{enter}`);
        cy.get('a.btn.btn-primary').click();
        
        cy.get('#specialtiesButton').click();
        cy.get('.labelBreed').should('not.exist');
        cy.get('.labelSizes').should('not.exist');

        cy.get("#sin-pref-razas").should('contain', miguel + ' no tiene preferencia en ninguna raza de perro');
        cy.get('#sin-pref-tamanio').should('contain', miguel + ' no tiene preferencia en el tamaño de los perros');
    });          
});