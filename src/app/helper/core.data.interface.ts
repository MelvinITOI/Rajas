import { formBuilder } from "./dataModal/response";

export interface fileCompData {
    label?: string;
    fileType: fileCategory;
    filePath: string;
}

export declare type fileCategory = 'IMAGE' | 'FILE' | 'VIDEO';
export type fileCategoryMap<T> = { [day in fileCategory]: T };

export interface constDropdownData {
    id?: string | number,
    name?: string;
    label?: string,
    key?: string | number
    color?: string
}

export interface arrayofData {
    [key: string]: Array<any>
};
export interface ObjectString {
    [key: string]: string
};

export interface fileType {
    pattern: RegExp;
    accessType: string;
    maxFileSize: number;
}

export interface fileAccessType {
    IMAGE?: fileType;
    FILE?: fileType;
    VIDEO?: fileType
}

export interface fileInfo {
    filePath: string;
    fileName?: string,
    progress?: number
}

export interface infoModalData {
    title?: string,
    btn?: string;
    content?: string;
    formData?: formBuilder[];
    sourceData?: any;
}