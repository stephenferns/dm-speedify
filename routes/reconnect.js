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
    console.log(options);
    request(options, function (error, response) {
        if (error) {
            console.log(error)
            callback(error, null)
        } else {
            console.log(response.body);
            callback(null, JSON.parse(response.body))

        }
    });


}

var countVisits = function (requestData) {

    var options = {
        'method': 'POST',
        'url': 'https://lm.ditscentre.in/ums/users/countVisits',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)

    };
    console.log(options);
    request(options, function (error, response) {
        if (error) {
            console.log(error)

        } else {
            console.log(response.body)
        }
    });


}

var apiUrl = 'https://lm.ditscentre.in/ums/serviceCall/getCampaignDetails'
var intro = {
    title: 'MMC Internet',
    greeting: 'Hello !',
    subtitle_1: `"we are missing you"`,
    subtitle_2: `"our offer is calling you"`,
    subtitle_3: `"we don't wanna lose you"`,
    description: '300 Mbps',
    description_1: ' 25% off',
    description_2: ' GB per day ',
    button_text: ' Reconnect Now ',
    company_name: 'Maha Mediacom Ghar Ghar Internet, avail the free offer.',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Nasik, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: 'Unlimited',
    subcription: 'Rs 1 inclusive of taxes. After ',

};
// var know = {
//     speed: '1 Mbps',
//     data_cap: 'Unlimited',
//     priority_cap: 'GB per day',
//     subcription: 'Rs 1 inclusive of taxes. After 9 Months',
//     button_text: 'Book Now Rs 1 Only'
// }

router.get('/', function (req, res, next) {
    res.render('error', { usererror: "plan name & key missing" });
})


router.get('/:planName', function (req, res, next) {
    res.render('error', { title: intro.title, usererror: 'User key missiing' });
})

router.get('/:userKey', function (req, res, next) {
    res.render('error', { title: intro.title, usererror: 'plan name missiing' });
})
/* GET home page. */
router.get('/:planName/:userKey', function (req, res, next) {
    var params = req.params;
    var url = req.url;
    var userKey = params.userKey ? params.userKey : null;
    var planName = params.planName ? params.planName : null;
    console.log(userKey);
    console.log(planName);
    if (userKey && planName) {
        getData(apiUrl, { campaignName: 'reconnect', planName, userKey, apiKey }, function (err, response) {
            if (err) {
                res.render('error', { title: intro.title, usererror: 'plan name missiing' });
            } else {
                console.log(response)
                userData = response.docs[1] ? response.docs[1][0] : null;
                planDetails = response.docs[2] ? response.docs[2][0] : null;

                if (userData && planDetails) {

                    if (planName == '300Mbps Reconnect') {
                        res.render('reconnect', {
                            title: intro.title,
                            greeting: intro.greeting,
                            sub_1: intro.subtitle_1,
                            sub_2: intro.subtitle_2,
                            sub_3: intro.subtitle_3,
                            des: intro.description,
                            des_1: intro.description_1,
                            des_2: planDetails.fup + intro.description_2,
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
                            actual_amount: "(Rs 600)",
                            des_3: " @ just Rs " + planDetails.amt + " ",
                            userKey: userKey
                            // know_button: know.button_text
                        });
                    } else {
                        res.render('reconnect', {
                            title: intro.title,
                            greeting: intro.greeting,
                            sub_1: intro.subtitle_1,
                            sub_2: intro.subtitle_2,
                            sub_3: intro.subtitle_3,
                            des: intro.description,
                            des_1: intro.description_1,
                            des_2: planDetails.fup + intro.description_2,
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
                            actual_amount: "(Rs 850)",
                            des_3: " @ just Rs " + planDetails.amt + " ",
                            // know_button: know.button_text
                        });
                    }


                }
            }
        })
    } else {
        res.render('error', { title: intro.title, usererror: 'plan name missiing' });
    }

    var reqObject = {
        key: userKey,
        action: 'Viewed',
        url: req.originalUrl,
        category: 'reconnect'
    }

    countVisits(reqObject);

});




module.exports = router;
