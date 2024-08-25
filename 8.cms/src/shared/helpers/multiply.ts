
export function multiply(a,b){
    const numA = Number(a);
    const numB = Number(b);
    if(isNaN(numA) || isNaN(numB)){
        return 0;
    }
    return numA*numB;
}