import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from 'osmicsx';
import {useAppDispatch} from '@/features/hooks/redux.hook';
import * as yup from 'yup';
import {LoginDto} from '@/features/auth/auth.model';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {authActions} from '@/features/auth/auth.slice';
import authService from '@/features/auth/auth.service';

const LoginScreen = () => {
  const {apply} = useStyles();
  const dispatch = useAppDispatch();

  const loginSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  type FormData = yup.InferType<typeof loginSchema>;
  const {mutate} = useMutation({
    mutationFn: (data: FormData) => {
      return authService.login(data);
    },
    onSuccess: res => {
      dispatch(authActions.setIsAuth(true));
      dispatch(authActions.setCurrentUser(res));
    },
    onError: () => {},
  });

  const onSubmit = (data: LoginDto) => {
    mutate(data);
  };

  return (
    <SafeAreaView>
      <View style={apply('w%100 h%100 bg-indigo-100 py-10 px-4')}>
        <Text style={apply('text-3xl text-center tracking-widest')}>
          Welcome to Smart Cradle
        </Text>

        <Text
          style={apply('text-super-big font-fold text-center text-indigo-500')}>
          Login
        </Text>

        <View style={apply('my-4')} />

        <View>
          <Text style={apply('text-lg mb-1')}>Email address</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[apply('w%100 h-42 bg-white rounded-xl px-2')]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={apply('text-red-500')}>{errors.email.message}</Text>
          )}

          <View style={apply('my-2')} />

          <Text style={apply('text-lg mb-1')}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                secureTextEntry={true}
                style={[apply('w%100 h-42 bg-white rounded-xl px-2')]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={apply('text-red-500')}>{errors.password.message}</Text>
          )}

          <View style={apply('my-2')} />

          <View style={apply('d-flex row justify-end')}>
            <Text style={apply('mr-1')}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={apply('text-indigo-500')}>Register now</Text>
            </TouchableOpacity>
          </View>

          <View style={apply('my-4')} />

          <TouchableOpacity
            style={apply(
              'bg-indigo-500 rounded-xl h-42 d-flex row justify-center items-center',
            )}
            onPress={handleSubmit(onSubmit)}>
            <Text style={apply('text-white font-bold')} disabled={!isValid}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
