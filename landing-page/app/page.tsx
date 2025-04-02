"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  MessageSquare,
  Dumbbell,
  Utensils,
  Brain,
  ArrowRight,
  Upload,
  Play,
  Clock,
  Award,
} from "lucide-react"
import ChatDemo, { type UserProfile } from "@/components/chat-demo"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { useWaitlist } from '@/hooks/useWaitlist';
import { toast } from "sonner";
// Importe o componente alternativo se necessário
// import TestimonialCarousel from "@/components/testimonial-carousel-alt"

export default function LandingPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', interest: '' });
  const isChatActionInProgress = useRef(false)
  const { submitWaitlist, loading } = useWaitlist();

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile)
  }

  const handleResetProfile = () => {
    setUserProfile(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInterestChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, interest } = formData;
    if (interest) {
      submitWaitlist(name, email, interest);
    } else {
      toast.error('Por favor, selecione um interesse.');
    }
  };

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchorLink = target.closest('a[href^="#"]')

      // Skip if a chat action is in progress
      if (isChatActionInProgress.current) {
        return
      }

      if (anchorLink) {
        e.preventDefault()
        const targetId = anchorLink.getAttribute("href")
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    // Listen for a custom event from the chat component
    const handleChatAction = (e: CustomEvent) => {
      isChatActionInProgress.current = e.detail.inProgress
    }

    document.addEventListener("click", handleAnchorClick)
    document.addEventListener("chatAction" as any, handleChatAction)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      document.removeEventListener("chatAction" as any, handleChatAction)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-fitness-pink" />
            <span className="text-xl font-bold">wodbot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-fitness-pink transition-colors">
              Recursos
            </Link>
            <Link href="#demo" className="text-sm font-medium hover:text-fitness-pink transition-colors">
              Experimente
            </Link>
            <Link href="#waitlist" className="text-sm font-medium hover:text-fitness-pink transition-colors">
              Lista de Espera
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-fitness-pink hover:bg-fitness-pink-dark text-white" asChild>
              <a href="#waitlist">Entrar na Lista</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-fitness-pink-light rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fitness-purple-light rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-full h-full bg-hero-pattern opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit bg-fitness-pink text-white border-none px-3 py-1">Em Breve</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Seu Personal Trainer <span className="text-fitness-pink">Sempre à Mão</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Obtenha treinos personalizados e planos nutricionais que se adaptam às suas necessidades. Modifique
                    exercícios, ajuste refeições e receba orientação quando precisar.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    size="lg"
                    className="bg-fitness-pink hover:bg-fitness-pink-dark text-white shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <a href="#waitlist">Entrar na lista de espera</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-fitness-pink text-fitness-pink hover:bg-fitness-pink/5"
                    asChild
                  >
                    <a href="#demo" className="flex items-center gap-2">
                      <Play size={16} /> Testar Demo
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-8">
                  <div className="flex -space-x-3">
                    <img src="/avatars/joao-silva.svg" alt="Avatar JD" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/avatars/lucas-ribeiro.svg" alt="Avatar MK" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/avatars/maria-santos.svg" alt="Avatar TS" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/avatars/pedro-oliveira.svg" alt="Avatar AR" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Acesso Antecipado</span>
                    <span className="text-xs text-muted-foreground">Seja um dos primeiros</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fitness-pink-light rounded-full blur-xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-fitness-purple-light rounded-full blur-xl opacity-30"></div>

                <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-fitness-pink-light to-fitness-pink/40 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-[80%] transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-fitness-pink/20 p-2 rounded-full">
                          <Dumbbell className="h-6 w-6 text-fitness-pink" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">wodbot</p>
                          <p className="text-sm text-muted-foreground">
                            Vejo que você enviou seu plano de treino atual. Gostaria que eu o analisasse e sugerisse
                            algumas melhorias com base em seus objetivos?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-fitness-purple/20 p-2 rounded-full">
                          <MessageSquare className="h-6 w-6 text-fitness-purple" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Você</p>
                          <p className="text-sm text-muted-foreground">
                            Sim, por favor! Gostaria de focar mais em força, mas manter os elementos de cardio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-fitness-pink/10 rounded-full flex items-center justify-center animate-float">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <Dumbbell className="h-8 w-8 text-fitness-pink" />
                  </div>
                </div>
                <div
                  className="absolute -bottom-5 -left-5 w-20 h-20 bg-fitness-purple/10 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <Utensils className="h-6 w-6 text-fitness-purple" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gradient-to-b from-white to-fitness-pink-light/30 relative">
          <div className="absolute top-1/2 left-0 w-full h-full bg-hero-pattern opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge className="bg-fitness-pink text-white border-none">Por Que Nos Escolher</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Oferecemos a Melhor Experiência Para Você
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Nossa plataforma com IA oferece recursos exclusivos para ajudá-lo a alcançar seus objetivos fitness
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-fitness-pink/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-fitness-purple/10 rounded-full blur-3xl -z-10"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-fitness-pink-light to-fitness-purple-light flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-xl bg-white/90 shadow-lg p-6 flex flex-col gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-fitness-pink/20 p-2 rounded-full">
                          <Dumbbell className="h-6 w-6 text-fitness-pink" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">wodbot</p>
                          <p className="text-sm text-muted-foreground">
                            Com base no seu progresso, recomendo aumentar o peso do agachamento em 5kg esta semana.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-fitness-purple/20 p-2 rounded-full">
                          <MessageSquare className="h-6 w-6 text-fitness-purple" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Você</p>
                          <p className="text-sm text-muted-foreground">
                            Meu joelho está incomodando. Pode sugerir uma alternativa?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-fitness-pink/20 p-2 rounded-full">
                          <Dumbbell className="h-6 w-6 text-fitness-pink" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">wodbot</p>
                          <p className="text-sm text-muted-foreground">
                            Vamos mudar para agachamento búlgaro com pesos mais leves para reduzir a tensão no joelho,
                            mas ainda trabalhar os mesmos músculos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-fitness-purple/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-fitness-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Personalização com IA</h3>
                    <p className="text-muted-foreground">
                      Tecnologia avançada de IA cria treinos e planos alimentares adaptados especificamente ao seu
                      corpo, objetivos e preferências.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-fitness-pink/10 flex items-center justify-center flex-shrink-0">
                    <Upload className="h-6 w-6 text-fitness-pink" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Envie Seus Planos</h3>
                    <p className="text-muted-foreground">
                      Já tem planos de treino ou dieta? Envie-os e o wodbot aprenderá com suas preferências para
                      fornecer recomendações ainda mais personalizadas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-fitness-orange/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-fitness-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gestão Flexível de Tempo</h3>
                    <p className="text-muted-foreground">
                      Treinos que se adaptam à sua agenda, seja você tenha 15 minutos ou uma hora para treinar.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-fitness-teal/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-fitness-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Conteúdo Revisado por Especialistas</h3>
                    <p className="text-muted-foreground">
                      Todas as recomendações de treino e nutrição são revisadas por profissionais de saúde e nutrição.
                    </p>
                  </div>
                </div>

                <Button
                  className="bg-fitness-pink hover:bg-fitness-pink-dark text-white shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <a href="#demo">Experimente Agora</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-16 bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fitness-pink-light rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fitness-purple-light rounded-full blur-3xl opacity-20 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-fitness-pink text-white border-none">Demo ao Vivo</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Experimente o wodbot</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Veja como o wodbot pode ajudá-lo a alcançar seus objetivos de fitness e nutrição
                </p>
              </div>
            </div>
            <div className="mt-12 w-full max-w-4xl mx-auto">
              <div className="chat-container p-1">
                <ChatDemo
                  userProfile={userProfile}
                  onProfileComplete={handleProfileComplete}
                  onResetProfile={handleResetProfile}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 italic">
                Esta é uma demo limitada. Entre na lista de espera para ter acesso completo ao wodbot quando lançarmos!
              </p>
            </div>
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-fitness-pink hover:bg-fitness-pink-dark text-white shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <a href="#waitlist">
                  Entre na Lista de Espera <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-b from-white to-fitness-pink-light/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fitness-pink-light rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fitness-purple-light rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-full h-full bg-hero-pattern opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge className="bg-fitness-pink text-white border-none">Depoimentos</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">O que dizem nossos Beta-Testers</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Veja o que nossos testadores iniciais dizem sobre sua experiência com o wodbot
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-16 bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fitness-pink rounded-full blur-3xl opacity-10 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fitness-purple rounded-full blur-3xl opacity-10 -z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-full h-full bg-hero-pattern opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-fitness-pink text-white border-none">Vagas Limitadas</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Obtenha Acesso Antecipado</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Seja o primeiro da fila quando o wodbot for lançado. Membros iniciais recebem estes benefícios:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-fitness-pink/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-fitness-pink" />
                      </div>
                      <span>Primeiro acesso quando lançarmos (sem espera na fila)</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-fitness-pink/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-fitness-pink" />
                      </div>
                      <span>Período de teste gratuito estendido para maximizar seus ganhos</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-fitness-pink/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-fitness-pink" />
                      </div>
                      <span>Descontos exclusivos para membros fundadores</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-fitness-pink/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-fitness-pink" />
                      </div>
                      <span>Ajude a moldar o wodbot para se adequar ao seu estilo de treino</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border bg-white p-6 shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Reserve Sua Vaga</h3>
                  <p className="text-muted-foreground">
                    Entre em nossa lista de espera para ser notificado quando o wodbot for lançado.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome"
                      className="border-fitness-pink/20 focus:border-fitness-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Digite seu email"
                      className="border-fitness-pink/20 focus:border-fitness-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fitness-interest">O que mais te interessa?</Label>
                    <Select onValueChange={handleInterestChange}>
                      <SelectTrigger className="border-fitness-pink/20 focus:border-fitness-pink">
                        <SelectValue placeholder="Selecione seu interesse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workouts">Treinos Personalizados</SelectItem>
                        <SelectItem value="diet">Planos Alimentares</SelectItem>
                        <SelectItem value="both">Treino e Alimentação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-fitness-pink hover:bg-fitness-pink-dark text-white shadow-lg hover:shadow-xl transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Entrar na Lista de Espera'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-fitness-pink" />
              <span className="text-xl font-bold">wodbot</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 wodbot. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-fitness-pink transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-fitness-pink transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

