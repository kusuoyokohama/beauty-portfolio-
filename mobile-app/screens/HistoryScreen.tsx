import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/AuthContext';

function HistoryScreen(): React.JSX.Element {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Fetch articles
  const { data: articles, isLoading, refetch } = trpc.article.list.useQuery(
    { limit: 50, offset: 0 },
    { enabled: !!user }
  );

  // Delete article mutation
  const deleteMutation = trpc.article.delete.useMutation({
    onSuccess: () => {
      refetch();
      Alert.alert('成功', '原稿を削除しました');
    },
    onError: () => {
      Alert.alert('エラー', '削除に失敗しました');
    },
  });

  const handleDelete = (articleId: number) => {
    Alert.alert('削除確認', '本当に削除しますか？', [
      { text: 'キャンセル', onPress: () => {} },
      {
        text: '削除',
        onPress: () => {
          deleteMutation.mutate({ id: articleId });
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      </SafeAreaView>
    );
  }

  const filteredArticles = articles || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>フィルタ</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('all')}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'all' && styles.filterButtonTextActive,
                ]}>
                すべて
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'generated' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('generated')}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'generated' && styles.filterButtonTextActive,
                ]}>
                生成済み
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'draft' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('draft')}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'draft' && styles.filterButtonTextActive,
                ]}>
                下書き
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Articles List */}
        <View style={styles.articlesSection}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <TouchableOpacity key={article.id} style={styles.articleCard}>
                <View style={styles.articleHeader}>
                  <View style={styles.articleInfo}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleDate}>
                      {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      article.status === 'generated'
                        ? styles.statusGenerated
                        : styles.statusDraft,
                    ]}>
                    <Text
                      style={[
                        styles.statusText,
                        article.status === 'generated'
                          ? styles.statusTextGenerated
                          : styles.statusTextDraft,
                      ]}>
                      {article.status === 'generated' ? '生成済み' : '下書き'}
                    </Text>
                  </View>
                </View>

                {article.treatmentMenus && (
                  <Text style={styles.articleMenu}>
                    {JSON.parse(article.treatmentMenus).join(', ')}
                  </Text>
                )}

                {article.blogContent && (
                  <Text style={styles.articlePreview} numberOfLines={2}>
                    {article.blogContent}
                  </Text>
                )}

                <View style={styles.articleActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>詳細</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(article.id)}>
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                      削除
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                まだ原稿がありません
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
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterButtonActive: {
    backgroundColor: '#0ea5e9',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#475569',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  articlesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  articleDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusGenerated: {
    backgroundColor: '#d1fae5',
  },
  statusDraft: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextGenerated: {
    color: '#047857',
  },
  statusTextDraft: {
    color: '#b45309',
  },
  articleMenu: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  articlePreview: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
    lineHeight: 16,
  },
  articleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#dc2626',
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

export default HistoryScreen;
