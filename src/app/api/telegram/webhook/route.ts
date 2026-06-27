import { webhookCallback } from "grammy";
import { bot } from "@/lib/bot";

// Digunakan oleh Telegram untuk POST data webhook
export const POST = webhookCallback(bot, "std/http");
