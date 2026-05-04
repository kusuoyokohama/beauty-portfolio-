import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/AuthContext';

function SettingsScreen(): React.JSX.Element {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch salon info
  const { data: salon, isLoading: salonLoading } = trpc.salon.get.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Fetch subscription info
  const { data: subscription, isLoading: subscriptionLoading } =
    trpc.subscription.get.useQuery(undefined, {
      enabled: !!user,
    });

  // Upsert salon mutation
  const upsertSalonMutation = trpc.salon.upsert.useMutation();

  const [salonName, setSalonName] = useState('');
  const [location, setLocation] = useState('');
  const [staffName, setStaffName] = useState('');
  const [hashtags, setHashtags] = useState('');

  // Initialize form with fetched data
  useEffect(() => {
    if (salon) {
      setSalonName(salon.salonName || '');
      setLocation(salon.location || '');
      setStaffName(salon.staffName || '');
      setHashtags(salon.fixedHashtags || '');
    }
  }, [salon]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await upsertSalonMutation.mutateAsync({
        salonName,
        location,
        staffName,
        fixedHashtags: hashtags,
      });
      setIsEditing(false);
      Alert.alert('成功', '店舗情報を保存しました');
    } catch (error) {
      Alert.alert('エラー', '店舗情報の保存に失敗しました');
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('ログアウト', 'ログアウトしますか？', [
      { text: 'キャンセル', onPress: () => {} },
      {
        text: 'ログアウト',
        onPress: async () => {
          try {
            await logout();
          } catch {
            Alert.alert('エラー', 'ログアウトに失敗しました');
          }
        },
      },
    ]);
  };

  const isLoading = salonLoading || subscriptionLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Salon Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>店舗情報</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text style={styles.editButton}>
                {isEditing ? 'キャンセル' : '編集'}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={styles.formSection}>
              <Text style={styles.label}>店舗名</Text>
              <TextInput
                style={styles.input}
                value={salonName}
                onChangeText={setSalonName}
                placeholder="店舗名を入力"
              />

              <Text style={styles.label}>所在地</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="所在地を入力"
              />

              <Text style={styles.label}>担当者名</Text>
              <TextInput
                style={styles.input}
                value={staffName}
                onChangeText={setStaffName}
                placeholder="担当者名を入力"
              />

              <Text style={styles.label}>固定ハッシュタグ</Text>
              <TextInput
                style={styles.input}
                value={hashtags}
                onChangeText={setHashtags}
                placeholder="#美容室 #ヘアスタイル"
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isSaving}>
                <Text style={styles.saveButtonText}>
                  {isSaving ? '保存中...' : '保存'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>店舗名</Text>
                <Text style={styles.infoValue}>{salonName || '未設定'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>所在地</Text>
                <Text style={styles.infoValue}>{location || '未設定'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>担当者名</Text>
                <Text style={styles.infoValue}>{staffName || '未設定'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>固定ハッシュタグ</Text>
                <Text style={styles.infoValue}>{hashtags || '未設定'}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>現在のプラン</Text>
          <View style={styles.planCard}>
            <Text style={styles.planName}>{subscription?.planName || 'フリー'}</Text>
            <Text style={styles.planPrice}>
              ¥{subscription?.monthlyPrice || 0}/月
            </Text>
            <Text style={styles.planFeature}>
              月{subscription?.monthlyLimit || 5}回まで生成
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>プランを変更</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Usage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>利用状況</Text>
          <View style={styles.usageCard}>
            <View style={styles.usageItem}>
              <Text style={styles.usageLabel}>今月の生成回数</Text>
              <Text style={styles.usageValue}>
                {subscription?.usageThisMonth || 0} / {subscription?.monthlyLimit || 5}
              </Text>
            </View>
            <View style={styles.usageItem}>
              <Text style={styles.usageLabel}>保存済み原稿</Text>
              <Text style={styles.usageValue}>
                {subscription?.totalArticles || 0}件
              </Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント</Text>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>ログアウト</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  editButton: {
    fontSize: 14,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 14,
    color: '#1e293b',
  },
  saveButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  infoItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  planFeature: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  upgradeButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  usageCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  usageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  usageLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  usageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  userInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  userEmail: {
    fontSize: 14,
    color: '#1e293b',
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SettingsScreen;
