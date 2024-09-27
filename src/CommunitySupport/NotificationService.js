import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../Configuration/firebase';

// Function to send notification to a user
export const sendNotificationToUser = async (userId, notificationMessage) => {
  try {
    const userRef = doc(db, 'Students', userId);
    
    await updateDoc(userRef, {
      notifications: arrayUnion({
        id: new Date().getTime(), // Unique ID for each notification
        message: notificationMessage,
        read: false,
      })
    });
  } catch (error) {
    console.error("Error sending notification: ", error);
  }
};
