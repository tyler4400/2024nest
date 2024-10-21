const fs = require('fs');
const path = require('path');

// 递归获取目录中的所有文件，忽略指定目录
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        // 忽略 node_modules 目录
        if (fs.statSync(filePath).isDirectory() && file !== 'node_modules') {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else if (fs.statSync(filePath).isFile()) {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

// 计算文件的行数
function countLines(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.split('\n').length;
}

// 计算项目中的代码总行数和文件数量
function getTotalLinesAndFileCount(dirPath) {
    let totalLines = 0;
    let fileCount = 0;
    const allFiles = getAllFiles(dirPath);

    allFiles.forEach((file) => {
        if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.hbs')) {
            totalLines += countLines(file);
            fileCount += 1; // 统计文件数量
        }
    });

    return { totalLines, fileCount };
}

// 获取当前项目的路径
const projectPath = path.resolve(__dirname);
const { totalLines, fileCount } = getTotalLinesAndFileCount(projectPath);
console.log(`Total lines of code: ${totalLines}`);
console.log(`Total number of files: ${fileCount}`);
