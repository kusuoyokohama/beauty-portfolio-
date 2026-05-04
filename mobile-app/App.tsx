import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { trpc, queryClient } from './lib/trpc';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateScreen from './screens/CreateScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

function AuthenticatedApp(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#94a3b8',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ホーム',
          tabBarLabel: 'ホーム',
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'ダッシュボード',
          tabBarLabel: 'ダッシュボード',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: '原稿生成',
          tabBarLabel: '生成',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: '履歴',
          tabBarLabel: '履歴',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '設定',
          tabBarLabel: '設定',
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent(): React.JSX.Element {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Loading"
              component={() => null}
              options={{ headerShown: false, tabBarVisible: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isSignedIn ? (
          <AuthenticatedApp />
        ) : (
          <LoginScreen
            onLoginSuccess={() => {
              // Navigation will automatically update when auth state changes
            }}
          />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpc} queryClient={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default App;
