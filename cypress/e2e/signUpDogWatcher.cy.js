describe('Sign up as dog watcher', () => {
    beforeEach(() => {
      //cy.visit('https://summerpet.azurewebsites.net/');
      cy.visit('http://localhost:3000');
  
    });
    
    it('Sign up as a dog watcher', () => {
      const nombre = 'elena';
      const email = 'elena@ucm.es';
      const password = 'elenaucm';
  
      cy.get('#signUpBtn').click();
      
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`)

      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`)

      cy.get('input[name="phone"]').should('exist');
      cy.get('input[name=phone]').type(`${123}`)

      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`)

      cy.get('input[name="image"]').should('exist');
      cy.get('input[name="image"]').selectFile("public/images/smallDog.png");

      cy.get('textarea[name="description"]').should('exist');
      cy.get('textarea[name="description"]').type('Hola, este es mi mensaje');

      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
    });

    it('Dog watcher already exists', () => {
      const nombre = 'Jaime';
      const email = 'jaime@ucm.es';
      const password = 'jaimeucm';
  
      cy.get('#signUpBtn').click();
      
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`)

      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`)

      cy.get('input[name="phone"]').should('exist');
      cy.get('input[name=phone]').type(`${123}`)

      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`);
      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
      cy.get('.alert').should('contain', 'El usuario ya existe');
    });

    it('Dog watcher password invalid', () => {
      const nombre = 'elen';
      const email = 'elena@ucm.es';
      const password = 'elena';
      cy.get('#signUpBtn').click();
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`)
      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`)

      cy.get('input[name="phone"]').should('exist');
      cy.get('input[name=phone]').type(`${123}`)

      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`);
      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Contraseña no válida');

    });

    it('Dog watcher hasnt inserted phone', () => {
      const nombre = 'elen';
      const email = 'elena@ucm.es';
      const password = 'elenaucm';
      cy.get('#signUpBtn').click();
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`)
      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`)

      cy.get('input[name="phone"]').should('exist');
      

      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`);
      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Introduce un télefono');

    });

    it('Dog watchers email is invalid', () => {
      const nombre = 'elen';
      const email = 'elena@ucm';
      const password = 'elenaucm';
      cy.get('#signUpBtn').click();
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`);

      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`);

      cy.get('input[name="phone"]').should('exist');
      cy.get('input[name=phone]').type(`${123}`);


      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`);
      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Correo no válido');

    });
    
    it('Dog watchers telephone is invalid', () => {
      const nombre = 'elen';
      const email = 'elena@ucm';
      const password = 'elenaucm';
      cy.get('#signUpBtn').click();
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name=email]').type(`${email}`);

      cy.get('input[name="password"]').should('exist');
      cy.get('input[name=password]').type(`${password}`);

      cy.get('input[name="direction"]').should('exist');
      cy.get('input[name=direction]').type(`${"Madrid"}`);

      cy.get('input[name="phone"]').should('exist');
      cy.get('input[name=phone]').type(`${"a"}`);


      cy.get('input[name="username"]').should('exist');
      cy.get('input[name=username]').type(`${nombre}`);
      cy.get('input[name="isDogWatcher"]').should('exist');
      cy.get('input[name="isDogWatcher"]').check();
      cy.get('button[type="submit"]').should('exist');
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Introduce un teléfono válido');

    });
});