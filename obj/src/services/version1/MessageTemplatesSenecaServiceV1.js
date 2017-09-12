"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class MessageTemplatesSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('message_templates');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageTemplatesSenecaServiceV1 = MessageTemplatesSenecaServiceV1;
//# sourceMappingURL=MessageTemplatesSenecaServiceV1.js.map