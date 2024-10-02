// sendNotification.js
const sendNotificationToUser = async (subID, title, message) => {
    const notificationData = {
        subID: subID,  // Unique user ID
        appId: 23663,  // Your app ID
        appToken: "XcflD7o30MrTv1MQZ7jtig",  // Your app token
        title: title,
        message: message,
    };

    try {
        const response = await fetch('https://app.nativenotify.com/api/indie/notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        });

        const textResponse = await response.text();  // Get the plain text response

        if (response.ok && textResponse === 'Success!') {
            console.log('Notification sent successfully to', subID);
            return true;
        } else {
            console.error('Failed to send notification:', textResponse);
            return false;
        }

    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
};

export default sendNotificationToUser;
