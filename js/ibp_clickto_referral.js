// ***************************
// IFBYPHONE REFERRAL TRACKING
// ***************************
// DECLARE A VARIABLE TO HOLD THE REFERRING URL, DEFAULTING TO WHAT WAS SPECIFIED IN THE HTTP HEADERS
var ibp_referrer = document.referrer;
var ibp_baseURI = location.href;
var ibp_entrypage = "";
var ibp_gaExecuted = false;

// DETERMINE IF A REFERRER WAS PREVIOUSLY CAPTURED BY ANOTHER PAGE ON THIS WEBSITE
if (ibp_getCookie("ibp_referrer") !== false)
{   // GRAB THE REFERRER FROM THE COOKIE
    ibp_referrer = unescape(ibp_getCookie("ibp_referrer"));
}

// DETERMINE IF A BASEURI WAS PREVIOUSLY CAPTURED BY ANOTHER PAGE ON THIS WEBSITE
if (ibp_getCookie("ibp_baseURI") !== false)
{   // GRAB THE BASEURI FROM THE COOKIE
    ibp_baseURI = unescape(ibp_getCookie("ibp_baseURI"));
}

// DETERMINE IF A PHONE NUMBER WAS PREVIOUSLY SET BY AN ENTRY PAGE ON THIS WEBSITE
ibp_entrypage = (ibp_getCookie("_ibp_phone_number") !== false ? "false" : "true");

// DECLARE AND INSTANTIATE THE REGULAR EXPRESSION OBJECT FOR REFERRAL URL PARSING
var ibp_referral_regex = new RegExp("^https?:\/\/[^\/]+\/.*?$", "i");

// DETERMINE IF THE REFERRER HAS WHAT WE NEED
if (ibp_referral_regex.test(ibp_referrer))
{   // CREATE A SUITABLE COOKIE EXPIRATION TIMESTAMP
    var ibp_date = new Date();
    ibp_date.setTime(ibp_date.getTime() + 86400000);  // 24 HOURS IN THE FUTURE

    // CREATE A CLIENT-SIDE COOKIE USED TO TRACK IF THE VISITOR MOVES TO A DIFFERENT PAGE ON THE WEBSITE BEFORE UTILIZING OUR PRODUCT
    ibp_setCookie("ibp_referrer", ibp_referrer, ibp_date)
}

// DETERMINE IF THE REFERRER HAS WHAT WE NEED
if (ibp_referral_regex.test(ibp_baseURI))
{   // CREATE A SUITABLE COOKIE EXPIRATION TIMESTAMP
    var ibp_date = new Date();
    ibp_date.setTime(ibp_date.getTime() + 86400000);  // 24 HOURS IN THE FUTURE

    // CREATE A CLIENT-SIDE COOKIE USED TO TRACK IF THE VISITOR MOVES TO A DIFFERENT PAGE ON THE WEBSITE BEFORE UTILIZING OUR PRODUCT
    ibp_setCookie("ibp_baseURI", ibp_baseURI, ibp_date)
}

// ENCODE THE REFERRING URL FOR USE IN PASSING AS A URL PARAMETER
ibp_referrer = escape(ibp_referrer);

// ENCODE THE BASEURI FOR USE IN PASSING AS A URL PARAMETER
ibp_baseURI = escape(ibp_baseURI);

// FUNCTION USED IN CONJUNCTION WITH ANCHOR TAGS TO DYNAMICALLY APPEND REFERRER INFORMATION
// <a href="http://www.ifbyphone.com/clickto_getphone.php?click_id=XXX" target="_blank" onclick="javascript:ibp_addReferrer(this);">Click To Call Me Now!</a>
function ibp_addReferrer(obj)
{   // DETERMINE IF THE DOM OBJECT REFERENCE IS AN ANCHOR ELEMENT BY VERIFYING ITS HREF PROPERTY EXISTS
    if (typeof(obj.href) != 'undefined')
    {   // DETERMINE IF THERE IS A REFERRER, AND WHETHER OR NOT IT'S ALREADY A PART OF THE HREF PROPERTY
        if (obj.href.indexOf('ibp_referrer') == -1 && ibp_referrer.length > 0)
        {   // APPEND THE REFERRER TO THE HREF PROPERTY
            obj.href += "&ibp_referrer=" + ibp_referrer;
        }
    }
}

