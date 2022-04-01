import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstructorDialog from './InstructorDialog';

describe('<InstructorDialog />', () => {
  test('it should mount', () => {
    render(<InstructorDialog />);
    
    const instructorDialog = screen.getByTestId('InstructorDialog');

    expect(instructorDialog).toBeInTheDocument();
  });
});