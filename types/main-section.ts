export interface Slide {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  buttons?: boolean;
  alignment?: string;
}