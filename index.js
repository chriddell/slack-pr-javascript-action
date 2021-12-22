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
      text: 'PR opened',
      blocks: [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": title
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
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Open in Github",
                "emoji": false
              },
              "value": url,
              "action_id": "action-view-pr"
            }
          ]
        }
      ]
    })
  })();  
} catch (error) {
  core.setFailed(error.message);
}