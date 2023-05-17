import { IsString, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;
}