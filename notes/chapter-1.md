# Are frontend frameworks magic to you?

> most of us have heard about that thing called the "virtual DOM," and that there needs to be a "reconciliation algorithm" that decides what is the smallest set of changes required to update the browser’s DOM.

> We also know that single-page applications (SPAs for short) modify the URL in the browser’s address bar without reloading the page,

1.2.1 Features

1.3.2 The browser side of an SPA

---

What is really a virtual dom ? really it's a simple simple represention of the dom. Usually it's for this

```html
<div class="name">
  <label for="name-input">Name</label>
  <input type="text" id="name-input" />
  <button>Save</button>
</div>
```

it will be the close result of copying the html elements and striping out all the thing we don't really care about(because copying html can be bloated with unessary params).
Somethings that will be an addition would be the event handlers are typically not shown in the HTML markup, but added in js.
