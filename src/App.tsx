import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import TaskList from './views/TaskList/TaskList';
import TaskDetail from './views/TaskDetail/TaskDetail';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import AuthContextProvider from './context/AuthContext/AuthContext';
import TaskForm from './views/TaskForm/TaskForm';
import { PrivateRouteWrapper } from './components/PrivateRouteWrapper/PrivateRouteWrapper';
import { routes } from './constants/routes';

const queryClient = new QueryClient({});
// const ENV = process.env.REACT_APP_ENV;

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" Component={TaskList} />
            <Route path={routes.signUp} Component={SignUp} />
            <Route path={routes.signIn} Component={SignIn} />
            <Route path={routes.tasks} Component={TaskList} />
            <Route path="/tasks/:id" Component={TaskDetail} />
            <Route
              path="/add-task"
              element={
                <PrivateRouteWrapper>
                  <TaskForm />
                </PrivateRouteWrapper>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <PrivateRouteWrapper>
                  <TaskForm />
                </PrivateRouteWrapper>
              }
            />
            <Route path="*" element={<Navigate to={routes.tasks} />} />
          </Routes>
        </Router>
        {/*{ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
