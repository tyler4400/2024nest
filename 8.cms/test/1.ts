import * as bcrypt from 'bcrypt'
(async function () {
    const salt = await bcrypt.genSalt();
    console.log(salt)
    //使用生成的盐值对密码进行哈希，并返回哈希的结果
    const hash = await bcrypt.hash('123', salt);
    console.log(hash)
})()
/**
 * $2b$10$52dXy5k/FHRn5vT3WyS5t.
$2b$10$52dXy5k/FHRn5vT3WyS5t.yrDgPYTJk5Jtfp.qaOHd9gWEfFLyqUC
 */