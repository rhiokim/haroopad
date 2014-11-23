"use strict";

function parsePort(urlObj, options)
{
	var defaultPort = -1;
	
	for (var i in options.defaultPorts)
	{
		if ( i==urlObj.scheme && options.defaultPorts.hasOwnProperty(i) )
		{
			defaultPort = options.defaultPorts[i];
			break;
		}
	}
	
	if (defaultPort > -1)
	{
		if (urlObj.port == null)
		{
			urlObj.port = defaultPort;
		}
		
		urlObj.extra.portIsDefault = (urlObj.port == defaultPort);
	}
}



module.exports = parsePort;
