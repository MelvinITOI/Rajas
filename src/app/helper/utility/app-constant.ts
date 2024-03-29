export class AppConstant {
    public static DATE_FORMAT = 'dd-mm-yy';
    static DEFAULT_PROFILE_URL = 'assets/images/avatar.png';
    static DEFAULT_GROUP_IMAGE_URL = 'assets/images/grp-avatar.png';
    static MAX_IMAGE_UPLOAD_SIZE = 1000000; //1mb
    static MAX_FILE_UPLOAD_SIZE = 2000000; // 2mb
    static MAX_VIDEO_UPLOAD_SIZE = 5000000; //5mb
    static DEFAULT_PROFILE_IMAGE = 'assets/blank-group-picture.svg';
    static DEFAULT_GROUP_IMAGE ='assets/blank-profile-picture.svg';
    static DEFAULT_OLD_IMAGE_APPEND = '[~@!OLDIMAGE!@~]';
    static DEFAULT_DATE_RANGE = '1960:' + new Date().getFullYear().toString();
    static DEFAULT_FUTURE_DATE_RANGE = '1960:' + (new Date().getFullYear() + 5).toString();
    public static GENDER = [
        { id: 1, genderName: 'Male' },
        { id: 2, genderName: 'Female' },
    ];
    public static TABLE_PAGE_ROWS = 10;
}
export const VALIDATOR_PATTERNS = {
    EMAIL: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
    MOBILE: /^[6-9]{1}[0-9]{9}$/,
    NUMBER: /^[0-9]+$/,
    POSITIVE_INTEGER: /\d+/,
    NUMBER_FLOAT: /^[+-]?([0-9]*[.])?[0-9]+$/,
    TEXT: /^([a-zA-Z0-9+_]+\s)*[a-zA-Z0-9+_]+$/,
    TEXT_ONLY: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    IFC_CODE: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    PINCODE: /^[1-9][0-9]{5}$/,
    MUST_BE: function (s: number) { return new RegExp(`^.{${s}}$`) }
}
export const ORG ={
    NAME : 'GEMS',
    SHORT : 'GEMS'
}
export const RESPONSE_CODE = {
    SUCCESS: 200,
    VALIDATION_ERROR: 400,
    ERROR: 500,
    METHOD_ERROR: 405,
}
export const MODULE_NAME = {
    STAFF: 1,
    MASTER: 2,
    USER: 3,
    STAFF_TRANSFER: 4,
    SPONSOR: 5,
    SPONSORSHIP: 6,
    CHILD: 7,
    DEDICATION: 8,
    REPORTS: 9,
    MONTHLY_REPORT_STAFF: 10,
    MONTHLY_REPORT_CHILD: 11,
    SIX_MONTH_CHURCH_REPORT: 12,
    CHURCH: 13,
    SPONSOR_GIFT: 14,
    PAYMENT: 15,
    REPORT: 16,
    CHURCH_MEMBER: 17,
    CHILD_EDUCATION:18,
    ASSET:19,
    DONATION : 20,
    ACTIVITY : 21
}
export const SPONSORSHIP_MODULE = {
    STAFF: 1,
    CHILD: 2,
    CHURCH: 3,
}

export const PERMISSION = {
    ADD: 1,
    UPDATE: 2,
    DELETE: 3,
    READ: 4,
    VERIFY: 5,
    MANAGE_LOCATION: 6,
    MANAGE_OFFICE: 7,
    VIEW_ALL: 8,
    RELIVE: 9,
    MANAGE_ROLE: 10,
    ALLOTMENT: 11,
    PROCESS: 12,
    MANAGE_EMAIL_TEMPLATES: 13,
    MANAGE_HOMES: 14,
    VIEW_SPONSORSHIP: 15,
    FLAT_REPORT: 16
}