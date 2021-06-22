import useHttp from '../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = props => {
  const { isLoading, error, sendRequest: sendTask } = useHttp();

  const enterTaskHandler = async taskText => {
    const createNewTask = taskData => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    sendTask(
      {
        url: 'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      createNewTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
