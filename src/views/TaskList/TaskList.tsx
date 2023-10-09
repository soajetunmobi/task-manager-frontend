import { useFetchTasks } from '../../hooks';
import Layout from '../../components/Layout/Layout';
import { Alert, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const { data, error, isError, isLoading } = useFetchTasks();
  const navigate = useNavigate();

  const viewTaskHandler = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleAlertClose = () => {
    navigate(`/tasks`);
  };

  return (
    <Layout title="Task List">
      {isLoading && <LoadingIndicator />}
      {isError && (
        <Snackbar
          onClose={handleAlertClose}
          open={isError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message={error.message}
        >
          <Alert severity="error" onClose={handleAlertClose} sx={{ width: '100%' }}>
            {error.message}
          </Alert>
        </Snackbar>
      )}
      {!isLoading && !isError && data && (
        <List>
          {data.map(task => (
            <ListItem key={task._id} divider button component="div" onClick={viewTaskHandler.bind(this, task._id)}>
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
        </List>
      )}
    </Layout>
  );
};

export default TaskList;
