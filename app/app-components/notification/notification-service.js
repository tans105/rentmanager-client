/**
 * Created by tanmay on 30/6/17.
 */
/*
The utility will provide notification based on rest service response
 */
'use strict';
/**
 * @param: isSuccess : true for success, false for error notification
 * @param: msg : The message to be displayed on the notification
 * @param: x : left/right
 * @param y : top/bottom
 */
appModule.service('NotificationService', function (Notification) {

    this.notify = function (isSuccess, msg, x, y) {
        if (isSuccess) {
            Notification.success({
                message: msg,
                positionY: y,
                positionX: x
            });
        } else {
            Notification.error({
                message: msg,
                positionY: y,
                positionX: x
            });
        }
    }
});