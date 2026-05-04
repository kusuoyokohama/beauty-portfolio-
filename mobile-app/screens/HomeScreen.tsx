import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.badge}>🎨 AI搭載の原稿生成ツール</Text>
          <Text style={styles.heroTitle}>3分で予約が入る原稿が完成</Text>
          <Text style={styles.heroSubtitle}>
            施術情報をフォーム入力するだけで、Claude AIが
            ホットペッパービューティー・Instagram・X用の原稿を自動生成。
            美容師が本来やるべき仕事に集中できます。
          </Text>

          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>無料で試す</Text>
          </TouchableOpacity>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>料金プラン</Text>

          <View style={styles.pricingCard}>
            <Text style={styles.planName}>フリー</Text>
            <Text style={styles.planPrice}>¥0</Text>
            <Text style={styles.planFeature}>月5回まで生成</Text>
            <Text style={styles.planFeature}>直近10件まで保存</Text>
          </View>

          <View style={[styles.pricingCard, styles.proCard]}>
            <Text style={styles.planName}>プロ</Text>
            <Text style={styles.planPrice}>
              ¥2,980
              <Text style={styles.planPeriod}>/月</Text>
            </Text>
            <Text style={styles.planFeature}>月50回まで生成</Text>
            <Text style={styles.planFeature}>履歴無制限保存</Text>
          </View>

          <View style={styles.pricingCard}>
            <Text style={styles.planName}>チーム</Text>
            <Text style={styles.planPrice}>
              ¥7,980
              <Text style={styles.planPeriod}>/月</Text>
            </Text>
            <Text style={styles.planFeature}>月200回まで生成</Text>
            <Text style={styles.planFeature}>5アカウント・無制限保存</Text>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>お客様の声</Text>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              「毎日の原稿作成に時間がかかっていましたが、このツールを使うようになってから、施術に集中できるようになりました。」
            </Text>
            <Text style={styles.testimonialAuthor}>- 横浜・美容室オーナー</Text>
          </View>
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
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  badge: {
    fontSize: 14,
    color: '#0ea5e9',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pricingSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  pricingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  proCard: {
    borderColor: '#0ea5e9',
    borderWidth: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  planPeriod: {
    fontSize: 14,
    color: '#64748b',
  },
  planFeature: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  testimonialsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
  },
  testimonialText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
    lineHeight: 20,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});

export default HomeScreen;
