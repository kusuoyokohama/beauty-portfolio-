import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// ホーム画面
const HomeScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>atelier six. Writer</Text>
      <Text style={styles.heroSubtitle}>AI 搭載の原稿自動生成 SaaS</Text>
      <Text style={styles.heroDescription}>
        美容室スタッフが顧客情報を入力するだけで、Claude AI が自動的に SNS 投稿やブログ記事を生成します。
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>主な機能</Text>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>✨ AI 自動生成</Text>
        <Text style={styles.featureDesc}>Claude API による高品質な原稿生成</Text>
      </View>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>📱 モバイルファースト</Text>
        <Text style={styles.featureDesc}>iOS・Android 両対応</Text>
      </View>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>🔐 セキュア認証</Text>
        <Text style={styles.featureDesc}>Manus OAuth による安全なログイン</Text>
      </View>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>料金プラン</Text>
      <View style={styles.planCard}>
        <Text style={styles.planName}>スターター</Text>
        <Text style={styles.planPrice}>¥2,980/月</Text>
        <Text style={styles.planFeature}>• 月 10 回の生成</Text>
        <Text style={styles.planFeature}>• 基本サポート</Text>
      </View>
      <View style={styles.planCard}>
        <Text style={styles.planName}>プロ</Text>
        <Text style={styles.planPrice}>¥9,980/月</Text>
        <Text style={styles.planFeature}>• 月 100 回の生成</Text>
        <Text style={styles.planFeature}>• 優先サポート</Text>
      </View>
    </View>
  </ScrollView>
);

