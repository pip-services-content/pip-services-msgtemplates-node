import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../data/version1/MessageTemplateStatusV1';
import { IMessageTemplatesPersistence } from '../persistence/IMessageTemplatesPersistence';
import { IMessageTemplatesController } from './IMessageTemplatesController';
import { MessageTemplatesCommandSet } from './MessageTemplatesCommandSet';

export class MessageTemplatesController implements  IConfigurable, IReferenceable, ICommandable, IMessageTemplatesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-msgtemplates:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(MessageTemplatesController._defaultConfig);
    private _persistence: IMessageTemplatesPersistence;
    private _commandSet: MessageTemplatesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IMessageTemplatesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new MessageTemplatesCommandSet(this);
        return this._commandSet;
    }
    
    public getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getTemplateById(correlationId: string, id: string, 
        callback: (err: any, template: MessageTemplateV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public getTemplateByIdOrName(correlationId: string, idOrName: string, 
        callback: (err: any, template: MessageTemplateV1) => void): void {
        this._persistence.getOneByIdOrName(correlationId, idOrName, callback);
    }

    public createTemplate(correlationId: string, template: MessageTemplateV1, 
        callback: (err: any, template: MessageTemplateV1) => void): void {

        template.id = template.id || IdGenerator.nextLong();
        template.status = template.status || MessageTemplateStatusV1.New;

        this._persistence.create(correlationId, template, callback);
    }

    public updateTemplate(correlationId: string, template: MessageTemplateV1, 
        callback: (err: any, template: MessageTemplateV1) => void): void {

        template.status = template.status || MessageTemplateStatusV1.New;

        this._persistence.update(correlationId, template, callback);
    }

    public deleteTemplateById(correlationId: string, id: string,
        callback: (err: any, template: MessageTemplateV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
