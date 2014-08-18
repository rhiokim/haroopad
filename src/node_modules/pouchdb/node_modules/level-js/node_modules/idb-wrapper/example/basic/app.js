require(['../../idbstore.js'], function(IDBStore){
	
	var tpls = {
		row: '<tr><td>{customerid}</td><td><input id="lastname_{customerid}" value="{lastname}"></td><td><input id="firstname_{customerid}" value="{firstname}"></td><td><button onclick="app.deleteItem({customerid});">delete</button><button onclick="app.updateItem({customerid});">update</button></td></tr>',
		table: '<table><tr><th>ID</th><th>Last Name</th><th>First Name</th><th></th></tr>{content}</table>'
	};
	
	var customers;
	
	var nodeCache = {};
	
	function init(){
		
		// create a store ("table") for the customers
		customers = new IDBStore({
			storeName: 'customer',
			keyPath: 'customerid',
			autoIncrement: true,
			onStoreReady: refreshTable
		});
		
		// create references for some nodes we have to work with
		['submit', 'customerid', 'firstname', 'lastname', 'results-container'].forEach(function(id){
			nodeCache[id] = document.getElementById(id);
		});
		
		// and listen to the form's submit button.
		nodeCache.submit.addEventListener('click', enterData);
	}
	
	function refreshTable(){
		customers.getAll(listItems);
	}
	
	function listItems(data){
		var content = '';
		data.forEach(function(item){
			content += tpls.row.replace(/\{([^\}]+)\}/g, function(_, key){
				return item[key];
			});
		});
		nodeCache['results-container'].innerHTML = tpls.table.replace('{content}', content);
	}
	
	function enterData(){
		// read data from inputs…
		var data = {};
		['customerid','firstname','lastname'].forEach(function(key){
			var value = nodeCache[key].value.trim();
			if(value.length){
				if(key == 'customerid'){ // We want the id to be numeric:
					value = parseInt(value, 10);
				}
				data[key] = value;
			}
		});
		
		// …and store them away.
		customers.put(data, function(){
			clearForm();
			refreshTable();
		});
	}
	
	function clearForm(){
		['customerid','firstname','lastname'].forEach(function(id){
			nodeCache[id].value = '';
		});
	}
	
	function deleteItem(id){
		customers.remove(id, refreshTable);
	}
	
	function updateItem(id){
		var data = {
			customerid: id,
			firstname: document.getElementById('firstname_' + id).value.trim(),
			lastname: document.getElementById('lastname_' + id).value.trim()
		};
		customers.put(data, refreshTable);
	}
	
	// export some functions to the outside to
	// make the onclick="" attributes work.
	window.app = {
		deleteItem: deleteItem,
		updateItem: updateItem
	};
	
	// go!
	init();
	
});