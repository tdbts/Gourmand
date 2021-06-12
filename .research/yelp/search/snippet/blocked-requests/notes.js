/*
* Blocked Requests
*
* Return status code 503
*
* Return HTML page with header "Sorry, you’re not allowed to access this page."
*
* Unknown whether they block using IP address or other means.
*
* Backup HTML-based request never made --> why??
*   * Must be that the error message wasn't equal to 'errorMessages.BLOCKED_REQUEST'
*
* */