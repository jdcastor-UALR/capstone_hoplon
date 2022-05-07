import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTimeSlotDialog from './CreateTimeSlotDialog';

describe('<CreateTimeSlotDialog />', () => {
  test('it should mount', () => {
    render(<CreateTimeSlotDialog />);
    
    const createTimeSlotDialog = screen.getByTestId('CreateTimeSlotDialog');

    expect(createTimeSlotDialog).toBeInTheDocument();
  });
});