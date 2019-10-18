import { CommandSet } from 'pip-services3-commons-node';
import { IMessageTemplatesController } from './IMessageTemplatesController';
export declare class MessageTemplatesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IMessageTemplatesController);
    private makeGetMessageTemplatesCommand;
    private makeGetMessageTemplateByIdCommand;
    private makeGetMessageTemplateByIdOrNameCommand;
    private makeCreateMessageTemplateCommand;
    private makeUpdateMessageTemplateCommand;
    private makeDeleteMessageTemplateByIdCommand;
}
