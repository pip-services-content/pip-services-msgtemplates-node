let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor, MultiString } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { MessageTemplateV1 } from '../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../src/logic/MessageTemplatesController';
import { MessageTemplatesLambdaFunction } from '../../src/container/MessageTemplatesLambdaFunction';

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

suite('MessageTemplatesLambdaFunction', ()=> {
    let lambda: MessageTemplatesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-msgtemplates:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-msgtemplates:controller:default:default:1.0'
        );

        lambda = new MessageTemplatesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var template1, template2;

        async.series([
        // Create one template
            (callback) => {
                lambda.act(
                    {
                        role: 'message_templates',
                        cmd: 'create_template',
                        template: TEMPLATE1
                    },
                    (err, template) => {
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
                lambda.act(
                    {
                        role: 'message_templates',
                        cmd: 'create_template',
                        template: TEMPLATE2
                    },
                    (err, template) => {
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
                lambda.act(
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

                lambda.act(
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
                lambda.act(
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
                lambda.act(
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