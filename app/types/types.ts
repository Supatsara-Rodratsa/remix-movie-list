export type MovieDTO = {
  actors: string[];
  desc: string;
  directors: string[];
  genre: string[];
  image_url: string;
  thumb_url: string;
  imdb_url: string;
  name: string;
  rating: number;
  year: number;
};

export type Align = 'start' | 'center' | 'end' | 'none';
export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';
export type IconCategory =
  | 'calendar'
  | 'rating'
  | 'search'
  | 'full-star'
  | 'empty-star'
  | 'half-star'
  | 'fill-heart'
  | 'empty-heart'
  | 'back'
  | 'close';
export type Direction = 'row' | 'column';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';
export type FontWeight = 'light' | 'normal' | 'medium' | 'bold' | 'extrabold';
