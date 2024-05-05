describe('Profile Page Tests', () => {
    it('updates user profile details', () => {
        cy.visit('/profile');

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

        cy.visit('/profile');

        // Enter new values in input fields
        cy.get('input[name="name"]').clear().type('Test User');
        cy.get('input[name="email"]').clear().type('testuser1@example.com');
        cy.get('input[name="phoneNumber"]').clear().type('+123456');

        // Submit the form
        cy.get('form').submit();

        // Check if success message is displayed
        cy.contains('.alert-success', 'Update successful!');
    });
});
