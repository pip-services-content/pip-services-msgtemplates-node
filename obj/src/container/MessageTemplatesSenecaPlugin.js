"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const MessageTemplatesMemoryPersistence_1 = require("../persistence/MessageTemplatesMemoryPersistence");
const MessageTemplatesFilePersistence_1 = require("../persistence/MessageTemplatesFilePersistence");
const MessageTemplatesMongoDbPersistence_1 = require("../persistence/MessageTemplatesMongoDbPersistence");
const MessageTemplatesController_1 = require("../logic/MessageTemplatesController");
const MessageTemplatesSenecaServiceV1_1 = require("../services/version1/MessageTemplatesSenecaServiceV1");
class MessageTemplatesSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-msgtemplates', seneca, MessageTemplatesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new MessageTemplatesController_1.MessageTemplatesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new MessageTemplatesMongoDbPersistence_1.MessageTemplatesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new MessageTemplatesFilePersistence_1.MessageTemplatesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new MessageTemplatesMemoryPersistence_1.MessageTemplatesMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        let service = new MessageTemplatesSenecaServiceV1_1.MessageTemplatesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-msgtemplates', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-msgtemplates', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.MessageTemplatesSenecaPlugin = MessageTemplatesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new MessageTemplatesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=MessageTemplatesSenecaPlugin.js.map