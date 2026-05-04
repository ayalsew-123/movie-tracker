export interface Movie {
  id: number;
  created_at?: string;
  user_id?: string;
  title: string;
  director: string;
  genre: string;
  year: number;
  runtime: number;
  rating: number;
  description: string;
}