import * as functions from "firebase-functions";
import fetch from "node-fetch";
import * as webhook from "webhook-discord";

process.env.TZ = "Asia/Tokyo";

export const shareUrl = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 9-23/3 * * *")
  .onRun(async (context) => {
    const urls = await fetch(process.env.API_ORIGIN!)
      .then((res) => res.text())
      .then((text) => text.split("\n"));
    const url = urls[Math.floor(Math.random() * urls.length)];

    const Hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL!);
    const msg = new webhook.MessageBuilder()
      .setName(process.env.BOT_NAME!)
      .setAvatar(process.env.BOT_AVATAR!)
      .setText(url);
    Hook.send(msg);
  });
