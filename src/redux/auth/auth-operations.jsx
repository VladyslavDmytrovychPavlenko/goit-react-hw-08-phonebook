// import { createAsyncThunk } from '@reduxjs/toolkit';

// import * as api from 'services/auth';

// export const signup = createAsyncThunk(
//   'auth/signup',
//   async (data, { rejectWithValue }) => {
//     try {
//       const result = await api.register(data);
//       return result;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (data, { rejectWithValue }) => {
//     try {
//       const result = await api.login(data);
//       return result;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await api.logout();
//       return result;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );

// export const current = createAsyncThunk(
//   'auth/current',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const result = await api.getCurrent(auth.token);
//       return result;
//     } catch ({ response }) {
//       const error = {
//         status: response.status,
//         message: response.data.message,
//       };
//       return rejectWithValue(error);
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const { auth } = getState();
//       if (!auth.token) {
//         return false;
//       }
//     },
//   }
// );
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signup = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      Notiflix.Notify.warning('Something went wrong. Please, try again .');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      Notiflix.Notify.warning('Something went wrong. Please, try again .');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const current = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
