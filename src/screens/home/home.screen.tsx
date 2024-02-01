import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useStyles} from 'osmicsx';
import useAuth from '@/features/hooks/useAuth';
import PagerView from 'react-native-pager-view';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import cradleService from '@/features/cradles/cradle.service';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NoData from './components/no-data';
import {
  Cradle,
  CradleDeviceType,
  ReceiveCradleData,
} from '@/features/cradles/cradle.model';
import signalrService from '@/services/signalr.service';
import AddCradleModal from './components/add-cradle-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

// const styles = {};

const deviceMap = new Map();
deviceMap.set(CradleDeviceType.TEMPERATURE, {
  name: 'temperature',
  icon: 'thermometer',
  color: 'red-500',
  unit: '°C',
});
deviceMap.set(CradleDeviceType.HUMIDITY, {
  name: 'humidity',
  icon: 'water',
  color: 'blue-500',
  unit: '%',
});
deviceMap.set(CradleDeviceType.NOISE, {
  name: 'noise',
  icon: 'volume-high',
  color: 'lime-500',
  unit: 'dB',
});
deviceMap.set(CradleDeviceType.LEAN, {
  name: 'lean',
  icon: 'sad-outline',
  color: 'amber-500',
  unit: 'radians',
});
deviceMap.set(CradleDeviceType.LIGHT, {
  name: 'light',
  icon: 'bulb',
  color: 'yellow-500',
  unit: '',
  controlType: 1,
});
deviceMap.set(CradleDeviceType.FAN, {
  name: 'fan',
  icon: 'aperture',
  color: 'indigo-500',
  unit: '',
  controlType: 2,
});

