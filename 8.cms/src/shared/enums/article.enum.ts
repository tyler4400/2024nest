export enum ArticleStateEnum{
    DRAFT = 'draft',//草稿
    PENDING = 'pending',//已经提交审核
    PUBLISHED = 'published',//审核通过
    REJECTED = 'rejected',//审核不通过
    WITHDRAWN = 'withdrawn',//审核后撤回
}