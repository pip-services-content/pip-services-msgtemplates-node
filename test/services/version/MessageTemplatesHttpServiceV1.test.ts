let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams, MultiString } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { MessageTemplateV1 } from '../../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../../src/logic/MessageTemplatesController';
import { MessageTemplatesHttpServiceV1 } from '../../../src/services/version1/MessageTemplatesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TEMPLATE1: MessageTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    subject: new MultiString({ en: 'Text 1' }),
    text: new MultiString({ en: 'Text 1' }),
    html: new MultiString({ en: 'Text 1' }),
    status: MessageTemplateStatusV1.Completed
};
let TEMPLATE2: MessageTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    subject: new MultiString({ en: 'Text 2' }),
    text: new MultiString({ en: 'Text 2' }),
    html: new MultiString({ en: 'Text 2' }),
    status: MessageTemplateStatusV1.Completed
};

suite('MessageTemplatesHttpServiceV1', ()=> {    
    let service: MessageTemplatesHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new MessageTemplatesMemoryPersistence();
        let controller = new MessageTemplatesController();

        service = new MessageTemplatesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgtemplates', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let template1, template2;

        async.series([
        // Create one template
            (callback) => {
                rest.post('/v1/message_templates/create_template',
                    {
                        template: TEMPLATE1
                    },
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE1.name);
                        assert.equal(template.text.en, TEMPLATE1.text.get('en'));

                        template1 = template;

                        callback();
                    }
                );
            },
        // Create another template
            (callback) => {
                rest.post('/v1/message_templates/create_template', 
                    {
                        template: TEMPLATE2
                    },
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE2.name);
                        assert.equal(template.text.en, TEMPLATE2.text.get('en'));

                        template2 = template;

                        callback();
                    }
                );
            },
        // Get all templates
            (callback) => {
                rest.post('/v1/message_templates/get_templates',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/message_templates/update_template',
                    { 
                        template: template1
                    },
                    (err, req, res, template) => {
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
                rest.post('/v1/message_templates/delete_template_by_id',
                    {
                        template_id: template1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                rest.post('/v1/message_templates/get_template_by_id',
                    {
                        template_id: template1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});