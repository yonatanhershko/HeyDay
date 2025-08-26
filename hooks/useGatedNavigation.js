import { useRouter, usePathname } from 'expo-router';
import { useAuthGate } from './authModalHandler';
import { navigateToRoute } from '../utils/navigation';

export const useGatedNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { gatedNavigate } = useAuthGate();

  const navigate = (route, fallbackRoute = null) => {
    gatedNavigate(() => navigateToRoute(pathname, router, route), fallbackRoute || route);
  };

  return navigate;
};
