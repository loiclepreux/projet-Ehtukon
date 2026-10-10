import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export enum Theme {
  html = 'html',
  css = 'css',
  javascript = 'javascript',
  php = 'php',
  sql = 'sql',
}

export enum Niveau {
  facile = 'facile',
  moyen = 'moyen',
  difficile = 'difficile',
}

export class AnswerDto {
  @IsInt()
  questionId: number;

  @IsInt()
  @Min(1)
  @Max(4)
  answer: number;
}

export class CreateScoreDto {
  @IsEnum(Theme)
  theme: Theme;

  @IsEnum(Niveau)
  niveau: Niveau;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
