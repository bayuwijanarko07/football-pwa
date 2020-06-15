var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BFWTE2B_rnzwVE60DYCTwWBEJU_voEn9Axx2PT7wn6_dcu2C9WJO745NG7vkn9_izavX6m_Vq1cZfo5QCkGOcM4",
    "privateKey": "a8TefsMlYHjwdZOCYvf4GS9KltT64ape6_rJ9-c3TSg"
};
 
 
webPush.setVapidDetails(
    'mailto:bayuwijanarko07@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e-JPTJiSsPk:APA91bGqAf1ujczLg8oaMTAA4mpxkfOkECS0HfPcGtK7tOX2CWts6vWO2UTFfCSKHp0iP_fe0U0-J10xvY4mCDFus6WyPRP94W-CjrJtbEeHDEdGrz4WwWf6tMjDkVCRjHQXuF2H3RK0",
    "keys": {
        "p256dh": "BNF6o7+LWtV4qLmQ1BThHgAfWhhKAv1bdhskJnIZI77i30fQnjZ9i6ZFzxmuxD92StOeJEtOsQmFJcLjzvJdWDE=",
        "auth": "5nWMTMWs+6rJktSW+KCWMw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '260767740747',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);