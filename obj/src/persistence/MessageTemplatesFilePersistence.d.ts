import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { MessageTemplatesMemoryPersistence } from './MessageTemplatesMemoryPersistence';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
export declare class MessageTemplatesFilePersistence extends MessageTemplatesMemoryPersistence {
    protected _persister: JsonFilePersister<MessageTemplateV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
