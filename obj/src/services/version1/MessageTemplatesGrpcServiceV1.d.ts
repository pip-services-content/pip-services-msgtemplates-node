import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class MessageTemplatesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getTemplates(call, callback);
    private getTemplateById(call, callback);
    private getTemplateByIdOrName(call, callback);
    private createTemplate(call, callback);
    private updateTemplate(call, callback);
    private deleteTemplateById(call, callback);
    register(): void;
}
