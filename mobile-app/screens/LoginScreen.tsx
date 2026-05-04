import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../contexts/AuthContext';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

function LoginScreen({ onLoginSuccess }: LoginScreenProps): React.JSX.Element {
  const [showWebView, setShowWebView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const OAUTH_URL = process.env.VITE_OAUTH_PORTAL_URL || 'https://oauth.manus.im';
  const APP_ID = process.env.VITE_APP_ID || '';
  const CALLBACK_URL = 'ateliersixapp://oauth-callback';

  const handleLoginPress = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = async (newNavState: any) => {
    const { url } = newNavState;

    // Check if the URL contains the OAuth callback
    if (url.includes('oauth-callback')) {
      try {
        setIsLoading(true);

        // Extract code and state from URL
        const urlParams = new URL(url).searchParams;
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code && state) {
          // Exchange code for token on backend
          const response = await fetch('http://localhost:3000/api/oauth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.token) {
              await login(data.token);
              setShowWebView(false);
              onLoginSuccess();
            }
          }
        }
      } catch (error) {
        console.error('OAuth callback handling failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (showWebView) {
    return (
      <SafeAreaView style={styles.container}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0ea5e9" />
          </View>
        )}
        <WebView
          source={{
            uri: `${OAUTH_URL}/authorize?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&response_type=code&scope=openid+profile+email`,
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0ea5e9" />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>atelier six.</Text>
          <Text style={styles.title}>Writer</Text>
          <Text style={styles.subtitle}>
            AI搭載の原稿生成ツール
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✨</Text>
            <Text style={styles.featureText}>3分で予約が入る原稿が完成</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureText}>Claude AIが自動生成</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>スマホで簡単操作</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginPress}
          disabled={isLoading}>
          <Text style={styles.loginButtonText}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Manus OAuth で安全にログイン
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  features: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});

export default LoginScreen;
