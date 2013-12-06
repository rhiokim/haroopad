# AACL

AACL is (yet) Another ACL library for Kohana 3.

## Why another one?

Simply because none really fitted my needs. I don't for a minute suggest it is inherently better than any others or that you should use this instead of X library - it is just a library that fits my needs.
You are free to use it and/or modify it if you think it will work well for you.

### My Aims

What makes my needs so incompatible with other libraries? Well, my aims for an ACL are given below. I've not found anything else that was close enough to warrant forking, 
especially since one of my core aims is simplicity and small amounts of clear code.

I need an ACL to:

-  define *all* rules in database so that applications can provide a UI for simple but fine-grained control of user's privileges;

-  be flexible enough to actually work in real apps without special-cases and hacks. That means being able to specify rules
	such as "Moderators can edit all posts, Normal Users can edit only their own posts";
	
-  be simple enough that you don't need to get your head round arcane and abstract mappings of objects and resources;

-  not require you to manually hard code lists of resources and permission types to be later checked against. All resources should be defined naturally with short, functional code, not abstract mappings and list definitions;
	
-  work with Kohana default Auth module. That means non-hierarchical user roles as managing hierarchies can get messy quickly; and

-  require a minimal amount of clear code to check permissions in controllers (and potentially anywhere else it may make sense to).

If you think you know of an ACL library that fits these needs already then feel free to let me know I've missed it but 
I've not found anything that really got close enough to warrant forking. I will however credit [Olly Morgan](http://github.com/ollym) for writing such a simple and neat ACL library that, despite ultimately not being quite what I need, inspired me to
write this.

## User Guide

This user guide is intended to explain the (hopefully simple) concepts and implementation of AACL. In each section, concepts go first, then implementation then examples.

### Auth integration: Users and Roles

