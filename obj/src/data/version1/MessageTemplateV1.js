"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const MessageTemplateStatusV1_1 = require("./MessageTemplateStatusV1");
class MessageTemplateV1 {
    constructor(name, subject, text, html, status) {
        this.id = pip_services_commons_node_1.IdGenerator.nextLong();
        this.name = name;
        this.subject = _.isString(subject) ? { en: subject } : subject;
        this.text = _.isString(text) ? { en: text } : text;
        this.html = _.isString(html) ? { en: html } : html;
        this.status = status || MessageTemplateStatusV1_1.MessageTemplateStatusV1.New;
    }
}
exports.MessageTemplateV1 = MessageTemplateV1;
//# sourceMappingURL=MessageTemplateV1.js.map