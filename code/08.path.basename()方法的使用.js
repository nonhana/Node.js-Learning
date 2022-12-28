const path = require('path');

// 定义文件的存放路径
const fpath = '/a/b/c/d/index.html'

const fullName = path.basename(fpath);
console.log("文件完整名", fullName)
const nameWithoutExt = path.basename(fpath, '.html');
console.log("文件名", nameWithoutExt)