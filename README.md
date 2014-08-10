Meteor Session JSON
===================

JSON getters / setters for Session variables

Problem:
-------

Let's create a vanilla Session value.

``` sh

var json = { 
	some: {
		nested: "value"
	}
};

Session.set("json", json);

```

Let's try to get / set those nested properties.

``` sh

Session.get("json.some.nested")

// > undefined

```

``` sh

Session.set("json.some.nested", "other value")
Session.get("json")

// > { 
	some: {
		nested: "value" // Unchanged!
	}
}

```

Trying to access the "some.nested" property through Session.get("json.some.nested") returns "undefined", and trying to change this property through Session.set("json.some.nested", "other value") would create a new Session variable with the "json.some.nested" key, since Sessions (and ReactiveDict objects in general) in Meteor are simple key / value stores.

Here is what session-json allows.

# Session.getJSON(property)

``` sh

Session.getJSON("json.some.nested");
// > "value"

```

# Session.setJSON(property, value)

``` sh

Session.setJSON("json.some.nested", "other value")
Session.get("json")

// > { 
	some: {
		nested: "other value"
	}
}

```

Enjoy!