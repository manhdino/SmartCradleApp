import React from 'react';
import HomeScreen from '@/screens/home/home.screen';
import SettingsScreen from '@/screens/settings/settings.screen';
import ProfileScreen from '@/screens/user/profile.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStyles} from 'osmicsx';
import {useAppSelector} from '@/features/hooks/redux.hook';
import {selectTheme} from '@/features/app/app.slice';

const Tab = createBottomTabNavigator();

const mapIcon = new Map();
mapIcon.set('/main/home', 'home');
mapIcon.set('/main/profile', 'person');
mapIcon.set('/main/settings', 'settings');

const screenOptions =
  (colors: any, isLight: boolean) =>
  ({route}: any) => ({
    headerStyle: {
      backgroundColor: colors(isLight ? 'white' : 'gray-800'),
    },
    headerTitleStyle: {
      color: colors(isLight ? 'slate-500' : 'slate-300'),
    },
    tabBarIcon: ({color, size}: any) => {
      const iconName = mapIcon.get(route.name);

      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors('indigo-500'),
    tabBarInactiveTintColor: colors(isLight ? 'slate-500' : 'slate-500'),
    tabBarStyle: {
      backgroundColor: colors(isLight ? 'white' : 'gray-800'),
    },
  });

function BottomTabNavigator() {
  const {colors} = useStyles();
  const theme = useAppSelector(selectTheme);
  const isLight = theme === 'light';

  return (
    <Tab.Navigator screenOptions={screenOptions(colors, isLight)}>
      <Tab.Screen
        name="/main/home"
        component={HomeScreen}
        options={() => ({
          title: 'Home',
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="/main/profile"
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
        })}
      />
      <Tab.Screen
        name="/main/settings"
        component={SettingsScreen}
        options={() => ({
          title: 'Setting',
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
