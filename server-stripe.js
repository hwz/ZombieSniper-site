var stripe = require('stripe')('sk_test_jqShgePdaAh0NKn1u1Fcokck'); //secret

module.exports = function (app) {
    app.get('/stripe',
        function (req, res) {
            res.json({}); //Send out blank data for now.
        }
    );

    app.post('/stripe',
        function (req, res) {
            //Object POSTed to server contains the Stripe token from Stripe's servers.
            var transaction = req.body;
            var stripeToken = transaction.stripeToken;

            var charge_amount = transaction.radio_amount;

            if (charge_amount == 'custom') {
                charge_amount = transaction.master_amount;
            }
            console.log("charge amount is " + charge_amount);
            var charge =
            {
                amount: charge_amount*100, //amount must be in cents
                currency: 'USD',
                card: stripeToken //Card can either be a Stripe token, or an object containing credit card properties.
            };

            stripe.charges.create(charge,
            //All stripe module functions take a callback, consisting of two params:
            // the error, then the response.
                function (err, charge) {
                    if (err)
                        console.log(err);
                    else {
                        res.json(charge);
                        console.log('Successful charge sent to Stripe!');
                    }
                }
            );

        }
    );
};