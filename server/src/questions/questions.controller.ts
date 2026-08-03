import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    const question = await this.questionsService.create(dto);
    return new QuestionEntity(question);
  }

  @Get()
  async findAll() {
    const questions = await this.questionsService.findAllPublished();
    return questions.map((q) => new QuestionEntity(q));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const question = await this.questionsService.findOnePublished(id);
    return new QuestionEntity(question);
  }
}
