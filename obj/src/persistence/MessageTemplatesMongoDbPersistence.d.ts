import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { IMessageTemplatesPersistence } from './IMessageTemplatesPersistence';
export declare class MessageTemplatesMongoDbPersistence extends IdentifiableMongoDbPersistence<MessageTemplateV1, string> implements IMessageTemplatesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void;
    getOneByIdOrName(correlationId: string, idOrName: any, callback: (err: any, item: MessageTemplateV1) => void): void;
}
