export enum QrCodeStatusEnum{
    PENDING = 'pending',//刚开始创建的时候
    SCANNED = 'scanned',//用户已经使用APP扫码二维码
    AUTHORIZED = 'authorized',//用户已经授权登录
    DENIED = 'denied',//用户不授权
    EXPIRED = 'expired',//二维码已过期
    ERROR = 'error',//流程出来未知的错误
}