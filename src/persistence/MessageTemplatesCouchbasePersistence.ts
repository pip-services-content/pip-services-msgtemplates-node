let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { IMessageTemplatesPersistence } from './IMessageTemplatesPersistence';

export class MessageTemplatesCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<MessageTemplateV1, string> 
    implements IMessageTemplatesPersistence {

    constructor() {
        super('users', 'msgtemplates');
    }

    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let filters = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchFilters = [];
            searchFilters.push("name LIKE '%" + search + "%'");
            searchFilters.push("status LIKE '%" + search + "%'");
            searchFilters.push("subject.en LIKE '%" + search + "%'");
            searchFilters.push("subject.sp LIKE '%" + search + "%'");
            searchFilters.push("subject.fr LIKE '%" + search + "%'");
            searchFilters.push("subject.de LIKE '%" + search + "%'");
            searchFilters.push("subject.ru LIKE '%" + search + "%'");
            searchFilters.push("text.en LIKE '%" + search + "%'");
            searchFilters.push("text.sp LIKE '%" + search + "%'");
            searchFilters.push("text.fr LIKE '%" + search + "%'");
            searchFilters.push("text.de LIKE '%" + search + "%'");
            searchFilters.push("text.ru LIKE '%" + search + "%'");
            searchFilters.push("html.en LIKE '%" + search + "%'");
            searchFilters.push("html.sp LIKE '%" + search + "%'");
            searchFilters.push("html.fr LIKE '%" + search + "%'");
            searchFilters.push("html.de LIKE '%" + search + "%'");
            searchFilters.push("html.ru LIKE '%" + search + "%'");
            filters.push("(" + searchFilters.join(" OR ") + ")");
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'");

        let status = filter.getAsNullableString('status');
        if (status != null)
            filters.push("status='" + status + "'");

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<MessageTemplateV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByIdOrName(correlationId: string, idOrName: string,
        callback: (err: any, item: MessageTemplateV1) => void): void {

        let loginFilter = "id='" + idOrName +  "' OR name='" + idOrName + "'";
        super.getListByFilter(correlationId, loginFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            let item = items && items.length > 0 ? items[0] : null;

            if (item != null)
                this._logger.trace(correlationId, "Retrieved item by %s", idOrName);
            else
                this._logger.trace(correlationId, "Cannot find item by %s", idOrName);

            callback(null, item);
        });
    }

}
