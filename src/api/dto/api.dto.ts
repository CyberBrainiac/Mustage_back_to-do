import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodo {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTodo extends CreateTodo {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsInt()
  dateCreate: number;
}

export class GetTodosQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  status: number;

  @IsOptional()
  @IsString()
  search?: string;
}
