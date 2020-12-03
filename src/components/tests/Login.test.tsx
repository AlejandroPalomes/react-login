import '@testing-library/jest-dom';
import 'react-testing-library/cleanup-after-each'
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../Login';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
    test('renders App component', async () => {
        render(<Login setToken = {()=>{}} />);

        // wait for the user to resolve
        // needs only be used in our special case
        await screen.findByText(/Login/);

        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'JavaScript' },
        });

        expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    });
  });

test('checks if enable or disable login button', () => {

});
