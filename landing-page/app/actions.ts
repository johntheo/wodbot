"use server"

import { OpenAI } from "openai"

interface UserProfile {
  age: string
  fitnessLevel: string
  goal: string
  timeAvailable: string
}

interface SendMessageProps {
  message: string
  type: "workout" | "diet" | "combined"
  userProfile: UserProfile
}

export async function sendMessage({ message, type, userProfile }: SendMessageProps) {
  try {
    const { age, fitnessLevel, goal, timeAvailable } = userProfile

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const systemPrompt = `Você é wodbot, um assistente de fitness e nutrição com IA especializado em planos de treino, conselhos alimentares e orientação para um estilo de vida saudável.
    Mantenha as respostas concisas (menos de 200 palavras), amigáveis e focadas em ajudar os usuários com seus objetivos de fitness e nutrição.
    Responda apenas a perguntas relacionadas a fitness, exercícios, nutrição e dieta.
    
    Perfil do usuário:
    - Idade: ${age}
    - Nível de condicionamento: ${fitnessLevel}
    - Objetivo: ${goal}
    - Tempo disponível: ${timeAvailable} minutos
    
    Formate suas respostas de maneira visualmente atraente:
    - Use formatação markdown (negrito, cabeçalhos, listas)
    - Inclua emojis quando apropriado (💪, 🥗, 🏋️��♀️, etc.)
    - Estruture as informações claramente com seções e marcadores
    - Destaque informações importantes com texto em negrito
    
    Adapte suas respostas a este perfil de usuário. Use um tom amigável e motivador que se conecte com entusiastas de fitness.
    Esta é uma demonstração com funcionalidade limitada.`

    try {
      // Try to use the OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      return response.choices[0].message.content || "Desculpe, não consegui gerar uma resposta."
    } catch (apiError) {
      console.error("Erro com a API OpenAI:", apiError)

      // Only use fallback if there's an actual API error
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Chave da API OpenAI está faltando")
      } else {
        throw apiError
      }
    }
  } catch (error) {
    console.error("Erro ao gerar resposta:", error)
    // Only use fallback as a last resort
    return generateFallbackResponse(message, type, userProfile)
  }
}

