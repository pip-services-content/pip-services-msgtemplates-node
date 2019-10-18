"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class MessageTemplateV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('from', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('subject', pip_services3_commons_node_2.TypeCode.Map);
        this.withRequiredProperty('text', pip_services3_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('html', pip_services3_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('status', pip_services3_commons_node_2.TypeCode.String);
    }
}
exports.MessageTemplateV1Schema = MessageTemplateV1Schema;
//# sourceMappingURL=MessageTemplateV1Schema.js.map