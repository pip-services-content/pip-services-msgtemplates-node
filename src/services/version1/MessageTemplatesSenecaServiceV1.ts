import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class MessageTemplatesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('message_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}