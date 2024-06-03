import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { DecryptDataDto } from "src/dto/decrypt-data.dto";
import { EncryptDataDto } from "src/dto/encrypt-data.dto";
import { RsaService } from "src/services/rsa.service";
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller()
export class RsaController {
    constructor(private readonly rsaService: RsaService) {}

    @Post('get-encrypt-data')
    @ApiBody({ type: EncryptDataDto })
    @ApiResponse({
        status: 201,
        description: 'ok',
        schema: {
            example: {
                successful: true,
                error_code: '',
                data: {
                    data1: 'MElDuxV03cywJca/eXrabfFE4IS9Y3l85DR65F58cdgw4D6qPcomA+2LzfpwCs+h9SFFWSAoJ2LiAHVWW+pOmjuY42UghYgMV6+N02wUtqj3Lpfp3VKyrBi4lgZBFV39WtXqOUNBM4NDWUb1Y+kQPb/GMwiWOi6lWtFzlfSXc4o=UQ8KOr/L1IXlfjF720p2sYyX4/badx4O/2lx3iwmTzAL9lICCDOQOKEUJ+jZpHftgW5pR31ZJkzQLiFEULJfL9OBUo+Y45FtD2IDnxv+SHYranxVk24Hvo2gSm0vKAKP/LXkXzTUOH7HeBOkJegMuJ/CgRTDMF7Nwi6gXJDT3g4=',
                    data2: '+pvOCjm187WcjMEJ2bYVng=='
                },
            },
        }
    })
    encryptData(@Body() encryptDataDto: EncryptDataDto) {
      const { payload } = encryptDataDto;
      try {
        const encryptedData = this.rsaService.encrypt(payload);
        return {
            successful: true,
            error_code: '',
            data: encryptedData
        };
      } catch (error) {
        console.error('encryption error', error);
        return {
            successful: false,
            error_code: error.mesage,
            data: null
        };
      }
    }
  
    @Post('get-decrypt-data')
    @ApiBody({ type: DecryptDataDto })
    @ApiResponse({
        status: 201,
        description: 'ok',
        schema: {
            example: {
                successful: true,
                error_code: '',
                data: {
                    payload: 'this is a test'
                },
            },
        }
    })
    decryptData(@Body() decryptDataDto: DecryptDataDto) {
      const { data1, data2 } = decryptDataDto;
      try {
        const payload = this.rsaService.decrypt(data1, data2);
        return {
            successful: true,
            error_code: '',
            data: { payload }
        };
      } catch (error) {
        console.error('decryption error', error);
        return {
            successful: false,
            error_code: error.message,
            data: null
        };
      }
    }
}