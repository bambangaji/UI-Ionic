import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  key = 'c3020a6377d1a224f86920c5b4d7fa13';

  constructor() { }
  encrypt(str: string): string {
    return AES.encrypt(str, this.key).toString();
  }
  decypter(str: string): string {
    return AES.decrypt(str, this.key).toString(enc.Utf8);
  }
}
