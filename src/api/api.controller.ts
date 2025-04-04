import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateTodo, GetTodosQueryDto } from './dto/api.dto';
import { UpdateTodo } from './dto/api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('/todos')
  async create(@Body() createApiDto: CreateTodo) {
    return await this.apiService.create(createApiDto);
  }

  @Get('/todos')
  async findAll(@Query() query: GetTodosQueryDto) {
    let status: boolean | undefined;
    if (query.status === 0) status = false;
    if (query.status === 1) status = true;

    return await this.apiService.findAll({
      where: {
        AND: [
          { status },
          {
            OR: [{ title: query.search }, { description: query.search }],
          },
        ],
      },
      orderBy: { dateCreate: 'desc' },
    });
  }

  @Patch('/todos/:id')
  async update(@Param('id') id: string, @Body() updateApiDto: UpdateTodo) {
    return await this.apiService.update({ where: { id }, data: updateApiDto });
  }

  @Delete('/todos/:id')
  remove(@Param('id') id: string) {
    return this.apiService.remove({ id });
  }
}
