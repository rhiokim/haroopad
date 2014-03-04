# keymage.js

Keymage is a small library for handling key bindings in JavaScript.

It was written out of the fact that no other library supported combination of
all necessary features and their design made it easier to write a new one.

[Check tests](https://rawgithub.com/piranha/keymage/master/test/test.html)

## Features

 - Simple language for defining bindings
 - Key sequences (a-la Emacs chords)
 - Nested scopes
 - Default modifier (`defmod` key which is `command` on OS X and `control`
   elsewhere)
 - Ability to prevent defaults for whole sequence


## Usage

Include `keymage.min.js` in your page:

```html
<script src="keymage.min.js"></script>
```

There are no dependencies. It is possible to use library as a simple JS module
or as an AMD module.

It worth to note that [Keymage is on cdnjs](http://cdnjs.com/libraries/keymage/)
and you can use it without downloading:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/keymage/1.0.1/keymage.min.js"></script>
```


## Defining shortcuts

Keymage exposes a single function, `keymage`:

```javascript
// bind on 'a'
keymage('a', function() { alert("You pressed 'a'"); });

// returning false prevents default browser reaction (you can always use
// e.preventDefault(), of course)
keymage('ctrl-e', function() { return false; });

// binding on 'defmod' binds on Command key on OS X and on Control key in other
// systems
keymage('defmod-j', function() { alert("I am fired"); });
```

Handler function receives two arguments: the original event and the context so
you can understand what and why was fired.

The context contains those properties:

 - `shortcut` is a string you've originally provided for binding
 - `scope` is a scope which is currently active
 - `definitionScope` is a scope where this shortcut was defined

```javascript
keymage('alt-c', function(e, ctx) {
    console.log(ctx.shortcut, ctx.scope, ctx.definitionScope);
});

// -> "alt-c", "", ""
```


## Sequences

Keymage supports key sequences:

```javascript
keymage('ctrl-j k', function() { alert("Nice!"); });
```

For this to fire you have to first press both `ctrl` and `j`, and then
`k`. Here's the catch though: `ctrl-j` in most browsers means "open
downloads". Which will break your sequence obviously.

And while I encourage you to not override browser hotkeys, let's imagine you
have to do that. For this, you can pass an option object as last parameter,
having 'preventDefault' property set to `true`:

```javascript
keymage('ctrl-t ctrl-j k',
        function() { alert("wow"); },
        {preventDefault: true});
```

This option will prevent default on every key press which looks like a valid
part of a bound sequence (including the one triggering your handler). And in
this case it's perfectly legitimate - you're overriding `ctrl-j` in the middle
of sequence, so common browser hotkey will still work.


## Scopes

Keymage support nested scopes. This means that your application can have few
areas where you can gradually have more and more specific shortcuts. It works
like this:

```javascript
// You can skip scope argument if you want global work-always shortcut
keymage('ctrl-j q', function() { alert("Default scope"); });

// This will fire after "keymage.setScope('chat')"
keymage('chat', 'ctrl-j w', function() { alert("Chat scope"); });

// This will fire after "keymage.setScope('chat.input')"
keymage('chat.input', 'ctrl-j e', function() { alert("Chat.input scope"); });
```

You can control scopes with helpful `pushScope` and `popScope` methods. This way
your nested view (or whatever is enabling nested scope) doesn't need to know
about parent scope:

```javascript
keymage.pushScope('chat') // scope is 'chat'

keymage.pushScope('input') // scope is 'chat.input'

keymage.popScope() // scope is 'chat'

keymage.pushScope('deep')
keymage.pushScope('deeper') // scope is 'chat.deep.deeper'

// way to jump out of deep scoping
keymage.popScope('chat') // scope is ''
```

`pushScope` returns resulting scope and `popScope` returns topmost scope it
removed (so with parameters it's the one you've asked to remove).

Note that calling `popScope` with name of a scope which is repeated few times
will pop topmost one, i.e.:

```javascript
keymage.setScope('this.scope.is.deep.scope')
keymage.popScope('scope') // scope is 'this'
```


## Options

Last and optional argument to `keymage` function is an option object. Here is a
list of possible options:

 - `preventDefault`: when `true`, calls `event.preventDefault()` on every key
   press which looks like a part of defined sequence.

 - `context`: binding handler will be called with provided object as a context.
