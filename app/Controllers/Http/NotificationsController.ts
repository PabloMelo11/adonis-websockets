import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Notification from "App/Models/Mongoose/Notification";

export default class NotificationsController {
  public async store({ request }: HttpContextContract) {
    const { content, recipient_id } = request.only(["content", "recipient_id"]);

    const notification = new Notification({
      content,
      recipient_id,
      read: false,
    });

    await notification.save();

    return notification;
  }

  public async update({ params, response }: HttpContextContract) {
    const notificationId = params.notificationId;

    const foundNotification = await Notification.findById(notificationId);

    if (!foundNotification) {
      return response.status(400).json({ message: "Notification not found" });
    }

    await Notification.updateOne(
      { _id: notificationId },
      { $set: { read: true } }
    );

    return response.status(204);
  }
}
