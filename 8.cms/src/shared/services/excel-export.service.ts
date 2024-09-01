import { Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';
@Injectable()
export class ExcelExportService {
    async exportAsExcel(data, columns) {
        //创建一个新的excel工作簿
        const workbook = new exceljs.Workbook();
        //创建一个新的工作表
        const worksheet = workbook.addWorksheet('Data');
        //指定列定义数组
        worksheet.columns = columns;
        //遍历数据数组将每一项数据添加工作表中
        data.forEach(rowData=>worksheet.addRow(rowData));
        //将工作簿的内容写入缓冲区Buffer
        return workbook.xlsx.writeBuffer();
    }

}