// ダッシュボード画面
const DashboardScreen = () => {
  const [stats] = useState({
    thisMonth: 45,
    limit: 100,
    articles: [
      { id: 1, title: 'ハイライトカラーの魅力', date: '2026-05-02' },
      { id: 2, title: 'ダメージケアのコツ', date: '2026-05-01' },
      { id: 3, title: '春のヘアスタイル', date: '2026-04-30' },
    ],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今月の利用状況</Text>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{stats.thisMonth}</Text>
          <Text style={styles.statsLabel}>/ {stats.limit} 回</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(stats.thisMonth / stats.limit) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近の原稿</Text>
        {stats.articles.map((article) => (
          <View key={article.id} style={styles.articleCard}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDate}>{article.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// 原稿生成画面
const CreateScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerAge: '',
    visitFrequency: '',
    concerns: [],
    treatments: [],
    reaction: '',
    staffThoughts: '',
    customerVoice: '',
    longTermGoal: '',
  });

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      Alert.alert('生成完了', '原稿が生成されました！');
      setStep(1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 1: お客様情報</Text>
            <select
              style={styles.select}
              value={formData.customerAge}
              onChange={(e) =>
                setFormData({ ...formData, customerAge: e.target.value })
              }
            >
              <option value="">年代を選択</option>
              <option value="20代">20代</option>
              <option value="30代">30代</option>
              <option value="40代">40代</option>
              <option value="50代以上">50代以上</option>
            </select>
            <select
              style={styles.select}
              value={formData.visitFrequency}
              onChange={(e) =>
                setFormData({ ...formData, visitFrequency: e.target.value })
              }
            >
              <option value="">来店パターンを選択</option>
              <option value="新規">新規</option>
              <option value="再来">再来</option>
              <option value="定期利用">定期利用</option>
              <option value="失客再来">失客再来</option>
            </select>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 2: 髪の悩み</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="髪の悩みを入力（複数可）"
              value={formData.concerns.join(', ')}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  concerns: text.split(',').map((c) => c.trim()),
                })
              }
              multiline
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 3: 施術内容</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="施術内容を入力（複数可）"
              value={formData.treatments.join(', ')}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  treatments: text.split(',').map((t) => t.trim()),
                })
              }
              multiline
            />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 4: 仕上がりの反応</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="お客様の反応を入力"
              value={formData.reaction}
              onChangeText={(text) =>
                setFormData({ ...formData, reaction: text })
              }
              multiline
            />
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 5: スタッフ所感</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="スタッフの所感を入力"
              value={formData.staffThoughts}
              onChangeText={(text) =>
                setFormData({ ...formData, staffThoughts: text })
              }
              multiline
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 6: お客様の声</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="お客様の声を入力"
              value={formData.customerVoice}
              onChangeText={(text) =>
                setFormData({ ...formData, customerVoice: text })
              }
              multiline
            />
          </View>
        );
      case 7:
        return (
          <View>
            <Text style={styles.stepTitle}>ステップ 7: 長期ゴール</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="長期ゴールを入力"
              value={formData.longTermGoal}
              onChangeText={(text) =>
                setFormData({ ...formData, longTermGoal: text })
              }
              multiline
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            ステップ {step} / 7
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(step / 7) * 100}%` },
              ]}
            />
          </View>
        </View>

        {renderStep()}

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={handlePrev}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                前へ戻る
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {step === 7 ? '生成する' : '次へ'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// 履歴画面
const HistoryScreen = () => {
  const [filter, setFilter] = useState('all');
  const [articles] = useState([
    {
      id: 1,
      title: 'ハイライトカラーの魅力',
      date: '2026-05-02',
      status: 'completed',
    },
    {
      id: 2,
      title: 'ダメージケアのコツ',
      date: '2026-05-01',
      status: 'completed',
    },
    {
      id: 3,
      title: '春のヘアスタイル',
      date: '2026-04-30',
      status: 'draft',
    },
  ]);

  const filteredArticles = articles.filter((article) => {
    if (filter === 'completed') return article.status === 'completed';
    if (filter === 'draft') return article.status === 'draft';
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>フィルタ</Text>
        <View style={styles.filterContainer}>
          {['all', 'completed', 'draft'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === f && styles.filterButtonTextActive,
                ]}
              >
                {f === 'all'
                  ? 'すべて'
                  : f === 'completed'
                    ? '生成済み'
                    : '下書き'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {filteredArticles.map((article) => (
          <View key={article.id} style={styles.historyCard}>
            <View style={styles.historyCardHeader}>
              <Text style={styles.historyTitle}>{article.title}</Text>
              <Text
                style={[
                  styles.statusBadge,
                  article.status === 'completed'
                    ? styles.statusCompleted
                    : styles.statusDraft,
                ]}
              >
                {article.status === 'completed' ? '生成済み' : '下書き'}
              </Text>
            </View>
            <Text style={styles.historyDate}>{article.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// 設定画面
const SettingsScreen = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'サロン名',
    address: '東京都渋谷区',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>店舗情報</Text>
        <TextInput
          style={styles.input}
          placeholder="店舗名"
          value={storeInfo.name}
          onChangeText={(text) =>
            setStoreInfo({ ...storeInfo, name: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="住所"
          value={storeInfo.address}
          onChangeText={(text) =>
            setStoreInfo({ ...storeInfo, address: text })
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>プラン情報</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>現在のプラン</Text>
          <Text style={styles.infoValue}>プロ</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>月間利用回数</Text>
          <Text style={styles.infoValue}>45 / 100</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={() => Alert.alert('ログアウト', 'ログアウトしました')}
        >
          <Text style={styles.buttonText}>ログアウト</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// メインアプリ
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name === 'Home'
            ? 'ホーム'
            : route.name === 'Dashboard'
              ? 'ダッシュボード'
              : route.name === 'Create'
                ? '生成'
                : route.name === 'History'
                  ? '履歴'
                  : '設定',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'atelier six. Writer' }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'ダッシュボード' }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: '原稿生成' }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: '履歴' }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: '設定' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    backgroundColor: '#6366f1',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 14,
    color: '#e0e7ff',
    lineHeight: 20,
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#6b7280',
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  planFeature: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statsLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  articleCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  articleDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  select: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    width: '100%',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
    flex: 1,
  },
  buttonSecondary: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#374151',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusDraft: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  historyDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
});
