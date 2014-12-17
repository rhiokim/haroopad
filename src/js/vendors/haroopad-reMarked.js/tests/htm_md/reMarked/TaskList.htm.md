TaskList
========

Code tasks are constructive comments in the code that are prefixed with a tag. Here are some examples of code tasks in ruby:

```
# TODO: This is a todo item that needs to be done urgently!
# BUG Something wrong is happening...
# NOTE - This method is used for a specific reason.
```

Obviously real code tasks are a lot more constructive than the examples I gave above.

TaskList parses code files and lists code tasks.

Installation
------------

TaskList is provided as a gem, so the installation process is as simple as this:

```
% [sudo] gem install task-list
```

> **Note**: `%` is the prompt and `sudo` (without the square brackets) is not needed if you use RVM.

Features:
---------

As stated above, TaskList lists code tags that it finds in code passed to it. Here are the supported tags:

* `TODO`
* `FIXME`
* `NOTE`
* `BUG`
* `CHANGED`
* `OPTIMIZE`
* `XXX`
* `!!!`

Also, TaskList will ignore the files that are under certain folders like `log` or `coverage`. Finally, TaskList will ignore files with certain extensions like images and SQLite databases.

Usage:
------

The TaskList comes with a command-line script called `tl` which takes one argument and only one argument. This argument can be one of two things:

* a file
* a folder

If a file is passed, TaskList will parse this file to find code tags. On the other hand, if a folder is passed, TaskList will recursively parse all the files under that folder to find code tags. Here are some examples:

```
% tl task-list.rb
% tl task-list/
% tl task-list/task-list.rb
% tl .
```

All the calls to `tl` shown above are valid.