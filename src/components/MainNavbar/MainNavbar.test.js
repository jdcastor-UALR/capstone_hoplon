import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainNavbar from './MainNavbar';

describe('<MainNavbar />', () => {
  test('it should mount', () => {
    render(<MainNavbar />);
    
    const mainNavbar = screen.getByTestId('MainNavbar');

    expect(mainNavbar).toBeInTheDocument();
  });
});