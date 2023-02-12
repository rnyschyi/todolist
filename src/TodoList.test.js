import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import TodoList from './TodoList';


test("Todo renders without crashing", () => {
  render(<TodoList />)
});


test('renders the correct initial DOM', () => {
  const view = render(<TodoList />);
  const inputElement = view.getByTestId('input');
  const todo_countElement = view.getByTestId('todo_count');
  const todo_listElement = view.getByTestId('todo_list');
  const todos = view.queryAllByTestId('todo_item');

  // initial states:
  expect(todo_countElement).toHaveTextContent('0 todos in your list');
  expect(inputElement.getAttribute('value')).toBe('');
  expect(todos.length).toBe(0);
  expect(todo_listElement).toBeInTheDocument();
});

// create
test('user able to create a todo_item', () => {
  const view = render(<TodoList />);

  const inputElement = screen.getByTestId('input');
  const createButtonElement = view.getByTestId('createButton');
  const todo_countElement = view.getByTestId('todo_count');

  fireEvent.change(inputElement, { target: { value: 'Test TODO item' } });
  fireEvent.click(createButtonElement);

  const todos = view.getAllByTestId('todo_item');
  const todo = view.getByTestId('todo_item');
  const todoNameElement = todo.firstChild;

  expect(todoNameElement.textContent).toBe('Test TODO item');
  expect(todo_countElement).toHaveTextContent('1 todos');
  expect(inputElement.value).toBe('');
  expect(todo).toBeInTheDocument();
  expect(todos.length).toBe(1);
});

// delete
test('user able to delete a todo_item', () => {
  const view = render(<TodoList />);

  const inputElement = view.getByTestId('input');
  const createButtonElement = view.getByTestId('createButton');
  const todo_countElement = view.getByTestId('todo_count');

  fireEvent.change(inputElement, { target: { value: 'Test TODO item' } });
  fireEvent.click(createButtonElement);

  const todo = view.queryByTestId('todo_item');
  const todoDeleteButton = view.getByTestId('deleteButton');
  fireEvent.click(todoDeleteButton);

  const todos = view.queryAllByTestId('todo_item');

  expect(todo_countElement).toHaveTextContent('0 todos in your list');
  expect(todo).not.toBeInTheDocument();
  expect(todos.length).toBe(0);
});

// done
test('user able to check a todo_item', () => {
  const view = render(<TodoList />);

  const inputElement = view.getByTestId('input');
  const createButtonElement = view.getByTestId('createButton');
  const todo_countElement = view.getByTestId('todo_count');

  fireEvent.change(inputElement, { target: { value: 'Test TODO item' } });
  fireEvent.click(createButtonElement);

  const todo = view.queryByTestId('todo_item');
  const todoDoneButton = view.getByTestId('doneButton');
  fireEvent.click(todoDoneButton);

  expect(todo_countElement).toHaveTextContent('1 todos in your list');
  expect(todo).toBeInTheDocument();
  expect(todoDoneButton).toBeDisabled();

  fireEvent.click(todoDoneButton);
  expect(todo).toHaveStyle('backgroundColor: #568564');

});
