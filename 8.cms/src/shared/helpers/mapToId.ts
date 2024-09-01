
export function mapToId(values){
    return JSON.stringify(values?.map(item=>item.id));
}