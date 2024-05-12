describe('Search functionality', () => {
    it('should search for properties', () => {
        // Visit the page
        cy.visit('/');

        // Type in the search input
        cy.get('.search-input').type('I want an appartment in Zurich with more than 3 rooms');

        // Click the search button
        cy.get('.search-button').click();

        // Wait for the properties page to load
        cy.url().should('include', '/properties');

        // Assert that search results are displayed (you might need to adjust this assertion based on your UI)
        cy.get('#propertiesResultsBody').should('be.visible');
    });
});
