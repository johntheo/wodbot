import { useState } from 'react';
import { toast } from "sonner";

export function useWaitlist() {
  const [loading, setLoading] = useState(false);

  const submitWaitlist = async (name: string, email: string, interest: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, interest }),
      });

      if (response.ok) {
        toast.success(
          'Obrigado por entrar na nossa lista de espera! Vamos notificá-lo quando o wodbot for lançado.'
        );
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      toast.error('Erro ao se registrar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { submitWaitlist, loading };
} 