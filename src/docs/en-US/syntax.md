# Standard Markdown

* \\   backslash
* \`   backtick
* \*   asterisk
* \_   underscore
* \{\}  curly braces
* \[\]  square brackets
* \(\)  parentheses
* \#   hash mark
* \+   plus sign
* \-   minus sign (hyphen)
* \.   dot
* \!   exclamation mark

##### HEADERS

    This is an H1
    =============
    
    This is an H2
    -------------

Any number of underlining =’s or -’s will work.

    # This is an H1
    
    ## This is an H2
    
    ###### This is an H6

##### BLOCKQUOTES
    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

    > ## This is a header.
    > 
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    > 
    > Here's some example code:
    > 
    >     return shell_exec("echo $input | $markdown_script");

##### LISTS
    *   Red
    *   Green
    *   Blue

is equivalent to:

    +   Red
    +   Green
    +   Blue

and:

    -   Red
    -   Green
    -   Blue

Ordered lists use numbers followed by periods:

    1.  Bird
    2.  McHale
    3.  Parish

##### CODE BLOCKS
    
    This is a normal paragraph:
    
        This is a code block.
        
One level of indentation — 4 spaces or 1 tab — is removed from each line of the code block. For example, this:
    
    Here is an example of AppleScript:
    
        tell application "Foo"
            beep
        end tell

##### HORIZONTAL RULES
    * * *
    
    ***
    
    *****
    
    - - -
    
    ---------------------------------------

##### LINKS
    This is [an example](http://example.com/ "Title") inline link.
    
    [This link](http://example.net/) has no title attribute.
    
Here’s an example of reference links in action:

    I get 10 times more traffic from [Google][] than from
    [Yahoo][] or [MSN][].
    
      [google]: http://google.com/        "Google"
      [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
      [msn]:    http://search.msn.com/    "MSN Search"

##### EMPHASIS

    *single asterisks*
    
    _single underscores_
    
    **double asterisks**
    
    __double underscores__

##### CODE

    Use the `printf()` function.

##### IMAGES

    ![Alt text](/path/to/img.jpg)
    
    ![Alt text](/path/to/img.jpg "Optional title")

    ![Alt text][id]
    [id]: /path/to/img.jpg "Optional title"

##### EMAIL

    Contact to <example@example.com>.

# Multi Markdown (GFM)

> ref: https://help.github.com/articles/github-flavored-markdown

##### Newlines

The next paragraph contains two phrases separated by a single newline character

    Haroopad
    The next document processor

**becomes**

Haroopad  
The next document processor

##### Multiple underscores in words

It is not reasonable to italicize just part of a word, especially when you're dealing with code and names often appear with multiple underscores. Therefore, GFM ignores multiple underscores in words.

    perform_complicated_task
    do_this_and_do_that_and_another_thing

**becomes**

perform_complicated_task
do_this_and_do_that_and_another_thing

##### URL autolinking

GFM will autolink standard URLs, so if you want to link to a URL (instead of setting link text), you can simply enter the URL and it will be turned into a link to that URL.

##### Fenced code blocks

Markdown converts text with four spaces at the front of each line to code blocks. GFM supports that, but we also support fenced blocks. Just wrap your code blocks in ``` and you won't need to indent manually to trigger a code block. Keep in mind that both types of code blocks need to have a blank line before them:

Here's an example:

```
function test() {
  console.log("notice the blank line before this function?");
}
```

##### Syntax highlighting

We take code blocks a step further and add syntax highlighting if you request it. In your fenced block, add an optional language identifier and we'll run it through syntax highlighting. For example, to syntax highlight Ruby code:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

