What is Resource-Tree?
----------------------

Simply put, Resource-Tree is a file resource management
system. Resource-Tree simplifies the process of turning data into a
usable form. It creates an easy to access tree from files and
directories; and also provides a convenient means for "freeing" data
after use.

Code Example
------------

Where `/path/to/file/or/dir/` has the directory structure:

    dir
     |- branch
     |   |- sub-branch
     |   |   |- leaf.png
     |   |   |- acorn.png
     |   |
     |   |- other-sub-branch
     |       |- ...
     |    
     |- other-branch
         |- ...

The following code creates a tree of readily usable images by
recursively iterating through directories to find files. For each file
found, the `LOAD-FUNCTION` is called. In this case it's
`LOAD-IMAGE`. If the `LOAD-FUNCTION` returns anything other than `NIL`
the value returned is bound in a hash-table to a key which is a
keyword corresponding to `FILE-NAME` with everything after the first
full-stop truncated and all spaces and underscores replaced with a
hyphen. All directories turn into branches when `LOAD-PATH` is called
with the recursive flag set to `T` (set by default). The same
"path-name to keyword" methodology is applied to directories.

    (defun load-image (file-name)
      (unless (string= "png" (pathname-type file-name))
        (return-from load-image))
      (let ((image (il:gen-image)))
        (il:bind-image image)
        (il:load-image file-name)
        image))

    (with-resource-tree (tree :load-function #'load-image
                              :free-function #'il:delete-images)
      (load-path tree "/path/to/file/or/dir/")
      (with-nodes (leaf acorn) (node tree :branch :sub-branch)
        (il:bind-image leaf)
        (il:flip-image)
        ...))

`WITH-RESOURCE-TREE` creates an instance of `RESOURCE-TREE` and
assigns it to `TREE` with the remaining arguments being initialisation
arguments for the instance. `LOAD-PATH` loads a file or directory into
the tree. The optional `:PARENT-NODE-PATH` key specifies the path to
the parent node using a list. `LOAD-PATH` may be called more than
once. `WITH-NODES` creates variables bound to the specified leaves of
the provided node. `NODE` is used to retrieve a single node (a leaf or
branch) from the tree path given to it. After the code is run, `FREE`
is called on `TREE` which frees all nodes in tree using
`FREE-FUNCTION` _if_ `FREE-FUNCTION` was set.

Dependencies
------------

Prerequisites:

* None

Optional:

* xlUnit (for unit tests)

Installation
------------

### On Unix-like Systems

Extract the source to the desired directory. Then, while in the
appropriate ASDF systems directory execute the following command,
where `../path/to/resource-tree` is obviously replaced as suitable:

    find ../path/to/resource-tree -name '*.asd' -exec ln -s '{}' \;
