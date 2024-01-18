// import { swipeBtn, swipeItemData } from "src/app/modules/shared/helper/dataModal/shared-interface";
import { fileCompData } from "../core.data.interface";
import { userPermission } from "./user";

export class ResponseData {
    message?: string;
    statusCode?: number;
    result?: any;
  education: any;
}

class ApiFilter {
    keyName?: string;
    value: any;
    operation?: '==' | '>=' | '!=' | '>'
}
export interface formBuilder {
    validator?: Array<formValidator>;
    data?: Array<any>;
    apiTblName?: string;
    apiFunName?: string,
    apiParameter?: any;
    event?: formEvent;
    hidden?: boolean;
    type?: 'text' | 'DATE' | 'AUTOCOMPLETE' | 'CURRENCY' | 'select' | 'status' | 'chips' | 'editor' | 'FILE' | 'TEXTAREA' | 'radio' | 'checkbox' | 'MULTISELECT' | 'INFO' | 'DATETIME',
    fileConfig?: fileCompData,
    apiFilter?: ApiFilter,
    readonly?: boolean;
    colName: string;
    title: string;
    title_case?: 'NONE'; // default title case
    col_size?: string | number;
    className?: string,
    dateRange?: any,
    dateFormat?: string
    appendData?: Array<any>,
    monthNavigator?: boolean, yearNavigator?: boolean
    icon_append?: icon_append
    placeholder?: string,
    selectKeyName?: string,
    selectPrimaryKey?: string
    apiCallDefaultParam?: string | number,
    apiCallDefault?: boolean,
    defaultValue?: any,
    valueKeyName?: string // to set view data
    invisible?: boolean;
    groupStart?: boolean;
    groupEnd?: boolean;
    groupTitle?: string;
    info?: string;
    controlAction?: controlAction;
    dateViewMode?: 'month' | 'year' | 'date';
    autoSearch?: autoSearch,
    slot?:'start'|'end'
}
interface autoSearch {
    avatarPic?: boolean,
    imageUrlsKey?: string
    titleKey?: string
    descriptionKey?: string
    bottomEndKey?: string,
    whereFiled?: tblFilter[],
    selectFieldKeys?: Array<string>
    separatorText?: string // to seperator
}
interface icon_append {
    category: 'APPEND' | 'PREPEND'
    text?: string
    icon?: string
}
export interface controlAction {
    operation: 'ADD' | 'SUBTRACT' | 'MULTIPLE' | 'DIVIDE'
    controls?: Array<string>
    info_text?: string
}
export interface formBuilderData extends dataColum, formBuilder {
}

export interface tableButton {
    name?: string,
    icon?: string,
    title?: string,
    class?: string,
    category?: 'BUTTON' | 'TEXT',
    type: tableAction,
    permission?: userPermission,
    condition?: tbl_condition[],
    iconClass?: string
}
export interface tbl_condition {
    key: string
    operation: string,
    value: any,
    join?: string
}
export declare type tableAction = 'ADD' | 'EDIT' | "PRINT" | 'DELETE' | 'VIEW' | 'INACTIVE' | 'ACTIVE' | 'EXPORT';
export interface dataColum {
 colName: string;
    colJoinName?: string;
    colJoinSeparator?: string;
    selectKeyName?: string;
    visible?: boolean,
    isPrimary?: boolean;
    colType?: 'HEADING' | 'DESCRIPTION' | 'LEFT' | 'RIGHT_TOP' | 'RIGHT_BOTTOM'|'BADGE';
    dataType?: 'IMAGE' | 'TEXT' | 'DATE'|'CURRENCY' | 'HTML'
    optionalColName?: string
    icon?: string;
    span_text?: string;
    dateFormat?: string
    filterCol?: tableFilter
}

export class filterConfig {
    sortField?: string;
    sortOrder?: number;
    filters?: filter;
    searchTerms?: any
}

interface filter {
    [key: string]: { value: any },
}

export interface tableFilter {
    type: 'DROPDOWN' | 'TEXT' | 'DATE'
    data?: Array<any>;
    dataArray?: Array<any>;
    apiName?: string,
    apiFunName?: string,
    selectPrimaryKey?: string
    value?: string;
    minDate?: Date,
    maxDate?: Date,
    yearRange?: Date | any
    placeholder?: string;
    selectKeyName?: string;
}
export interface formField extends tableFilter {
    label: string,
    isRequired: boolean,
    validator: Array<formValidator>;
    controlName: string
}
export interface formEvent {
    name: 'click' | 'change' | 'input',
    apiTblName?: string,
    isCallback?: boolean,
    valueAssign?: string; // input is not needed
    apiFunName?: string
    isSelfAssign?: boolean;
    funName?: string;
}
export interface formDynamicValidator {
    controlName: string,
    validatorControl: Array<string>,
    hideControl?: Array<string>,
    value: any,
    operation?: '==' | '>=' | '!=' | '>',
    validator?: formValidator[]
}
export interface formValidator {
    name: 'email' | 'required' | "pattern" | 'minLength' | 'maxLength' | 'min' | 'max',
    funName?: string | number;
    asynFun?: boolean;
    funValue?: RegExp | any;
    error?: string | null,
    conditional?: tbl_condition[],
    is_async?: boolean
}

export interface tblFilter {
    colName: string,
    matchMode?: string,
    value: string | number | Array<any> | null
    operation?: 'AND' | 'OR' | 'IN'
}
export interface whereField extends tblFilter {

}
export interface tblSort {
    colName: string,
    sortOrder: string
}
export interface tblFilterQuery {
    page: number
    queryParams: tblFilter[]
    rows: number
    first?: boolean
    sort?: tblSort[]
    whereField?: tblFilter[]
}

export interface mapInfoView {
    name: string,
    type?: 'DATE' | 'DATETIME' | 'BOOLEAN' | 'FILE' | 'INFO' | 'CURRENCY' | null,
    isClickable?: boolean,
    viewType?: 'STAFF_EMP_ID' | 'SPONSOR_ID' | 'CROSS_REF_ID' | 'CHURCH_ID' | 'CHILD_ID'
    title: string,
    col?: string,
}