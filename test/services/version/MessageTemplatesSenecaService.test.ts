let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { MessageTemplateV1 } from '../../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../../src/logic/MessageTemplatesController';
import { MessageTemplatesSenecaServiceV1 } from '../../../src/services/version1/MessageTemplatesSenecaServiceV1';

let TEMPLATE1: MessageTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    subject: { en: 'Text 1' },
    text: { en: 'Text 1' },
    html: { en: 'Text 1' },
    status: MessageTemplateStatusV1.Completed
};
let TEMPLATE2: MessageTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    subject: { en: 'Text 2' },
    text: { en: 'Text 2' },
    html: { en: 'Text 2' },
    status: MessageTemplateStatusV1.Completed
};

suite('MessageTemplatesSenecaServiceV1', ()=> {        
    let seneca: any;
    let service: MessageTemplatesSenecaServiceV1;
    let persistence: MessageTemplatesMemoryPersistence;
    let controller: MessageTemplatesController;

    suiteSetup((done) => {
        persistence = new MessageTemplatesMemoryPersistence();
        controller = new MessageTemplatesController();

        service = new MessageTemplatesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgtemplates', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var template1, template2;

        async.series([
        // Create one template
            (callback) => {
                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'create_template',
                        template: TEMPLATE1
                    },
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE1.name);
                        assert.equal(template.text.en, TEMPLATE1.text.en);

                        template1 = template;

                        callback();
                    }
                );
            },
        // Create another template
            (callback) => {
                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'create_template',
                        template: TEMPLATE2
                    },
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE2.name);
                        assert.equal(template.text.en, TEMPLATE2.text.en);

                        template2 = template;

                        callback();
                    }
                );
            },
        // Get all templates
            (callback) => {
                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'get_templates' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the template
            (callback) => {
                template1.text = { en: 'Updated Content 1' };

                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'update_template',
                        template: template1
                    },
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.text.en, 'Updated Content 1');
                        assert.equal(template.name, TEMPLATE1.name);

                        template1 = template;

                        callback();
                    }
                );
            },
        // Delete template
            (callback) => {
                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'delete_template_by_id',
                        template_id: template1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                seneca.act(
                    {
                        role: 'message_templates',
                        cmd: 'get_template_by_id',
                        template_id: template1.id
                    },
                    (err, template) => {
                        assert.isNull(err);

                        assert.isNull(template || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});