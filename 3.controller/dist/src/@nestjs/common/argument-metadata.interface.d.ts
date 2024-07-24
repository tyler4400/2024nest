export interface ArgumentMetadata {
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: any;
    data?: string;
}
