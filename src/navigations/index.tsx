import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from '@/features/hooks/useAuth';
import AuthNavigator from './auth.navigation';
import BottomTabNavigator from './bottom-tab.navigation';
import {useQueryClient} from '@tanstack/react-query';
import signalrService from '@/services/signalr.service';
import {useAppDispatch} from '@/features/hooks/redux.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appActions} from '@/features/app/app.slice';
import {useStyles} from 'osmicsx';

const MyNavigationContainer = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();
  const {switchTheme} = useStyles();

  const queryClient = useQueryClient();
  const {isAuth} = useAuth();

  useEffect(() => {
    if (isAuth) {
      signalrService.start();
    }
  }, [isAuth]);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(theme => {
      if (theme === 'light' || theme === 'dark') {
        dispatch(appActions.setTheme(theme));
        switchTheme(theme);
      }
    });
  }, [dispatch, switchTheme]);

  return (
    <NavigationContainer
      onStateChange={() =>
        queryClient.refetchQueries({queryKey: ['/auth/getMe']})
      }>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuth ? (
          <Stack.Screen name="/main" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="/auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigationContainer;
