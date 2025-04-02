"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"

interface Testimonial {
  id: string
  name: string
  avatarUrl: string
  backgroundColor: string
  rating: number
  content: string
}

export default function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "João Silva",
      avatarUrl: "/avatars/joao-silva.svg",
      backgroundColor: "ffb8d9",
      rating: 5,
      content:
        "Tenho testado o wodbot por algumas semanas e já mudou a forma como abordo meus treinos. Os planos personalizados e a capacidade de ajustar na hora é exatamente o que eu precisava.",
    },
    {
      id: "2",
      name: "Maria Santos",
      avatarUrl: "/avatars/maria-santos.svg",
      backgroundColor: "e5d4ff",
      rating: 4.5,
      content:
        "A capacidade de enviar minha rotina de treino existente foi revolucionária. O wodbot analisou, manteve o que estava funcionando e sugeriu pequenos ajustes que fizeram uma grande diferença nos meus resultados.",
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      avatarUrl: "/avatars/pedro-oliveira.svg",
      backgroundColor: "ffe0d0",
      rating: 4,
      content:
        "As recomendações de dieta do wodbot foram perfeitas. Me ajudou a manter consistência com meus objetivos nutricionais enquanto ainda aproveitava minhas refeições. Mal posso esperar pelo lançamento completo!",
    },
    {
      id: "4",
      name: "Ana Carvalho",
      avatarUrl: "/avatars/ana-carvalho.svg",
      backgroundColor: "d4f7f6",
      rating: 5,
      content:
        "Como estudante universitária com pouco tempo livre, o wodbot tem sido incrível! As sugestões de treinos rápidos de 15 minutos se encaixam perfeitamente na minha agenda lotada e ainda vejo resultados!",
    },
    {
      id: "5",
      name: "Lucas Ribeiro",
      avatarUrl: "/avatars/lucas-ribeiro.svg",
      backgroundColor: "ffb8d9",
      rating: 4.5,
      content:
        "Minha academia fechou durante a pandemia, e o wodbot me ofereceu uma solução perfeita para treinos em casa. O que mais gosto é a adaptação quando não tenho equipamentos específicos.",
    },
    {
      id: "6",
      name: "Bruna Silva",
      avatarUrl: "/avatars/bruna-silva.svg",
      backgroundColor: "e5d4ff",
      rating: 4,
      content:
        "Sou mãe recente e precisava de treinos que pudesse fazer em casa. O wodbot entendeu perfeitamente minhas limitações e me deu treinos que posso fazer entre as responsabilidades com meu bebê.",
    },
  ]

  // Renderiza estrelas com base na classificação
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#FF5D8F"
          stroke="#FF5D8F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>,
      )
    }

    // Meia estrela
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="h-4 w-4"
        >
          <defs>
            <linearGradient id={`half-star-gradient-${rating}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#FF5D8F" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={`url(#half-star-gradient-${rating})`}
            stroke="#FF5D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>,
      )
    }

    // Estrelas vazias
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="transparent"
          stroke="#FF5D8F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>,
      )
    }

    return stars
  }

  // Renderiza um cartão de depoimento
  const renderTestimonialCard = (testimonial: Testimonial) => (
    <li className="mx-4 min-w-[280px] max-w-[280px]" key={testimonial.id}>
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-12 h-12 rounded-full bg-fitness-${
                testimonial.backgroundColor === "ffb8d9"
                  ? "pink"
                  : testimonial.backgroundColor === "e5d4ff"
                    ? "purple"
                    : testimonial.backgroundColor === "ffe0d0"
                      ? "orange"
                      : "teal"
              }-light flex items-center justify-center overflow-hidden`}
            >
              <img
                src={testimonial.avatarUrl}
                alt={`Avatar de ${testimonial.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{testimonial.name}</h3>
              <div className="flex items-center">{renderStars(testimonial.rating)}</div>
            </div>
          </div>
          <p className="italic text-muted-foreground">"{testimonial.content}"</p>
        </CardContent>
      </Card>
    </li>
  )

  // Inicializar o carousel quando o componente montar
  useEffect(() => {
    const initializeCarousel = () => {
      const scrollers = document.querySelectorAll(".scroller")

      // Se o usuário não optou por movimento reduzido, adicione a animação
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach((scroller) => {
          // Adicionar data-animated="true" a cada `.scroller` na página
          scroller.setAttribute("data-animated", "true")

          // Criar um array dos elementos dentro de `.scroller__inner`
          const scrollerInner = scroller.querySelector(".scroller__inner")
          if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children)

            // Para cada item no array, clone-o
            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true) as HTMLElement
              duplicatedItem.setAttribute("aria-hidden", "true")
              scrollerInner.appendChild(duplicatedItem)
            })
          }
        })
      }
    }

    // Inicializar o carousel após um pequeno atraso para garantir que o DOM esteja pronto
    const timer = setTimeout(() => {
      initializeCarousel()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="scroller">
        <ul className="tag-list scroller__inner">{testimonials.map(renderTestimonialCard)}</ul>
      </div>
    </div>
  )
}

