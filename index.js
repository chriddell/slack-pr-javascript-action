const core = require('@actions/core');
const { IncomingWebhook } = require('@slack/webhook');

try {
  if (!process.env.SLACK_WEBHOOK_URL) {
    throw new Error('You need to provide a SLACK_WEBHOOK_URL');
  }

  const slack = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

  ;(async () => {
    await slack.send({
      text: 'Pull request created',
    })
  })();  
} catch (error) {
  core.setFailed(error.message);
}