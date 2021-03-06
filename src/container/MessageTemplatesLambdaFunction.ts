import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { MessageTemplatesServiceFactory } from '../build/MessageTemplatesServiceFactory';

export class MessageTemplatesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("message_templates", "Message templates function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new MessageTemplatesServiceFactory());
    }
}

export const handler = new MessageTemplatesLambdaFunction().getHandler();