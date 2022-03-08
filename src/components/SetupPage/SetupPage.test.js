import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SetupPage from './SetupPage';

describe('<SetupPage />', () => {
  test('it should mount', () => {
    render(<SetupPage />);
    
    const setupPage = screen.getByTestId('SetupPage');

    expect(setupPage).toBeInTheDocument();
  });
});