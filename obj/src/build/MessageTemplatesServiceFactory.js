"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const MessageTemplatesMongoDbPersistence_1 = require("../persistence/MessageTemplatesMongoDbPersistence");
const MessageTemplatesFilePersistence_1 = require("../persistence/MessageTemplatesFilePersistence");
const MessageTemplatesMemoryPersistence_1 = require("../persistence/MessageTemplatesMemoryPersistence");
const MessageTemplatesController_1 = require("../logic/MessageTemplatesController");
const MessageTemplatesHttpServiceV1_1 = require("../services/version1/MessageTemplatesHttpServiceV1");
class MessageTemplatesServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(MessageTemplatesServiceFactory.MemoryPersistenceDescriptor, MessageTemplatesMemoryPersistence_1.MessageTemplatesMemoryPersistence);
        this.registerAsType(MessageTemplatesServiceFactory.FilePersistenceDescriptor, MessageTemplatesFilePersistence_1.MessageTemplatesFilePersistence);
        this.registerAsType(MessageTemplatesServiceFactory.MongoDbPersistenceDescriptor, MessageTemplatesMongoDbPersistence_1.MessageTemplatesMongoDbPersistence);
        this.registerAsType(MessageTemplatesServiceFactory.ControllerDescriptor, MessageTemplatesController_1.MessageTemplatesController);
        this.registerAsType(MessageTemplatesServiceFactory.HttpServiceDescriptor, MessageTemplatesHttpServiceV1_1.MessageTemplatesHttpServiceV1);
    }
}
MessageTemplatesServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "factory", "default", "default", "1.0");
MessageTemplatesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "persistence", "memory", "*", "1.0");
MessageTemplatesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "persistence", "file", "*", "1.0");
MessageTemplatesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "persistence", "mongodb", "*", "1.0");
MessageTemplatesServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "controller", "default", "*", "1.0");
MessageTemplatesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-msgtemplates", "service", "http", "*", "1.0");
exports.MessageTemplatesServiceFactory = MessageTemplatesServiceFactory;
//# sourceMappingURL=MessageTemplatesServiceFactory.js.map