import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeyDayIcon from '../general/low_level/HeyDayIcon.js';

const Tab = createBottomTabNavigator();

// Dummy screens just for the navigator (not used for real nav now)
const DummyScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number, routeName: string) => {
    setActiveIndex(index);
    console.log(`Pressed: ${routeName}`);
  };

  const icons = ['home', 'profile', 'history', 'mainIcon'];

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = activeIndex === index;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={() => handlePress(index, route.name)}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <HeyDayIcon
              name={icons[index]}
              color={isFocused ? 'white' : 'gray'}
              size={24}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomNavMain = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="home" component={DummyScreen} />
      <Tab.Screen name="profile" component={DummyScreen} />
      <Tab.Screen name="history" component={DummyScreen} />
      <Tab.Screen name="mainIcon" component={DummyScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#019FFF',
  },
});

export default BottomNavMain;
