Meteor Session JSON
===================

JSON getters / setters for Session variables

Problem
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

Solution
--------

### Session.getJSON(property)

``` sh

Session.getJSON("json.some.nested");
// > "value"

```

### Session.setJSON(property, value)

``` sh

Session.setJSON("json.some.nested", "other value")
Session.get("json")

// > { 
	some: {
		nested: "other value"
	}
}

```

### Note

Meteor Sessions can't store arrays directly, but can store objects containing arrays. So doing the following thing won't work as you may want.

``` sh

Session.setJSON("someArray[0]", "first array value!");

```

In this case, it would create a Session variable with the key "aCoolArray[0]" (as a string). To set / edit an element in an array, set it as a nested property.

``` sh

Session.setJSON("someProperty.someArray[0]", "first array value!");

```

You can then access this array.

``` sh

Session.getJSON("someProperty.someArray");

// > ["first array value!"]

```

Enjoy!