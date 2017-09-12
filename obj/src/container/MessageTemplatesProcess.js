"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const MessageTemplatesServiceFactory_1 = require("../build/MessageTemplatesServiceFactory");
class MessageTemplatesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("message_templates", "Message templates microservice");
        this._factories.add(new MessageTemplatesServiceFactory_1.MessageTemplatesServiceFactory);
    }
}
exports.MessageTemplatesProcess = MessageTemplatesProcess;
//# sourceMappingURL=MessageTemplatesProcess.js.map