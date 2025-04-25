export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string
          url: string
          alt_text: string | null
          category: string | null
          title: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          url: string
          alt_text?: string | null
          category?: string | null
          title?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt_text?: string | null
          category?: string | null
          title?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          company_name: string | null
          contact_name: string | null
          email: string
          phone: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          country: string | null
          industry: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name?: string | null
          contact_name?: string | null
          email: string
          phone?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          industry?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string | null
          contact_name?: string | null
          email?: string
          phone?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          industry?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referral_code: string
          status: 'pending' | 'converted' | 'expired'
          points_awarded: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referral_code: string
          status?: 'pending' | 'converted' | 'expired'
          points_awarded?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referral_code?: string
          status?: 'pending' | 'converted' | 'expired'
          points_awarded?: number
          created_at?: string
          updated_at?: string
        }
      }
      
      rewards: {
        Row: {
          id: string
          name: string
          description: string | null
          points_cost: number
          image_url: string
          category: string
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          points_cost: number
          image_url: string
          category: string
          stock: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          points_cost?: number
          image_url?: string
          category?: string
          stock?: number
          created_at?: string
          updated_at?: string
        }
      }
      
      reward_claims: {
        Row: {
          id: string
          user_id: string
          reward_id: string
          status: 'pending' | 'approved' | 'rejected' | 'delivered'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reward_id: string
          status?: 'pending' | 'approved' | 'rejected' | 'delivered'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reward_id?: string
          status?: 'pending' | 'approved' | 'rejected' | 'delivered'
          created_at?: string
          updated_at?: string
        }
      }
      
      points_history: {
        Row: {
          id: string
          user_id: string
          points: number
          type: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          points: number
          type: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          points?: number
          type?: string
          description?: string | null
          created_at?: string
        }
      }

      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'client' | 'ambassador' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'client' | 'ambassador' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'client' | 'ambassador' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }

      products: {
        Row: {
          id: string
          name: string
          description: string | null
          short_description: string | null
          price: number
          stock: number
          image_url: string | null
          category: string | null
          technical_specs: Json | null
          features: string[] | null
          dimensions: Json | null
          weight: number | null
          sku: string | null
          manufacturer: string | null
          warranty_info: string | null
          installation_guide: string | null
          maintenance_info: string | null
          certifications: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          short_description?: string | null
          price: number
          stock?: number
          image_url?: string | null
          category?: string | null
          technical_specs?: Json | null
          features?: string[] | null
          dimensions?: Json | null
          weight?: number | null
          sku?: string | null
          manufacturer?: string | null
          warranty_info?: string | null
          installation_guide?: string | null
          maintenance_info?: string | null
          certifications?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          short_description?: string | null
          price?: number
          stock?: number
          image_url?: string | null
          category?: string | null
          technical_specs?: Json | null
          features?: string[] | null
          dimensions?: Json | null
          weight?: number | null
          sku?: string | null
          manufacturer?: string | null
          warranty_info?: string | null
          installation_guide?: string | null
          maintenance_info?: string | null
          certifications?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: string
          billing_address: string
          payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: string
          billing_address: string
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: string
          billing_address?: string
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}