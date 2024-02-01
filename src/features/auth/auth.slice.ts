import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/configs/redux-store.config';
import {User} from './auth.model';
import {ACCESS_TOKEN_KEY} from '@/configs/constant.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  currentUser: User | undefined;
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  currentUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.currentUser = undefined;
      AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
