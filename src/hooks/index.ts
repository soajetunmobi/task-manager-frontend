import { useMutation, useQuery } from 'react-query';
import { User, UserCredential } from '../views/SignIn/SignIn.types';
import { deleteApiRequest, getApiRequest, postApiRequest, putApiRequest } from '../services/requests';
import { AuthorType, TaskListType, TaskType } from '../views/TaskList/TaskList.types';
import { APIErrorType } from '../services/service.types';
import { TaskCreatePayload } from '../views/TaskForm/TaskForm.types';

const API_PREFIX = '/api/v1';

const fetchTaskDetail = async (id: string | undefined): Promise<TaskType | undefined> => {
  const response = await getApiRequest(`${API_PREFIX}/tasks/${id}`);
  console.log({ response });
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

const deleteTaskDetail = async (id: string) => {
  const response = await deleteApiRequest(`${API_PREFIX}/tasks/${id}`);

  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

const fetchUsers = async (): Promise<Array<AuthorType>> => {
  let response = await getApiRequest(`${API_PREFIX}/users`);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

const fetchTaskList = async (): Promise<TaskListType | undefined> => {
  const response = await getApiRequest(`${API_PREFIX}/tasks`);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

const postLogin = async (payload: UserCredential) => {
  const response = await postApiRequest(`${API_PREFIX}/authenticate`, payload);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

const postUser = async (payload: User) => {
  const response = await postApiRequest(`${API_PREFIX}/users`, payload);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

export const postTask = async (payload: TaskCreatePayload) => {
  const response = await postApiRequest(`${API_PREFIX}/tasks`, payload);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

export const putTask = async (id: string, payload: TaskCreatePayload) => {
  const response = await putApiRequest(`${API_PREFIX}/tasks/${id}`, payload);
  if (response?.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response?.data);
  }
};

export const useTaskDelete = (id: string, options = {}) => {
  return useMutation(() => {
    return deleteTaskDetail(id);
  }, options);
};

export const useTaskUpdate = (id: string, options = {}) => {
  return useMutation((payload: TaskCreatePayload) => {
    return putTask(id, payload);
  }, options);
};

export const useTaskCreate = (options = {}) => {
  return useMutation((payload: TaskCreatePayload) => {
    return postTask(payload);
  }, options);
};

export const useFetchTask = (id: string | undefined, options = {}) => {
  return useQuery<TaskType | undefined, APIErrorType>(['fetchTaskDetail', { id }], () => fetchTaskDetail(id), {
    enabled: !!id,
  });
};

export const useFetchUsers = (options = {}) => {
  return useQuery<Array<AuthorType>, APIErrorType>('users', () => fetchUsers(), options);
};

export const useFetchTasks = (options = {}) => {
  return useQuery<TaskListType | undefined, APIErrorType>('tasks', () => fetchTaskList());
};

export const useUserRegister = (options = {}) => {
  return useMutation((payload: User) => postUser(payload), options);
};

export const useUserLogin = (options = {}) => {
  return useMutation((payload: UserCredential) => postLogin(payload), options);
};
