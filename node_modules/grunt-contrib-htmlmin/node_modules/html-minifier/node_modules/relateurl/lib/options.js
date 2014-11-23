"use strict";

var objUtils = require("./util/object");



function getOptions(options, defaults)
{
	if ( objUtils.isObject(options) )
	{
		var newOptions = {};
		
		for (var i in defaults)
		{
			if ( defaults.hasOwnProperty(i) )
			{
				if (options[i] != undefined)
				{
					newOptions[i] = mergeOption(defaults[i], options[i]);
				}
				else
				{
					newOptions[i] = defaults[i];
				}
			}
		}
		
		return newOptions;
	}
	else
	{
		return defaults;
	}
}



function mergeOption(defaultValues, newValues)
{
	if (defaultValues instanceof Object && newValues instanceof Object)
	{
		if (defaultValues instanceof Array && newValues instanceof Array)
		{
			return defaultValues.concat(newValues);
		}
		else
		{
			defaultValues = objUtils.clone(defaultValues);
			
			return objUtils.shallowMerge(defaultValues, newValues);
		}
	}
	
	return newValues;
}



module.exports = getOptions;
