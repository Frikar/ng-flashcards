export type Iflash = {
  question: string;
  answer: string;
  show: boolean;
  id: number;
  remembered?: 'correct' | 'incorrect';
};
