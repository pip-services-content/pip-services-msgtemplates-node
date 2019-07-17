let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/msgtemplates_v1_grpc_pb');
let messages = require('../../../../src/protos/msgtemplates_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { MessageTemplateV1 } from '../../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../../src/logic/MessageTemplatesController';
import { MessageTemplatesGrpcServiceV1 } from '../../../src/services/version1/MessageTemplatesGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3002
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

suite('MessageTemplatesGrpcServiceV1', ()=> {
    let service: MessageTemplatesGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new MessageTemplatesMemoryPersistence();
        let controller = new MessageTemplatesController();

        service = new MessageTemplatesGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgtemplates', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        //service.close(null, done);
        done();
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/msgtemplates_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).msgtemplates_v1.MessageTemplates;

        client = new clientProto('localhost:3002', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        let template1, template2;

        async.series([
        // Create one template
            (callback) => {
                client.create_template(
                    {
                        template: TEMPLATE1
                    },
                    (err, response) => {
                        err = err || response.error;
                        let template = response ? response.template : null;

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
                client.create_template(
                    {
                        template: TEMPLATE2
                    },
                    (err, response) => {
                        err = err || response.error;
                        let template = response ? response.template : null;

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
                client.get_templates(
                    {},
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

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

                client.update_template(
                    {
                        template: template1
                    },
                    (err, response) => {
                        err = err || response.error;
                        let template = response ? response.template : null;

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
                client.delete_template_by_id(
                    {
                        template_id: template1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let template = response ? response.template : null;

                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                client.get_template_by_id(
                    {
                        template_id: template1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let template = response ? response.template : null;

                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });

});
