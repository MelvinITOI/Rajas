export declare type FILETYPE = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
export interface fileInfo {
    filePath: string;
    fileName?: string,
    progress: number  
}
export interface fileType {
    pattern: RegExp;
    accessType: string;
    maxFileSize: number;
}
export interface fileConfigController {
    [key: string]: fileCompData;
  }
export interface fileAccessType {
    IMAGE?: fileType;
    FILE?: fileType;
    VIDEO?: fileType
}

export interface infoModalData {
    title?: string,
    btn?: string;
    content?: string;
    //formData?: formBuilder[];
    sourceData?: any;
}

export interface fileCompData {
    label?: string;
    fileType: fileCategory;
    filePath: string;
}
export interface photoConfig{
    allowEditing? : boolean
}
export declare type fileCategory = 'IMAGE' | 'FILE' | 'VIDEO';
export type fileCategoryMap<T> = { [day in fileCategory]: T };

export const imgExtensions = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp",
];
export const videoExtension = [
    'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'avi', 'wmv', '3gp', '3g2', 'amv', 'mp4', 'm4p', 'mp2', 'mpeg'
]

export const audioExtension = [
    'mp3', 'flac', 'm4a','wmc','wav'
]