// FUNCTION USED TO SET A NEW COOKIE
function ibp_setCookie(name, value)
{   // GRAB BOTH AN ARRAY OF PARAMETERS AND HOW MANY PARAMETERS THERE ARE
    argv = arguments;
    argc = arguments.length;

    // PROCESS OPTIONAL PARAMETERS OR SET THEIR VALUES TO DEFAULT
    expires = (argc>2) ? argv[2] : null;
    domain = (argc>4) ? argv[4] : null;
    secure = (argc>5) ? argv[5] : false;

    // CREATE A NEW COOKIE WITH WHATEVER PARAMETERS WERE SPECIFIED
    document.cookie = name + "=" + escape(value) +
        ((expires === null) ? "" : ("; expires=" + expires.toUTCString())) +
        "; path=/" +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((secure === true) ? "; secure" : "");
}

// FUNCTION USED TO GRAB A COOKIE FROM AN THE COOKIE LIST
function ibp_getCookie(name)
{   // DEFINE THE PATTERN TO SEARCH FOR IN THE COOKIE LIST WHICH IS THE COOKIE NAME
    arg = name + "=";

    // DETERMINE HOW LONG THE PATTERN IS
    alen = arg.length;

    // DETERMINE HOW LONG THE COOKIE LIST IS
    clen = document.cookie.length;

    // DEFINE A COOKIE LIST CHARACTER INDEX TRACKER
    i = 0;

    // LOOP WHILE THE CURRENT INDEX IS LESS THAN THE LENGTH OF THE COOKIE LIST
    while (i < clen)
    {   // SET A TEMPORARY LENGTH WITHIN THE COOKIE LIST BASED ON THE COOKIE NAME LENGTH
        j = i + alen;

        // DETERMINE IF THE COOKIE NAME HAS BEEN FOUND
        if (document.cookie.substring(i, j) == arg)
        {   // GRAB THE NEXT AVAILABLE INDEX OF A SEMI-COLON TO KNOW WHERE THE END OF THE COOKIE VALUE IS
            endstr = document.cookie.indexOf(";", j);

            // DETERMINE IF A SEMI-COLON WAS FOUND
            if (endstr == -1)
            {   // USE THE LENGTH OF THE COOKIE LIST AS THE ENDING POINT
                endstr = document.cookie.length;
            }

            // RETURN THE UNESCAPED COOKIE VALUE
            return unescape(document.cookie.substring(j, endstr));
        }

        // GRAB THE NEXT AVAILABLE SPACE THAT SEPARATES COOKIES
        i = document.cookie.indexOf(" ", i) + 1;

        // DETERMINE IF THERE ARE MORE COOKIE TO PROCESS
        if (i === 0)
        {   //THERE ARE NO MORE COOKIES TO PROCESS
            break;
        }
    }

    // COOKIE NOT FOUND
    return false;
}

function ibp_logGACID(_ibp_ST_ID) {
    _ibp_ST_ID = (_ibp_ST_ID !== undefined && _ibp_ST_ID !== '') ? _ibp_ST_ID : null;
    if (typeof ga != "undefined" && !ibp_gaExecuted && _ibp_ST_ID !== null) {
        ibp_gaExecuted = true;
        ga(function(tracker) {
            var _ibp_ga_universal = tracker.get('clientId');
            document.write('<script type="text/JavaScript" src="//'+_ibp_server+'.ifbyphone.com/keyword_replacement.php?logGUID=1&public_key=' + _ibp_public_key + '&ga_universal_id=' + _ibp_ga_universal + '&log_id=' + _ibp_ST_ID + '"></scr' + 'ipt>');
        });
    }
}