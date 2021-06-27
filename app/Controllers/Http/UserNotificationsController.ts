import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Notification from "App/Models/Mongoose/Notification";

export default class UserNotificationsController {
  public async index({ params, response }: HttpContextContract) {
    const userId = params.userId;

    const userNotifications = await Notification.find({ recipient_id: userId });

    return response.status(200).json(userNotifications);
  }
}
