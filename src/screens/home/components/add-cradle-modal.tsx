import {useStyles} from 'osmicsx';
import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import cradleService from '@/features/cradles/cradle.service';

interface AddCradleModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  refetchData: () => void;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    sku: yup.string().required(),
    avatar: yup.string(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function AddCradleModal({
  isVisible,
  setIsVisible,
  refetchData,
}: AddCradleModalProps) {
  const {apply: s} = useStyles();

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: {errors, isValid},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      sku: '',
      avatar: '',
    },
    mode: 'onBlur',
  });

  const {mutate} = useMutation({
    mutationFn: (data: FormData) => {
      return cradleService.createCradle(data);
    },
    onSuccess: () => {
      refetchData();
      toggleModal();
      resetForm();
      Alert.alert('Success', 'Add cradle successfully');
    },
    onError: () => {},
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={s('flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl')}>
        <View style={s('w%100 row justify-center')}>
          <Text
            style={s('text-xl font-bold text-indigo-500 dark:text-indigo-400')}>
            Add new cradle
          </Text>
        </View>

        <View style={s('my-4')} />

        {[
          {
            name: 'name',
            label: 'Name',
            multiline: false,
          },
          {
            name: 'sku',
            label: 'SKU',
            multiline: false,
          },
          {
            name: 'description',
            label: 'Description',
            multiline: true,
          },
        ].map((item: any, index) => {
          return (
            <React.Fragment key={index}>
              <Text
                style={s('text-md mb-1 text-slate-700 dark:text-slate-400')}>
                {item.label}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name={item.name}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={[
                      s(
                        'w%100 h-36 bg-gray-200 dark:bg-gray-700 rounded-xl px-2 text-slate-900 dark:text-slate-50',
                      ),
                      item.multiline && s('h-100'),
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline={item.multiline}
                  />
                )}
              />
              {errors?.[
                item.name as 'name' | 'description' | 'sku' | 'avatar'
              ] && (
                <Text style={s('text-red-500')}>
                  {
                    errors?.[
                      item.name as 'name' | 'description' | 'sku' | 'avatar'
                    ]?.message
                  }
                </Text>
              )}

              <View style={s('my-2')} />
            </React.Fragment>
          );
        })}

        <View style={s('my-2')} />

        <View style={s('row justify-end')}>
          <TouchableOpacity
            style={s('bg-white-500 py-2 px-3 rounded-xl shadow-xl')}
            onPress={toggleModal}>
            <Text style={s('text-indigo-400 text-lg')}>Cancel</Text>
          </TouchableOpacity>

          <View style={s('mx-2')} />

          <TouchableOpacity
            disabled={!isValid}
            style={s('bg-indigo-500 py-2 px-3 rounded-xl shadow-xl')}
            onPress={handleSubmit(onSubmit)}>
            <Text style={s('text-white text-lg')}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default AddCradleModal;
