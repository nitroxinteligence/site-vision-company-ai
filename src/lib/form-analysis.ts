// Biblioteca de análise de formulários

interface AnalysisResult {
  overallScore: number;
  stepScores: Record<number, number>;
  completedFields: number;
  totalFields: number;
  requiredFieldsCompleted: number;
  totalRequiredFields: number;
}

/**
 * Analisa a completude do formulário e a qualidade das respostas
 */
export function analyzeFormData(
  formData: Record<string, unknown>,
  stepQuestionMap: Record<number, { question: string; fieldName: string; required?: boolean }[]>
): AnalysisResult {
  let completedFields = 0;
  let totalFields = 0;
  let requiredFieldsCompleted = 0;
  let totalRequiredFields = 0;
  
  const stepScores: Record<number, number> = {};
  
  // Analisa cada etapa
  Object.entries(stepQuestionMap).forEach(([stepNumStr, questions]) => {
    const stepNum = parseInt(stepNumStr);
    let stepCompletedFields = 0;
    const stepTotalFields = questions.length;
    
    questions.forEach(q => {
      totalFields++;
      if (q.required) totalRequiredFields++;
      
      const value = formData[q.fieldName];
      const isCompleted = isFieldComplete(value);
      
      if (isCompleted) {
        completedFields++;
        stepCompletedFields++;
        if (q.required) requiredFieldsCompleted++;
      }
    });
    
    // Calcula score da etapa (0-1)
    stepScores[stepNum] = stepTotalFields > 0 ? stepCompletedFields / stepTotalFields : 1;
  });
  
  // Calcula score geral (0-1)
  const overallScore = totalFields > 0 ? completedFields / totalFields : 0;
  
  return {
    overallScore,
    stepScores,
    completedFields,
    totalFields,
    requiredFieldsCompleted,
    totalRequiredFields
  };
}

/**
 * Avalia a qualidade das respostas baseado no comprimento e conteúdo
 */
export function evaluateResponseQuality(value: unknown): number {
  if (!isFieldComplete(value)) return 0;
  
  if (typeof value === 'string') {
    // Análise básica de qualidade baseada no comprimento
    const trimmed = value.trim();
    const wordCount = trimmed.split(/\s+/).length;
    
    if (wordCount < 3) return 0.3;
    if (wordCount < 10) return 0.6;
    if (wordCount < 30) return 0.8;
    return 1.0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0 ? 0.8 : 0;
  }
  
  // Para outros tipos de dados, apenas verificamos se existe
  return value ? 1.0 : 0;
}

/**
 * Verifica se um campo está preenchido
 */
function isFieldComplete(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'boolean') return true; // Consideramos boolean sempre como preenchido
  
  return true;
}