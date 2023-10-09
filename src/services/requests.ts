import axios, { AxiosError } from 'axios';

const API_PREFIX = '/api/v1';

export const getApiUrl = () => {
  return process.env.REACT_APP_API_URI;
};

export const getApiRequest = async (path: string, params = {}, options = {}) => {
  try {
    const response = await axios.get(path, {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    // @ts-ignore
    const errorResponse: AxiosError = e;
    if (errorResponse?.response?.status === 403) {
      let response = await axios.get(`${API_PREFIX}/refresh`, {
        withCredentials: true,
      });

      //get request after token refresh
      if (response.status === 200) {
        response = await axios.get(path, {
          withCredentials: true,
        });
      }
      return response;
    } else {
      return errorResponse.response;
    }
  }
};

export const postApiRequest = async (path: string, body = {}, options = {}) => {
  try {
    const response = await axios.post(path, body, {
      withCredentials: true,
    });

    return response;
  } catch (e) {
    // @ts-ignore
    const errorResponse: AxiosError = e;
    if (errorResponse?.response?.status === 403) {
      let response = await axios.get(`${API_PREFIX}/refresh`, {
        withCredentials: true,
      });

      //post request after token refresh
      if (response.status === 200) {
        response = await axios.post(path, body, {
          withCredentials: true,
        });
      }
      return response;
    } else {
      return errorResponse.response;
    }
  }
};

export const putApiRequest = async (path: string, body = {}, options = {}) => {
  try {
    const response = await axios.put(path, body, {
      withCredentials: true,
    });

    return response;
  } catch (e) {
    // @ts-ignore
    const errorResponse: AxiosError = e;
    if (errorResponse?.response?.status === 403) {
      let response = await axios.get(`${API_PREFIX}/refresh`, {
        withCredentials: true,
      });

      //put request after token refresh
      if (response.status === 200) {
        response = await axios.put(path, body, {
          withCredentials: true,
        });
      }
      return response;
    } else {
      return errorResponse.response;
    }
  }
};

export const deleteApiRequest = async (path: string, options = {}) => {
  try {
    const response = await axios.delete(path, {
      withCredentials: true,
    });

    return response;
  } catch (e) {
    // @ts-ignore
    const errorResponse: AxiosError = e;
    if (errorResponse?.response?.status === 403) {
      let response = await axios.get(`${API_PREFIX}/refresh`, {
        withCredentials: true,
      });

      //delete request after token refresh
      if (response.status === 200) {
        response = await axios.delete(path, {
          withCredentials: true,
        });
      }
      return response;
    } else {
      return errorResponse.response;
    }
  }
};

export const invalidateUser = async (): Promise<Response> => {
  let response = await getApiRequest(`${API_PREFIX}/logout`);
  return response?.status === 200 ? response.data : response;
};
