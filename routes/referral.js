var express = require('express');
var router = express.Router();
var request = require('request');


var apiKey = '76b9257c673c9e071ec36c96ad74ad8a'
var getData = function (url, requestData, callback) {

    var options = {
        'method': 'POST',
        'url': url,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)

    };

    request(options, function (error, response) {
        if (error) {
            console.log(error)
            callback(error, null)
        } else {

            callback(null, JSON.parse(response.body))

        }
    });


}


var countVisits = function (requestData) {

    var options = {
        'method': 'POST',
        'url': 'https://lm.ditscentre.in/umssunil/users/countVisits',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)

    };

    request(options, function (error, response) {
        if (error) {
            console.log(error)

        } else {

        }
    });
}

var getSrTracker = function (hashId, callback) {

    var options = {
        'method': 'POST',
        'url': 'https://lm.ditscentre.in/umssunil/users/srTracker',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hashId, role: 'referral' })

    };

    request(options, function (error, response) {
        if (error) {
            console.log(error)
            callback(error, null)

        } else {
            var result = JSON.parse(response.body)
            if (result.state && result.docs && result.docs[0] && result.docs[0][0] && parseInt(result.docs[0][0]["@state"]) > 0) {

                callback(null, result)
            } else {
                callback(result.message, null)
            }

        }
    });


}

var apiUrl = 'https://lm.ditscentre.in/umssunil/serviceCall/getCampaignDetails'

var intro = {
    title: 'Speedyfi',
    greeting: 'Hello !',
    subtitle_1: `"Ek dost, Ek mahina"`,
    description: '300 Mbps @ just Rs ',
    description_1: 'Security Deposit Rs. 2000 Inc. Taxes',
    button_text: ' Book Now ',
    company_name: 'Speedyfi, avail the free offer.',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Bahadurgarh, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: '250 GB',
    subcription: 'Rs 1 inclusive of taxes. After ',

};


/* GET home page. */
router.get('/', function (req, res, next) {

    //   res.render('index', { title: intro, sub: intro.subtitle, des: intro.description, des_1: intro.description_1, des_2: intro.description_2, button_t: intro.button_text });
    // });
    res.render('error', {
        title: intro.title
    });
});


