describe('sign in owner tests', () => {
    const email = 'luis@ucm.es'; 
    const passwd = 'luisucmes'

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('[id=signInBtn]').click();
    });

    it('Wrong password', () => {
        const wrong_passwd = 'aaaaaaaaaa';
        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${wrong_passwd}{enter}`);
        cy.get('[id=unsuccesfulSignIn]').should('be.visible');
    });

    it('Correct sign in', () => {
        cy.get('#signInForm').should('be.visible');        
        cy.get('input[name=email]').type(`${email}`);
        cy.get('input[name=password]').type(`${passwd}{enter}`);
        cy.get('[id=unsuccesfulSignIn]').should('not.exist');
        cy.get('[id=options]').should('exist');
        cy.get('[id=options]').click();
        //Solo debe aparecer la opcion de cerrar sesión
        cy.get('[id=logoutBtn]').should('exist');
        //El resto de opciones correspondientes a cuidador no deberían aparecer
        cy.get('[id=establishDisponibility]').should('not.exist');  
        cy.get('[id=verMisSolicitudes]').should('not.exist');
        cy.get('[id=verEspecialidades]').should('not.exist');
        cy.get('[id=establishPhotosBtn]').should('not.exist');

        cy.get('#logoutBtn').click();
        cy.get('#signInBtn').should('be.visible');
        
    });
});