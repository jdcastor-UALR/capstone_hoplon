import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssistantPage from './AssistantPage';

describe('<AssistantPage />', () => {
  test('it should mount', () => {
    render(<AssistantPage />);
    
    const assistantPage = screen.getByTestId('AssistantPage');

    expect(assistantPage).toBeInTheDocument();
  });
});