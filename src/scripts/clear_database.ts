import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';

const supabaseUrl = 'https://xhofhmdpjzskqspppqdo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob2ZobWRwanpza3FzcHBwcWRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU5MjU0MCwiZXhwIjoyMDU5MTY4NTQwfQ.RoesUUEz5EAotXxfQzxCRhE8LMUmzhk-fCMUn4Q0uWI';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function clearDatabase() {
  try {
    // Supprimer les enregistrements de la table clients
    const { error: clientsError } = await supabase
      .from('clients')
      .delete()
      .gt('id', '00000000-0000-0000-0000-000000000000');

    if (clientsError && clientsError.code !== '42P01') throw clientsError;
    if (!clientsError) console.log('✓ Table clients vidée');

    // Supprimer les enregistrements de la table user_roles
    const { error: rolesError } = await supabase
      .from('user_roles')
      .delete()
      .gt('user_id', '00000000-0000-0000-0000-000000000000');

    if (rolesError && rolesError.code !== '42P01') throw rolesError;
    if (!rolesError) console.log('✓ Table user_roles vidée');

    // Supprimer les utilisateurs de l'authentification
    const { data: users } = await supabase.auth.admin.listUsers();
    
    if (users) {
      for (const user of users.users) {
        const { error } = await supabase.auth.admin.deleteUser(user.id);
        if (error) throw error;
      }
      console.log('✓ Utilisateurs auth supprimés');
    }

    console.log('✓ Base de données nettoyée avec succès');
  } catch (error) {
    console.error('Erreur lors du nettoyage de la base de données:', error);
  } finally {
    process.exit();
  }
}

clearDatabase(); 