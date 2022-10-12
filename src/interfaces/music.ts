export interface IMusic {
  id: number;
  title: string;
  singer: string;
  cover: string;
  source: string;
  fileUrl: string;
  playing: boolean;
  favorite: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
