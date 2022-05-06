import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorDialog from './ErrorDialog';

describe('<ErrorDialog />', () => {
  test('it should mount', () => {
    render(<ErrorDialog />);
    
    const errorDialog = screen.getByTestId('ErrorDialog');

    expect(errorDialog).toBeInTheDocument();
  });
});