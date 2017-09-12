"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const MessageTemplatesServiceFactory_1 = require("../build/MessageTemplatesServiceFactory");
class MessageTemplatesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("message_templates", "Message templates function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new MessageTemplatesServiceFactory_1.MessageTemplatesServiceFactory());
    }
}
exports.MessageTemplatesLambdaFunction = MessageTemplatesLambdaFunction;
exports.handler = new MessageTemplatesLambdaFunction().getHandler();
//# sourceMappingURL=MessageTemplatesLambdaFunction.js.map