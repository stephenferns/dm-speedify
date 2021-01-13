var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // varibales also used for meta 
    var intro = {
        title: 'Hello !',
        subtitle: 'Ghar Ghar Internet Offer ',
        description: '1 Mbps',
        description_1: ' 3 Months Free',
        description_2: '20 GB per day ',
        button_text: ' Book Now Rs 1 Only',
        company_name: 'Prysmnet, avail the free offer.',
        keywords: 'broadband, broadband internet, high speed internet, super connect, mega connect, internet Nasik, 45mbps, 1gbps, bethefirst, internet connection'
    };
    var know = {
        speed: '1 Mbps',
        data_cap: 'Unlimited',
        priority_cap: '20 GB per day',
        subcription: 'Rs 1 inclusive of taxes. After 9 Months',
        button_text: 'Book Now Rs 1 Only'
    }


    //   res.render('index', { title: intro, sub: intro.subtitle, des: intro.description, des_1: intro.description_1, des_2: intro.description_2, button_t: intro.button_text });
    // });
    res.render('referral', {
        title: intro.title,
        sub: intro.subtitle,
        des: intro.description,
        des_1: intro.description_1,
        des_2: intro.description_2,
        button_t: intro.button_text,
        meta_og_des: intro.company_name,
        key: intro.keywords,
        know_speed: know.speed,
        know_data_cap: know.data_cap,
        know_p_cap: know.priority_cap,
        know_sub: know.subcription,
        know_button: know.button_text
    });
});

module.exports = router;
