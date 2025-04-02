import Link from "next/link"
import { Dumbbell } from "lucide-react"

export const dynamic = 'force-static'

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introdução</h2>
              <p>
                O WodBot está comprometido em proteger sua privacidade. Esta política de privacidade descreve como coletamos,
                usamos e protegemos suas informações pessoais quando você utiliza nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Informações que Coletamos</h2>
              <p>Coletamos as seguintes informações:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Informações de perfil (nome, email, idade, peso, altura)</li>
                <li>Objetivos de fitness e preferências de treino</li>
                <li>Histórico de treinos e planos alimentares</li>
                <li>Dados de uso do aplicativo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personalizar seus treinos e planos alimentares</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Enviar atualizações e comunicações relevantes</li>
                <li>Analisar tendências e melhorar nossos algoritmos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Proteção de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Seus Direitos</h2>
              <p>Você tem o direito de:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Optar por não receber comunicações</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Contato</h2>
              <p>
                Para questões sobre esta política de privacidade ou suas informações pessoais, entre em contato conosco
                através do email: privacy@wodbot.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Atualizações da Política</h2>
              <p>
                Podemos atualizar esta política de privacidade periodicamente. Recomendamos que você revise esta página
                regularmente para se manter informado sobre como protegemos suas informações.
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