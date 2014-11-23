"use strict";

/*
	Deep-clone an object.
*/
function clone(obj)
{
	if (obj instanceof Object)
	{
		var clonedObj = (obj instanceof Array) ? [] : {};
		
		for (var i in obj)
		{
			if ( obj.hasOwnProperty(i) )
			{
				clonedObj[i] = clone( obj[i] );
			}
		}
		
		return clonedObj;
	}
	
	return obj;
}



function isObject(obj)
{
	return obj instanceof Object && !(obj instanceof Array);
}



/*
	Shallow-merge two objects.
*/
function shallowMerge(source, obj, type)
{
	if (source instanceof Object && obj instanceof Object)
	{
		for (var i in obj)
		{
			if ( obj.hasOwnProperty(i) )
			{
				source[i] = obj[i];
			}
		}
	}
	
	return source;
}



module.exports =
{
	clone: clone,
	isObject: isObject,
	shallowMerge: shallowMerge
};
