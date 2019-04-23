import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class MessageTemplatesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/message_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}