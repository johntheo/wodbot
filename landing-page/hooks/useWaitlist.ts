import { useState } from 'react';
import { toast } from "sonner";
import { usePostHog } from 'posthog-js/react';

export function useWaitlist() {
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const submitWaitlist = async (name: string, email: string, interest: string) => {
    setLoading(true);
    
    // Capture form submission attempt
    posthog?.capture('waitlist_form_submitted', {
      name,
      email,
      interest,
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, interest }),
      });

      if (response.ok) {
        // Capture successful client-side submission
        posthog?.capture('waitlist_form_success', {
          name,
          email,
          interest,
          timestamp: new Date().toISOString(),
        });

        toast.success(
          'Obrigado por entrar na nossa lista de espera! Vamos notificá-lo quando o wodbot for lançado.'
        );
      } else {
        const errorData = await response.json();
        
        // Capture client-side error
        posthog?.capture('waitlist_form_error', {
          name,
          email,
          interest,
          error: errorData.error,
          timestamp: new Date().toISOString(),
        });

        toast.error(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      // Capture network error
      posthog?.capture('waitlist_form_network_error', {
        name,
        email,
        interest,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });

      toast.error('Erro ao se registrar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { submitWaitlist, loading };
} 