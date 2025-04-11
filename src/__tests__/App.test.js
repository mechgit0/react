// src/__tests__/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the initial elements', () => {
    render(<App />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/My React App/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the input field and button are rendered
    const inputElement = screen.getByPlaceholderText('Add an item');
    const buttonElement = screen.getByText('Add');
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('allows the user to add items to the list', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Add an item');
    const buttonElement = screen.getByText('Add');
    
    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: 'New Item' } });
    expect(inputElement.value).toBe('New Item');

    // Simulate clicking the button
    fireEvent.click(buttonElement);

    // Check if the item is added to the list
    const listItem = screen.getByText('New Item');
    expect(listItem).toBeInTheDocument();
  });

  test('clears the input field after adding an item', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Add an item');
    const buttonElement = screen.getByText('Add');
    
    // Simulate typing and adding an item
    fireEvent.change(inputElement, { target: { value: 'New Item' } });
    fireEvent.click(buttonElement);

    // Check if the input field is cleared
    expect(inputElement.value).toBe('');
  });

  test('does not add empty items', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Add an item');
    const buttonElement = screen.getByText('Add');
    
    // Try to add an empty item
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    // Check that no new item is added to the list
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0); // Ensure no items are added
  });
});

