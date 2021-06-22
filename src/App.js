import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useHttp from './components/hooks/use-http';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback(tasksObj => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const requestConfig = useMemo(
    () => ({ url: 'https://react-http-6b4a6.firebaseio.com/tasks.json' }),
    []
  );

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(requestConfig, transformTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
