## Warning
Master branch maybe *unstable*. The latest stable branch is [1.0.0](https://github.com/Srirangan/notifer.js/tree/1.0.0).

## Notifier.js
Javascript library for Gnome / Growl type non-blocking notifications.

## Links
* [Demo](http://www.srirangan.net/assets/demos/notifier.js/index.html)
* [Download](https://github.com/downloads/Srirangan/notifer.js/notifier.js.zip)

## Usage Guide

The master branch may be unstable from time to time. Use the downloadable archive for production.

Hack away, experiment on the master branch. Feel free to clone, fork and send pull requests.

## Include Jquery and Notifier.js

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
    <script type="text/javascript" src="notifier.js"></script>

## Trigger Notifications

    // Success notifs
    Notifier.success('User registration successful')
    Notifier.success('It\'s a boy!', 'Congrats!')

    // Info notifs
    Notifier.info('You have been informed!')
    Notifier.info('Tomorrow is another day', 'Words of wisdom')

    // Warning notifs
    Notifier.warning('I warn you Ceasar!')
    Notifier.warning('I warn you Ceasar!', 'Assassination Warning')

    // Error notifs
    Notifier.error('Something may be wrong..')
    Notifier.error('Something may be wrong..', 'Ummm..')

    // Notif with custom icon and timeout
    Notifier.notify('Babe I\'m gonna leave you', 'Led Zeppelin', './icons/Music.png', 2000)

    // HTMLs are escaped, XSS attempts are blunted
    Notifier.error('<script>alert(\'xss attempt blunted\')</script>')

## Configure

  Default behavior of NotifierJS can be modified without having to muddle through the code.

  Here's an example of reducing the default timeout and changing the position of the notifications:

    <script>
      NotifierjsConfig.defaultTimeOut = 250;
      NotifierjsConfig.position = ["bottom", "right"];
    </script>
