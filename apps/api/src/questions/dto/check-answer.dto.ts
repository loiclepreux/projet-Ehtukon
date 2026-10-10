import { IsInt, Max, Min } from 'class-validator';

export class CheckAnswerDto {
  @IsInt()
  @Min(1)
  @Max(4)
  answer: number;
}
