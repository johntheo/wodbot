import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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

      res.status(200).json({ message: 'Successfully registered!' });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 