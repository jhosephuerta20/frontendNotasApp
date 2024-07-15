export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  users: string;
  archived: boolean;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
}
