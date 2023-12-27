import UserModel from '../models/userModel';

interface NotificationMessage {
    senderId: string;
    receiverId: string;
    amount: number;
  }

const sendNotificationService = async (notificationData: NotificationMessage) => {
  try {
    const { senderId, receiverId, amount } = notificationData;
    // Fetch users from MongoDB
    const sender = await UserModel.findById(senderId);
    const receiver = await UserModel.findById(receiverId);

    if (sender && receiver) {
      const senderName = sender.name;
      const receiverName = receiver.name;

      const notificationMessageTemplate = `
      Dear ${receiverName},\n
      You have received ${amount} dollars from ${senderName}.\n
      Thank you for using our service!\n
      Best regards,\n
      Digital Wallet Team`;

      // sending notification
      console.log(notificationMessageTemplate);
    //   await sendNotification(notificationMessageTemplate);
    } else {
      console.error('User not found for notification:', notificationData);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendNotificationService;