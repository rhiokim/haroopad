require(['../../idbstore.js'], function(IDBStore){
	
	var tpls = {
		row: '<tr><td>{customerid}</td><td>{lastname}</td><td>{firstname}</td><td>{age}</td><td><button onclick="app.deleteItem({customerid});">delete</button></td></tr>',
		table: '<table><tr><th>ID</th><th>Last Name</th><th>First Name</th><th>Age</th><th></th></tr>{content}</table>'
	};
	
	var customers;
	
	var nodeCache = {};
	
	function init(){
		
		// create a store ("table") for the customers
		customers = app.customers = new IDBStore({
      dbVersion: 1,
			storeName: 'customer-index',
			keyPath: 'customerid',
			autoIncrement: true,
			onStoreReady: refreshTable,
      indexes: [
        { name: 'lastname', keyPath: 'lastname', unique: false, multiEntry: false }
      ]
		});
		
		// create references for some nodes we have to work with
		[
      'submit', 'submitQuery',
      'upper', 'lower', 'excludeLower', 'excludeUpper',
      'sortOrder', 'index', 'filterDuplicates',
      'customerid', 'firstname', 'lastname', 'age',
      'results-container'
    ].forEach(function(id){
			nodeCache[id] = document.getElementById(id);
		});
		
		// and listen to the form's submit buttons.
		nodeCache.submit.addEventListener('click', enterData);
    nodeCache.submitQuery.addEventListener('click', runQuery);
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
		['customerid','firstname','lastname', 'age'].forEach(function(key){
			var value = nodeCache[key].value.trim();
			if(value.length){
        if(key == 'customerid'){
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
		['customerid','firstname','lastname', 'age'].forEach(function(id){
			nodeCache[id].value = '';
		});
	}
	
	function deleteItem(id){
		customers.remove(id, refreshTable);
	}

  function makeRandomEntry(){
    var lastnames = ['Smith','Miller','Doe','Frankenstein','Furter'],
        firstnames = ['Peter','John','Frank', 'James', 'Jill'];

    var entry = {
      lastname: lastnames[Math.floor(Math.random()*5)],
      firstname: firstnames[Math.floor(Math.random()*4)],
      age: Math.floor(Math.random() * (100 - 20)) + 20,
      customerid: parseInt( ( "" + ( Date.now() * Math.random() ) ).substring(0, 6), 10)
    };

    return entry;
  }

  function addRandomCustomer(){
    var data = makeRandomEntry();

    customers.put(data, function(){
      clearForm();
      refreshTable();
    });
  }

  function runQuery(){
    var upper = nodeCache.upper.value,
        hasUpper = upper != '',
        lower = nodeCache.lower.value,
        hasLower = lower != '',

        indexName = nodeCache.index.value,
        sortOrder = nodeCache.sortOrder.value,
        filterDuplicates = nodeCache.filterDuplicates.checked,
        keyRange,

        content = '';

    if(hasUpper || hasLower){ // create a keyRange only if bounds are given
      var options = {};
      if(hasUpper){
        options.upper = upper;
        options.excludeUpper = nodeCache.excludeUpper.checked;
      }
      if(hasLower){
        options.lower = lower;
        options.excludeLower = nodeCache.excludeLower.checked;
      }
      keyRange = customers.makeKeyRange(options);
    }

    var onItem = function (item) {
      content += tpls.row.replace(/\{([^\}]+)\}/g, function (_, key) {
        return item[key];
      });
    };
    var onEnd = function () {
      nodeCache['results-container'].innerHTML = tpls.table.replace('{content}', content);
    };

    customers.iterate(onItem, {
      index: indexName,
      keyRange: keyRange,
      filterDuplicates: filterDuplicates,
      order: sortOrder,
      onEnd: onEnd
    });
  }
	
	// export some functions to the outside to
	// make the onclick="" attributes work.
	window.app = {
		deleteItem: deleteItem,
    addRandomCustomer: addRandomCustomer
	};
	
	// go!
	init();
	
});
