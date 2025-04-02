import Link from "next/link"
import { Dumbbell } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-fitness-pink" />
            <span className="text-xl font-bold">wodbot</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Termos de Serviço</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o WodBot, você concorda em cumprir estes termos de serviço. Se você não concordar com
                qualquer parte destes termos, não poderá usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Descrição do Serviço</h2>
              <p>
                O WodBot é uma plataforma de IA que fornece treinos personalizados e planos alimentares. Nossos serviços
                incluem, mas não se limitam a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Geração de treinos personalizados</li>
                <li>Criação de planos alimentares</li>
                <li>Ajustes e modificações de exercícios</li>
                <li>Suporte e orientação via chat</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Responsabilidade do Usuário</h2>
              <p>Como usuário do WodBot, você concorda em:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Consultar um profissional de saúde antes de iniciar qualquer programa de exercícios</li>
                <li>Usar o serviço de forma responsável e segura</li>
                <li>Não compartilhar sua conta com terceiros</li>
                <li>Não usar o serviço para fins ilegais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Limitação de Responsabilidade</h2>
              <p>
                O WodBot fornece sugestões e recomendações baseadas em IA, mas não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Lesões ou danos resultantes do uso de nossos treinos</li>
                <li>Resultados específicos de fitness ou saúde</li>
                <li>Interrupções ou problemas técnicos do serviço</li>
                <li>Conteúdo gerado por usuários</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, funcionalidades e tecnologia do WodBot são propriedade exclusiva da empresa e estão
                protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Modificações do Serviço</h2>
              <p>
                Reservamos o direito de modificar ou descontinuar qualquer parte do serviço a qualquer momento, com ou
                sem aviso prévio. Não seremos responsáveis perante você ou terceiros por qualquer modificação,
                suspensão ou descontinuação do serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Lei Aplicável</h2>
              <p>
                Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de conflitos
                de disposições legais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Contato</h2>
              <p>
                Para questões sobre estes termos de serviço, entre em contato conosco através do email:
                legal@wodbot.com
              </p>
            </section>
          </div>
        </div>
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
          </div>
        </div>
      </footer>
    </div>
  )
} 