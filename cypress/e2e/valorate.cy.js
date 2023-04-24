describe('Valorar cuidador test', () => {
    const nombre_1 = 'Jaime'; 
    const nombre_2 = 'Ivan'; 

    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('Valoration and description of valid watcher', () => {
        const pruebas = 'pruebas';
        const email = 'luis@ucm.es';
        const password = 'luisucmes';

        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#searchInput').type(`${nombre_1}{enter}`);
        cy.get('#showProfile').click();
        cy.get('#valorateBtn').click();

        cy.get('span[data-id=2].stars').click();
        cy.get('textarea').type('Este es un comentario desde los tests de cypress');
        cy.get('#sendValorationBtn').should('be.enabled');
        cy.get('#sendValorationBtn').click();

        cy.reload();

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
  
    //Intentar valorar un cuidador que no ha sido contratado por el dueño
    it('Valoration and description of not valid watcher', () => {
        const pruebas = 'pruebas';
        const email = 'luis@ucm.es';
        const password = 'luisucmes';

        cy.get('input').type(`${pruebas}{enter}`);
        cy.get('#showProfile').click();

        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#searchInput').type(`${nombre_2}{enter}`);
        cy.get('#showProfile').click();
        cy.get('#valorateBtn').click();

        cy.get('#noValorate').should('be.visible');
        cy.reload();

        cy.get('#options').click();
        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
    });
});