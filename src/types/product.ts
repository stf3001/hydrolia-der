export interface Product {
  id: string;
  name: string;
  description: string;
  short_description?: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category: string | null;
  technical_specs?: any | null;
  features?: string[] | null;
  dimensions?: any | null;
  weight?: number | null;
  sku?: string | null;
  manufacturer?: string | null;
  warranty_info?: string | null;
  installation_guide?: string | null;
  maintenance_info?: string | null;
  certifications?: string[] | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
} 