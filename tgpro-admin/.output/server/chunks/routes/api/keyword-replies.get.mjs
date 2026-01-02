import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const keywordReplies_get = defineEventHandler(async (event) => {
  try {
    const projectRoot = process.cwd();
    const actualRoot = projectRoot.endsWith(".output") ? join(projectRoot, "..") : projectRoot;
    const keywordRepliesPath = join(actualRoot, "hf-tgpro", "keyword_replies.json");
    if (!existsSync(keywordRepliesPath)) {
      const defaultReplies = {
        commands: {
          "/start": [
            {
              id: "start_text",
              type: "text",
              content: "\u60A8\u597D\uFF0C{username}\n\u6B22\u8FCE\u4F7F\u7528\u81EA\u52A8\u5145\u503C\u4F1A\u5458\u673A\u5668\u4EBA\n\u60A8\u7684\u5E73\u53F0ID:{user_id}",
              order: 1
            },
            {
              id: "start_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "\u{1F7E2} \u672C\u673A\u5668\u4EBA\u4E3A\u60A8\u63D0\u4F9B\u301024\u5C0F\u65F6\xB7Telegram\u4F1A\u5458\u3011\u81EA\u52A9\u5F00\u901A\u670D\u52A1\n\u8BF7\u9009\u62E9\u4E0B\u65B9\u6309\u94AE:",
              buttons: [
                [
                  { text: "\u{1F31F}\u6B64\u8D26\u53F7\u5F00\u901A", callback_data: "buy_myself" },
                  { text: "\u{1F381}\u4E3A\u4ED6\u4EBA\u5F00\u901A", callback_data: "buy_ship" }
                ],
                [
                  { text: "\u{1F538}\u4F1A\u5458\u4EF7\u683C\u{1F538}", callback_data: "buy_price" }
                ],
                [
                  { text: "\u{1F538}\u6279\u91CF\u5F00\u4F1A\u5458\u{1F538}", callback_data: "buy_ship" }
                ]
              ],
              order: 2
            }
          ],
          "/help": [
            {
              id: "help_text",
              type: "text",
              content: "\u{1F916} *\u673A\u5668\u4EBA\u4F7F\u7528\u5E2E\u52A9*\n\n*\u53EF\u7528\u547D\u4EE4\uFF1A*\n/start - \u5F00\u59CB\u4F7F\u7528\u673A\u5668\u4EBA\n/help - \u663E\u793A\u6B64\u5E2E\u52A9\u4FE1\u606F\n/buy - \u8D2D\u4E70\u4F1A\u5458\n/info - \u67E5\u770B\u8D26\u6237\u4FE1\u606F\n/settings - \u8BBE\u7F6E\u9009\u9879\n\n*\u529F\u80FD\u8BF4\u660E\uFF1A*\n\u2022 \u{1F31F} \u8D2D\u4E70Telegram\u4F1A\u5458\n\u2022 \u{1F381} \u4E3A\u4ED6\u4EBA\u5F00\u901A\u4F1A\u5458\n\u2022 \u{1F4B0} \u67E5\u770B\u4EF7\u683C\u548C\u4F59\u989D\n\u2022 \u{1F469} \u8054\u7CFB\u5BA2\u670D\u652F\u6301\n\n\u5982\u6709\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\uFF01",
              order: 1
            }
          ],
          "/buy": [
            {
              id: "buy_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "\u{1F7E2} \u672C\u673A\u5668\u4EBA\u4E3A\u60A8\u63D0\u4F9B\u301024\u5C0F\u65F6\xB7Telegram\u4F1A\u5458\u3011\u81EA\u52A9\u5F00\u901A\u670D\u52A1\n\u8BF7\u9009\u62E9\u4E0B\u65B9\u6309\u94AE:",
              buttons: [
                [
                  { text: "\u{1F31F}\u6B64\u8D26\u53F7\u5F00\u901A", callback_data: "buy_myself" },
                  { text: "\u{1F381}\u4E3A\u4ED6\u4EBA\u5F00\u901A", callback_data: "buy_ship" }
                ],
                [
                  { text: "\u{1F538}\u4F1A\u5458\u4EF7\u683C\u{1F538}", callback_data: "buy_price" }
                ],
                [
                  { text: "\u{1F538}\u6279\u91CF\u5F00\u4F1A\u5458\u{1F538}", callback_data: "buy_ship" }
                ]
              ],
              order: 1
            }
          ],
          "/info": [
            {
              id: "info_text",
              type: "text",
              content: "\u{1F4CA} *\u8D26\u6237\u4FE1\u606F*\n\n\u60A8\u7684\u5E73\u53F0ID\uFF1A{chat_id}\n\u5F53\u524D\u4F59\u989D\uFF1A{balance} USDT\n\n\u5982\u9700\u5145\u503C\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u3002",
              order: 1
            }
          ],
          "/settings": [
            {
              id: "settings_text_buttons",
              type: "text_buttons",
              content: "\u2699\uFE0F *\u8BBE\u7F6E\u9009\u9879*\n\n\u8BF7\u9009\u62E9\u60A8\u8981\u8FDB\u884C\u7684\u64CD\u4F5C\uFF1A",
              buttons: [
                [
                  { text: "\u{1F514} \u901A\u77E5\u8BBE\u7F6E", callback_data: "settings_notifications" },
                  { text: "\u{1F310} \u8BED\u8A00\u8BBE\u7F6E", callback_data: "settings_language" }
                ],
                [
                  { text: "\u{1F519} \u8FD4\u56DE\u4E3B\u83DC\u5355", callback_data: "back_to_main" }
                ]
              ],
              order: 1
            }
          ]
        },
        buttons: {
          "\u{1F31F}\u8D2D\u4E70\u4F1A\u5458": [
            {
              id: "buy_member_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "\u{1F7E2} \u672C\u673A\u5668\u4EBA\u4E3A\u60A8\u63D0\u4F9B\u301024\u5C0F\u65F6\xB7Telegram\u4F1A\u5458\u3011\u81EA\u52A9\u5F00\u901A\u670D\u52A1\n\u8BF7\u9009\u62E9\u4E0B\u65B9\u6309\u94AE:",
              buttons: [
                [
                  { text: "\u{1F31F}\u6B64\u8D26\u53F7\u5F00\u901A", callback_data: "buy_myself" },
                  { text: "\u{1F381}\u4E3A\u4ED6\u4EBA\u5F00\u901A", callback_data: "buy_ship" }
                ],
                [
                  { text: "\u{1F538}\u4F1A\u5458\u4EF7\u683C\u{1F538}", callback_data: "buy_price" }
                ],
                [
                  { text: "\u{1F538}\u6279\u91CF\u5F00\u4F1A\u5458\u{1F538}", callback_data: "buy_ship" }
                ]
              ],
              order: 1
            }
          ],
          "\u{1F469}\u8054\u7CFB\u5BA2\u670D": [
            {
              id: "contact_service_buttons",
              type: "text_buttons",
              content: "\u8BF7\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u8DF3\u8F6C\uFF1A",
              buttons: [
                [
                  { text: "\u8054\u7CFB\u5BA2\u670D", url: "{CUSTOMER_SERVICE_ID}" }
                ]
              ],
              order: 1
            }
          ],
          "\u26A1\uFE0F\u6211\u8981\u5145\u503C": [
            {
              id: "recharge_buttons",
              type: "text_buttons",
              content: "\u{1F4B0} \u8BF7\u9009\u62E9\u5145\u503C\u91D1\u989D\uFF1A",
              buttons: [
                [
                  { text: "20", callback_data: "20" },
                  { text: "40", callback_data: "40" },
                  { text: "60", callback_data: "60" },
                  { text: "80", callback_data: "80" },
                  { text: "100", callback_data: "100" }
                ],
                [
                  { text: "33", callback_data: "33" },
                  { text: "66", callback_data: "66" },
                  { text: "99", callback_data: "99" },
                  { text: "132", callback_data: "132" },
                  { text: "165", callback_data: "165" }
                ],
                [
                  { text: "49", callback_data: "49" },
                  { text: "98", callback_data: "98" },
                  { text: "147", callback_data: "147" },
                  { text: "196", callback_data: "196" },
                  { text: "245", callback_data: "245" }
                ]
              ],
              order: 1
            }
          ],
          "\u{1F464}\u4E2A\u4EBA\u4E2D\u5FC3": [
            {
              id: "personal_center_text",
              type: "text",
              content: "\u{1F464} *\u4E2A\u4EBA\u4E2D\u5FC3*\n\n\u60A8\u7684\u5E73\u53F0ID\uFF1A{chat_id}\n\u5F53\u524D\u4F59\u989D\uFF1A{balance} USDT\n\u6CE8\u518C\u65F6\u95F4\uFF1A{register_time}\n\n\u611F\u8C22\u60A8\u7684\u4F7F\u7528\uFF01",
              order: 1
            }
          ]
        }
      };
      return {
        success: true,
        data: defaultReplies
      };
    }
    const data = readFileSync(keywordRepliesPath, "utf-8");
    const keywordReplies = JSON.parse(data);
    return {
      success: true,
      data: keywordReplies
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u83B7\u53D6\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25"
    };
  }
});

export { keywordReplies_get as default };
//# sourceMappingURL=keyword-replies.get.mjs.map
