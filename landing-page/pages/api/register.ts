import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { PostHog } from 'posthog-node';

// Initialize PostHog
const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: 'https://eu.i.posthog.com' }
);

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, interest } = req.body;

    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ name, email, interest }]);

      if (error) {
        throw error;
      }

      // Capture successful registration event
      await posthog.capture({
        distinctId: email,
        event: 'waitlist_registration',
        properties: {
          name,
          email,
          interest,
          timestamp: new Date().toISOString(),
        },
      });

      res.status(200).json({ message: 'Successfully registered!' });
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Capture failed registration event
      await posthog.capture({
        distinctId: email,
        event: 'waitlist_registration_failed',
        properties: {
          name,
          email,
          interest,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      });

      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 