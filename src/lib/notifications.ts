import { supabase } from './supabase';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface EmailTemplate {
  subject: string;
  body: string;
}

const emailTemplates: Record<OrderStatus, EmailTemplate> = {
  pending: {
    subject: 'Votre commande est en attente de paiement',
    body: 'Merci pour votre commande. Pour la finaliser, veuillez procéder au paiement.'
  },
  paid: {
    subject: 'Paiement reçu pour votre commande',
    body: 'Nous avons bien reçu votre paiement. Votre commande va être traitée prochainement.'
  },
  processing: {
    subject: 'Votre commande est en cours de traitement',
    body: 'Nous préparons actuellement votre commande.'
  },
  shipped: {
    subject: 'Votre commande a été expédiée',
    body: 'Votre commande est en route ! Vous pouvez suivre sa livraison avec le numéro de suivi fourni.'
  },
  delivered: {
    subject: 'Votre commande a été livrée',
    body: 'Votre commande a été livrée. Nous espérons que vous en êtes satisfait !'
  },
  cancelled: {
    subject: 'Votre commande a été annulée',
    body: 'Votre commande a été annulée. Si vous avez des questions, contactez notre service client.'
  }
};

export const sendOrderStatusEmail = async (
  userId: string,
  orderId: string,
  status: OrderStatus,
  additionalInfo?: string
) => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    const template = emailTemplates[status];
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">${template.subject}</h1>
        <p style="font-size: 16px; line-height: 1.5;">${template.body}</p>
        ${additionalInfo ? `<p style="font-size: 16px; line-height: 1.5;">${additionalInfo}</p>` : ''}
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
    `;

    const { error } = await supabase.functions.invoke('send-email-supabase', {
      body: {
        email: user.email,
        subject: template.subject,
        html: emailContent,
      }
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
};

export const subscribeToOrderUpdates = (
  orderId: string,
  callback: (status: OrderStatus) => void
) => {
  const subscription = supabase
    .channel(`order-${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload) => {
        callback(payload.new.status as OrderStatus);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}; 