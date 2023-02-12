import React from 'react';
import {nanoid} from 'nanoid';
import {useState, useRef} from 'react';

export const TodoList = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const taskInput = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    addTask(newTask)
    setNewTask("");
    taskInput.current?.focus();
  }

  const addTask = name => {
    const newTasks = [...tasks, {name, done: false, id: nanoid()}]
    setTasks(newTasks)
  }

  const toggleDoneTask = id => {
    const newTasks = [...tasks].map(item => (item.id === id ? {...item, done: true} : item));
    setTasks(newTasks);
  }

  const handleDelete = id => {
    const newTasks = [...tasks];
    newTasks.splice(id, 1);
    setTasks(newTasks);
  }

  return (
    <div className="content">
      <div data-testid="todo_list" className="todo_wrapper">
        <div className="todo_create">
          <p data-testid="todo_count" className="todo_count">
            {tasks.length} todos in your list
          </p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Add TODO item"
              data-testid="input"
              type="text"
              onChange={event => setNewTask(event.target.value)}
              value={newTask}
              className="form-control"
              autoFocus
              ref={taskInput}
            />
            <button
              className="button"
              data-testid="createButton"
            >
              Add
            </button>
          </form>
        </div>

        <div className="todo_items">
          {tasks.map((todo, i) => (
            <div className="todo_item"
                 data-testid="todo_item"
                 key={todo.id}
                 style={{backgroundColor: todo.done ? '#568564' : '#FF858A'}}
            >
              <span className="name">{todo.name}</span>
              <div className="todo_item_controls">
                <button
                  onClick={() => toggleDoneTask(todo.id)}
                  data-testid="doneButton"
                  className="done_btn"
                  disabled={todo.done}
                >
                  Done
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  data-testid="deleteButton"
                  className="delete_btn"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList;
