import React, { useEffect, useState } from 'react';
import { Alert, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { useFetchTask, useTaskDelete } from '../../hooks';
import Author from './Author';
import { routes } from '../../constants/routes';
import { useAuthContext } from '../../context/AuthContext/AuthContext';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { _id } = useAuthContext();

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  const { data, error, isError, isLoading } = useFetchTask(id);

  const { mutateAsync } = useTaskDelete(id ?? '');

  const goBackHandler = () => {
    navigate(-1);
  };

  const editHandler = () => {
    if (data?._id) {
      navigate(`${routes.tasks}/${data?._id}/edit`);
    }
  };

  const handleAlertClose = () => {
    setMessage(undefined);
    setIsShowAlert(false);
    if (alertType === 'success') {
      navigate(routes.tasks);
    }
  };

  const deleteHandler = async () => {
    if (data?._id) {
      try {
        await mutateAsync();
        setIsShowAlert(true);
        setAlertType('success');
        setMessage('Task deleted successfully.');
      } catch (e) {
        const error = e as Record<string, string>;
        setIsShowAlert(true);
        setAlertType('error');
        setMessage(error.message);
      }
    }
  };

  return (
    <Layout title="Task Detail">
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
        <>
          <Typography variant="h4" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Description: {data.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: {data.status}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Assigned To:{' '}
            {data?.assignedTo && data?.assignedTo.length > 0
              ? data?.assignedTo?.map(author => <Author key={author.name} name={author.name} />)
              : 'Not yet assigned.'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Created By: <Author name={data.createdBy.name} />
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Created At: {data.createdAt}
          </Typography>
          <Typography variant="subtitle1">Updated At: {data.updatedAt}</Typography>
          <Grid justifyContent="end" container>
            <Grid>
              <Button color="secondary" variant="contained" type="button" onClick={goBackHandler}>
                Back
              </Button>
            </Grid>
            {_id && (
              <Grid marginLeft={2}>
                <Button color="error" variant="contained" type="button" onClick={deleteHandler}>
                  Delete
                </Button>
              </Grid>
            )}
            {_id && (
              <Grid marginLeft={2}>
                <Button color="primary" variant="contained" type="button" onClick={editHandler}>
                  Edit
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      )}
      {isShowAlert && message && (
        <Snackbar
          onClose={handleAlertClose}
          open={isShowAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message={message}
        >
          <Alert severity={alertType} onClose={handleAlertClose} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </Layout>
  );
};

export default TaskDetail;
