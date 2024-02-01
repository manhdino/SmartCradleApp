import {View, Text, Switch} from 'react-native';
import React from 'react';
import {useStyles} from 'osmicsx';
import {useAppDispatch, useAppSelector} from '@/features/hooks/redux.hook';
import {appActions, selectTheme} from '@/features/app/app.slice';

const SettingsScreen = () => {
  const {apply: s, switchTheme, colors} = useStyles();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  return (
    <View style={s('bg-indigo-100 dark:bg-gray-900 h%100 p-4')}>
      <View style={s('d-flex row justify-between')}>
        <Text style={s('text-lg dark:text-slate-50')}>Dark mode</Text>

        <Switch
          trackColor={{
            false: colors('gray-500') as string,
            true: colors('indigo-500') as string,
          }}
          ios_backgroundColor={colors('gray-500') as string}
          value={theme === 'dark'}
          onValueChange={() => {
            dispatch(appActions.setTheme(theme === 'dark' ? 'light' : 'dark'));
            switchTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
