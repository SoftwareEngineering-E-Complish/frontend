const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const { Router } = require('react-router-dom');
const NewLandingPage = require('../pages/Landing');


test('search button should trigger search function with correct input', async () => {
    const { getByPlaceholderText, getByText, history } = render(
        <NewLandingPage />
    );

    const searchInput = getByPlaceholderText('Search properties');
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'I want an appartment in Zurich with more than 3 rooms' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
        expect(history.location.pathname).toBe('/properties');
    });
});
