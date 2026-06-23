import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#16213e',
          borderTopColor: '#ffffff10',
          borderTopWidth: 1,
          paddingBottom: 4,
        },
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#ffffff40',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="jouer"
        options={{
          title: 'Jouer',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🎮</Text>,
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: 'Scores',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏆</Text>,
        }}
      />
    </Tabs>
  );
}
