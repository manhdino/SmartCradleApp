import {
  authActions,
  selectCurrentUser,
  selectIsAuth,
} from '@/features/auth/auth.slice';
import {useQuery} from '@tanstack/react-query';
import authService from '@/features/auth/auth.service';
import {useAppDispatch, useAppSelector} from './redux.hook';

function useAuth() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);

  useQuery({
    queryKey: ['/auth/getMe'],
    queryFn: () => authService.getMe(),
    retry: false,
    onSuccess: res => {
      dispatch(authActions.setIsAuth(true));
      dispatch(authActions.setCurrentUser(res));
    },
    onError: () => {},
  });

  return {isAuth, currentUser};
}

export default useAuth;
