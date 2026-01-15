import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateSystemDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsInt()
    @Min(10)
    heartbeatInterval: number
}