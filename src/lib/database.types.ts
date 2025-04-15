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
    }
  }
}