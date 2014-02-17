var MODS = ['ctrl', 'shift', 'alt', 'meta'];
function fire(key) {
    var e = document.createEvent('Event');

    if (typeof keystring === 'string') {
        key = keymage.parse(key);
    }

    e.initEvent('keydown', true, true);
    e.keyCode = key.code;
    for (var i = 0; i < MODS.length; i++) {
        var mod = MODS[i];
        if (key[mod]) {
            e[mod + 'Key'] = true;
        }
    }
    document.dispatchEvent(e);
}

wru.test([
    {name: 'Single shortcut',
     test: function() {
         var count = 0;
         keymage('a', function() { count++; });

         fire({code: 65});
         wru.assert('pressed', count === 1);

         fire({code: 65});
         wru.assert('pressed', count === 2);
     }},

    {name: 'Sequence',
     test: function() {
         var count = 0;
         keymage('ctrl-a a', function() { count++; });

         fire({code: 65, ctrl: true}); fire({code: 65});
         wru.assert('Sequence works', count === 1);

         // failing attempts
         fire({code: 65, ctrl: true}); fire({code: 66});
         fire({code: 65, ctrl: true}); fire({code: 65, ctrl: true}); fire({code: 65});
         wru.assert('C-a b & C-a C-a a - do not trigger sequence', count === 1);

         // still works
         fire({code: 65, ctrl: true}); fire({code: 65});
         wru.assert('But it still works', count === 2);
     }},

    {name: 'Scopes',
     test: function() {
         var count = 0;
         var handler = function() { count++; };
         keymage('ctrl-a a', handler);
         keymage('chat', 'ctrl-a b', handler);
         keymage('chat.input', 'ctrl-a c', handler);

         keymage.pushScope('chat');
         fire({code: 65, ctrl: true}); fire({code: 65});
         wru.assert('C-a a - triggers, chat scope', count === 1);
         fire({code: 65, ctrl: true}); fire({code: 66});
         wru.assert('C-a b - triggers, chat scope', count === 2);
         fire({code: 65, ctrl: true}); fire({code: 67});
         wru.assert('C-a c - does not trigger, chat scope', count === 2);

         keymage.pushScope('input');
         fire({code: 65, ctrl: true}); fire({code: 67});
         wru.assert('C-a c - triggers, chat.input scope', count === 3);

         keymage.popScope('chat');
         fire({code: 65, ctrl: true}); fire({code: 65});
         wru.assert('C-a a - triggers, no scope', count === 4);
         fire({code: 65, ctrl: true}); fire({code: 66});
         wru.assert('C-a b - does not trigger, no scope', count === 4);

         keymage.pushScope('loading');
         keymage.popScope();
         wru.assert('popScope works', keymage.getScope() === '');
     }}
]);
