import { Injectable } from '@nestjs/common';
import * as htmlToDocx from 'html-to-docx';

@Injectable()
export class WordExportService {
    async exportToWord(htmlContent:string){
        return await htmlToDocx(htmlContent);
    }

}
