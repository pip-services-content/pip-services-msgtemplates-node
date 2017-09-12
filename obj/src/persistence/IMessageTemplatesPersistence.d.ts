import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
export interface IMessageTemplatesPersistence extends IGetter<MessageTemplateV1, string>, IWriter<MessageTemplateV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: MessageTemplateV1) => void): void;
    getOneByIdOrName(correlationId: string, idOrName: string, callback: (err: any, item: MessageTemplateV1) => void): void;
    create(correlationId: string, item: MessageTemplateV1, callback: (err: any, item: MessageTemplateV1) => void): void;
    update(correlationId: string, item: MessageTemplateV1, callback: (err: any, item: MessageTemplateV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: MessageTemplateV1) => void): void;
}
