var qs = require('querystring');
var https = require('https');


exports.provider = function (providerKey, providerSecret) {
    return new Boxcar(providerKey, providerSecret);
};

//constructor
function Boxcar(providerKey, providerSecret) {
    if (!providerKey) {
            throw new Error('Must supply a valid API key');
        return;
    }

    this.providerKey = providerKey;
    this.providerSecret = providerSecret;

    this.provider_url = '/devices/providers/' + this.providerKey + '/notifications';
    this.options = {
        hostname: 'boxcar.io',
        port: 443,
        method: 'POST'
    };
};



// Subscribe query
Boxcar.prototype.subscribe = function (_args, callback) {

    var args = {
        "email": ""
    };

    Object.keys(_args).forEach(function(key) {
        if(key !== 'email')
            args["notification["+key+"]"] = _args[key];
        else
            args[key] = _args[key];
    });

    //email is required
    if (!args['email']) {
        throw new Error('Must supply a valid email');
        return;
    };

    var query = qs.stringify(args);

    var options = this.options;
    options['path'] = this.provider_url+'/subscribe';
    //IMPORTANT : content length mandatory
    options['headers'] = {
        'Content-length': query.length
    };


    var req = https.request(options, function(res) {
        res.on('data', function(d) {

        });

        res.on('end', function() {
            responde_handler(res.statusCode, callback);
        });
    });

    req.write(query);
    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
};


//Notify query
Boxcar.prototype.notify = function (_args, callback) {
    var args = {
        "email": "",
        "notification[message]": "",
        "notification[from_screen_name]": "",
        "notification[from_remote_service_id]": "",
        "notification[source_url]": "google.fr",
        "notification[icon_url]": ""
    };

    Object.keys(_args).forEach(function(key) {
        if(key !== 'email')
            args["notification["+key+"]"] = _args[key];
        else
            args[key] = _args[key];
    });

    //email is required
    if (!args['email']) {
        throw new Error('Must supply a valid email');
        return;
    };

    var query = qs.stringify(args);

    var options = this.options;
    options['path'] = this.provider_url+'/';
    options['headers'] = {
        'Content-length': query.length
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {

        });

        res.on('end', function() {
            responde_handler(res.statusCode, callback);
        });
    });

    req.write(query);

    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
};


//Broadcast query
Boxcar.prototype.broadcast = function (_args, callback) {
    var args = {
        "notification[message]": "",
        "notification[from_screen_name]": "",
        "notification[from_remote_service_id]": "",
        "notification[source_url]": "",
        "notification[icon_url]": "",
        "secret": this.providerSecret
    };

    Object.keys(_args).forEach(function(key) {
        if(key !== 'email')
            args["notification["+key+"]"] = _args[key];
        else
            args[key] = _args[key];
    });

    //secret key is required
    if (!args['secret']) {
        throw new Error('Must supply a secret key');
        return;
    };


    var query = qs.stringify(args);

    var options = this.options;
    options['path'] = this.provider_url+'/broadcast';
    options['headers'] = {
        'Content-length': query.length
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {

        });

        res.on('end', function() {
            responde_handler(res.statusCode, callback);
        });
    });

    req.write(qs.stringify(args));
    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
};



function responde_handler(statusCode, callback) {
    switch(statusCode)
    {
        case 200:
            callback(null, "api call successfull");
            break;
        // HTTP status code of 400, it is because you failed to send the proper parameters
        case 400:
            callback(new Error('400 error: Incorrect parameters passed'), null);
            break;
        // For request failures, you will receive either HTTP status 403 or 401.

        // HTTP status code 401's, it is because you are passing in either an invalid token,
        // or the user has not added your service. Also, if you try and send the same notification
        // id twice.
        case 401:
            callback(new Error('401 error: Request failed (check your parameters)'), null);
            break;
        case 403:
            callback(new Error('403 error: Request failed (General)'), null);
            break;
        default:
            callback(new Error(statusCode + ' error: Unknown response '), null);
    }
}


