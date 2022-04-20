import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditSolution from './EditSolution';

describe('<EditSolution />', () => {
  test('it should mount', () => {
    render(<EditSolution />);
    
    const editSolution = screen.getByTestId('EditSolution');

    expect(editSolution).toBeInTheDocument();
  });
});