var Boxcar = require('node-boxcar');
var key = 'AagXreNW1r8Ib9HQHMnO';
var secret = 'qSCpuH1ep6wLhU0MLPxbFZWqe0io7ighMKLXTTOO';


var provider = new Boxcar.provider(key, secret)

provider.notify({
	'email': 'assouad@kairosagency.com',
    "notification[message]": "test"

}, function(err, info) {
	if (err) {
		throw err;
	}
	console.log(info);
});
