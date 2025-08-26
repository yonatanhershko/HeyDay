import { Stack } from 'expo-router';

export default function HeyDayLayout () {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
      options={{ animation: 'slide_from_right' }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
