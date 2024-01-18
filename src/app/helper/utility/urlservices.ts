export class UrlServices {
    constructor() { }
    public static DASHBOARD_ROUTE = 'dashboard';
    public static ACCESS_DENIED_ROUTE = 'access_denied';
    public static AUTH_PAGE = {
        //USER_ROUTE :
        LOGIN_URL: '/' + 'login',
        FORGOT_PASSWORD_URL: '/' + 'forgotPassword',
        RESET_PASSWORD_URL: '/' + 'reset',
        LOGOUT_URL: '/' + 'logout',
        ACTIVATE: '/' + 'activate',
        PROFILE:'/' + 'profile',
        NEW_REPORT: '/' + 'new_report',
        ALL_REPORT: '/' + 'new_report',
        NEW_MEMBER: '/church/manage-member',
        MEMBER_INFO: '/church/manage-info',
        ACTIVITY:'/' + 'activity',
        NEW_ACTIVITY:'/' + 'activity/new-activity',
        STAFF_DETAILS:'/' + 'staff-details'
    }
}