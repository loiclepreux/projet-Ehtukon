import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Theme, Niveau } from '@ehtukon/shared';
import { useQuestions, useSubmitScore, useQuizEngine } from '../../../hooks/useQuiz';
import { useAuthStore } from '../../../store/authStore';

export default function QuizScreen() {
  const { theme, niveau } = useLocalSearchParams<{ theme: string; niveau: string }>();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: questions, isLoading } = useQuestions(theme as Theme, niveau as Niveau);
  const submitScore = useSubmitScore();
  const quiz = useQuizEngine(questions ?? []);

  useEffect(() => {
    if (questions && questions.length > 0 && quiz.state === 'idle') {
      quiz.start();
    }
  }, [questions]);

  useEffect(() => {
    if (quiz.state === 'complete' && isAuthenticated && questions) {
      submitScore.mutate({ theme: theme as Theme, niveau: niveau as Niveau, points: quiz.score, total: questions.length });
    }
  }, [quiz.state]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (quiz.state === 'complete' && questions) {
    const pct = Math.round((quiz.score / questions.length) * 100);
    return (
      <View style={styles.centered}>
        <Text style={styles.resultScore}>
          {quiz.score}<Text style={styles.resultAccent}>/{questions.length}</Text>
        </Text>
        <Text style={styles.resultMsg}>
          {pct >= 80 ? '🎉 Excellent !' : pct >= 50 ? '👍 Bien joué !' : '💪 Continue !'}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/jouer')}>
          <Text style={styles.btnText}>Choisir un autre quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => { quiz.start(); }}>
          <Text style={styles.btnSecondaryText}>Rejouer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!quiz.currentQuestion) return null;

  const answers = [
    quiz.currentQuestion.rep1,
    quiz.currentQuestion.rep2,
    quiz.currentQuestion.rep3,
    quiz.currentQuestion.rep4,
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {quiz.currentIndex + 1} / {questions?.length ?? '?'}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((quiz.currentIndex + 1) / (questions?.length ?? 1)) * 100}%` },
            ]}
          />
        </View>
      </View>

      <Text style={styles.question}>{quiz.currentQuestion.question}</Text>

      {answers.map((answer, i) => {
        const idx = i + 1;
        const isSelected = quiz.selected === idx;
        const isCorrect = quiz.currentQuestion!.repCorrecte === idx;
        const showResult = quiz.state === 'answered';

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.answer,
              showResult && isCorrect && styles.answerCorrect,
              showResult && isSelected && !isCorrect && styles.answerWrong,
              showResult && !isSelected && !isCorrect && styles.answerFaded,
            ]}
            onPress={() => quiz.answer(idx)}
            disabled={showResult}
          >
            <Text style={[styles.answerLetter, showResult && isCorrect && { color: '#4ade80' }]}>
              {String.fromCharCode(65 + i)}.
            </Text>
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        );
      })}

      {quiz.state === 'answered' && (
        <>
          <View style={[styles.explication, quiz.selected === quiz.currentQuestion.repCorrecte ? styles.explicationCorrect : styles.explicationWrong]}>
            <Text style={styles.explicationTitle}>
              {quiz.selected === quiz.currentQuestion.repCorrecte ? '✓ Bonne réponse !' : '✗ Mauvaise réponse'}
            </Text>
            <Text style={styles.explicationText}>{quiz.currentQuestion.explication}</Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={quiz.next}>
            <Text style={styles.btnText}>{quiz.isLast ? 'Voir les résultats' : 'Suivant →'}</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
  centered: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center', padding: 32 },
  backBtn: { marginBottom: 20 },
  backText: { color: '#ffffff50', fontSize: 14 },
  progress: { marginBottom: 24 },
  progressText: { color: '#ffffff50', fontSize: 13, textAlign: 'right', marginBottom: 6 },
  progressBar: { height: 3, backgroundColor: '#ffffff15', borderRadius: 2 },
  progressFill: { height: 3, backgroundColor: '#e94560', borderRadius: 2 },
  question: { color: '#ffffff', fontSize: 18, fontWeight: '600', lineHeight: 26, marginBottom: 24 },
  answer: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#ffffff10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
  },
  answerCorrect: { borderColor: '#4ade80', backgroundColor: '#4ade8015' },
  answerWrong: { borderColor: '#f87171', backgroundColor: '#f8717115' },
  answerFaded: { opacity: 0.4 },
  answerLetter: { color: '#e94560', fontWeight: '700', fontSize: 14, minWidth: 20 },
  answerText: { color: '#ffffffcc', fontSize: 14, flex: 1, lineHeight: 20 },
  explication: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 16 },
  explicationCorrect: { backgroundColor: '#4ade8015', borderColor: '#4ade8040' },
  explicationWrong: { backgroundColor: '#f8717115', borderColor: '#f8717140' },
  explicationTitle: { color: '#ffffff', fontWeight: '700', marginBottom: 6 },
  explicationText: { color: '#ffffffcc', fontSize: 13, lineHeight: 20 },
  btn: { backgroundColor: '#e94560', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  btnSecondary: { borderWidth: 1, borderColor: '#ffffff20', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnSecondaryText: { color: '#ffffff60', fontWeight: '600', fontSize: 15 },
  loadingText: { color: '#ffffff50', marginTop: 12 },
  resultScore: { fontSize: 72, fontWeight: '800', color: '#ffffff' },
  resultAccent: { color: '#e94560' },
  resultMsg: { fontSize: 20, color: '#ffffff80', marginBottom: 40, marginTop: 8 },
});
