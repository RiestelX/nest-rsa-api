import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDataDto {
    @ApiProperty({
        description: 'aes key + iv',
        example: 'MElDuxV03cywJca/eXrabfFE4IS9Y3l85DR65F58cdgw4D6qPcomA+2LzfpwCs+h9SFFWSAoJ2LiAHVWW+pOmjuY42UghYgMV6+N02wUtqj3Lpfp3VKyrBi4lgZBFV39WtXqOUNBM4NDWUb1Y+kQPb/GMwiWOi6lWtFzlfSXc4o=UQ8KOr/L1IXlfjF720p2sYyX4/badx4O/2lx3iwmTzAL9lICCDOQOKEUJ+jZpHftgW5pR31ZJkzQLiFEULJfL9OBUo+Y45FtD2IDnxv+SHYranxVk24Hvo2gSm0vKAKP/LXkXzTUOH7HeBOkJegMuJ/CgRTDMF7Nwi6gXJDT3g4='
    })
    @IsString()
    data1: string;

    @ApiProperty({
        description: 'encrypted payload',
        example: '+pvOCjm187WcjMEJ2bYVng=='
    })
    @IsString()
    data2: string;
}