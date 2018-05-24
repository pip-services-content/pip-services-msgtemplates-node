import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { MessageTemplatesServiceFactory } from '../build/MessageTemplatesServiceFactory';

export class MessageTemplatesProcess extends ProcessContainer {

    public constructor() {
        super("message_templates", "Message templates microservice");
        this._factories.add(new MessageTemplatesServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
