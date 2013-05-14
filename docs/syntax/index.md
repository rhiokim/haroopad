## Standard Markdown

### BLOCK ELEMENTS
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

##### HARD LINE BREAKS
End a line with two or more spaces:

    Roses ar red,  
    Violets are blue.

### SPAN ELEMENTS

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

--- 

Standard Markdown Syntax References : [http://daringfireball.net/projects/markdown/syntax](http://daringfireball.net/projects/markdown/syntax)