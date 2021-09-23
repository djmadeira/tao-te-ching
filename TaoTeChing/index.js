const sgMail = require('@sendgrid/mail');

module.exports = async function (context, myTimer, chapters, subscribers) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Rotate through the chapters in order
    const daysSinceEpoch = Math.floor(Date.now() / 86400000);
    const chapter = chapters[daysSinceEpoch % 81].text.replace(/\n/g, '<br>');

    const msg = {
        to: subscribers.map((sub) => sub.email),
        from: 'tao@cognonaut.xyz',
        templateId: 'd-18b270234abc4e7892587e408a80ec64',
        dynamicTemplateData: { chapter }
    };
    sgMail.send(msg);
};