AACL uses [kohana auth](http://github.com/kohanan/auth) module with no additions or modifications. 
Since I use Sprig exclusively, I also use my [Sprig Auth Driver](http://github.com/banks/sprig-auth) but if you want to mix and match, 
an ORM User/Auth driver should work just as well.

This means:

1.	Users and roles have a many-to-many mapping

2.	Roles are non-hierarchical and no role is given special treatment

3.	The only exception to 2. is the 'login' role which all active users must have. 
	In reality you may choose to special case this in a UI and represent it as an 'active account' checkbox rather 
	than requiring end-users to understand that it is different from other roles.

### Sprig and other ORMs

AACL ships with a Sprig based Rule model and Sprig based class for easily turning Sprig models into Access Controlled Resources. 
It should be relatively trivial to modify the library to work with other ORMs but as this is only likely to be used by me for now, a flexible driver system seems unnecessary.

### Concept: ACL Resources

Any PHP class that implements `AACL_Resource` interface is considered a resource. This means that just by implementing it, rules can be added based on that object.

AACL ships with two abstract Resource classes `Controller_AACL` and `Sprig_AACL` which allow any extending controllers or models to automatically become valid resources
against which access rules can be created.

#### AACL_Resource Interface

The `AACL_Resource` interface defines four methods:

-  **public function acl_id()**
	
	Must return a string that uniquely identifies the current object as a resource.
	Convention is for controllers to return as `c:controller_name` and models as `m:model_name.primary_key_value`
	Remember that dot in model identifier - it is significant!
	
-  **public function acl_actions($return_current = FALSE)**
	
	This method servers a dual purpose. When the argument `$return_current` is false, the method should return an array of string names, one for each action
	that can be carried out on the resource. For no specific actions, an empty array should be returned.
	-  `Controller_AACL` returns an array containing the names of all public action methods automatically.
	-  `Sprig_AACL` returns actions 'create', 'read', 'update', 'delete'. These can be changed by overriding this method in specific models.
	
-  **public function acl_conditions(Model_User $user = NULL, $condition = NULL)**
	
	This method also servers a dual purpose: it both defines available conditions and checks them.
	
	-  When both arguments are NULL, the function should return an array containing information about any special conditions the resource supports. More on what conditions are below.
	The format of this array is `array('condition_id' => 'Nice description for UIs')`.
	
	-  When a user object and condition id are passed, the funtion should return a boolean indicating whether or not the condition has passed.
	
-  **public static function acl_instance($class_name)**

	This method is used for auto-discovery of available resources. Since the resource ID, actions and conditions must be obtained from an object, 
	we need a way to get and instance of the object given only the class name. Not that the object returned shoul not be used for anything except calling `acl_*` methods
	to discover resource properties. 

Note that the `Model_AACL_Rule` itself extends `Sprig_AACL`. Instead of the default CRUD actions though it just specifies `grant` and `revoke` actions. This means you can
create rules about whether a role can itsef grant or revoke access! Note that the checking is not automatic though. That would prevent installers from creating rules or similar
due to not having a user logged in yet! It is still up to the developer to check the user has permission to grant or revoke using check().

### Resource Conditions

`AACL_Resource` objects can define conditions which allow rules to provide fine-grained control. Since conditions are resource specific, only conditions defined by the resource
are available when defining rules for that resource.

A typical and common use for this is allowing Users to edit their own posts but not others'. The implementation for such a condition is given below.

	// Sprig_AACL defines the AACL_Request interface but with no available conditions (since they will be model-specifc)
	// We don't need to redefine the acl_id() or acl_actions() methods as long as we are happy with the defaults
	
    class Model_Post extends Sprig_AACL
    {
    	... Set up model ...
    	
    	public function acl_conditions(Model_User $user = NULL, $condition = NULL)
    	{
    		if (is_null($user) OR is_null($condition))
    		{
    			// Return condition definition(s)
    			// Here we only have one condition but we could have many
    			return array(
					'is_author' => 'user is post author',
				);
    		}
    		else
    		{
    			// Condition logic goes here. Complex condition logic could be implemented in another method and called here.
				switch ($condition)
				{
					case 'is_author':
						// Return TRUE if the post author matches the passed user id
						return ($this->author_id === $user->id);
					
					default:
						// Condition doesn't exist therefore fails
    					return FALSE;
				}
    		}
    	}
    }

As you have probably guessed, `$user` is populated by the logged in user object when the rule is evaluated so conditions allow a neat 
and simple way of adding fine-grained user/resource specific rules in a general way.

### AACL Rules

Once you have some Controllers, Models or other objects defined as AACL_Resources, you can grant access to specific user roles.

The first major concept here is that rules are ONLY 'allow' type rules. 
This is to keep things simple and to prevent the need for having a role hierarchy to decide which rules take precedence.

Once `AACL::check($resource)` has been called, the user must be granted access to `$resource` by at least one rule otherwise the check fails.

Rules do have a simple inheritance to them in that they can be made more or less specific by their definitions.

A rule is defined using the `grant()` function described below:

**AACL::grant(mixed $role, string $resource_id, string $action = NULL, string $condition = NULL)**

Params:

-  **$role**

	Can be either a `Model_Role` object or a string role name. This is the role that the rule applies to.

-  **$resource_id**

	A string identifying the resource the rule applies to. Note that dots in resource IDs indicate a level or specificity. 
	For example, `m:post.34` would grant access to Model_Post object with id 34, `m:post` would grant access to all post objects.
	The wildcard `*` can also be used (alone) to match any resource. This will grant the role in question complete access to everything though so is
	probably only going to be used, at most, for only one role per application!

-  **$action**

	Specifies a specific action of that resource which may be accessed. For example if role is `m:post` and action is `delete`, access will be granted to delete any post object.
	If the action is NULL or does not exist (i.e. is not returned by the resource's acl_actions() method) then access will be granted for any action on the resource.
	
-  **$conditions**

	Specifies a condition of the resource which must be met to allow access. For example, `AACL::grant('login', 'm:post', 'edit', 'is_author');` 
	allows any user access to edit a post *provided* that they are the post's author. If the condition string passed doesn't match a valid condition 
	returned by `$resource->acl_conditions()` then the rule will NEVER match!

To grant access to multiple (but not all) actions of a resource, multiple rules should be used. For example:

    AACL::grant('admin', 'm:post'); 						// Grant all rights to admins for post objects
    
    AACL::grant('moderator', 'm:post', 'view'); 			// Moderators can view...
    AACL::grant('moderator', 'm:post', 'edit');				// ... or edit any post
    
    AACL::grant('login', 'm:post', 'view');					// Normal users can view all posts...
    AACL::grant('login', 'm:post', 'edit', 'is_author');	// ... but only edit their own
    
    AACL::grant('sales', 'm:page.32', 'edit');				// Sales team can edit page with ID 32 (ths is probably vital 
    														// for one of their campaigns...) but no other pages

#### Revoking access

`AACL::revoke()` is used to remove rules and accepts exactly the same arguments used to grant the rules. 
Note that the arguments don't have to exactly match a defined rule to delete it. For example

	AACL::grant('staff', 'm:post', 'edit');					// 1
	AACL::grant('staff', 'm:post', 'delete');				// 2
	AACL::grant('staff', 'm:comment', 'delete');			// 3
	
	AACL::revoke('staff', 'm:post', 'edit');				// Removes 1 from above
	AACL::revoke('staff', 'm:post');						// Removes 1 AND 2 from above
	AACL::revoke('staff', '*');								// Removes all rules for 'staff' (i.e. they now have access to nothing)


#### Rule Specificity

If you grant a rule which is *more* permissive than one or more rules that currently exist, the current rules will be automatically deleted since they are now logically useless.

### Checking Permissions

One of the key requirements for this library is to make checking access rights as simple and clear as possible.

All checking is done using `AACL::check()` described below:

**AACL::check(AACL_Resource $resource, $action = NULL)**

-  **$resource** 

	The AACL_Resource being requested. `check()` will attempt to get the current action from the resource automatically
	using `$reource->acl_actions(TRUE)`. If this returns a string action then that action will be used for checking without having to specify the `$action` parameter.
	
	Note that the string resource ID can't be specified since the `check()` function requires access to the objects acl_* methods. It
	is simpler not to have to define mappings from id back to class name in some separate global class in order to create instances.
	If I think of a way to make this neat and relatively seemless I may implement it but I don't feel this is a big issue.
	
	This does mean that currently there is no real way to check permisions on a controller resource other than the one in which the call to `AACL::check()` resides. 
	In practice this is unlikely to be a real limitiation.
	
	Since a controller object knows the currently executing action, the current controller action can be checked simply with `AACL::check($this)`.
	Since models don't inherently know which action is being requested, `$action` parameter must be specified otherwise the user will need to have access to ALL actions
	of the resource for the check to pass.
	
	Since controllers inherently know about the currently executing action, all actions in a controller will automatically be protected (according to their action-specific 
	rules) simply by calling `AACL::check($this)` in the controller's `before()` method.
	
-  **$action** 

	If the resource doesn't know inherently which action is being requested, it can be specified here. If specified here, it will over-ride the 
	action the resource object claims to be executing. So to check the permission of a *different* action of the same controller 
	(not sure why you would want to but still...) you could use:
	
	    public function action_one()
	    {
	    	// Check permission for this action
	    	AACL::check($this);
	    	
	    	// Check permission for other action
	    	AACL::check($this, 'other');
	    }

#### Failing check()

If the user doesn't have access to the required object and action, AACL throws an exception which must be handled to resolve the issue.

If the user isn't logged in, a `AACL_Exception_401` is thrown which should be caught and the user re-directed to a login form.

If the user is logged in but lacks the privileges to access a resource, an `AACL_Exception_403` is throw. 
It is left to the developer to catch this and display an appropriate message.

These should both be caught in `bootstrap.php` something like this:

    $request = Request::instance($uri);
    
    try
    {
    	$request->execute();
    }
    catch (AACL_Exception_401 $e)
    {
    	// Redirect to login
    }
    catch (AACL_Exception_403 $e)
    {
    	// Issue request for access denied page or just display a template
    }
    
    echo $request
    		->send_headers()
    		->response;
	
### Listing Resources

A major motivation for this library is to make it easy to create Rules using a UI. To facilitate this, all potential resources defined in the application can be found using
`AACL::list_resources()`. This returns a multi-dimensional array listing all the resources and any actions or conditions they define.

It works by scanning the file system and using reflection so in a big app this is likely to take some time. I feel that is not a big deal here though as it should only ever be done in 
admin control panels not in public parts of the app and it allows a very powerful system that doesn't require maintaining lenthly and complex mappings of classes and resources.

Note that `list_resources()` will only return the basic types in the case of models, not every possible model id. In other words you will get a single entry 
for `m:post` rather than `m:post.1, m:post.2, ...`. It is left for the developer to retrieve this data if necessary for a UI.

### UI

A basic rule management UI will hopefully be added to the module at some point to help get started. It will naturally be disabled in all but 'developement' environment.