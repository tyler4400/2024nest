

async function task() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const a = 1
                a.aaa()
                resolve();
            } catch (error) {
                reject(error);
            }
        }, 1000)
    })
}

(async function handler() {
    try {
        await task();
        await 1;
        await 2;
        await task()
    } catch (error) {
        console.log('error',error)
    }
})()