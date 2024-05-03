describe('Create Property', () => {
    // beforeEach(() => {
    //     // Set access token in localStorage
    //     window.localStorage.setItem('accessToken', 'mockAccessToken');

    //     // Mock authentication
    //     cy.intercept('GET', '/verifyAccessToken*', { data: true }); // Mock successful access token verification
    //     cy.intercept('GET', '/refreshAccessToken', { body: { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' } }); // Mock successful access token refresh
    //     cy.intercept('GET', '/loginURL', { body: '/mock-login-url' }); // Mock login URL
    // });

    it('should successfully create a property', () => {
        cy.visit('/editAdd');

        // Login
        cy.origin('https://e-complish.auth.eu-central-1.amazoncognito.com', () => {
            // Fill in the username field
            cy.get('input[name="username"]').first().type('testuser1', { force: true });

            // Fill in the password field
            cy.get('input[name="password"]').first().type('Test@12345', { force: true });

            // Submit the form
            cy.get('input[name="signInSubmitButton"]').eq(1).click();
        });
        cy.wait(2000);


        cy.visit('/editAdd');

        // Fill in the form fields
        cy.get('input[name="title"]').type('Beautiful House');
        cy.get('.MuiSelect-select').click();
        cy.get('.MuiMenu-list').find('li').first().click();
        cy.get('input[name="price"]').type('500000');
        cy.get('input[name="square_meters"]').type('200');
        cy.get('input[name="year_built"]').type('2005');
        cy.get('input[name="bathrooms"]').type('2');
        cy.get('input[name="bedrooms"]').type('3');
        cy.get('input[name="location"]').type('Zurich');
        cy.get('input[name="address"]').type('Ramistrasse 40');
        cy.get('textarea[name="description"]').type('A beautiful house in the heart of the city.');

        // // Upload an image
        // cy.fixture('house.png').then(fileContent => {
        //     cy.get('#file').selectFile({
        //         fileContent: fileContent.toString(),
        //         fileName: 'house.png',
        //         mimeType: 'image/png',
        //         action: 'drag-drop'
        //     });
        // });

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Assert that the property is successfully created
        cy.url().should('include', '/profile'); // Assuming the route for user profile is '/profile'
        cy.contains('Beautiful House').should('exist');
    });
});
