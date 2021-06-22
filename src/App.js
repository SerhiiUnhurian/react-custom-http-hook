import React, { useCallback, useEffect, useState } from 'react';
import useHttp from './components/hooks/use-http';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const loadTasks = useCallback(() => {
    const requestConfig = {
      url: 'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
    };

    const transformTasks = tasksObj => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(requestConfig, transformTasks);
  }, [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={loadTasks}
      />
    </React.Fragment>
  );
}

export default App;
