import { IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class HeartbeatDto {
    @IsUUID()
    systemId: string
}