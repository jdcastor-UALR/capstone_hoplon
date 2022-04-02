import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationDialog from "./ConfirmationDialog";

describe('<ConfirmationDialog />', () => {
  test('it should mount', () => {
    render(<ConfirmationDialog />);

    const confirmationDialog = screen.getByTestId('ConfirmationDialog');

    expect(confirmationDialog).toBeInTheDocument();
  });
});
