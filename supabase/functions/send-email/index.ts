import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const FROM_EMAIL = 'noreply@hydrolia.com'

interface EmailRequest {
  to: string
  subject: string
  body: string
  orderId: string
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const { to, subject, body, orderId } = await req.json() as EmailRequest

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }]
        }],
        from: { email: FROM_EMAIL },
        subject: subject,
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">${subject}</h1>
              <p style="font-size: 16px; line-height: 1.5;">${body}</p>
              <p style="font-size: 14px; color: #666;">
                Numéro de commande : ${orderId}<br>
                Pour suivre votre commande, connectez-vous à votre espace client.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666;">
                  Cet email a été envoyé automatiquement, merci de ne pas y répondre.<br>
                  © ${new Date().getFullYear()} Hydrolia. Tous droits réservés.
                </p>
              </div>
            </div>
          `
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.statusText}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}) 