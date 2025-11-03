export type Shop = {
  id_tienda: number;
  id_vendedor: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  telefono: string;
  fecha_creacion: Date;
  // Should this have a product array?
  // producto: Product[];
};

export type Product = {
  sku: string;
  id_tienda: number;
  stock: number;
  precio: number;
  disponible: boolean;
};
