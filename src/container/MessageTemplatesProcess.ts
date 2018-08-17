import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { MessageTemplatesServiceFactory } from '../build/MessageTemplatesServiceFactory';

export class MessageTemplatesProcess extends ProcessContainer {

    public constructor() {
        super("message_templates", "Message templates microservice");
        this._factories.add(new MessageTemplatesServiceFactory);
    }

}
