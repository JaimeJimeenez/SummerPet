describe('see carers specialties test', () => {
    beforeEach(() => {
      //cy.visit('https://summerpet.azurewebsites.net/');
      cy.visit('http://localhost:3000');
  
    })
    
    it('displays 2 columns after clicking on Especialidades in Jaimes profile', () => {
      const jaime = 'jaime';
  
      cy.get('input').type(`${jaime}{enter}`);
      cy.get('a.btn.btn-primary').click();
  
      //hacer click en especialidades
      cy.get('.nav-link').eq(1).click()
  
      cy.get('#labelSpecialties').should('exist') // Verificar que el elemento con ID 'labelSpecialties' existe
      cy.get('#labelSpecialties > .col-xl').should('have.length', 2) // Verificar que hay dos elementos con clase 'col-xl'
    });

    it('First column should have 5 breeds for user Jaime', () => {
        const jaime = 'jaime';
  
        cy.get('input').type(`${jaime}{enter}`);
        cy.get('a.btn.btn-primary').click();
    
        //hacer click en especialidades
        cy.get('.nav-link').eq(1).click()
        cy.get('.labelBreed').should('have.length', 5) // Verificar que hay 5 elementos con clase 'labelBreed'
      })
      it('Second column should have 3 size in Jaimes profile', () => {
        const jaime = 'jaime';
  
        cy.get('input').type(`${jaime}{enter}`);
        cy.get('a.btn.btn-primary').click();
        //hacer click en especialidades
        cy.get('.nav-link').eq(1).click()
        cy.get('.labelSizes').should('have.length', 3) // Verificar que hay 3 elementos con clase 'labelSizes'
      })


      it('displays 2 columns after clicking on Especialidades in Marias profile', () => {
        const maria = 'maria';
    
        cy.get('input').type(`${maria}{enter}`);
        cy.get('a.btn.btn-primary').click();
    
        //hacer click en especialidades
        cy.get('.nav-link').eq(1).click()
    
        cy.get('#labelSpecialties').should('exist') // Verificar que el elemento con ID 'labelSpecialties' existe
        cy.get('#labelSpecialties > .col-xl').should('have.length', 2) // Verificar que hay dos elementos con clase 'col-xl'
      });
  
      it('First column should have 3 breeds for user Maria', () => {
        const maria = 'maria';
    
        cy.get('input').type(`${maria}{enter}`);
        cy.get('a.btn.btn-primary').click();
      
          //hacer click en especialidades
          cy.get('.nav-link').eq(1).click()
          cy.get('.labelBreed').should('have.length', 3) // Verificar que hay 3 elementos con clase 'labelBreed'
        })
        it('Second column should have 1 size in Marias profile', () => {
            const maria = 'maria';
    
            cy.get('input').type(`${maria}{enter}`);
            cy.get('a.btn.btn-primary').click();
          //hacer click en especialidades
          cy.get('.nav-link').eq(1).click()
          cy.get('.labelSizes').should('have.length', 1) // Verificar que hay 1 elementos con clase 'labelSizes'
        })

        it('displays 2 columns after clicking on Especialidades in Miguels profile', () => {
            const miguel = 'miguel';
        
            cy.get('input').type(`${miguel}{enter}`);
            cy.get('a.btn.btn-primary').click();
        
            //hacer click en especialidades
            cy.get('.nav-link').eq(1).click()
        
            cy.get('#labelSpecialties').should('exist') // Verificar que el elemento con ID 'labelSpecialties' existe
            cy.get('#labelSpecialties > .col-xl').should('have.length', 2) // Verificar que hay dos elementos con clase 'col-xl'
        });
      
        it('First column should show an error for user Miguel', () => {
            const miguel = 'miguel';
        
            cy.get('input').type(`${miguel}{enter}`);
            cy.get('a.btn.btn-primary').click();
        
        
            //hacer click en especialidades
            cy.get('.nav-link').eq(1).click();
            cy.get('.col-xl').eq(0).should('contain', 'no tiene preferencia en ninguna raza de perro');
            
        })
        it('Second column should show an error in Miguels profile', () => {
            const miguel = 'miguel';
        
            cy.get('input').type(`${miguel}{enter}`);
            cy.get('a.btn.btn-primary').click();
        
            //hacer click en especialidades
            cy.get('.nav-link').eq(1).click()
            cy.get('.col-xl').eq(1).should('contain', 'no tiene preferencia en ninguna raza de perro');
        })
  });