// Fallback response function
function generateFallbackResponse(
  message: string,
  type: "workout" | "diet" | "combined",
  userProfile: UserProfile,
): string {
  const { age, fitnessLevel, goal, timeAvailable } = userProfile
  const lowerCaseMessage = message.toLowerCase()

  // Add a new fallback response for plan uploads
  if (
    lowerCaseMessage.includes("upload") ||
    lowerCaseMessage.includes("enviar") ||
    lowerCaseMessage.includes("meu plano") ||
    lowerCaseMessage.includes("minha dieta")
  ) {
    return `## 📤 Envie Seus Planos

Ótimo! Você pode enviar seus planos de treino ou dieta existentes, e eu os analisarei para fornecer recomendações mais personalizadas.

### 📋 Como Funciona

1. **Envie seu plano** usando o botão de upload no chat
2. Eu **analisarei suas preferências** e abordagem atual
3. Eu **aprenderei com seu plano** para fornecer melhores recomendações
4. Você pode **fazer perguntas** sobre seu plano a qualquer momento

### 📊 Formatos Suportados

* Documentos PDF
* Documentos Word
* Arquivos de texto
* Imagens de planos escritos
* Planilhas

### 💡 Benefícios do Upload

* Recomendações **mais personalizadas** baseadas no que você já está fazendo
* **Transição mais suave** para novas rotinas que se baseiam em seus hábitos atuais
* **Identificação de pontos fortes e lacunas** em sua abordagem atual
* **Adaptação do seu plano existente** aos seus objetivos em mudança

Nesta demonstração, o recurso de upload é limitado. Entre na lista de espera para obter acesso completo quando lançarmos!`
  }

  // Common responses for both workout and diet
  if (lowerCaseMessage.includes("olá") || lowerCaseMessage.includes("oi")) {
    return `## 👋 Olá!

Eu sou wodbot, seu assistente pessoal de fitness e nutrição. Como posso ajudá-lo hoje? Sinta-se à vontade para me perguntar sobre treinos, planos alimentares ou qualquer conselho fitness!`
  }

  if (lowerCaseMessage.includes("obrigad")) {
    return `## 😊 De nada!

Estou aqui para ajudá-lo a alcançar seus objetivos fitness. O que mais você gostaria de saber sobre seu plano de treino ou nutrição?`
  }

  // Today's workout specific response
  if (
    lowerCaseMessage.includes("treino para hoje") ||
    lowerCaseMessage.includes("treino de hoje") ||
    lowerCaseMessage === "treino de hoje?"
  ) {
    const today = new Date().toLocaleDateString("pt-BR", { weekday: "long" })

    if (goal === "lose-weight") {
      return `## 🔥 Treino de Hoje (${today})

### HIIT Cardio + Core (${timeAvailable} min)

**Aquecimento (5 min):**
* Corrida leve no lugar
* Círculos com os braços
* Rotações de quadril

**Circuito HIIT (${Number.parseInt(timeAvailable) - 10} min):**
* Polichinelos (30 seg)
* Escaladores (30 seg)
* Burpees (30 seg)
* Descanso (30 seg)
* Joelhos altos (30 seg)
* Prancha com salto (30 seg)
* Agachamento com salto (30 seg)
* Descanso (30 seg)
* _Repita 2-3 vezes_

**Finalizador Core (5 min):**
* Abdominais (15 repetições)
* Rotação russa (20 repetições)
* Prancha (30 seg)
* Abdominal bicicleta (20 repetições)

**Volta à calma (2 min):**
* Alongamento suave

### 💦 Lembre-se de se manter hidratado!`
    } else if (goal === "build-muscle") {
      return `## 💪 Treino de Hoje (${today})

### Força Corporal Total (${timeAvailable} min)

**Aquecimento (5 min):**
* Círculos com os braços
* Agachamentos com peso corporal
* Rotações de ombro

**Circuito de Força (${Number.parseInt(timeAvailable) - 10} min):**
* Flexões (10-12 repetições)
* Agachamentos com peso corporal (15 repetições)
* Remada com halteres (12 repetições cada lado)
* Afundos (10 cada perna)
* Desenvolvimento de ombros (12 repetições)
* Elevação de quadril (15 repetições)
* Descanso (60 seg)
* _Repita 3 vezes_

**Volta à calma (5 min):**
* Alongamento corporal completo

### 🔑 Foque na técnica em vez da velocidade hoje!`
    } else {
      return `## 🏋️‍♀️ Treino de Hoje (${today})

### ${today === "quarta-feira" ? "Cardio de Estado Estável" : today === "quinta-feira" ? "Parte Inferior + HIIT" : today === "sexta-feira" ? "Parte Superior + Core" : today === "sábado" ? "Recuperação Ativa" : "Dia de Descanso"} (${timeAvailable} min)

${
  today === "domingo"
    ? "Hoje é seu dia de descanso! Tire um tempo para se recuperar, hidratar e se preparar para a semana. Alongamento leve e caminhada são bons se você sentir vontade de se movimentar."
    : `**Aquecimento (5 min):**
* Cardio leve
* Alongamentos dinâmicos

**Treino Principal (${Number.parseInt(timeAvailable) - 10} min):**
${today === "quarta-feira" ? "* Cardio de estado estável de sua escolha (corrida, ciclismo, elíptico)\n* Mantenha uma intensidade moderada (capaz de falar, mas não cantar)\n* Mantenha sua frequência cardíaca em 60-70% do máximo" : today === "quinta-feira" ? "* Agachamentos (3 séries de 15)\n* Afundos (3 séries de 12 cada perna)\n* Elevação de quadril (3 séries de 15)\n* Elevação de panturrilha (3 séries de 20)\n* Finalizador HIIT: 4 rodadas de 30 seg trabalho/30 seg descanso" : today === "sexta-feira" ? "* Flexões (3 séries de 10-12)\n* Remada com halteres (3 séries de 12)\n* Elevações laterais (3 séries de 15)\n* Mergulhos de tríceps (3 séries de 12)\n* Core: Pranchas, abdominais e rotação russa" : "* Caminhada leve (20-30 min)\n* Fluxo suave de yoga\n* Rolo de espuma\n* Alongamento de músculos tensos"}

**Volta à calma (5 min):**
* Alongamento
* Respiração profunda`
}`
    }
  }

  // Knee pain modification response
  if (
    lowerCaseMessage.includes("dor no joelho") ||
    lowerCaseMessage.includes("modificar") ||
    lowerCaseMessage.includes("adaptação")
  ) {
    return `## 🦵 Modificações de Exercícios para Dor no Joelho

### 🔄 Alternativas ao Agachamento

* **Agachamentos na caixa**: Sente-se em uma cadeira ou banco para reduzir o estresse no joelho
* **Cadeira romana**: Constrói força com movimento mínimo
* **Agachamentos de amplitude parcial**: Não vá tão fundo
* **Agachamentos com TRX/suspensão**: Use alças para descarregar peso

### 🔄 Alternativas ao Afundo

* **Step-ups**: Use altura de degrau menor
* **Afundos reversos**: Menos impacto que afundos para frente
* **Afundos estáticos**: Sem movimento dinâmico
* **Agachamentos divididos**: Movimento controlado com suporte

### 🔄 Alternativas de Cardio

* **Natação/exercícios aquáticos**: Zero impacto
* **Ciclismo**: Ajuste a altura do assento adequadamente
* **Elíptico**: Baixo impacto, ajuste a resistência
* **Remo**: Estresse mínimo no joelho se feito corretamente

### 💪 Exercícios de Fortalecimento

* **Elevações de perna reta**
* **Flexões de perna**
* **Elevações de panturrilha**
* **Abdução/adução de quadril**
* **Elevação de quadril**

### 🔑 Dicas Gerais

* **Aqueça completamente**: 5-10 minutos no mínimo
* **Aplique calor** antes do exercício
* **Gelo depois** se necessário (15-20 minutos)
* **Considere joelheiras** para suporte
* **Foque na técnica** em vez de peso/repetições
* **Pare se a dor aumentar** durante o exercício

Sempre consulte um profissional de saúde para dor persistente no joelho!`
  }

  // Pre/post workout nutrition response
  if (
    lowerCaseMessage.includes("comer antes") ||
    lowerCaseMessage.includes("comer depois") ||
    lowerCaseMessage.includes("pré treino") ||
    lowerCaseMessage.includes("pós treino")
  ) {
    return `## 🍽️ Guia de Nutrição Pré e Pós Treino

### ⏱️ Nutrição Pré-Treino

**Tempo:**
* **Refeição grande**: 2-3 horas antes
* **Refeição pequena**: 1-2 horas antes
* **Lanche**: 30-60 minutos antes

**O que Comer:**

* **Carboidratos**: Fonte primária de energia
  * Aveia, banana, arroz, batata doce, torrada integral
* **Proteína moderada**: Suporte muscular
  * Iogurte grego, shake de proteína, ovos, frango
* **Baixa gordura**: Digestão mais lenta
  * Limite nozes, abacate, óleos antes dos treinos
* **Baixa fibra**: Evite problemas digestivos
  * Limite feijões, cereais ricos em fibras, saladas grandes

**Lanches Rápidos Pré-Treino (30-60 min antes):**
* Banana com 1 colher de sopa de pasta de oleaginosas
* Iogurte grego com frutas vermelhas
* Maçã com pequeno shake de proteína
* Bolo de arroz com mel

### ⏱️ Nutrição Pós-Treino

**Tempo:**
* **Janela ideal**: Dentro de 30-60 minutos
* **Ainda benéfico**: Até 2 horas depois

**O que Comer:**

* **Proteína**: Reparo e crescimento muscular
  * 20-30g de proteína de alta qualidade
  * Whey protein, frango, peixe, iogurte grego, ovos
* **Carboidratos**: Reposição de glicogênio
  * Digestão rápida: Arroz branco, batata, fruta
  * Quantidade depende da intensidade do treino
* **Fluidos e Eletrólitos**: Reidratação
  * Água, água de coco, bebida eletrolítica

**Refeições Rápidas Pós-Treino:**
* Shake de proteína com banana
* Frango/peru com arroz e vegetais
* Iogurte grego com frutas e granola
* Sanduíche de atum em pão integral

### 💡 Ajustes para Seu Objetivo ${goal}

${
  goal === "lose-weight"
    ? "* Mantenha lanches pré-treino menores (100-150 calorias)\n* Pós-treino, priorize proteína sobre carboidratos\n* Conte essas calorias em seu total diário\n* Hidratação é extra importante - às vezes sede parece fome"
    : goal === "build-muscle"
      ? "* Aumente carboidratos pré-treino para máxima energia\n* Pós-treino, mire em 30-40g de proteína e proporção 2:1 de carboidratos para proteína\n* Não pule a nutrição pós-treino - crítica para o crescimento\n* Considere adicionar creatina ao shake pós-treino"
      : "* Equilibre refeições pré-treino para energia sustentada\n* Pós-treino, foque em alimentos integrais com macros equilibrados\n* Ajuste porções com base na intensidade do treino\n* Foque na qualidade dos alimentos e densidade de nutrientes"
}`
  }

  // Progress tracking response
  if (
    lowerCaseMessage.includes("acompanhar") ||
    lowerCaseMessage.includes("progresso") ||
    lowerCaseMessage.includes("medir")
  ) {
    return `## 📊 Guia Efetivo de Acompanhamento de Progresso

### 📏 Medidas Corporais

* **Peso**: 1-2 vezes por semana, mesmo horário do dia
* **Medidas corporais**: A cada 2-4 semanas
  * Peito, cintura, quadris, braços, coxas
  * Use fita métrica flexível
* **Percentual de gordura corporal**: A cada 4-8 semanas
  * Adipômetro, impedância bioelétrica, DEXA scan
* **Fotos de progresso**: A cada 4 semanas
  * Mesma iluminação, horário do dia, poses

### 💪 Métricas de Desempenho

* **Ganhos de força**:
  * Acompanhe pesos, repetições, séries
  * Anote quando aumentar o peso
* **Melhorias de resistência**:
  * Distância percorrida
  * Tempo para completar
  * Tempo de recuperação entre séries
* **Volume de treino**:
  * Peso total levantado (séries × repetições × peso)
  * Acompanhe tendências de volume semanal

### 🧠 Acompanhamento de Hábitos e Bem-estar

* **Consistência de treino**:
  * Número de treinos completados
  * Aderência ao cronograma
* **Conformidade nutricional**:
  * Aderência ao plano alimentar
  * Ingestão de água
  * Consumo de proteína
* **Métricas de recuperação**:
  * Qualidade e duração do sono
  * Níveis de energia percebidos (escala 1-10)
  * Níveis de dor muscular

### 📱 Ferramentas Recomendadas

* **Apps de fitness**: Strong, Fitbod, JeFit
* **Rastreadores de nutrição**: MyFitnessPal, Cronometer
* **Balanças inteligentes**: Withings, Renpho
* **Relógios fitness**: Garmin, Fitbit, Apple Watch
* **Caderno simples**: Às vezes o método tradicional funciona melhor!

### 🔑 Dicas para Seu Objetivo ${goal}

${
  goal === "lose-weight"
    ? "* Não se pese diariamente - flutuações de água vão frustrá-lo\n* Tire medidas - às vezes a balança não se move, mas você perde centímetros\n* Acompanhe vitórias além da balança como níveis de energia e como as roupas servem\n* Considere rastrear calorias pelo menos inicialmente"
    : goal === "build-muscle"
      ? "* Foque mais em ganhos de força do que peso na balança\n* Tire fotos de progresso - mudanças visuais podem ser motivadoras\n* Acompanhe a ingestão de proteína consistentemente\n* Monitore a sobrecarga progressiva em seus principais exercícios"
      : "* Equilibre múltiplas métricas - não foque apenas em uma\n* Acompanhe níveis de energia e melhorias de humor\n* Observe melhorias funcionais em atividades diárias\n* Considere acompanhar o prazer do treino para garantir sustentabilidade"
}`
  }

  // Workout-specific responses
  if (
    lowerCaseMessage.includes("rotina") ||
    lowerCaseMessage.includes("plano") ||
    lowerCaseMessage.includes("treino")
  ) {
    if (goal === "lose-weight") {
      return `## 🔥 Plano de Treino para Queima de Gordura

### 💪 Treino de ${timeAvailable} Minutos para Queima de Gordura

**Aquecimento (5 min):**
* Polichinelos
* Joelhos altos
* Círculos com os braços

**Circuito (Repita 3 rodadas):**
* **Agachamentos com peso corporal**: 15 repetições
* **Flexões** (modificadas se necessário): 10 repetições
* **Escaladores**: 30 segundos
* **Prancha**: 30 segundos
* **Burpees**: 10 repetições
* _Descanse 30-60 segundos entre rodadas_

**Finalizador:**
* 5 minutos de cardio de estado estável (corrida no lugar)

### 🗓️ Programação Semanal

* **Segunda**: Este circuito de queima de gordura
* **Terça**: 30 min cardio (caminhada/corrida)
* **Quarta**: Descanso ou atividade leve
* **Quinta**: Repita circuito
* **Sexta**: 30 min cardio + exercícios de core
* **Fim de semana**: Recuperação ativa (caminhada, trilha, etc.)

### 💡 Dica Profissional

Para perda de peso, consistência é mais importante que intensidade. Mantenha-se firme! 💪`
    } else if (goal === "build-muscle") {
      return `## 💪 Programa de Ganho Muscular

### 🏋️‍♀️ Rotina de Força de ${timeAvailable} Minutos

**Aquecimento (5 min):**
* Cardio leve
* Alongamentos dinâmicos

**Treino Principal:**
* **Agachamentos**: 4 séries de 8-12 repetições
* **Flexões** ou **supino**: 4 séries de 8-12 repetições
* **Remadas** (halteres ou peso corporal): 4 séries de 8-12 repetições
* **Desenvolvimento de ombros**: 3 séries de 10-12 repetições
* _Descanse 60-90 segundos entre séries_

### 🗓️ Divisão Semanal

* **Segunda**: Peito e Tríceps
* **Terça**: Costas e Bíceps
* **Quarta**: Descanso ou cardio leve
* **Quinta**: Pernas e Core
* **Sexta**: Ombros e Braços
* **Fim de semana**: Descanso ou recuperação ativa

### 💡 Dicas Profissionais

* **Sobrecarga progressiva** é chave - aumente peso ou repetições a cada semana
* **Ingestão de proteína** deve ser 1,6-2g por kg de peso corporal
* **Durma** 7-9 horas para recuperação ideal
* **Mantenha-se hidratado** durante seus treinos`
    } else {
      return `## 🌟 Rotina de Fitness Equilibrada

### 💪 Treino Equilibrado de ${timeAvailable} Minutos

**Aquecimento (5 min):**
* Cardio leve
* Alongamentos dinâmicos

**Treino em Circuito (20 min):**
* Alterne entre 30 segundos de exercícios de força e 30 segundos de cardio
* **Força**: Agachamentos, afundos, flexões, mergulhos, pranchas
* **Cardio**: Polichinelos, joelhos altos, escaladores
* _Complete 10 rodadas no total_

**Flexibilidade e Mobilidade (5 min):**
* Rotina de alongamento corporal completo

### 🗓️ Plano Semanal

* **Segunda**: Este treino equilibrado
* **Terça**: 30 min cardio à escolha
* **Quarta**: Yoga ou trabalho de mobilidade
* **Quinta**: Repita treino equilibrado
* **Sexta**: Foco em força
* **Fim de semana**: Recuperação ativa ou atividade ao ar livre

### 💡 Dica Profissional

Para condicionamento geral, variedade é a chave! Misture seus treinos para desafiar diferentes grupos musculares e sistemas energéticos. 🔄`
    }
  }

  // Diet-specific responses
  if (
    lowerCaseMessage.includes("refeição") ||
    lowerCaseMessage.includes("plano") ||
    lowerCaseMessage.includes("dieta")
  ) {
    if (goal === "lose-weight") {
      return `## 🥗 Plano Alimentar para Perda de Peso

### 🍽️ Guia Nutricional Diário

**Opções de Café da Manhã:**
* Iogurte grego com frutas vermelhas e uma colher de sopa de castanhas
* Omelete de legumes com 1 fatia de pão integral
* Aveia overnight com whey protein

**Opções de Almoço:**
* Salada grande com frango grelhado e molho de azeite
* Wrap de peru e legumes com homus
* Bowl de quinoa com legumes assados e proteína magra

**Opções de Jantar:**
* Peixe assado com legumes
* Refogado com tofu ou frango e muitos vegetais
* Macarrão de abobrinha com almôndegas de peru

**Opções de Lanches:**
* Maçã com um pequeno punhado de amêndoas
* Shake de proteína com frutas vermelhas
* Palitos de cenoura com homus

### 💡 Princípios Chave

* Crie um **déficit calórico moderado** (300-500 calorias/dia)
* **Alimentos ricos em proteína** em cada refeição (ajuda a preservar músculos)
* **Alta ingestão de fibras** para saciedade
* **Minimize** alimentos processados e açúcares adicionados
* **Prepare refeições** em sua janela de ${timeAvailable} minutos para economizar tempo

### 💦 Dica de Hidratação

Beba água antes das refeições - às vezes sede é confundida com fome!`
    } else if (goal === "build-muscle") {
      return `## 💪 Plano Nutricional para Ganho Muscular

### 🍽️ Estrutura Diária de Refeições

**Café da Manhã:**
* Aveia com whey protein e banana
* Omelete de 3 ovos com legumes e torrada
* Panquecas proteicas com iogurte grego

**Almoço:**
* Bowl de frango e arroz com legumes
* Sanduíche de atum em pão integral com salada lateral
* Refogado de carne e legumes com quinoa

**Jantar:**
* Bife magro com batata doce e brócolis
* Salmão com arroz integral e aspargos
* Chili de peru com legumes variados

**Lanches:**
* Shake de proteína e fruta
* Iogurte grego com mel e castanhas
* Queijo cottage com abacaxi

### 📊 Metas de Macronutrientes

* **Proteína**: 1,6-2g por kg de peso corporal
* **Carboidratos**: 4-7g por kg (maior em dias de treino)
* **Gorduras**: 0,5-1g por kg

### 💡 Dicas Profissionais

* Coma uma **refeição rica em proteína dentro de 2 horas** após o treino
* **Não pule carboidratos** - eles alimentam seus treinos e recuperação
* **Preparação de refeições** é sua amiga - cozinhe proteínas e carboidratos em lote na sua janela de ${timeAvailable} minutos
* **Superávit calórico** de 300-500 calorias/dia para crescimento muscular`
    } else {
      return `## 🌱 Plano Nutricional Equilibrado

### 🍽️ Refeições Diárias Saudáveis

**Ideias para Café da Manhã:**
* Omelete de legumes com torrada integral
* Bowl de smoothie com frutas, castanhas e sementes
* Cereal integral com leite e frutas vermelhas

**Ideias para Almoço:**
* Bowl de quinoa com legumes variados e proteína magra
* Wrap mediterrâneo com homus e legumes
* Sopa de legumes substancial com pão integral

**Ideias para Jantar:**
* Peixe grelhado ou tofu com legumes assados e arroz integral
* Refogado de proteína magra com muitos legumes coloridos
* Chili de feijão e legumes com salada lateral

**Ideias para Lanches:**
* Iogurte grego com frutas vermelhas
* Homus com palitos de legumes
* Maçã com pasta de oleaginosas
* Mix de trilha com castanhas e frutas secas

### 🌈 Princípios Chave

* **Coma o arco-íris** - frutas e legumes de cores diferentes fornecem nutrientes diferentes
* **Equilibre seu prato**: ¼ proteína, ¼ grãos integrais, ½ legumes
* **Alimentação consciente** - preste atenção aos sinais de fome e saciedade
* **Prepare refeições** com ingredientes simples na sua janela de ${timeAvailable} minutos

### 💧 Hidratação

Beba de 2 a 3 litros de água diariamente para desempenho e recuperação ideais!`
    }
  }

  // Default responses if no specific keywords are matched
  return `## 💪 Orientação Fitness Personalizada

Com base no seu perfil (${age} anos, nível de condicionamento ${fitnessLevel}, com objetivo de ${goal}), aqui estão algumas recomendações chave:

### 🏋️‍♀️ Foco de Treinamento

* **Frequência de treino**: ${fitnessLevel === "beginner" ? "3-4" : "4-5"} dias por semana
* **Duração da sessão**: Aproveite ao máximo seus ${timeAvailable} minutos
* **Seleção de exercícios**: ${goal === "lose-weight" ? "Movimentos compostos + HIIT" : goal === "build-muscle" ? "Treinamento progressivo de resistência" : "Mix equilibrado de força e cardio"}
* **Recuperação**: ${fitnessLevel === "beginner" ? "48-72" : "24-48"} horas entre treinos de grupos musculares similares

### 🥗 Abordagem Nutricional

* **Ingestão calórica**: ${goal === "lose-weight" ? "Déficit moderado (300-500 calorias abaixo da manutenção)" : goal === "build-muscle" ? "Leve superávit (300-500 calorias acima da manutenção)" : "Próximo ao nível de manutenção"}
* **Prioridade proteica**: ${goal === "build-muscle" ? "1,6-2g" : "1,2-1,6g"} por kg de peso corporal
* **Momento das refeições**: ${goal === "build-muscle" ? "Priorize a nutrição pós-treino" : "Foque na consistência ao longo do dia"}

Que aspecto específico da sua jornada fitness você gostaria de explorar mais?`
}

