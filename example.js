var Boxcar = require('node-boxcar');
var key = 'your key';
var secret = 'your secret';
var email = 'your_email@email.com';


var provider = new Boxcar.provider(key, secret);


//subscribe to provider
provider.subscribe({
    'email': email
}, function(err, info) {
    if (err) {
        throw err;
    }
    console.log(info);
});


//notify single user
provider.notify({
    'email': email,
    'message': 'your message',
    'from_screen_name': 'Your name',
    'source_url': 'http://google.com',
    'icon_url': 'http://cdn1.iconfinder.com/data/icons/systematrix/Yahoo.png'
}, function(err, info) {
    if (err) {
        throw err;
    }
    console.log(info);
});


//broadcast to all users
provider.broadcast({
    'message': 'your message',
    'from_screen_name': 'Your name',
    'source_url': 'http://google.com',
    'icon_url': 'http://cdn1.iconfinder.com/data/icons/systematrix/Yahoo.png'
}, function(err, info) {
    if (err) {
        throw err;
    }
    console.log(info);
});