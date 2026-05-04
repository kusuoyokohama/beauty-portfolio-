import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/AuthContext';

function DashboardScreen(): React.JSX.Element {
  const { user } = useAuth();

  // Fetch subscription info
  const { data: subscription, isLoading: subscriptionLoading } =
    trpc.subscription.get.useQuery(undefined, {
      enabled: !!user,
    });

  // Fetch recent articles
  const { data: articles, isLoading: articlesLoading } =
    trpc.article.list.useQuery({ limit: 5, offset: 0 }, {
      enabled: !!user,
    });

  const isLoading = subscriptionLoading || articlesLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      </SafeAreaView>
    );
  }

  const usageCount = subscription?.usageThisMonth || 0;
  const planLimit = subscription?.monthlyLimit || 5;
  const planName = subscription?.planName || 'フリー';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Usage Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>今月の生成回数</Text>
            <Text style={styles.statValue}>
              {usageCount} / {planLimit}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(usageCount / planLimit) * 100}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>現在のプラン</Text>
            <Text style={styles.planBadge}>{planName}</Text>
          </View>
        </View>

        {/* Create New Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>新しい原稿を作る</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Articles */}
        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>最近の原稿</Text>

          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <TouchableOpacity key={article.id} style={styles.articleCard}>
                <View style={styles.articleHeader}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleDate}>
                    {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                  </Text>
                </View>
                {article.treatmentMenus && (
                  <Text style={styles.articleMenu}>
                    {JSON.parse(article.treatmentMenus).join(', ')}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                まだ原稿がありません。新しい原稿を作成してみましょう！
              </Text>
            </View>
          )}
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
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0ea5e9',
  },
  planBadge: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  actionSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  articlesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  articleDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  articleMenu: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default DashboardScreen;
