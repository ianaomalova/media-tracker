import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
