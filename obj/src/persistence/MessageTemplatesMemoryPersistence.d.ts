import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { IMessageTemplatesPersistence } from './IMessageTemplatesPersistence';
export declare class MessageTemplatesMemoryPersistence extends IdentifiableMemoryPersistence<MessageTemplateV1, string> implements IMessageTemplatesPersistence {
    constructor();
    private matchString(value, search);
    private matchMultilanguageString(value, search);
    private matchSearch(item, search);
    private contains(array1, array2);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void;
    getOneByIdOrName(correlationId: string, idOrName: string, callback: (err: any, item: MessageTemplateV1) => void): void;
}
