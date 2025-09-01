export interface ExpertiseImage {
  id: number;
  image: string;
}

export interface ExpertiseSection {
  id: number;
  title: string;
  description: string;
  images?: ExpertiseImage[];
}
export interface FlattenedCard {
  id: number;
  image: string;
  title: string;
  description: string;
}
