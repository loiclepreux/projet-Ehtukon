import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Theme, Niveau } from '@prisma/client';
import { CheckAnswerDto } from './dto/check-answer.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  findAll(@Query() query: GetQuestionsDto) {
    return this.questionsService.findByThemeAndNiveau(
      query.theme as unknown as Theme,
      query.niveau as unknown as Niveau,
    );
  }

  @Post(':id/check')
  @HttpCode(HttpStatus.OK)
  check(@Param('id', ParseIntPipe) id: number, @Body() dto: CheckAnswerDto) {
    return this.questionsService.checkAnswer(id, dto.answer);
  }
}
