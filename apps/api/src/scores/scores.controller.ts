import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Theme, Niveau } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoresService } from './scores.service';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: { id: number },
    @Body() dto: CreateScoreDto,
  ) {
    return this.scoresService.create(user.id, dto);
  }

  @Get('leaderboard')
  leaderboard(
    @Query('theme') theme: string,
    @Query('niveau') niveau: string,
    @Query('limit') limit?: string,
  ) {
    return this.scoresService.getLeaderboard(
      theme as Theme,
      niveau as Niveau,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  myScores(@CurrentUser() user: { id: number }) {
    return this.scoresService.getMyScores(user.id);
  }
}
