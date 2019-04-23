"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const MessageTemplatesServiceFactory_1 = require("../build/MessageTemplatesServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class MessageTemplatesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("message_templates", "Message templates microservice");
        this._factories.add(new MessageTemplatesServiceFactory_1.MessageTemplatesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.MessageTemplatesProcess = MessageTemplatesProcess;
//# sourceMappingURL=MessageTemplatesProcess.js.map