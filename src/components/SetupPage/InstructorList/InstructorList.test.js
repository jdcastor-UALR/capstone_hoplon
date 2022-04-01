import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstructorList from './InstructorList';

describe('<InstructorList />', () => {
  test('it should mount', () => {
    render(<InstructorList />);
    
    const instructorList = screen.getByTestId('InstructorList');

    expect(instructorList).toBeInTheDocument();
  });
});