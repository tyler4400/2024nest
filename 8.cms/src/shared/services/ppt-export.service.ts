import { Injectable } from '@nestjs/common';
import * as pptxgenjs from 'pptxgenjs';
import * as html2ppt from 'html-pptxgenjs';

@Injectable()
export class PptExportService {
    async exportToPpt(articles) {
        //创建一个pptxgenjs实例
        const pptx = new (pptxgenjs as any)();
        for (const article of articles) {
            //添加一个新的幻灯片
            const slide = pptx.addSlide();
            const htmlContent = `
                <h1>${article.title}</h1>
                <p><strong>状态</strong> ${article.state}</p>
                <p><strong>分类</strong> ${article.categories.map(item => item.name).join(',')}</p>
                <p><strong>标题</strong> ${article.tags.map(item => item.name).join(',')}</p>
                <div>${article.content}</div>
            `;
            //使用将HTML内容转成PPTX可用的文本项
            const items = html2ppt.htmlToPptxText(htmlContent);
            //将生成的文本项添加到幻灯片中，并且设置其位置和大小
            slide.addText(items,{x:.5,y:.5,w:9.5,h:6,valign:'top'});
        }
        //将生成的PPT文件 以nodebuffer的形式输出
        return await pptx.write({outputType:'nodebuffer'});
    }

}
