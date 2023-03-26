describe('see carers accommodation for the pet test', () => {
    beforeEach(() => {
      cy.visit('https://summerpet.azurewebsites.net/');
      //cy.visit('http://localhost:3000');
      cy.get('input').type(`${'jaime'}{enter}`);
      cy.get('a.btn.btn-primary').click()
    })
  
    it('displays two pictures', () => {
        cy.get('input').type(`${'jaime'}{enter}`);
      cy.get('a.btn.btn-primary').click()
    //hacer click en lugar
     cy.get('.nav-link').eq(1).click()
     //Comprobar que tiene 2 fotos subidas
     cy.get('.d-block').should('have.length',2);
     //comprobar flechas
     cy.get('.carousel-control-prev').click();
     cy.get('.carousel-control-next').click();

     //Para comprobar que funciona autoplay:

     //Cypress crea un objeto de reloj global que se puede utilizar para controlar el tiempo en la prueba. 
     //A continuación, puede llamar a cy.tick() para avanzar el tiempo en un número específico de milisegundos.
     cy.clock()
     cy.get('div#photos').find('div.carousel-item.active').invoke('index').should('eq', 0);// first image is active
     cy.tick(3000);
     cy.get('div#photos').find('div.carousel-item.active').invoke('index').should('eq', 1);//second image is active   
    });
  it('displays error message', () => {
    cy.get('input').type(`${'maria'}{enter}`);
      cy.get('a.btn.btn-primary').click()
    //hacer click en lugar
     cy.get('.nav-link').eq(1).click()
     cy.get('.alert').should('be.visible')
     cy.get('.alert').should('contain', 'No existen fotos de momento'); 
     cy.get('.btn-close').click();
     cy.get('#navUser').should('have.length',1);

    });
   
  
  });