import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { trpc } from '../lib/trpc';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  customerAge: string;
  visitFrequency: string;
  hairConcerns: string[];
  failureExperiences: string[];
  dailyState: string;
  treatmentMenus: string[];
  treatmentNotes: string;
  afterTreatmentReactions: string[];
  reactionNotes: string;
  customerVoice: string;
  staffThoughts: string;
  longTermGoal: string;
}

function CreateScreen(): React.JSX.Element {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    customerAge: '',
    visitFrequency: '',
    hairConcerns: [],
    failureExperiences: [],
    dailyState: '',
    treatmentMenus: [],
    treatmentNotes: '',
    afterTreatmentReactions: [],
    reactionNotes: '',
    customerVoice: '',
    staffThoughts: '',
    longTermGoal: '',
  });

  // tRPC mutation for generating article
  const generateMutation = trpc.article.generate.useMutation();

  const steps = [
    { id: 1, title: 'お客様情報', key: 'customerAge' },
    { id: 2, title: '髪の悩み', key: 'hairConcerns' },
    { id: 3, title: '施術内容', key: 'treatmentMenus' },
    { id: 4, title: '仕上がり', key: 'afterTreatmentReactions' },
    { id: 5, title: 'スタッフ所感', key: 'staffThoughts' },
    { id: 6, title: 'お客様の声', key: 'customerVoice' },
    { id: 7, title: '長期ゴール', key: 'longTermGoal' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      Alert.alert('エラー', 'ログインしてください');
      return;
    }

    try {
      setIsGenerating(true);

      const result = await generateMutation.mutateAsync({
        customerAge: formData.customerAge,
        visitFrequency: formData.visitFrequency,
        hairConcerns: formData.hairConcerns.filter(c => c.trim()),
        failureExperiences: formData.failureExperiences.filter(c => c.trim()),
        dailyState: formData.dailyState,
        treatmentMenus: formData.treatmentMenus.filter(m => m.trim()),
        treatmentNotes: formData.treatmentNotes,
        afterTreatmentReactions: formData.afterTreatmentReactions.filter(r => r.trim()),
        reactionNotes: formData.reactionNotes,
        customerVoice: formData.customerVoice,
        staffThoughts: formData.staffThoughts,
        longTermGoal: formData.longTermGoal,
      });

      setGeneratedContent(result);
      Alert.alert('成功', '原稿が生成されました！');
    } catch (error) {
      console.error('Generation failed:', error);
      Alert.alert('エラー', '原稿の生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={styles.label}>年代</Text>
            <TextInput
              style={styles.input}
              placeholder="例：30代"
              value={formData.customerAge}
              onChangeText={text =>
                setFormData({ ...formData, customerAge: text })
              }
            />
            <Text style={styles.label}>来店頻度</Text>
            <TextInput
              style={styles.input}
              placeholder="例：月1回"
              value={formData.visitFrequency}
              onChangeText={text =>
                setFormData({ ...formData, visitFrequency: text })
              }
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>髪の悩み（複数入力可）</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：クセが強い、ダメージが気になる（改行で複数入力）"
              multiline
              numberOfLines={4}
              value={formData.hairConcerns.join('\n')}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  hairConcerns: text.split('\n'),
                })
              }
            />
            <Text style={styles.label}>失敗経験</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：パーマで失敗した経験がある"
              multiline
              numberOfLines={3}
              value={formData.failureExperiences.join('\n')}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  failureExperiences: text.split('\n'),
                })
              }
            />
            <Text style={styles.label}>日常の状態</Text>
            <TextInput
              style={styles.input}
              placeholder="例：朝のスタイリング時間が短い"
              value={formData.dailyState}
              onChangeText={text =>
                setFormData({ ...formData, dailyState: text })
              }
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.label}>施術メニュー（複数入力可）</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：カット＆カラー（改行で複数入力）"
              multiline
              numberOfLines={4}
              value={formData.treatmentMenus.join('\n')}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  treatmentMenus: text.split('\n'),
                })
              }
            />
            <Text style={styles.label}>施術に関する備考</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：使用した薬剤、特別な工夫など"
              multiline
              numberOfLines={3}
              value={formData.treatmentNotes}
              onChangeText={text =>
                setFormData({ ...formData, treatmentNotes: text })
              }
            />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.label}>仕上がりの反応（複数入力可）</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：ツヤツヤになった、動きが出た（改行で複数入力）"
              multiline
              numberOfLines={4}
              value={formData.afterTreatmentReactions.join('\n')}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  afterTreatmentReactions: text.split('\n'),
                })
              }
            />
            <Text style={styles.label}>反応に関する備考</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：お客様の表情の変化、喜びの様子"
              multiline
              numberOfLines={3}
              value={formData.reactionNotes}
              onChangeText={text =>
                setFormData({ ...formData, reactionNotes: text })
              }
            />
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.label}>スタッフ所感</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：お客様の雰囲気が明るくなられました"
              multiline
              numberOfLines={4}
              value={formData.staffThoughts}
              onChangeText={text =>
                setFormData({ ...formData, staffThoughts: text })
              }
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={styles.label}>お客様の声</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：『毎日のスタイリングが楽になりました』"
              multiline
              numberOfLines={4}
              value={formData.customerVoice}
              onChangeText={text =>
                setFormData({ ...formData, customerVoice: text })
              }
            />
          </View>
        );
      case 7:
        return (
          <View>
            <Text style={styles.label}>長期ゴール</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="例：毎月のカラーで色持ちを保ちながら、健康的な髪を目指す"
              multiline
              numberOfLines={4}
              value={formData.longTermGoal}
              onChangeText={text =>
                setFormData({ ...formData, longTermGoal: text })
              }
            />
          </View>
        );
      default:
        return null;
    }
  };

  if (generatedContent) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>✨ 原稿が生成されました</Text>

            {/* Title Candidates */}
            <View style={styles.contentBlock}>
              <Text style={styles.contentLabel}>📝 タイトル候補</Text>
              {generatedContent.titleCandidates?.map(
                (title: string, idx: number) => (
                  <View key={idx} style={styles.candidateItem}>
                    <Text style={styles.candidateText}>{idx + 1}. {title}</Text>
                  </View>
                )
              )}
            </View>

            {/* Blog Content */}
            {generatedContent.blogContent && (
              <View style={styles.contentBlock}>
                <Text style={styles.contentLabel}>📰 ブログ</Text>
                <Text style={styles.contentText}>{generatedContent.blogContent}</Text>
              </View>
            )}

            {/* Instagram Content */}
            {generatedContent.instagramContent && (
              <View style={styles.contentBlock}>
                <Text style={styles.contentLabel}>📸 Instagram</Text>
                <Text style={styles.contentText}>{generatedContent.instagramContent}</Text>
              </View>
            )}

            {/* X Short Content */}
            {generatedContent.xShortContent && (
              <View style={styles.contentBlock}>
                <Text style={styles.contentLabel}>𝕏 X（短文）</Text>
                <Text style={styles.contentText}>{generatedContent.xShortContent}</Text>
              </View>
            )}

            {/* X Long Content */}
            {generatedContent.xLongContent && (
              <View style={styles.contentBlock}>
                <Text style={styles.contentLabel}>𝕏 X（長文）</Text>
                <Text style={styles.contentText}>{generatedContent.xLongContent}</Text>
              </View>
            )}

            {/* HPB Content */}
            {generatedContent.hpbContent && (
              <View style={styles.contentBlock}>
                <Text style={styles.contentLabel}>🌟 ホットペッパービューティー</Text>
                <Text style={styles.contentText}>{generatedContent.hpbContent}</Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.newButton}
                onPress={() => {
                  setGeneratedContent(null);
                  setCurrentStep(1);
                  setFormData({
                    customerAge: '',
                    visitFrequency: '',
                    hairConcerns: [],
                    failureExperiences: [],
                    dailyState: '',
                    treatmentMenus: [],
                    treatmentNotes: '',
                    afterTreatmentReactions: [],
                    reactionNotes: '',
                    customerVoice: '',
                    staffThoughts: '',
                    longTermGoal: '',
                  });
                }}>
                <Text style={styles.newButtonText}>新しい原稿を作成</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Progress Indicator */}
        <View style={styles.progressSection}>
          <Text style={styles.stepIndicator}>
            ステップ {currentStep} / {steps.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentStep / steps.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Step Title */}
        <View style={styles.stepTitleSection}>
          <Text style={styles.stepTitle}>{steps[currentStep - 1].title}</Text>
        </View>

        {/* Step Content */}
        <View style={styles.contentSection}>{renderStepContent()}</View>

        {/* Navigation Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, currentStep === 1 && styles.buttonDisabled]}
            onPress={handlePrev}
            disabled={currentStep === 1}>
            <Text style={styles.buttonText}>戻る</Text>
          </TouchableOpacity>

          {currentStep === steps.length ? (
            <TouchableOpacity
              style={[styles.generateButton, isGenerating && styles.buttonDisabled]}
              onPress={handleGenerate}
              disabled={isGenerating}>
              <Text style={styles.generateButtonText}>
                {isGenerating ? '生成中...' : '原稿を生成'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>次へ</Text>
            </TouchableOpacity>
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
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  stepIndicator: {
    fontSize: 14,
    color: '#64748b',
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
  stepTitleSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    color: '#1e293b',
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  buttonSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  generateButton: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  resultSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 20,
    textAlign: 'center',
  },
  contentBlock: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  candidateItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    marginBottom: 8,
  },
  candidateText: {
    fontSize: 13,
    color: '#0ea5e9',
  },
  actionButtons: {
    marginTop: 20,
    marginBottom: 20,
  },
  newButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  newButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CreateScreen;
