import Layout from '../../components/Layout/Layout';
import * as yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useFetchTask, useFetchUsers, useTaskCreate, useTaskUpdate } from '../../hooks';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { AuthorType, StatusType } from '../TaskList/TaskList.types';
import { TaskCreatePayload } from './TaskForm.types';
import { routes } from '../../constants/routes';

const STATUS_OPTIONS: Array<StatusType> = ['To Do', 'In Progress', 'Done', 'Open', 'On Hold', 'Cancelled', 'Closed'];

const TaskForm = () => {
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  });

  const initialValues: TaskCreatePayload = useMemo(() => {
    return {
      title: '',
      description: '',
      status: 'To Do',
      assignedTo: [],
      createdBy: '',
    };
  }, []);

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState<string | undefined>();

  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { _id } = useAuthContext();
  const { id } = useParams();

  const { data, isError, isLoading } = useFetchTask(id);

  useEffect(() => {
    if (_id) {
      initialValues.createdBy = _id;
    }
  }, [_id, initialValues]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      initialValues.title = data.title;
      initialValues.description = data.description;
      initialValues.status = data.status;
      initialValues.createdBy = data.createdBy._id;
      initialValues.assignedTo = data.assignedTo ? data.assignedTo.map(user => user._id) : [];
    }
  }, [data, isLoading, isError, initialValues]);

  const { mutateAsync } = useTaskCreate();
  const { mutateAsync: updateMutateAsync } = useTaskUpdate(id || '');

  const { data: userOptions, isError: isUserError, isLoading: isUserLoading } = useFetchUsers();

  const isAddingNew = pathname === '/add-task';

  let redirectUrl = routes.tasks;
  if (state?.prev) {
    redirectUrl = state.prev;
  }

  const inlineStyle = { marginBottom: '8px' };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isAddingNew) {
        try {
          await mutateAsync(values);
          setIsShowAlert(true);
          setAlertType('success');
          setMessage('Task created successfully.');
        } catch (e) {
          const error = e as Record<string, string>;
          setIsShowAlert(true);
          setAlertType('error');
          setMessage(error.message);
        }
      } else {
        try {
          await updateMutateAsync(values);
          setIsShowAlert(true);
          setAlertType('success');
          setMessage('Task updated successfully.');
        } catch (e) {
          const error = e as Record<string, string>;
          setIsShowAlert(true);
          setAlertType('error');
          setMessage(error.message);
        }
      }
    },
  });

  const handleAlertClose = () => {
    setMessage(undefined);
    setIsShowAlert(false);
    if (alertType === 'success') {
      navigate(redirectUrl);
    }
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const getLabel = (id: string) => {
    if (userOptions && userOptions.length > 0) {
      return userOptions?.find((user: AuthorType) => user?._id === id)?.name;
    }

    return '';
  };

  return (
    <Layout title={isAddingNew ? 'Add New Task' : 'Edit Task'}>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Grid style={inlineStyle}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid style={inlineStyle}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid style={inlineStyle}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                id="status"
                name="status"
                label="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {STATUS_OPTIONS.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {!isUserLoading && !isUserError && userOptions && userOptions.length > 0 && (
            <Grid style={inlineStyle}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Assign To</InputLabel>
                <Select
                  multiple
                  id="assignedTo"
                  name="assignedTo"
                  label="Assign To"
                  value={formik.values.assignedTo}
                  onChange={e => formik.setFieldValue('assignedTo', e.target.value)}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  onBlur={formik.handleBlur}
                  error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(userId => {
                        return (
                          <Chip
                            key={userId}
                            label={getLabel(userId)}
                            onDelete={() => {
                              const updated = formik.values.assignedTo.filter(item => item !== userId);
                              formik.setFieldValue('assignedTo', updated);
                            }}
                            deleteIcon={<CancelIcon onMouseDown={event => event.stopPropagation()} />}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {userOptions?.map(user => (
                    <MenuItem key={user?._id} value={user?._id}>
                      <ListItemText primary={user?.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid justifyContent="end" container>
            <Grid item marginRight={3}>
              <Button color="secondary" variant="contained" type="button" onClick={goBackHandler}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
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

export default TaskForm;
