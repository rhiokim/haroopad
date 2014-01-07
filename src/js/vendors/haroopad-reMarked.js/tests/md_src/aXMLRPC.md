What is aXMLRPC?
================

aXMLRPC is a Java library with a leightweight XML-RPC client. XML-RPC is
a specification for making remote procedure calls over the HTTP protocol
in an XML format. The specificationc an be found under http://www.xmlrpc.com/spec.

The library was developed for the use with Android. Since it has no dependencies to 
any Android library or any other 3rd-party library, it is fully functional in any
common java virtual machine (not only on Android).

You can control the client with some flags to extend its functionality. See the section
about flags.

How to include it?
==================

How to include the aXMLRPC client into your project?
There are three different ways to do that:

### Include the source code

You can just include all the source code from the `src` directory into the sourcecode
of your project. If you use git yourself, you can use submodules to include the code 
as a module to yours. So you will always stay up to date with the library.

### Compile it as library

The library itself is a NetBeans project and can be compiled either with NetBeans or
with `ant`. The resulting JAR file can be used as a dependency in your project. If you
use NetBeans you can make a dependency directly to the project.

### Download the JAR library (not recommended)

You can download a compiled jar file from the above Download tag and use it as a library
for your project. This is not recommended, because you will not stay up to date to the sourcecode.

How to use the library?
=======================

You can use the library by initiating an `XMLRPCClient` and make calls over it:

	try {
		XMLRPCClient client = new XMLRPCClient(new URL("http://example.com/xmlrpc"));
	
		Boolean b = (Boolean)client.call("isServerOk");
		Integer i = (Integer)client.call("add", 5, 10);
	} catch(XMLRPCServerException ex) {
		// The server throw an error.
	} catch(XMLRPCException ex) {
		// An error occured in the client.
	} catch(Exception ex) {
		// Any other exception
	}

Instead of passing the parameters as seperated values, you can also pack them in
an array and pass the array to the method, like in the following example:

	// ... The try-catch has been ommited for clarity.
	XMLRPCClient client = new XMLRPCClient(url, "MyUserAgentString");
	client.call("someMethod", new Object[]{ o1, o2, o3 });
	// ...

The above method calls are synchronous. So the method `call` will return when the server responded
or an error occured. There is also a possibility for asynchronous server calls.
You need to implement an XMLRPCCallback that will get noticed about the respone (or error) from
the server. The `callAsync` method can be used to make asynchronous calls. It returns an identifier
that will also be send to the XMLRPCCallback instance with the response of the server, so your
application can make multiple calls concurrently and use one listener for them, that distinguish 
between the different request by their ids.

	XMLRPCCallback listener = new XMLRPCCallback() {
		public void onResponse(long id, Object result) {
			// Handling the servers response
		}
		public void onError(long id, XMLRPCException error) {
			// Handling any error in the library
		}
		public void onServerError(long id, XMLRPCServerException error) {
			// Handling an error response from the server
		}
	};

	XMLRPCClient client = new XMLRPCClient(url);
	long id = client.callAsync(listener, "add", 5, 10);


The data types
--------------

The specification give some data tags for the server response. If you want to work on the
type you must cast the returning `Object` from the `call` method to its specific type.
Which type to cast which XML server response, tells the following list:

`i4`,`int`	=> `Integer`

`boolean`	=> `Boolean`

`string`	=> `String`

`double`	=> `Double`

`dateTime.iso8601`	=> `Date`

`base64`	=> `byte[]` (`Byte[]` won't work)

`array`		=> `Object[]`

`struct`	=> `Map<String,Object>`

`i8`		=> `Long` (see Flags)


Flags
-----

The client takes as second parameter (or third if an user agent is given) 
a combination of multiple flags. It could work like the following example:

	// ...
	XMLRPCClient client = new XMLRPCClient(url, 
		XMLRPCClient.FLAGS_STRICT | XMLRPCClient.FLAGS_8BYTE_INT);
	// ...

The following flags are implemented:


#### FLAGS_STRICT

The client should parse responses strict to specification.
It will check if the given content-type is right.
The method name in a call must only contain of A-Z, a-z, 0-9, _, ., :, /
Normally this is not needed.


#### FLAGS_8BYTE_INT

The client will be able to handle 8 byte integer values (longs).
The xml type tag `<i8>` will be used. This is not in the specification
but some libraries and servers support this behaviour.
If this isn't enabled you cannot recieve 8 byte integers and if you try to
send a long, the value must be within the 4 byte integer range.


#### FLAGS_ENABLE_COOKIES

With this flag, the client will be able to handle cookies, meaning saving cookies
from the server and sending it with every other request again. This is needed
for some XML-RPC interfaces that support login.


#### FLAGS_NIL

The client will be able to send `null` values. A `null` value will be send
as `<nil/>`. This extension is described under: http://ontosys.com/xml-rpc/extensions.php


#### FLAGS_IGNORE_STATUSCODE

With this flag enabled, the XML-RPC client will ignore the HTTP status
code of the response from the server. According to specification the
status code must be 200. This flag is only needed for the use with 
not standard compliant servers.


#### FLAGS_FORWARD

With this flag enabled, the client will forward the request, if
the 301 or 302 HTTP status code has been received. If this flag is not
set, the client will throw an exception on these HTTP status codes.


#### FLAGS_SSL_IGNORE_INVALID_HOST

With this flag enabled, the client will ignore, if the URL doesn't match
the SSL Certificate. This should be used with caution. Normally the URL
should always match the URL in the SSL certificate, even with self signed
certificates.


#### FLAGS_SSL_INGORE_INVALID_CERT

With this flag enabled, the client will ignore all unverified SSL/TLS 
certificates. This must be used, if you use self-signed certificates
or certificated from unknown (or untrusted) authorities.


License
=======

The library is licensed under [MIT License] (http://www.opensource.org/licenses/mit-license.php).
See the LICENSE file for the license text. 

For the uninformed reader: What does MIT mean?

- You can copy this, modify it, distribute it, sell it, eat it.
- You don't need to notice me about anything of the above.
- If you make changes to it, it would be nice (but not obliged), if you would share it with me again.
- Put the copyright notice and the LICENSE file in any copy you make.

Bugs?
=====

If you find a bug or wish some enhancements for the library, please
fill an issue here on github or contact me otherwise (www.timroes.de).
