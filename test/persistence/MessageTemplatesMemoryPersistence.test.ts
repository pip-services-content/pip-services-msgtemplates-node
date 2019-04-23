import { ConfigParams } from 'pip-services3-commons-node';

import { MessageTemplatesMemoryPersistence } from '../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesPersistenceFixture } from './MessageTemplatesPersistenceFixture';

suite('MessageTemplatesMemoryPersistence', ()=> {
    let persistence: MessageTemplatesMemoryPersistence;
    let fixture: MessageTemplatesPersistenceFixture;
    
    setup((done) => {
        persistence = new MessageTemplatesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new MessageTemplatesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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