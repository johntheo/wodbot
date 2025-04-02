"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SendIcon, Dumbbell, MessageSquare, Sparkles, Upload, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendMessage } from "@/app/actions"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"

interface Message {
  role: "user" | "assistant"
  content: string
}

export interface UserProfile {
  age: string
  fitnessLevel: string
  goal: string
  timeAvailable: string
}

interface ChatDemoProps {
  userProfile: UserProfile | null
  onProfileComplete: (profile: UserProfile) => void
  onResetProfile: () => void
}

// Perguntas de exemplo atualizadas que são mais curtas e cobrem os principais casos de uso
const sampleQuestions = [
  "Treino de hoje?",
  "Plano alimentar rápido?",
  "Enviar meu plano?",
  "Adaptar para dor no joelho?",
  "Acompanhar progresso?",
]

export default function ChatDemo({ userProfile, onProfileComplete, onResetProfile }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [showWaitlist, setShowWaitlist] = useState(false)

  // Estado do formulário
  const [age, setAge] = useState(userProfile?.age || "")
  const [fitnessLevel, setFitnessLevel] = useState(userProfile?.fitnessLevel || "")
  const [goal, setGoal] = useState(userProfile?.goal || "")
  const [timeAvailable, setTimeAvailable] = useState(userProfile?.timeAvailable || "")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Esta ref rastreará se estamos lidando com uma ação interna
  const isInternalAction = useRef(false)

  // Rolar mensagens para o final
  const scrollMessagesToBottom = useCallback(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  // Rolar para o final quando as mensagens mudarem
  useEffect(() => {
    scrollMessagesToBottom()
  }, [messages, scrollMessagesToBottom])

  // Inicializar chat quando o perfil estiver completo
  useEffect(() => {
    if (userProfile && messages.length === 0) {
      // Criar uma mensagem de boas-vindas abrangente com planos de treino e dieta
      let welcomeMessage = `## 👋 Olá, amigo fitness!

Com base no seu perfil (${userProfile.age} anos, nível de condicionamento ${userProfile.fitnessLevel}, objetivo: ${userProfile.goal}), criei um plano personalizado para você!

**Dica profissional:** Você pode enviar seus planos de treino ou dieta existentes, e eu aprenderei com eles para fornecer orientações ainda mais personalizadas.

`

      // Seção do plano de treino
      welcomeMessage += `### 💪 Seu Plano de Treino Semanal

`

      if (userProfile.goal === "lose-weight") {
        welcomeMessage += `**Segunda**: ${userProfile.timeAvailable} min HIIT cardio + core
**Terça**: Treino de força para o corpo inteiro
**Quarta**: ${userProfile.timeAvailable} min cardio de intensidade constante
**Quinta**: Parte inferior + finalizador HIIT
**Sexta**: Parte superior + core
**Sábado**: Recuperação ativa (caminhada leve/yoga)
**Domingo**: Dia de descanso

`
      } else if (userProfile.goal === "build-muscle") {
        welcomeMessage += `**Segunda**: Peito e Tríceps (${userProfile.timeAvailable} min)
**Terça**: Costas e Bíceps
**Quarta**: Recuperação ativa
**Quinta**: Pernas e Core
**Sexta**: Ombros e Braços
**Sábado**: Treino leve de corpo inteiro
**Domingo**: Dia de descanso

`
      } else {
        welcomeMessage += `**Segunda**: Circuito de corpo inteiro (${userProfile.timeAvailable} min)
**Terça**: Cardio e core
**Quarta**: Foco na parte superior
**Quinta**: Recuperação ativa
**Sexta**: Foco na parte inferior
**Sábado**: Mobilidade e flexibilidade
**Domingo**: Dia de descanso

`
      }

      // Seção do plano alimentar
      welcomeMessage += `### 🥗 Seu Plano Nutricional

`

      if (userProfile.goal === "lose-weight") {
        welcomeMessage += `**Café da manhã**: Iogurte grego com frutas vermelhas e uma colher de sopa de castanhas
**Almoço**: Salada grande com frango grelhado e molho de azeite
**Jantar**: Peixe assado com legumes
**Lanches**: Maçã com um punhado pequeno de amêndoas

**Dica profissional**: 💧 Mantenha-se hidratado! Beba de 2 a 3 litros de água diariamente.

`
      } else if (userProfile.goal === "build-muscle") {
        welcomeMessage += `**Café da manhã**: Aveia com whey protein e banana
**Almoço**: Bowl de frango com arroz e legumes
**Jantar**: Bife magro com batata doce e brócolis
**Lanches**: Shake de proteína e frutas

**Dica profissional**: 🥛 Não se esqueça da proteína! Consuma de 1,6 a 2g por kg de peso corporal.

`
      } else {
        welcomeMessage += `**Café da manhã**: Omelete de legumes com torrada integral
**Almoço**: Bowl de quinoa com legumes variados e proteína magra
**Jantar**: Peixe grelhado ou tofu com legumes assados e arroz integral
**Lanches**: Iogurte grego com frutas vermelhas ou homus com legumes

**Dica profissional**: 🌈 Coma o arco-íris! Frutas e vegetais de cores diferentes fornecem nutrientes diferentes.

`
      }

      // Nota final
      welcomeMessage += `O que você gostaria de saber mais? Sinta-se à vontade para me perguntar qualquer coisa sobre seu plano de treino ou nutrição! (Esta é uma demonstração limitada com 5 mensagens)`

      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
        },
      ])
    }
  }, [userProfile, messages.length])

  // Impedir comportamento padrão para eventos dentro do componente de chat
  useEffect(() => {
    const preventDefaultForChat = (e: Event) => {
      // Só impedir o padrão se estivermos lidando com uma ação interna
      if (isInternalAction.current) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // Adicionar event listeners para capturar eventos que podem causar rolagem da página
    window.addEventListener("submit", preventDefaultForChat, { capture: true })

    return () => {
      window.removeEventListener("submit", preventDefaultForChat, { capture: true })
    }
  }, [])

  // Lidar com o envio de mensagens
  const handleMessageSubmit = useCallback(async () => {
    if (!input.trim() || isLoading || !userProfile) return

    // Definir flag de ação interna
    isInternalAction.current = true

    try {
      // Adicionar mensagem do usuário
      const userMessage = { role: "user" as const, content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // Incrementar contagem de mensagens
      const newCount = messageCount + 1
      setMessageCount(newCount)

      // Se esta for a 5ª mensagem, mostrar prompt de lista de espera após a resposta
      if (newCount >= 5) {
        // Adicionar resposta final do bot
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "## 🎉 Você atingiu o limite da demonstração!\n\nEspero que esteja gostando da experiência wodbot! Você atingiu o limite de mensagens para nossa prévia. **Entre em nossa lista de espera** para obter acesso completo quando lançarmos!",
            },
          ])
          setIsLoading(false)
          setShowWaitlist(true)
        }, 1000)
        return
      }

      // Processar mensagem com IA
      const response = await sendMessage({
        message: input,
        type: "combined",
        userProfile: {
          age: userProfile.age,
          fitnessLevel: userProfile.fitnessLevel,
          goal: userProfile.goal,
          timeAvailable: userProfile.timeAvailable,
        },
      })

      // Adicionar resposta do bot
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, encontrei um erro. Por favor, tente novamente mais tarde.",
        },
      ])
    } finally {
      setIsLoading(false)

      // Redefinir flag de ação interna após um pequeno atraso
      setTimeout(() => {
        isInternalAction.current = false
      }, 100)
    }
  }, [input, isLoading, messageCount, userProfile])

  // Completar perfil
  const completeProfile = useCallback(() => {
    if (!age || !fitnessLevel || !goal || !timeAvailable) return

    // Definir flag de ação interna
    isInternalAction.current = true

    const profile: UserProfile = {
      age,
      fitnessLevel,
      goal,
      timeAvailable,
    }

    onProfileComplete(profile)

    // Redefinir flag de ação interna após um pequeno atraso
    setTimeout(() => {
      isInternalAction.current = false
    }, 100)
  }, [age, fitnessLevel, goal, timeAvailable, onProfileComplete])

  // Lidar com clique em pergunta de exemplo
  const handleSampleQuestionClick = useCallback(
    (question: string) => {
      if (isLoading || showWaitlist || !userProfile) return

      // Definir flag de ação interna
      isInternalAction.current = true

      setInput(question)

      // Usar setTimeout para garantir que o input seja definido antes de enviar
      setTimeout(() => {
        handleMessageSubmit()
      }, 0)
    },
    [isLoading, showWaitlist, userProfile, handleMessageSubmit],
  )

  // Renderizar questionário
  const renderQuestionnaire = () => {
    return (
      <Card className="border-fitness-pink/10 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-fitness-pink to-fitness-purple text-white rounded-t-lg">
          <CardTitle>Converse com o wodbot</CardTitle>
          <CardDescription className="text-white/80">
            Responda algumas perguntas para obter conselhos fitness personalizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 h-full flex flex-col">
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-700">
                  Quantos anos você tem?
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Digite sua idade"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="16"
                  max="100"
                  required
                  className="border-fitness-pink/20 focus:border-fitness-pink focus:ring-fitness-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fitness-level" className="text-gray-700">
                  Qual é seu nível de condicionamento físico?
                </Label>
                <RadioGroup value={fitnessLevel} onValueChange={setFitnessLevel} required className="space-y-2">
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="beginner" id="beginner" className="text-fitness-pink" />
                    <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                      Iniciante
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="intermediate" id="intermediate" className="text-fitness-pink" />
                    <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                      Intermediário
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="advanced" id="advanced" className="text-fitness-pink" />
                    <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                      Avançado
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal" className="text-gray-700">
                  Qual é seu principal objetivo fitness?
                </Label>
                <Select value={goal} onValueChange={setGoal} required>
                  <SelectTrigger
                    id="goal"
                    className="border-fitness-pink/20 focus:border-fitness-pink focus:ring-fitness-pink"
                  >
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Perder Peso</SelectItem>
                    <SelectItem value="build-muscle">Ganhar Massa Muscular</SelectItem>
                    <SelectItem value="improve-fitness">Melhorar Condicionamento Geral</SelectItem>
                    <SelectItem value="increase-strength">Aumentar Força</SelectItem>
                    <SelectItem value="health-improvement">Melhorar Saúde</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-available" className="text-gray-700">
                  Quanto tempo você tem disponível (minutos)?
                </Label>
                <RadioGroup value={timeAvailable} onValueChange={setTimeAvailable} required className="space-y-2">
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="15" id="time-15" className="text-fitness-pink" />
                    <Label htmlFor="time-15" className="flex-1 cursor-pointer">
                      15 minutos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="30" id="time-30" className="text-fitness-pink" />
                    <Label htmlFor="time-30" className="flex-1 cursor-pointer">
                      30 minutos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="45" id="time-45" className="text-fitness-pink" />
                    <Label htmlFor="time-45" className="flex-1 cursor-pointer">
                      45 minutos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-fitness-pink/20 p-2 hover:bg-fitness-pink/5">
                    <RadioGroupItem value="60+" id="time-60" className="text-fitness-pink" />
                    <Label htmlFor="time-60" className="flex-1 cursor-pointer">
                      60+ minutos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  completeProfile()
                }}
                className="w-full mt-4 bg-gradient-to-r from-fitness-pink to-fitness-purple text-white shadow-md hover:shadow-lg transition-all"
              >
                Começar a Conversar <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar interface de chat
  const renderChat = () => {
    return (
      <Card className="border-fitness-pink/10 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-fitness-pink to-fitness-purple text-white rounded-t-lg flex flex-row items-center justify-between">
          <div>
            <CardTitle>Converse com o wodbot</CardTitle>
            <CardDescription className="text-white/80">
              Faça perguntas sobre treinos, nutrição ou obtenha conselhos personalizados.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              isInternalAction.current = true
              onResetProfile()

              // Redefinir flag de ação interna após um pequeno atraso
              setTimeout(() => {
                isInternalAction.current = false
              }, 100)
            }}
            className="flex items-center gap-1 ml-4 border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <RefreshCw className="h-3 w-3" /> Redefinir Perfil
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[500px]" ref={chatContainerRef}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex items-start gap-3 max-w-[90%]", message.role === "user" ? "ml-auto" : "")}
                >
                  {message.role === "assistant" && (
                    <div className="bg-fitness-pink/20 p-2 rounded-full flex-shrink-0">
                      <Dumbbell className="h-5 w-5 text-fitness-pink" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === "user"
                        ? "bg-gradient-to-r from-fitness-pink to-fitness-purple text-white"
                        : "bg-gray-100",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="bg-fitness-purple/20 p-2 rounded-full flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-fitness-purple" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="bg-fitness-pink/20 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-fitness-pink" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-fitness-pink animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-fitness-pink animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-fitness-pink animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Pílulas de perguntas de exemplo */}
            {userProfile && !showWaitlist && (
              <div className="px-4 py-3 border-t flex flex-wrap gap-2">
                {sampleQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-fitness-pink/10 transition-colors py-2 px-3 border-fitness-pink/20"
                    onClick={(e) => {
                      e.preventDefault()
                      handleSampleQuestionClick(question)
                    }}
                  >
                    <Sparkles className="h-3 w-3 mr-1 text-fitness-pink" />
                    {question}
                  </Badge>
                ))}
              </div>
            )}

            {showWaitlist ? (
              <div className="p-4 border-t">
                <Card className="p-4 bg-gradient-to-r from-fitness-pink/10 to-fitness-purple/10 border-none">
                  <div className="text-center space-y-4">
                    <h3 className="font-bold text-lg">Quer continuar a conversa?</h3>
                    <p className="text-sm text-muted-foreground">
                      Entre em nossa lista de espera para obter acesso completo ao wodbot quando lançarmos!
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-fitness-pink to-fitness-purple text-white shadow-md hover:shadow-lg transition-all"
                      onClick={(e) => {
                        e.preventDefault()
                        // Use a rolagem suave nativa do navegador para esta navegação legítima
                        const waitlistSection = document.querySelector("#waitlist")
                        if (waitlistSection) {
                          waitlistSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      Entrar na Lista de Espera
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <div className="p-4 border-t flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte sobre treinos, nutrição ou obtenha conselhos personalizados..."
                    disabled={isLoading || showWaitlist}
                    className="flex-1 border-fitness-pink/20 focus:border-fitness-pink focus:ring-fitness-pink"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleMessageSubmit()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    disabled={isLoading || showWaitlist}
                    className="shadow-sm hover:shadow-md transition-all border-fitness-pink/20 text-fitness-pink hover:bg-fitness-pink/10"
                    title="Enviar plano de treino ou dieta"
                    onClick={(e) => {
                      e.preventDefault()
                      // Lidar com funcionalidade de upload
                      alert(
                        "A funcionalidade de upload é limitada nesta demonstração. Entre na lista de espera para acesso completo!",
                      )
                    }}
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    disabled={isLoading || showWaitlist || !input.trim()}
                    className="shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-fitness-pink to-fitness-purple text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      handleMessageSubmit()
                    }}
                  >
                    <SendIcon className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return userProfile ? renderChat() : renderQuestionnaire()
}

