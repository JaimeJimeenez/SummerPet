describe('sign in owner tests', () => {
    const email = 'laura@ucm.es'; 
    const passwd = 'lauraucm'

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('[id=iniciarSesion]').click();
    });

    it('Wrong password', () => {
        const wrong_passwd = 'NOlauraucma';
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
        cy.get('[id=botonDesplegar]').should('exist');
        cy.get('[id=botonDesplegar]').click();
        //Deben de aparecer todas las opciones propias de los cuidadores
        cy.get('[id=establishDisponibility]').should('exist');  
        cy.get('[id=verMisSolicitudes]').should('exist');
        cy.get('[id=verEspecialidades]').should('exist');
        cy.get('[id=verLugar]').should('exist');
        cy.get('[id=cerrarSesion]').should('exist');
        
        
    });
});