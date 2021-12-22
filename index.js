const core = require('@actions/core');
const { IncomingWebhook } = require('@slack/webhook');

try {
  if (!process.env.SLACK_WEBHOOK_URL) {
    throw new Error('You need to provide a SLACK_WEBHOOK_URL');
  }

  const slack = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

  /**
   * Get the pull request details
   */
  const title = process.env.PR_TITLE;
  const url = process.env.PR_URL;
  const author = process.env.PR_AUTHOR;

  ;(async () => {
    await slack.send({
      text: "PR opened",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": title
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "View in Github",
            },
            "url": url,
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `Author: ${author}`
            }
          ]
        },
      ]
    })
  })();  
} catch (error) {
  core.setFailed(error.message);
}