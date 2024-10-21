import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {

    getSharedMessage() {
        return 'Shared Message';
    }
}
