var express = require('express');
var router = express.Router();


var request = require('request');

var apiKey = '76b9257c673c9e071ec36c96ad74ad8a'
var countVisits = function (requestData) {

    var options = {
        'method': 'POST',
        'url': 'https://lm.ditscentre.in/umssunil/users/countVisits',
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



var mastPlan = {
    title: 'Speedyfi',
    greeting: `"maha dhamaka internet offer"`,
    subtitle: "Welocme to Speedyfi Internet",
    //description: '300 Mbps',
    description_1: '300 Mbps at just Rs 6500 for 365 days',
    description_2: "Book your ispeed plan now",
    //button_text: ' Book Now Rs ',
    amt: "6500",
    company_name: 'Speedyfi, avail the free offer.',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Bahadurgarh, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: 'Unlimited',
    speed: "300 Mbps",
    plan_name: "Mast Plan Yearly",
    deposit: " Zero security amount"
    //subcription: 'Rs 1 inclusive of taxes. After ',
};

var mastPlan_yearly = {
    title: 'Speedyfi',
    greeting: 'Hello !',
    subtitle: "Welocme to Speedyfi Internet",
    //description: '300 Mbps',
    description_1: '300 Mbps at just Rs 600 for 30 days',
    description_2: "Book your ispeed plan now",
    //button_text: ' Book Now Rs ',
    amt: "600",
    company_name: 'Speedyfi, avail the free offer.',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Bahadurgarh, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: 'Unlimited',
    speed: "300 Mbps",
    plan_name: "300 Mbps Yearly",
    deposit: " 2000 Rs (Refundable)"
    //subcription: 'Rs 1 inclusive of taxes. After ',
};

var mastPlan_monthly = {
    title: 'Speedyfi',
    greeting: 'Hello !',
    subtitle: "Welocme to Speedyfi Internet",
    //description: '300 Mbps',
    description_1: '300 Mbps at just Rs 850 for 30 days',
    description_2: "Book your ispeed plan now",
    //button_text: ' Book Now Rs ',
    amt: "850",
    company_name: 'Speedyfi',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Bahadurgarh, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: 'Unlimited',
    speed: "300 Mbps",
    plan_name: "Monthly Ispeed Plan",
    deposit: " 2000 Rs (Refundable)"
    //subcription: 'Rs 1 inclusive of taxes. After ',
};

var mastPlan_quartely = {
    title: 'Speedyfi',
    greeting: 'Hello !',
    subtitle: "Welocme to Speedyfi Internet",
    //description: '300 Mbps',
    description_1: '300 Mbps at just Rs 2000 for 90 days',
    description_2: "Book your ispeed plan now",
    //button_text: ' Book Now Rs ',
    amt: "2000",
    company_name: 'Speedyfi',
    keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Bahadurgarh, 45mbps, 1gbps, bethefirst, internet connection',
    data_cap: 'Unlimited',
    speed: "300 Mbps",
    plan_name: "Quarterly Ispeed Plan",
    deposit: " 2000 Rs (Refundable)"

    //subcription: 'Rs 1 inclusive of taxes. After ',
};
/* GET home page. */
router.get('/:planName/:payNow', function (req, res, next) {
    var params = req.params;
    var planName = params.planName ? params.planName : null;
    var payNow = params.payNow ? params.payNow : null;
    console.log(req.originalUrl);

    if (planName == "mastplan" && payNow == 'p') {
        res.render('newconnect', {
            title: mastPlan_yearly.title,
            greeting: mastPlan_yearly.greeting,
            sub: mastPlan_yearly.sub,
            des_1: mastPlan_yearly.description_1,
            des_2: "Free Wifi Router And Installation ",
            button_text: "Book Now Rs " + mastPlan_yearly.amt + " only!",
            meta_og_des: mastPlan_yearly.company_name,
            speed: mastPlan_yearly.speed,
            know_data_cap: mastPlan_yearly.data_cap,
            know_sub: "365 days",
            planName: mastPlan_yearly.plan_name,
            amount: mastPlan_yearly.amt
        });
    } else if (planName == "300Mbpsyearly" && payNow == 'p') {
        res.render('newconnect', {
            title: mastPlan_monthly.title,
            greeting: mastPlan_monthly.greeting,
            sub: mastPlan_monthly.sub,
            des_1: mastPlan_monthly.description_1,
            des_2: "Free Wifi Router And Installation ",
            button_text: "Book Now Rs " + mastPlan_monthly.amt + " only!",
            meta_og_des: mastPlan_monthly.company_name,
            speed: mastPlan_monthly.speed,
            know_data_cap: mastPlan_monthly.data_cap,
            know_sub: "30 days",
            planName: mastPlan_monthly.plan_name,
            amount: mastPlan_monthly.amt
        });
    } else if (planName == "mastplan3M" && payNow == 'p') {
        res.render('newconnect', {
            title: mastPlan_quartely.title,
            greeting: mastPlan_quartely.greeting,
            sub: mastPlan_quartely.sub,
            des_1: mastPlan_quartely.description_1,
            des_2: "Free Wifi Router And Installation ",
            button_text: "Book Now Rs " + mastPlan_quartely.amt + " only!",
            meta_og_des: mastPlan_quartely.company_name,
            speed: mastPlan_quartely.speed,
            know_data_cap: mastPlan_quartely.data_cap,
            know_sub: "90 days",
            planName: mastPlan_quartely.plan_name,
            amount: mastPlan_quartely.amt
        });
    } else if (planName == "mastplan" && payNow == 'b') {
        res.render('newconnect_booknow', {
            title: mastPlan_yearly.title,
            greeting: mastPlan_yearly.greeting,
            sub: mastPlan_yearly.sub,
            des_1: mastPlan_yearly.description_1,
            des_2: "Free Wifi Router And Installation ",
            button_text: "Book Now",
            meta_og_des: mastPlan_yearly.company_name,
            speed: mastPlan_yearly.speed,
            know_data_cap: mastPlan_yearly.data_cap,
            know_sub: "365 days",
            planName: mastPlan_yearly.plan_name,
            amount: mastPlan_yearly.amt
        });
    } else if (planName == "ispeed1M" && payNow == 'b') {
        res.render('newconnect_booknow', {
            title: mastPlan_monthly.title,
            greeting: mastPlan_monthly.greeting,
            sub: mastPlan_monthly.subtitle,
            des_1: mastPlan_monthly.description_1,
            des_2: mastPlan_monthly.description_2,
            button_text: "Book Now ",
            meta_og_des: mastPlan_monthly.company_name,
            speed: mastPlan_monthly.speed,
            know_data_cap: mastPlan_monthly.data_cap,
            know_sub: "30 days",
            planName: mastPlan_monthly.plan_name,
            amount: mastPlan_monthly.amt,
            depo: mastPlan_monthly.deposit
        });
    } else if (planName == "ispeed3M" && payNow == 'b') {
        res.render('newconnect_booknow', {
            title: mastPlan_quartely.title,
            greeting: mastPlan_quartely.greeting,
            sub: mastPlan_quartely.subtitle,
            des_1: mastPlan_quartely.description_1,
            des_2: mastPlan_quartely.description_2,
            button_text: "Book Now ",
            meta_og_des: mastPlan_quartely.company_name,
            speed: mastPlan_quartely.speed,
            know_data_cap: mastPlan_quartely.data_cap,
            know_sub: "90 days",
            planName: mastPlan_quartely.plan_name,
            amount: mastPlan_quartely.amt,
            depo: mastPlan_quartely.deposit
        });
    }
    else if (planName == "mastplanYearly" && payNow == 'b') {
        res.render('newconnect_booknow', {
            title: mastPlan.title,
            greeting: mastPlan.greeting,
            sub: mastPlan.sub,
            des_1: mastPlan.description_1,
            des_2: "Free activation, Free wifi Router And Installation ",
            button_text: "Book Now",
            meta_og_des: mastPlan.company_name,
            speed: mastPlan.speed,
            know_data_cap: mastPlan.data_cap,
            know_sub: "365 days",
            planName: mastPlan.plan_name,
            amount: mastPlan.amt,
            depo: mastPlan.deposit
        });
    }


    var reqObject = {
        key: "Google-Ads-" + req.originalUrl,
        action: 'Viewed',
        url: req.originalUrl,
        category: 'newconnect'
    }

    countVisits(reqObject);
});

// router.get('/planName', function (req, res, next) {
//     res.render('new');
// })


// /* GET home page. */
// router.get('/:planName', function (req, res, next) {
//     var params = req.params;
//     var planName = params.planName ? params.planName : null;
//     console.log(req.originalUrl);

//     if (planName == "mastplan") {
//         res.render('newconnect', {
//             title: mastPlan.title,
//             greeting: mastPlan_yearly.greeting,
//             sub: mastPlan_yearly.sub,
//             des_1: mastPlan_yearly.description_1,
//             des_2: "Free Wifi Router And Installation ",
//             button_text: "Book Now Rs " + mastPlan_yearly.amt + " only!",
//             meta_og_des: mastPlan_yearly.company_name,
//             speed: mastPlan_yearly.speed,
//             know_data_cap: mastPlan_yearly.data_cap,
//             know_sub: "365 days",
//             planName: mastPlan_yearly.plan_name,
//             amount: mastPlan_yearly.amt
//         });
//     } else if (planName == "mastplan1M") {
//         res.render('newconnect', {
//             title: mastPlan_monthly.title,
//             greeting: mastPlan_monthly.greeting,
//             sub: mastPlan_monthly.sub,
//             des_1: mastPlan_monthly.description_1,
//             des_2: "Free Wifi Router And Installation ",
//             button_text: "Book Now Rs " + mastPlan_monthly.amt + " only!",
//             meta_og_des: mastPlan_monthly.company_name,
//             speed: mastPlan_monthly.speed,
//             know_data_cap: mastPlan_monthly.data_cap,
//             know_sub: "30 days",
//             planName: mastPlan_monthly.plan_name,
//             amount: mastPlan_monthly.amt
//         });
//     } else if (planName == "mastplan3M") {
//         res.render('newconnect', {
//             title: mastPlan_quartely.title,
//             greeting: mastPlan_quartely.greeting,
//             sub: mastPlan_quartely.sub,
//             des_1: mastPlan_quartely.description_1,
//             des_2: "Free Wifi Router And Installation ",
//             button_text: "Book Now Rs " + mastPlan_quartely.amt + " only!",
//             meta_og_des: mastPlan_quartely.company_name,
//             speed: mastPlan_quartely.speed,
//             know_data_cap: mastPlan_quartely.data_cap,
//             know_sub: "90 days",
//             planName: mastPlan_quartely.plan_name,
//             amount: mastPlan_quartely.amt
//         });
//     }


//     var reqObject = {
//         key: "Google-Ads-" + req.originalUrl,
//         action: 'Viewed',
//         url: req.originalUrl,
//         category: 'user'
//     }
//     countVisits(reqObject);
// });

module.exports = router;
