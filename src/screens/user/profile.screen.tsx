import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import {useStyles} from 'osmicsx';
import useAuth from '@/features/hooks/useAuth';

const styles = {
  label: 'text-slate-500 dark:text-slate-400',
  input: 'h-48 bg-white dark:bg-gray-800 dark:text-slate-50 rounded-xl px-2',
};

const ProfileScreen = () => {
  const {apply} = useStyles();
  const {currentUser} = useAuth();

  return (
    <View
      style={apply(
        'd-flex col items-center py-10 px-4 bg-indigo-100 dark:bg-gray-900 h%100',
      )}>
      <Image
        style={apply('h-128 w-128 rounded-full border-2 border-indigo-500')}
        source={{
          uri:
            currentUser?.avatar ||
            `https://i.pravatar.cc/150?u=${currentUser?.id}`,
        }}
      />

      <View style={apply('my-2')} />

      <Text style={apply('text-xl text-indigo-500 font-bold')}>
        {currentUser?.name}
      </Text>

      <View style={apply('my-4')} />

      <View style={apply('w%100')}>
        <Text style={apply(styles.label)}>Full name</Text>
        <View style={apply('my-1')} />
        <TextInput
          style={apply(styles.input)}
          value={currentUser?.name}
          editable={false}
        />
      </View>

      <View style={apply('my-2')} />

      <View style={apply('w%100')}>
        <Text style={apply(styles.label)}>Email address</Text>
        <View style={apply('my-1')} />
        <TextInput
          style={apply(styles.input)}
          value={currentUser?.email}
          editable={false}
        />
      </View>

      <View style={apply('my-2')} />

      <View style={apply('w%100')}>
        <Text style={apply(styles.label)}>Address</Text>
        <View style={apply('my-1')} />
        <TextInput
          style={apply(styles.input)}
          value={currentUser?.address}
          editable={false}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
