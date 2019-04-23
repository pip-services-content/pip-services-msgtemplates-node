import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { MessageTemplateV1Schema } from '../data/version1/MessageTemplateV1Schema';
import { IMessageTemplatesController } from './IMessageTemplatesController';

export class MessageTemplatesCommandSet extends CommandSet {
    private _logic: IMessageTemplatesController;

    constructor(logic: IMessageTemplatesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetMessageTemplatesCommand());
		this.addCommand(this.makeGetMessageTemplateByIdCommand());
		this.addCommand(this.makeGetMessageTemplateByIdOrNameCommand());
		this.addCommand(this.makeCreateMessageTemplateCommand());
		this.addCommand(this.makeUpdateMessageTemplateCommand());
		this.addCommand(this.makeDeleteMessageTemplateByIdCommand());
    }

	private makeGetMessageTemplatesCommand(): ICommand {
		return new Command(
			"get_templates",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getTemplates(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetMessageTemplateByIdCommand(): ICommand {
		return new Command(
			"get_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsString("template_id");
                this._logic.getTemplateById(correlationId, id, callback);
            }
		);
	}

	private makeGetMessageTemplateByIdOrNameCommand(): ICommand {
		return new Command(
			"get_template_by_id_or_name",
			new ObjectSchema(true)
				.withRequiredProperty('id_or_name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let idOrName = args.getAsString("id_or_name");
                this._logic.getTemplateByIdOrName(correlationId, idOrName, callback);
            }
		);
	}

	private makeCreateMessageTemplateCommand(): ICommand {
		return new Command(
			"create_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new MessageTemplateV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let template = args.get("template");
                this._logic.createTemplate(correlationId, template, callback);
            }
		);
	}

	private makeUpdateMessageTemplateCommand(): ICommand {
		return new Command(
			"update_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new MessageTemplateV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let template = args.get("template");
                this._logic.updateTemplate(correlationId, template, callback);
            }
		);
	}
	
	private makeDeleteMessageTemplateByIdCommand(): ICommand {
		return new Command(
			"delete_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("template_id");
                this._logic.deleteTemplateById(correlationId, id, callback);
			}
		);
	}

}