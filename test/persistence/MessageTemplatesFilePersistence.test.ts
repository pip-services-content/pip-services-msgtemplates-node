import { ConfigParams } from 'pip-services3-commons-node';

import { MessageTemplatesFilePersistence } from '../../src/persistence/MessageTemplatesFilePersistence';
import { MessageTemplatesPersistenceFixture } from './MessageTemplatesPersistenceFixture';

suite('MessageTemplatesFilePersistence', ()=> {
    let persistence: MessageTemplatesFilePersistence;
    let fixture: MessageTemplatesPersistenceFixture;
    
    setup((done) => {
        persistence = new MessageTemplatesFilePersistence('./data/message_templates.test.json');

        fixture = new MessageTemplatesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});