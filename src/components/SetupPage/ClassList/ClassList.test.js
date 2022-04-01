import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassList from './ClassList';

describe('<ClassList />', () => {
  test('it should mount', () => {
    render(<ClassList />);
    
    const classList = screen.getByTestId('ClassList');

    expect(classList).toBeInTheDocument();
  });
});