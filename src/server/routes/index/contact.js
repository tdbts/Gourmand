const contactRoute = (router, transporter) => {
    router.post('/contact', (req, res) => {
        console.log("New message incoming.");
        console.log(req.body);
        const { name, email, subject, message: text } = req.body;
        const emailConfig = {
            from: `${name} <${email}>`,
            to: process.env.CONTACT_EMAIL,
            subject,
            text
        };

        console.log("JSON.stringify(emailConfig)", JSON.stringify(emailConfig));

        transporter.sendMail(emailConfig)
            .then(() => {
                console.log("Message successfully sent.");
                res.json({status: 'success'});
            })
            .catch((err) => {
                console.error("Message error:", err);
                res.json({status: 'failure', message: err.message});
            });
    });

    return router;
};

export default contactRoute;
