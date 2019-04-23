import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { MessageTemplatesMongoDbPersistence } from '../persistence/MessageTemplatesMongoDbPersistence';
import { MessageTemplatesFilePersistence } from '../persistence/MessageTemplatesFilePersistence';
import { MessageTemplatesMemoryPersistence } from '../persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../logic/MessageTemplatesController';
import { MessageTemplatesHttpServiceV1 } from '../services/version1/MessageTemplatesHttpServiceV1';

export class MessageTemplatesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-msgtemplates", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-msgtemplates", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-msgtemplates", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-msgtemplates", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-msgtemplates", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-msgtemplates", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MessageTemplatesServiceFactory.MemoryPersistenceDescriptor, MessageTemplatesMemoryPersistence);
		this.registerAsType(MessageTemplatesServiceFactory.FilePersistenceDescriptor, MessageTemplatesFilePersistence);
		this.registerAsType(MessageTemplatesServiceFactory.MongoDbPersistenceDescriptor, MessageTemplatesMongoDbPersistence);
		this.registerAsType(MessageTemplatesServiceFactory.ControllerDescriptor, MessageTemplatesController);
		this.registerAsType(MessageTemplatesServiceFactory.HttpServiceDescriptor, MessageTemplatesHttpServiceV1);
	}
	
}
