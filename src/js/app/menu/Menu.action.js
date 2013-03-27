define(function() {

	var gui = require('nw.gui');
	var Action = new gui.Menu();

	var separator = new gui.MenuItem({
					          type: 'separator'
						    	});

	Action.append(
    new gui.MenuItem({
      label: 'Copy HTML'
    })
	);
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);
	
	Action.append(
    new gui.MenuItem({
      label: 'Insert'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Select'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Convert'
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Strong'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Emphasize'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Inline Code'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Fenced Code'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Strikethrough'
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Image'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Link'
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Table'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Table Row'
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Table Cell'
    })
  );
	return new gui.MenuItem({ label: 'Action', submenu: Action });
});