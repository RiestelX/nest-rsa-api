import { readFileSync } from "fs";
import * as crypto from 'crypto';
import { join } from "path";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class RsaService {
    private publicKey: string;
    private privateKey: string;

    constructor() {
        this.publicKey = readFileSync(join(__dirname, '../../keys/public.pem'), 'utf8');
        this.privateKey = readFileSync(join(__dirname, '../../keys/private.pem'), 'utf8');
    }

    encrypt(payload: string): { data1: string; data2: string } {
        const aesKey = crypto.randomBytes(32);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encryptedPayload = cipher.update(payload, 'utf8', 'base64');
        encryptedPayload += cipher.final('base64');

        const encryptedAesKey = crypto.privateEncrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, aesKey).toString('base64');
        const encryptedIv = crypto.privateEncrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, iv).toString('base64');

        return { data1: encryptedAesKey + encryptedIv, data2: encryptedPayload };
    }
    
    decrypt(data1: string, data2: string): string {
        try {
            // 1024 bit (128 byte)
            // base64 > (128 / 3) * 4 = 170.67
            const encryptedAesKey = data1.slice(0, 172);
            const encryptedIv = data1.slice(172);

            const aesKey = crypto.publicDecrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(encryptedAesKey, 'base64'));
            const iv = crypto.publicDecrypt({key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(encryptedIv, 'base64'));

            const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
            let decryptedPayload = decipher.update(data2, 'base64', 'utf8');
            decryptedPayload += decipher.final('utf8');

            return decryptedPayload;
        } catch (error) {
            console.error('decryption error', error);
            throw new InternalServerErrorException('decryption fail');
        }
    }
}