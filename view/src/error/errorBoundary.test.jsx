import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './utils';
import TestComponent from './testComponent';
import { test, expect } from 'vitest'; 
import { MemoryRouter } from 'react-router-dom';

test('ErrorBoundary catches errors and displays fallback UI', () => {
  render(
    <MemoryRouter>
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    </MemoryRouter>
  );

  // Check if the fallback UI is displayed
  expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
});