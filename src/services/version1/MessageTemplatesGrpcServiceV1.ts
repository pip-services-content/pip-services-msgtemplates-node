let _ = require('lodash');
let services = require('../../../../src/protos/msgtemplates_v1_grpc_pb');
let messages = require('../../../../src/protos/msgtemplates_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { MessageTemplateV1 } from '../../data/version1/MessageTemplateV1';
import { MessageTemplateV1Schema } from '../../data/version1/MessageTemplateV1Schema';
import { IMessageTemplatesController } from '../../logic/IMessageTemplatesController';
import { MessageTemplatesGrpcConverterV1 } from './MessageTemplatesGrpcConverterV1';

export class MessageTemplatesGrpcServiceV1 extends GrpcService {
    private _controller: IMessageTemplatesController;
	
    public constructor() {
        super(services.MessageTemplatesService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-msgtemplates", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IMessageTemplatesController>('controller');
    }
    
    private getTemplates(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        MessageTemplatesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = MessageTemplatesGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getTemplates(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let page = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplatePage(result) : null;

                let response = new messages.MessageTemplatePageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getTemplateById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();

        this._controller.getTemplateById(
            correlationId,
            templateId,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let template = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;

                let response = new messages.MessageTemplateObjectReply();
                response.setError(error);
                response.setTemplate(template);

                callback(err, response);
            }
        );
    }

    private getTemplateByIdOrName(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let idOrName = call.request.getName();

        this._controller.getTemplateByIdOrName(
            correlationId,
            idOrName,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let template = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;

                let response = new messages.MessageTemplateObjectReply();
                response.setError(error);
                if (result)
                    response.setTemplate(template);

                callback(err, response);
            }
        );
    }
    
    private createTemplate(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());

        this._controller.createTemplate(
            correlationId,
            template,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let template = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;

                let response = new messages.MessageTemplateObjectReply();
                response.setError(error);
                if (result)
                    response.setTemplate(template);

                callback(err, response);
            }
        );
    }

    private updateTemplate(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());

        this._controller.updateTemplate(
            correlationId,
            template,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let template = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;

                let response = new messages.MessageTemplateObjectReply();
                response.setError(error);
                if (result)
                    response.setTemplate(template);

                callback(err, response);
            }
        );
    }

    private deleteTemplateById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();

        this._controller.deleteTemplateById(
            correlationId,
            templateId,
            (err, result) => {
                let error = MessageTemplatesGrpcConverterV1.fromError(err);
                let template = err == null ? MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;

                let response = new messages.MessageTemplateObjectReply();
                response.setError(error);
                if (result)
                    response.setTemplate(template);

                callback(err, response);
            }
        );
    }    
        
    public register() {
        this.registerMethod(
            'get_templates', 
            null,
            this.getTemplates
        );

        this.registerMethod(
            'get_template_by_id', 
            null,
            this.getTemplateById
        );

        this.registerMethod(
            'get_template_by_id_or_name', 
            null,
            this.getTemplateByIdOrName
        );

        this.registerMethod(
            'create_template', 
            null,
            this.createTemplate
        );

        this.registerMethod(
            'update_template', 
            null,
            this.updateTemplate
        );

        this.registerMethod(
            'delete_template_by_id',
            null, 
            this.deleteTemplateById
        );
    }
}
