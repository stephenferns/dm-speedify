
function showKnowMore() {
    document.getElementById("bookNow").style.display = "none";
    document.getElementById("know-more").style.display = "block";
    document.getElementById("know-more").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}
function bookNow() {
    document.getElementById("know-more").style.display = "none";
    document.getElementById("bookNow").style.display = "block";
    document.getElementById("bookNow").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

// var countWhatsapp = function (userKey, campaignName) {
//     event.preventDefault();
//     console.log(campaignName)
//     var reqEnquiry = {
//         key: userKey,
//         action: 'Enquiry',
//         url: "stephen",
//         category: 'user'
//     }
//     console.log(reqEnquiry)
//     var options = {
//         'method': 'GET',
//         'url': 'https://lm.ditscentre.in/ums/',
//         'headers': {
//             'Content-Type': 'application/json'
//         },
//         body: reqEnquiry

//     };
//     // console.log(options);
//     fetch(options, function (error, response) {
//         if (error) {
//             console.log(error)

//         } else {
//             console.log(response.body)

//         }
//     });

//     // location.replace("https://wa.me/+917218113344")
// }







var options = {
    "key": "rzp_live_GneMXH5fEXWTTX",
    "amount": "35000", // 2000 paise = INR 20
    "name": "Prysmnet",
    "description": "Pay Now",
    "image": "https://assets.prysmnet.com/img/logo.gif",
    "handler": function (response) {
        swal("Successful", "Payment Successful!", "success");
    },
    "prefill": {
        "name": "",
        "email": "",
    },
    "notes": {
        "address": "",
        "s": "u"
    },
    "theme": {
        "color": "#ed691f"
    }
};

var getOrder = function (planName, amount, src, userKey) {
    var amt = amount;


    if (amt === "" || amt <= 0 || isNaN(amt)) {
        swal("Warning", "Please enter some amount", "warning");
    } else {
        if (src === 'u') {
            options.description = planName;
            options.amount = amount * 100;
            options.notes.s = src
            var rzpObj = new Razorpay(options);
            rzpObj.open();
        } else if (src === 'p') {
            options.description = planName;
            options.amount = amount * 100;
            // options.prefill.mobile= document.getElementById("p_mobile").value;
            options.prefill.email = document.getElementById("p_email").value;
            options.notes.s = src
            options.notes.username = document.getElementById("p_uname").value;
            options.notes.address = document.getElementById("p_address").value;
            options.notes.company = 'MMC';
            var rzpObj = new Razorpay(options);
            rzpObj.open();
        } else if (src === 'reconnect') {
            var fullname = document.getElementById("p_name").value;
            var address = document.getElementById("p_address").value;

            if (fullname !== '' && address !== '') {
                options.description = planName;
                options.amount = amount * 100;
                // options.prefill.mobile= document.getElementById("p_mobile").value;
                options.prefill.email = document.getElementById("p_email").value;
                options.notes.s = src
                options.notes.fullname = fullname;
                options.notes.address = address;
                options.notes.company = 'MMC';
                options.notes.by = userKey;

                var rzpObj = new Razorpay(options);
                rzpObj.open();
            } else {
                swal("Warning", "Please Enter Full Name Address and EmailId", "warning");
            }
        } else if (src === 'newconnect') {
            var fullname = document.getElementById("p_name").value;
            var address = document.getElementById("p_address").value;

            if (fullname !== '' && address !== '') {
                options.description = planName;
                options.amount = amount * 100;
                // options.prefill.mobile= document.getElementById("p_mobile").value;
                options.prefill.email = document.getElementById("p_email").value;
                options.notes.s = src
                options.notes.fullname = fullname;
                options.notes.address = address;
                options.notes.company = 'MMC';
                options.notes.by = userKey;

                var rzpObj = new Razorpay(options);
                rzpObj.open();
            } else {
                swal("Warning", "Please Enter Full Name Address and EmailId", "warning");
            }
        }
    }
}