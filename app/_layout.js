import React, { useEffect, useState } from 'react';
import { StyleSheet, View as RNView, Image, View, TouchableOpacity } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';
import { checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from 'expo-updates';
// import { TokenAuthProvider, useTokenAuth } from '../contexts/TokenAuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../i18n.config';
import HeyDayText from '../components/general/low_level/Text/HeyDayText';
import { useUserStore } from '../contexts/store/UserStore';


function AppContent() {
  return (
    <>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </>
  );
}

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('./../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('./../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('./../assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-ExtraBold': require('./../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Bold': require('./../assets/fonts/Rubik-Bold.ttf'),
    'LondrinaSolid-Regular': require('./../assets/fonts/LondrinaSolid-Regular.ttf'),
    'LondrinaShadow-Regular': require('./../assets/fonts/LondrinaShadow-Regular.ttf'),
  });
  const pathname = usePathname();
  const [updateChecked, setUpdateChecked] = useState(false);
  const { initializeOnboardingState } = useUserStore();

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const update = await checkForUpdateAsync();
        if (update.isAvailable) {
          await fetchUpdateAsync();
          await reloadAsync();
        } else {
          setUpdateChecked(true);
        }
      } catch (e) {
        setUpdateChecked(true);
      }
    };

    checkUpdate();
  }, []);

  // Initialize onboarding state from AsyncStorage when app starts
  useEffect(() => {
    initializeOnboardingState();
  }, []);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Initial network state check
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <RNView style={styles.offlineScreen}>
        <RNView style={styles.offlineContent}>
          <MaterialIcons name="signal-wifi-off" size={64} color="#999" />
          <HeyDayText style={styles.offlineTitle}>{i18n.t('Network.noInternet')}</HeyDayText>
          <HeyDayText style={styles.offlineMessage}>
            {i18n.t('Network.checkNetwork')}
          </HeyDayText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              NetInfo.fetch().then(state => {
                setIsConnected(state.isConnected);
              });
            }}>
            <HeyDayText style={styles.retryText}>{i18n.t('Network.retry')}</HeyDayText>
          </TouchableOpacity>
        </RNView>
      </RNView>
    );
  }

  if (!fontsLoaded || !updateChecked) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../assets/gifs/heyDayLoad.gif')} style={styles.gifStyle} />
      </View>
    );
  }

  const renderContent = () => {
    if (pathname.includes('heyday')) {
      return (
        <>
          <AppContent />
          {/* Toast removed: `toastConfig`/`Toast` not defined. Reintroduce once toast library is added. */}
        </>
      );
    }
    return (
      <View style={styles.flexContainer}>
        <AppContent />
        {/* Toast removed: `toastConfig`/`Toast` not defined. */}
      </View>
    );
  }

  return (
    <View style={styles.flexContainer}>
        {/* <VersionCheckWrapper>  when have version lets create it*/} 
            {/* <TokenAuthProvider> */}
                <>
                  {renderContent()}
                </>
            {/* </TokenAuthProvider>  if token needed add it here */}
        {/* </VersionCheckWrapper> */}
    </View>
  );
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  gifStyle: {
    height: 300,
    width: 300,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  offlineContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  offlineMessage: {
    color: '#666',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  offlineScreen: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  offlineTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'Rubik-SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
});
