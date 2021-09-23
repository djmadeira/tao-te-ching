const validateEmail = (email) => {
    if (typeof email !== 'string') {
        return false;
    }

    return /[^@]+@[^\.]+\..+/.test(email);
};

module.exports = async function (context, req) {
    const { email, timezone } = req.body;

    if (validateEmail(email)) {
        context.bindings.subscriber = JSON.stringify({
            id: email,
            email,
            timezone: typeof timezone === 'string' ? timezone : null
        });

        context.res = {
            status: 200,
            body: "Subscribed!"
        };

        return;
    }

    context.res = {
        status: 400,
        body: 'You fucked up bub'
    }
}
