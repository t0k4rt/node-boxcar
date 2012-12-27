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

    this.provider_url = '/devices/providers/' + providerKey + '/notifications';
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
    }

    Object.keys(_args).forEach(function(key) {
        args[key] = _args[key];
    });

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

        res.on('end', function(d) {
            callback(null, res.statusCode);
        });
    });

    req.write(query);
    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
}


//Notify query
Boxcar.prototype.notify = function (_args, callback) {
    var args = {
        "email": "",
        "notification[message]": "",
        "notification[from_screen_name]": "",
        "notification[from_remote_service_id]": "",
        "notification[redirect_payload]": "",
        "notification[source_url]": "",
        "notification[icon_url]": ""
    }

    Object.keys(_args).forEach(function(key) {
        args[key] = _args[key];
    });

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

        res.on('end', function(d) {
            callback(null, res.statusCode);
        });
    });

    req.write(query);

    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
}


//Broadcast query
Boxcar.prototype.broadcast = function (_args, callback) {
    var args = {
        "email": "",
        "notification[message]": "",
        "notification[from_screen_name]": "",
        "notification[from_remote_service_id]": "",
        "notification[redirect_payload]": "",
        "notification[source_url]": "",
        "notification[icon_url]": "",
        "secret": this.providerSecret
    }

    Object.keys(_args).forEach(function(key) {
        args[key] = _args[key];
    });

    if (!args['email']) {
        throw new Error('Must supply a valid email');
        return;
    };

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

        res.on('end', function(d) {
            callback(null, res.statusCode);
        });
    });

    req.write(qs.stringify(args));
    req.end();

    req.on('error', function(e) {
        callback(e, null);
    });
}



