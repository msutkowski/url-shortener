import { IsUrl, Length } from 'class-validator';
import { Link } from 'db';

export class CreateDto implements Pick<Link, 'long_url'> {
  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Length(1, 2000) // https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
  long_url: string;
}
