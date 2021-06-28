import { IsUrl, Length } from 'class-validator';

export class CreateDto {
  @IsUrl()
  @Length(1, 2000) // https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
  url: string;
}
