import { NextResponse } from 'next/server';
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

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'x-application-name': 'wodbot-landing-page'
    }
  }
});

export async function POST(request: Request) {
  try {
    const { name, email, interest } = await request.json();

    console.log('Attempting to connect to Supabase with URL:', supabaseUrl);
    
    // Test the connection first
    const { data: testData, error: testError } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Supabase connection test failed:', testError);
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }

    console.log('Supabase connection test successful');

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ name, email, interest }]);

    if (error) {
      console.error('Supabase insert error:', error);
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

    return NextResponse.json({ message: 'Successfully registered!' });
  } catch (error: any) {
    console.error('Registration error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      stack: error.stack
    });
    
    // Capture failed registration event
    await posthog.capture({
      distinctId: 'unknown',
      event: 'waitlist_registration_failed',
      properties: {
        error: error.message,
        errorCode: error.code,
        errorDetails: error.details,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { 
        error: 'Erro ao se registrar. Por favor, tente novamente mais tarde.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 