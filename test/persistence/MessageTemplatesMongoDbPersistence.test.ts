import { YamlConfigReader } from 'pip-services-commons-node';

import { MessageTemplatesMongoDbPersistence } from '../../src/persistence/MessageTemplatesMongoDbPersistence';
import { MessageTemplatesPersistenceFixture } from './MessageTemplatesPersistenceFixture';

suite('MessageTemplatesMongoDbPersistence', ()=> {
    let persistence: MessageTemplatesMongoDbPersistence;
    let fixture: MessageTemplatesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new MessageTemplatesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new MessageTemplatesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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