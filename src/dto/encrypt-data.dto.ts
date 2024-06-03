import { IsString, Length} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
    @ApiProperty({
        description: 'to encrypt',
        example: 'this is a test'
    })
    @IsString()
    @Length(0, 2000)
    payload: string;
}