// ======= Payment Link
router.get('/:hashId', function (req, res, next) {
    var params = req.params;
    var hashId = params.hashId ? params.hashId : null;
    if (hashId) {
        getSrTracker(hashId, function (er, dt) {
            if (er) {
                res.render('error', { title: intro.title, usererror: er });
            } else {


                var userData = dt.docs[1][0];
                if (userData && userData.description) {


                    console.log(userData);

                    planName = userData.description.split(" ~ ")[0].trim();
                    userKey = userData.userKey;

                    getData(apiUrl, { campaignName: 'referral', planName, userKey, apiKey }, function (err, response) {
                        if (err) {
                            res.render('error', { title: intro.title, usererror: '404 Not Found' });
                        } else {

                            if (response.state) {


                                // userData = response.docs[1] ? response.docs[1][0] : null;
                                planDetails = response.docs[2] ? response.docs[2][0] : null;

                                if (userData && planDetails) {
                                    {
                                        res.render('reconnectPay', {
                                            title: intro.title,
                                            greeting: intro.greeting,
                                            sub_1: userData.full_name,
                                            sub_2: "",
                                            sub_3: "Final step is here",
                                            des: intro.description,
                                            des_1: intro.description_1,
                                            des_2: planDetails.fup + intro.description_2,
                                            button_text: "Pay Now Rs. " + planDetails.amt,
                                            meta_og_des: intro.company_name,
                                            key: intro.keywords,
                                            // know_speed: know.speed,
                                            know_data_cap: intro.data_cap,
                                            // know_p_cap: know.priority_cap,
                                            know_sub: intro.subcription + planDetails.period + " days",
                                            customerName: userData.fullname,
                                            speed: planDetails.speed + " Mbps ",
                                            planName: planDetails.planName,
                                            amount: planDetails.amt,
                                            userKey: userKey,

                                            des_3: " @ just Rs " + planDetails.amt + " ",
                                            // know_button: know.button_text
                                            campaignName: 'referral'
                                        });
                                    }

                                }
                            } else {
                                res.render('error', { title: intro.title, usererror: response.message });

                            }
                        }

                    })

                } else {
                    res.render('error', { title: intro.title, usererror: "Not Found" });
                }

            }
        })
    } else {
        res.render('error', { title: intro.title, usererror: '404 Not Found' });
    }
    // res.render('error', { title: intro.title, usererror: '404 Not Found' });
    var reqObject = {
        key: hashId,
        action: 'Viewed',
        url: req.originalUrl,
        category: 'referral',
        source: 'whatsapp'
    }

    countVisits(reqObject);

})
/* GET home page. */
router.get('/:planName/:userKey', function (req, res, next) {
    var params = req.params;
    var url = req.url;
    var userKey = params.userKey ? params.userKey : null;
    var planName = params.planName ? params.planName : null;

    if (userKey && planName) {
        getData(apiUrl, { campaignName: 'referral', planName, userKey, apiKey }, function (err, response) {
            if (err) {
                res.render('error', { title: intro.title, usererror: 'plan name missiing' });
            } else {

                userData = response.docs[1] ? response.docs[1][0] : null;
                planDetails = response.docs[2] ? response.docs[2][0] : null;

                // if (userData && planDetails) {

                console.log(userKey + " Here");
                res.render('referral', {
                    title: intro.title,
                    greeting: intro.greeting,
                    sub_1: intro.subtitle_1,
                    des: intro.description,
                    des_1: intro.description_1,
                    button_text: intro.button_text,
                    meta_og_des: intro.company_name,
                    key: intro.keywords,
                    // know_speed: know.speed,
                    know_data_cap: intro.data_cap,
                    // know_p_cap: know.priority_cap,
                    know_sub: intro.subcription + planDetails.period + " days",
                    customerName: userData.fullname,
                    speed: planDetails.speed + " Mbps",
                    planName: planDetails.planName,
                    amount: planDetails.amt,
                    userKey: userKey
                    // know_button: know.button_text
                });



                // }
            }
        })
    } else {
        res.render('error', { title: intro.title, usererror: 'plan name missiing' });
    }

    var reqObject = {
        key: userKey,
        action: 'Viewed',
        url: req.originalUrl,
        category: 'referral',
        source: 'whatsapp'
    }

    countVisits(reqObject);

});

/* GET home page. */
router.get('/:planName/:userKey/:channel', function (req, res, next) {
    var params = req.params;
    var url = req.url;
    var userKey = params.userKey ? params.userKey : null;
    var planName = params.planName ? params.planName : null;
    var channel = params.channel ? params.channel : null;


    if (userKey && planName) {
        getData(apiUrl, { campaignName: 'referral', planName, userKey, apiKey }, function (err, response) {
            if (err) {
                res.render('error', { title: intro.title, usererror: 'plan name missiing' });
            } else {

                userData = response.docs[1] ? response.docs[1][0] : null;
                planDetails = response.docs[2] ? response.docs[2][0] : null;

                // if (userData && planDetails) {


                res.render('referral', {
                    title: intro.title,
                    greeting: intro.greeting,
                    sub_1: intro.subtitle_1,
                    des: intro.description,
                    des_1: intro.description_1,
                    button_text: intro.button_text,
                    meta_og_des: intro.company_name,
                    key: intro.keywords,
                    // know_speed: know.speed,
                    know_data_cap: intro.data_cap,
                    // know_p_cap: know.priority_cap,
                    know_sub: intro.subcription + planDetails.period + " days",
                    customerName: userData.fullname,
                    speed: planDetails.speed + " Mbps",
                    planName: planDetails.planName,
                    amount: planDetails.amt,
                    userKey: userKey,
                    channel: channel
                    // know_button: know.button_text
                });



                // }
            }
        })
    } else {
        res.render('error', { title: intro.title, usererror: 'plan name missiing' });
    }

    var reqObject = {
        key: userKey,
        action: 'Viewed',
        url: req.originalUrl,
        category: 'referral',

        source: channel.toLowerCase(),



    }

    countVisits(reqObject);

});


module.exports = router;
