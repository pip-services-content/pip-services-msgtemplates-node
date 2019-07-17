// package: msgtemplates_v1
// file: msgtemplates_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class MessageTemplate extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getFrom(): string;
  setFrom(value: string): void;

  getSubjectMap(): jspb.Map<string, string>;
  clearSubjectMap(): void;
  getTextMap(): jspb.Map<string, string>;
  clearTextMap(): void;
  getHtmlMap(): jspb.Map<string, string>;
  clearHtmlMap(): void;
  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplate): MessageTemplate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplate;
  static deserializeBinaryFromReader(message: MessageTemplate, reader: jspb.BinaryReader): MessageTemplate;
}

export namespace MessageTemplate {
  export type AsObject = {
    id: string,
    name: string,
    from: string,
    subjectMap: Array<[string, string]>,
    textMap: Array<[string, string]>,
    htmlMap: Array<[string, string]>,
    status: string,
  }
}

export class MessageTemplatePage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<MessageTemplate>;
  setDataList(value: Array<MessageTemplate>): void;
  addData(value?: MessageTemplate, index?: number): MessageTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplatePage.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplatePage): MessageTemplatePage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplatePage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplatePage;
  static deserializeBinaryFromReader(message: MessageTemplatePage, reader: jspb.BinaryReader): MessageTemplatePage;
}

export namespace MessageTemplatePage {
  export type AsObject = {
    total: number,
    dataList: Array<MessageTemplate.AsObject>,
  }
}

export class MessageTemplatePageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplatePageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplatePageRequest): MessageTemplatePageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplatePageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplatePageRequest;
  static deserializeBinaryFromReader(message: MessageTemplatePageRequest, reader: jspb.BinaryReader): MessageTemplatePageRequest;
}

export namespace MessageTemplatePageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class MessageTemplatePageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): MessageTemplatePage | undefined;
  setPage(value?: MessageTemplatePage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplatePageReply.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplatePageReply): MessageTemplatePageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplatePageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplatePageReply;
  static deserializeBinaryFromReader(message: MessageTemplatePageReply, reader: jspb.BinaryReader): MessageTemplatePageReply;
}

export namespace MessageTemplatePageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: MessageTemplatePage.AsObject,
  }
}

export class MessageTemplateIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getTemplateId(): string;
  setTemplateId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplateIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplateIdRequest): MessageTemplateIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplateIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplateIdRequest;
  static deserializeBinaryFromReader(message: MessageTemplateIdRequest, reader: jspb.BinaryReader): MessageTemplateIdRequest;
}

export namespace MessageTemplateIdRequest {
  export type AsObject = {
    correlationId: string,
    templateId: string,
  }
}

export class MessageTemplateNameRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplateNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplateNameRequest): MessageTemplateNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplateNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplateNameRequest;
  static deserializeBinaryFromReader(message: MessageTemplateNameRequest, reader: jspb.BinaryReader): MessageTemplateNameRequest;
}

export namespace MessageTemplateNameRequest {
  export type AsObject = {
    correlationId: string,
    name: string,
  }
}

export class MessageTemplateObjectRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasTemplate(): boolean;
  clearTemplate(): void;
  getTemplate(): MessageTemplate | undefined;
  setTemplate(value?: MessageTemplate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplateObjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplateObjectRequest): MessageTemplateObjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplateObjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplateObjectRequest;
  static deserializeBinaryFromReader(message: MessageTemplateObjectRequest, reader: jspb.BinaryReader): MessageTemplateObjectRequest;
}

export namespace MessageTemplateObjectRequest {
  export type AsObject = {
    correlationId: string,
    template?: MessageTemplate.AsObject,
  }
}

export class MessageTemplateObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasTemplate(): boolean;
  clearTemplate(): void;
  getTemplate(): MessageTemplate | undefined;
  setTemplate(value?: MessageTemplate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTemplateObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTemplateObjectReply): MessageTemplateObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTemplateObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTemplateObjectReply;
  static deserializeBinaryFromReader(message: MessageTemplateObjectReply, reader: jspb.BinaryReader): MessageTemplateObjectReply;
}

export namespace MessageTemplateObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    template?: MessageTemplate.AsObject,
  }
}

