## Difference Between `Object.assign()` and Spread Operator (`...`)

Both `Object.assign()` and the spread operator can be used to merge objects. They produce similar results for simple objects but differ in syntax and behavior.

### Object.assign()

```javascript
const merged = Object.assign({}, obj1, obj2);
```

* Copies properties from source objects into a target object.
* Can modify the target object if it is not an empty object (`{}`).
* More verbose syntax.
* Suitable when explicitly working with target objects.

### Spread Operator

```javascript
const merged = {
  ...obj1,
  ...obj2
};
```

* Creates a new object without modifying the original objects.
* More concise and readable syntax.
* Commonly used in modern JavaScript and React applications.
* Preferred for immutable state updates.


### Conclusion

Use the spread operator for most modern JavaScript and React code because it is cleaner, easier to read, and avoids accidental object mutation. Use `Object.assign()` when  specifically need to copy properties into an existing target object.
