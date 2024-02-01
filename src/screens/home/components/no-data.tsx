import {View, Text} from 'react-native';
import React from 'react';
import {useStyles} from 'osmicsx';
import Ionicon from 'react-native-vector-icons/Ionicons';

const NoData = () => {
  const {apply: s, colors} = useStyles();

  return (
    <View style={s('col items-center justify-center')}>
      <Text style={s('text-2xl text-indigo-500 font-bold')}>No Data</Text>

      <Ionicon
        name="warning-outline"
        size={48}
        color={colors('indigo-500') as string}
      />
    </View>
  );
};

export default NoData;
