import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Theme, Paper, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';
import { LayoutProps } from './Layout.types';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { useQueryClient } from 'react-query';
import { invalidateUser } from '../../services/requests';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    background: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    marginLeft: '5px',
    marginRight: '5px',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { name, isAuthenticated, logout } = useAuthContext();
  const location = useLocation();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    await invalidateUser();
    await queryClient.invalidateQueries();
    logout();
  };

  // @ts-ignore
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar>
            <Grid justifyContent="space-between" alignItems="center" container>
              <Grid item>
                <Typography variant="h6">{title}</Typography>
              </Grid>
              <Grid item>
                <Grid justifyContent="space-between" alignItems="center" container>
                  {!isAuthenticated && location.pathname !== '/sign-in' && (
                    <Grid item>
                      <Link className={classes.link} to="/sign-in" state={{ prev: location.pathname }}>
                        Sign In
                      </Link>
                    </Grid>
                  )}
                  {!isAuthenticated && location.pathname !== '/sign-up' && (
                    <Grid item>
                      <Link className={classes.link} to="/sign-up" state={{ prev: location.pathname }}>
                        Sign Up
                      </Link>
                    </Grid>
                  )}
                  {isAuthenticated && (
                    <Grid item>
                      <Box className={classes.link} onClick={logoutHandler}>
                        Logout
                      </Box>
                    </Grid>
                  )}
                  {isAuthenticated && (
                    <Grid item>
                      <Link className={classes.link} to="/add-task">
                        Add a Task
                      </Link>
                    </Grid>
                  )}
                  {isAuthenticated && (
                    <Grid item>
                      <Grid container>
                        <Grid style={{ marginRight: '8px', marginLeft: '8px' }} item>
                          |
                        </Grid>
                        <Grid item>Hi, {name}</Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg">
          <Paper elevation={2} style={{ padding: '16px' }}>
            {children}
          </Paper>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Task Manager
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
