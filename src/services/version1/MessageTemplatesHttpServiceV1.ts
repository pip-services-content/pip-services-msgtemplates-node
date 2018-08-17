import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class MessageTemplatesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/message_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}