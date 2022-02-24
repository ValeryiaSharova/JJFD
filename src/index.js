/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, Provider, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configureStore from './store/store';
import {
  completeTask,
  getTasksLoadingStatus,
  getTasks,
  loadTasks,
  taskDeleted,
  titleChanged,
  createTask,
} from './store/task';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = taskId => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = taskId => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTask(state.length + 1))} type="button">
        Create new task
      </button>
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))} type="button">
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)} type="button">
              Change title
            </button>
            <button onClick={() => deleteTask(el.id)} type="button">
              Delete task
            </button>

            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
