
export interface Tag {
    id: number;
    name: string;
  }

export interface Snippet {
    id: number;
    content: string;
    tags: Tag[]
}