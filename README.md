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
	},
	and: {
		arrays: [1, 2, 3]		
	}
}

```

Trying to access the "some.nested" property through Session.get("some.nested") returns "undefined", and trying to change this property through Session.set("some.nested", "other value") would create a new Session variable with the "some.nested" key.

Here is what session-json offers.

# Session.getJSON(property)

``` sh

Session.getJSON(json.some.nested);
// > "value"

```

# Session.setJSON(property, value)

``` sh

Session.setJSON("json.some.nested", "other value")
Session.get("json")

// > { 
	some: {
		nested: "other value"
	},
	and: {
		arrays: [1, 2, 3]		
	}
}

```

Enjoy!