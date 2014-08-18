require(['../../idbstore.js'], function(IDBStore){
	
	var objStore;
	
	var nodeCache = {};
	
	function init(){
		
		// create a store ("table")
	  objStore = new IDBStore({
			storeName: 'objectstore',
			keyPath: 'id',
			autoIncrement: true,
			onStoreReady: refreshTable
		});
		
		// create references for some nodes we have to work with
		['submit', 'results-container'].forEach(function(id){
			nodeCache[id] = document.getElementById(id);
		});
		
		// and listen to the form's submit button.
		nodeCache.submit.addEventListener('click', enterData);
	}
	
	function refreshTable(){
		objStore.getAll(listItems);
	}
	
	function listItems(data){
		var header, tpl,
			props = ['id'],
			content = '';
		
		data.forEach(function(item){
			for(var prop in item){
				if(props.indexOf(prop) < 0){
					props.push(prop);
				}
			}
		});
		
		header = '<tr><th>' + props.join('</th><th>') + '</th></tr>';
		tpl = '<tr><td>{' + props.join('}</td><td>{') + '}</td></tr>';
		
		data.forEach(function(item){
			content += tpl.replace(/\{([^\}]+)\}/g, function(_, key){
				return item[key] || '';
			});
		});
		
		nodeCache['results-container'].innerHTML = '<table>' + header + content + '</table>';
	}
	
	function enterData(){
		// read data from inputs
		var propName, value, hasData,
			data = {},
			count = 4;
		
		while(--count){
			propName = document.getElementById('prop_' + count).value.trim();
			if(propName.length){
				hasData = true;
				value = document.getElementById('value_' + count).value.trim();
				// Don't do this at home. This is just a very dirty hack to 'guess' what
				// type of data you just entered. If you do stuff like this in production
				// code, UNICORNS WILL DIE. You have been warned.
				data[propName] = ['{', '['].indexOf(value.substring(0,1)) !== -1 ? eval('(' + value + ')') : parseInt(value, 10) || value;
			}
		}
		if(!hasData){
			return;
		}
		
		// and store them away.
		objStore.put(data, refreshTable);
	}
	
	function clear(){
		objStore.clear(refreshTable);
	}
	
	// export some functions to the outside to
	// make the onclick="" attributes work.
	window.app = {
		clear: clear
	};
	
	// go!
	init();
	
});