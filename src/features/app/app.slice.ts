import {RootState} from '@/configs/redux-store.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: 'light',
  } as {
    theme: 'light' | 'dark';
  },
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      AsyncStorage.setItem('theme', action.payload);
    },
  },
});

export const appActions = appSlice.actions;

export const selectTheme = (state: RootState) => state.app.theme;

export default appSlice.reducer;
