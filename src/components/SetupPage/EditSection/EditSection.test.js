import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditSection from './EditSection';

describe('<EditSection />', () => {
  test('it should mount', () => {
    render(<EditSection />);

    const editSection = screen.getByTestId('EditSection');

    expect(editSection).toBeInTheDocument();
  });
});
