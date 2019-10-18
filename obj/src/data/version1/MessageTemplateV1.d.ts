import { IStringIdentifiable } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';
export declare class MessageTemplateV1 implements IStringIdentifiable {
    id: string;
    name: string;
    from: string;
    subject: MultiString;
    text: MultiString;
    html: MultiString;
    status: string;
}
