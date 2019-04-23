let _ = require('lodash');

import { IStringIdentifiable } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';
import { MessageTemplateStatusV1 } from './MessageTemplateStatusV1';

export class MessageTemplateV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public from: string;
    public subject: MultiString;
    public text: MultiString;
    public html: MultiString;
    public status: string;
}