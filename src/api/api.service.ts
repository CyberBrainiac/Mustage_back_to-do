import { Injectable } from '@nestjs/common';
import { CreateTodo } from './dto/api.dto';
import { UpdateTodo } from './dto/api.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@app/prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTodo): Promise<Todo> {
    const id = uuidv4();
    const dateCreate = Date.now();
    const status = false;

    return this.prisma.todo.create({
      data: { ...data, id, dateCreate, status },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { data, where } = params;
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
