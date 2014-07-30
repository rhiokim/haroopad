Instructions for Kohana + Facebook Demo
=======================================

By: [Chris Benard](http://chrisbenard.net)
------------------------------------------

### Created for the Dallas PHP Users Group Meeting

#### January 11, 2011

Follow these steps:
-------------------

1.  Copy the entire directory structure to your web document root.
    e.g. application directory should be in `/`, relative to the document root

2.  Create a Facebook application at [](http://www.facebook.com/developers/)http://www.facebook.com/developers/

3.  Import the included `kohanafacebook.sql` file into a MySQL database,
    using PHPMyAdmin's import feature, the import feature of your preferred
    MySQL IDE, or the mysql command line tool.

4.  Edit `/config.inc.php` and fill in the appropriate values, from your
    Facebook application's settings page and from your MySQL Database
    into which you just imported the test settings.

5.  Edit `.htaccess` to reflect the correct RewriteBase. This should match the
    baseurl in `/config.inc.php`. If you host it at `http://site.com/`, the `baseurl`
    and `RewriteBase` should be `/`. If you host it at `http://site.com/kohana/`,
    the baseurl and RewriteBase should be /kohana/.

6.  Get your Facebook numeric ID. If you go to your Facebook page and it
    looks like `http://facebook.com/FriendlyUserName`, go to
    `http://graph.facebook.com/FriendlyUserName` - This will give you your numeric
    ID. If your page looks like `http://facebook.com/1234567890`, `1234567890` is
    your numeric Facebook ID.

7.  Add your Facebook numeric ID into the admins table in the MySQL database
    so that you can be an admin on the site. Feel free to remove the others
    in there (mine).

8.  _(Optional)_ Delete the `kohanafacebook.sql` file in your web root so that
    potential attackers cannot access it via the website.
