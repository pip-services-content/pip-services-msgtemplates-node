import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class MessageTemplatesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/message_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}