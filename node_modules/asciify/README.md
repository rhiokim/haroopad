ASCIIFY
=======
A hybrid npm module and CLI for turning plain text into ascii art. A pure JS figlet tool to make all your banners better.

                                        __________________________  ______________
                                        \__    ___/\_   _____/\   \/  /\__    ___/
    Takes text, awesomizes it, returns    |    |    |    __)_  \     /   |    |   
                                          |    |    |        \ /     \   |    |   
                                          |____|   /_______  //___/\  \  |____|   
                                                           \/       \_/           

[![NPM](http://nodei.co/npm/asciify.png)](http://nodei.co/npm/asciify/)

[![Dependency Status](https://david-dm.org/olizilla/asciify.png)](https://david-dm.org/olizilla/asciify)
[![Build Status](https://travis-ci.org/olizilla/asciify.png)](https://travis-ci.org/olizilla/asciify)

## Getting started

Install [Node.js](http://nodejs.org/) (tested on 0.8 and 0.10)

Install `asciify` and gasp:
    
    npm install -g asciify

    asciify "Boom" -f larry3d
     ____                                   
    /\  _`\                                 
    \ \ \L\ \    ___     ___     ___ ___    
     \ \  _ <'  / __`\  / __`\ /' __` __`\  
      \ \ \L\ \/\ \L\ \/\ \L\ \/\ \/\ \/\ \ 
       \ \____/\ \____/\ \____/\ \_\ \_\ \_\
        \/___/  \/___/  \/___/  \/_/\/_/\/_/
                                        

For a really good time call:

    asciify -a "All The Fonts!"


Or use it as a node module:

    asciify('Awesome', function(err, res){ console.log(res) });
       _____                                                     
      /  _  \  __  _  __  ____    ______  ____    _____    ____  
     /  /_\  \ \ \/ \/ /_/ __ \  /  ___/ /  _ \  /     \ _/ __ \ 
    /    |    \ \     / \  ___/  \___ \ (  <_> )|  Y Y  \\  ___/ 
    \____|__  /  \/\_/   \___  >/____  > \____/ |__|_|  / \___  >
            \/               \/      \/               \/      \/ 


And again with the font option:

    asciify('Fonts?', {font:'3-d'}, function(err, res){ console.log(res) });

     ********                     **            **** 
    /**/////                     /**           **//**
    /**        ******  *******  ******  ******/** /**
    /*******  **////**//**///**///**/  **//// //  ** 
    /**////  /**   /** /**  /**  /**  //*****    **  
    /**      /**   /** /**  /**  /**   /////**  //   
    /**      //******  ***  /**  //**  ******    **  
    //        //////  ///   //    //  //////    //   


Now with color support thanks to [chalk](https://github.com/sindresorhus/chalk) and @jlowgren

  asciify(
    'Make it come out green', 
    {color:'green'}, 
    function(err, res){ console.log(res)}
  );

**Bonus method**

    asciify.getFonts(function (err, fonts) { fonts.forEach( console.log ) )

## Thanks to

- [figlet-js][] which does the magic
- [optimist][], smoothing the choppy waters of CLI argument parsing.
- [node-tap][], robot friendly test codez, and all the wonders of npm.

[figlet-js]: https://github.com/scottgonzalez/figlet-js
[optimist]: https://github.com/substack/node-optimist
[node-tap]: https://github.com/isaacs/node-tap

## Developing

```shell
 git submodule init
 git submodule update
 npm install
 npm test
```

## Release History

* 1.3.5 - Fix chalk dependency mix up
* 1.3.4 - Add `color` option to pick your font color (DO NOT USE)
* 1.3.3 - Add maxWidth option to allow output truncation
* 1.3.2 - Update figlet-js with falsy input validation
* 1.3.1 - Update figlet-js with unknown char fixes
* 1.3.0 - Adds input validation and a getFonts method
* 1.2.0 - Asciify now a good node citizen, callback takes an error as first arg.
* 1.0.1 - IT BEGINS. ASCII BANNERS NOW MANDTORY.
