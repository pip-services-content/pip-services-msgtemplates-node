"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/msgtemplates_v1_grpc_pb');
let messages = require('../../../../src/protos/msgtemplates_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const MessageTemplatesGrpcConverterV1_1 = require("./MessageTemplatesGrpcConverterV1");
class MessageTemplatesGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.MessageTemplatesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getTemplates(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getTemplates(correlationId, filter, paging, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let page = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplatePage(result) : null;
            let response = new messages.MessageTemplatePageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getTemplateById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();
        this._controller.getTemplateById(correlationId, templateId, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let template = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;
            let response = new messages.MessageTemplateObjectReply();
            response.setError(error);
            response.setTemplate(template);
            callback(err, response);
        });
    }
    getTemplateByIdOrName(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let idOrName = call.request.getName();
        this._controller.getTemplateByIdOrName(correlationId, idOrName, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let template = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;
            let response = new messages.MessageTemplateObjectReply();
            response.setError(error);
            if (result)
                response.setTemplate(template);
            callback(err, response);
        });
    }
    createTemplate(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());
        this._controller.createTemplate(correlationId, template, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let template = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;
            let response = new messages.MessageTemplateObjectReply();
            response.setError(error);
            if (result)
                response.setTemplate(template);
            callback(err, response);
        });
    }
    updateTemplate(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());
        this._controller.updateTemplate(correlationId, template, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let template = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;
            let response = new messages.MessageTemplateObjectReply();
            response.setError(error);
            if (result)
                response.setTemplate(template);
            callback(err, response);
        });
    }
    deleteTemplateById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();
        this._controller.deleteTemplateById(correlationId, templateId, (err, result) => {
            let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
            let template = err == null ? MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result) : null;
            let response = new messages.MessageTemplateObjectReply();
            response.setError(error);
            if (result)
                response.setTemplate(template);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_templates', null, this.getTemplates);
        this.registerMethod('get_template_by_id', null, this.getTemplateById);
        this.registerMethod('get_template_by_id_or_name', null, this.getTemplateByIdOrName);
        this.registerMethod('create_template', null, this.createTemplate);
        this.registerMethod('update_template', null, this.updateTemplate);
        this.registerMethod('delete_template_by_id', null, this.deleteTemplateById);
    }
}
exports.MessageTemplatesGrpcServiceV1 = MessageTemplatesGrpcServiceV1;
//# sourceMappingURL=MessageTemplatesGrpcServiceV1.js.map