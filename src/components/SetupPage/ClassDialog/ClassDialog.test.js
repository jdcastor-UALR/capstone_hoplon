import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassDialog from './ClassDialog';

describe('<ClassDialog />', () => {
  test('it should mount', () => {
    render(<ClassDialog />);
    
    const classDialog = screen.getByTestId('ClassDialog');

    expect(classDialog).toBeInTheDocument();
  });
});