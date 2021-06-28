import { Link as LinkModel } from 'db';

export class ShowDto implements LinkModel {
  id: number;
  long_url: string;
  hash: string;
  link: string;
}
