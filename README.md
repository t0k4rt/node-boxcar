## Node Boxcar

Nodejs wrapper for boxcar API

##Installation

npm

    $ npm install node-boxcar

github

    $ git clone git@github.com:t0k4rt/node-boxcar.git

## Usage :

    See example.js



## Warnings

Boxcar errors codes aren't very explicits, so be carefull !

* subscribe method :
** When the is already registered, it raises a 401 error
** when the user doesn't exists, it raises a 404 error
* broadcast method :
** error 401 is raised when a provider is set as "generic" so you can't broadcast





