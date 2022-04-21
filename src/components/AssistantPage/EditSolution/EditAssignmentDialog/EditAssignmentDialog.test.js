import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditAssignmentDialog from './EditAssignmentDialog';

describe('<EditAssignmentDialog />', () => {
  test('it should mount', () => {
    render(<EditAssignmentDialog />);
    
    const editAssignmentDialog = screen.getByTestId('EditAssignmentDialog');

    expect(editAssignmentDialog).toBeInTheDocument();
  });
});