const HomeScreen = () => {
  const {apply: s, colors} = useStyles();
  const {currentUser} = useAuth();
  const [openAddCradleModal, setOpenAddCradleModal] = React.useState(false);

  const {data: listCradle} = useQuery({
    queryKey: ['/home/getListCradle'],
    queryFn: () => cradleService.getListCradle(),
  });

  const queryClient = useQueryClient();

  const resetCradleDataWithReceiver = React.useCallback(
    (data: ReceiveCradleData) => {
      queryClient.setQueryData<Cradle[]>(['/home/getListCradle'], old => {
        const newListCradle = old?.map((cradle: Cradle) => {
          if (cradle.sku === data.cradleSku) {
            const newDevices = cradle.devices.map(device => {
              return {
                ...device,
                values: [
                  ...device?.values,
                  {
                    value:
                      data[
                        deviceMap.get(device.deviceType)
                          .name as keyof typeof data
                      ],
                    timeStamp: data.time,
                  },
                ],
              };
            });

            return {
              ...cradle,
              devices: newDevices,
            };
          }
          return cradle;
        });

        return newListCradle;
      });
    },
    [queryClient],
  );

  const resetCradleDataWithControl = React.useCallback(
    (data: {cradleSku: string; deviceId: string; value: number}) => {
      queryClient.setQueryData<Cradle[]>(['/home/getListCradle'], old => {
        const newListCradle = old?.map((cradle: Cradle) => {
          if (cradle.sku === data.cradleSku) {
            const newDevices = cradle.devices.map(device => {
              if (device.id !== data.deviceId) {
                return device;
              }

              return {
                ...device,
                values: [
                  ...device?.values,
                  {
                    value: data.value,
                    timeStamp: new Date().toISOString(),
                  },
                ],
              };
            });

            return {
              ...cradle,
              devices: newDevices,
            };
          }
          return cradle;
        });

        return newListCradle;
      });
    },
    [queryClient],
  );

  useEffect(() => {
    signalrService.connection.on('SendData', (data: ReceiveCradleData) => {
      resetCradleDataWithReceiver(data);
    });
  }, [resetCradleDataWithReceiver]);

  return (
    <SafeAreaView edges={['top']}>
      <AddCradleModal
        isVisible={openAddCradleModal}
        setIsVisible={setOpenAddCradleModal}
        refetchData={() => {
          queryClient.resetQueries(['/home/getListCradle']);
        }}
      />
      <View style={s('bg-indigo-100 dark:bg-gray-900 w%100 h%100 py-4')}>
        <View style={s('d-flex row px-4')}>
          <Text style={s('text-4xl dark:text-slate-50')}>Hello, </Text>
          <Text style={s('text-4xl text-indigo-500')}>
            {currentUser?.name}!
          </Text>
        </View>

        <View style={s('my-2')} />

        {!listCradle?.length && (
          <View style={s('w%100 h%80 items-center justify-center')}>
            <NoData />
          </View>
        )}

        <PagerView style={s('h-500')} initialPage={0}>
          {listCradle?.map((cradle, index) => {
            return (
              <View key={index} style={s('p-4')}>
                <View
                  style={s(
                    'rounded-xl bg-white dark:bg-gray-800 h%100 w%100 p-2 shadow-xl',
                  )}>
                  <View style={s('w%100 d-flex row justify-center')}>
                    <Text style={s('text-2xl text-indigo-500 font-bold')}>
                      {cradle.name}
                    </Text>
                  </View>

                  <View style={s('my-2')} />

                  <FlatList
                    style={s('w%100 h%100')}
                    data={cradle.devices}
                    contentContainerStyle={s('p-2 h%100')}
                    columnWrapperStyle={s('justify-between')}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    ItemSeparatorComponent={() => <View style={s('m-1')} />}
                    renderItem={({item: device}) => {
                      if (device.deviceType <= 4) {
                        return (
                          <View
                            style={s(
                              'bg-white dark:bg-gray-700 shadow-xl rounded-xl w%49 h-125 col justify-center items-center',
                            )}>
                            <Ionicon
                              name={deviceMap.get(device.deviceType)?.icon}
                              size={36}
                              color={
                                colors(
                                  deviceMap.get(device.deviceType)?.color,
                                ) as string
                              }
                            />
                            <Text
                              style={s(
                                'text-lg font-semibold dark:text-slate-50',
                              )}>
                              {device.values?.slice(-1)[0]?.value || ''}{' '}
                              {deviceMap.get(device.deviceType)?.unit}
                            </Text>
                          </View>
                        );
                      } else {
                        const isOn = device.values?.slice(-1)[0]?.value === 1;

                        return (
                          <TouchableOpacity
                            style={[
                              s(
                                'shadow-xl rounded-xl w%49 h-125 col justify-center items-center',
                              ),
                              isOn
                                ? s('bg-indigo-500')
                                : s('bg-gray-300 dark:bg-gray-800'),
                            ]}
                            onPress={() => {
                              const value = isOn ? 0 : 1;
                              signalrService.connection
                                .invoke('SendControl', {
                                  cradleSku: cradle.sku,
                                  value,
                                  type: deviceMap.get(device.deviceType)
                                    ?.controlType,
                                })
                                .then(() => {
                                  resetCradleDataWithControl({
                                    cradleSku: cradle.sku,
                                    deviceId: device.id,
                                    value,
                                  });
                                });
                            }}>
                            <Ionicon
                              name={deviceMap.get(device.deviceType)?.icon}
                              size={36}
                              color={
                                isOn
                                  ? (colors('white') as string)
                                  : (colors('slate-500') as string)
                              }
                            />
                          </TouchableOpacity>
                        );
                      }
                    }}
                    keyExtractor={item => item.id}
                    numColumns={2}
                  />
                </View>
              </View>
            );
          })}
        </PagerView>

        <View style={s('px-4 mt-4 row justify-center')}>
          <TouchableOpacity
            style={s('bg-indigo-500 p-4 rounded-xl shadow-xl')}
            onPress={() => setOpenAddCradleModal(true)}>
            <Text style={s('text-white text-lg')}>Add new</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
