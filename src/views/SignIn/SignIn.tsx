import * as yup from 'yup';
import { useUserLogin } from '../../hooks';
import { useFormik } from 'formik';
import { Alert, Button, Container, Grid, Snackbar, TextField } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SignIn = () => {
  const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState<string | undefined>();

  const { mutate } = useUserLogin();
  const { storeCredential } = useAuthContext();
  const navigate = useNavigate();
  const { state, key } = useLocation();

  let redirectUrl = '/';
  if (state?.prev) {
    redirectUrl = state.prev;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      mutate(values, {
        onSuccess: response => {
          storeCredential({ ...response });
          setIsShowAlert(true);
          setAlertType('success');
          setMessage('Sign in successful. You can now add, edit or delete task.');
        },
        onError: response => {
          let errMsg: string = response as string;
          if (typeof response === 'object') {
            const res = response as Record<string, string>;
            errMsg = res.message;
          }
          setIsShowAlert(true);
          setAlertType('error');
          setMessage(errMsg);
        },
      });
    },
  });

  const handleAlertClose = () => {
    setMessage(undefined);
    setIsShowAlert(false);
    if (alertType === 'success') {
      if (key !== 'default') {
        navigate(-1);
      } else {
        navigate(redirectUrl);
      }
    }
  };

  const cancelHandler = () => {
    if (key !== 'default') {
      navigate(-1);
    } else {
      navigate(redirectUrl);
    }
  };

  const inlineStyle = { marginBottom: '8px' };

  return (
    <Layout title="Sign In">
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Grid style={inlineStyle}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid style={inlineStyle}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
            />
          </Grid>
          <Grid justifyContent="end" container>
            <Grid item>
              <Button color="secondary" variant="contained" fullWidth type="button" onClick={cancelHandler}>
                Cancel
              </Button>
            </Grid>
            <Grid item marginLeft={3}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Sign In
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

export default SignIn;
