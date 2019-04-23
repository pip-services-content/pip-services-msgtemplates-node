import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';

export interface IMessageTemplatesController {
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void;

    getTemplateById(correlationId: string, id: string, 
        callback: (err: any, template: MessageTemplateV1) => void): void;

    getTemplateByIdOrName(correlationId: string, idOrName: string, 
        callback: (err: any, template: MessageTemplateV1) => void): void;

    createTemplate(correlationId: string, template: MessageTemplateV1, 
        callback: (err: any, template: MessageTemplateV1) => void): void;

    updateTemplate(correlationId: string, template: MessageTemplateV1, 
        callback: (err: any, template: MessageTemplateV1) => void): void;

    deleteTemplateById(correlationId: string, id: string,
        callback: (err: any, template: MessageTemplateV1) => void): void;
}
