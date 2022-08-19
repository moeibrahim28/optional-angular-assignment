# Application Building Lab 3

## Instructions

Using the same patterns we've used so far, replace the data in the conversation
thread component with dynamic data read from variables defined in the
component's controllers.

As before, try your best to do this on your own before looking at the code
provided here for reference.

The steps are:

1. Add a `senderMessages` array to `conversation-thread-component.component.ts`
2. Add a `userMessages` array to `conversation-thread-component.component.ts`
   > We will have additional work to do to figure out how to show the messages
   > in the right sequence, but we will handle that later in the source
3. Modify the `conversation-thread-component.comopnent.html` view to use both
   arrays defined in the model
4. Add a `message` variable in the `user-message-component.component.ts` file.
   Make sure to tag it with the `@Input` annotation, so you can set its value in
   the parent component's view
5. Modify the `user-message-component.component.html` view to use the
   `message.text` property instead of hardcoded text

## Solution

When you're done with your changes, your source files will look like this:

### `conversation-thread-component.component.ts`

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-conversation-thread-component",
  templateUrl: "./conversation-thread-component.component.html",
  styleUrls: ["./conversation-thread-component.component.css"],
})
export class ConversationThreadComponentComponent implements OnInit {
  senderMessages = [
    {
      sender: { firstName: "Ludovic" },
      text: "Message from Ludovic",
      conversationId: 1,
      sequenceNumber: 0,
    },
    {
      sender: { firstName: "Jessica" },
      text: "Message from Jessica",
      conversationId: 1,
      sequenceNumber: 1,
    },
  ];

  userMessages = [
    {
      sender: { firstName: "Aurelie" },
      text: "Message from Aurelie",
      conversationId: 1,
      sequenceNumber: 2,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
```

### `conversation-thread-component.component.html`

```html
<div class="container">
  <div class="row" *ngFor="let senderMessage of senderMessages">
    <div class="col-9 p-3">
      <app-sender-message-component
        [message]="senderMessage"
      ></app-sender-message-component>
    </div>
  </div>
</div>

<div class="container">
  <div class="row" *ngFor="let userMessage of userMessages">
    <div class="col-3 p-3"></div>
    <div class="col-9 p-3">
      <app-user-message-component
        [message]="userMessage"
      ></app-user-message-component>
    </div>
  </div>
</div>
```

### `user-message-component.component.ts`

```typescript
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-user-message-component",
  templateUrl: "./user-message-component.component.html",
  styleUrls: ["./user-message-component.component.css"],
})
export class UserMessageComponentComponent implements OnInit {
  @Input() message = {
    sender: { firstName: "Ludovic" },
    text: "Message from Ludovic",
    conversationId: 1,
    sequenceNumber: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
```

### `user-message-component.component.html`

```html
<div class="container">
  <div class="row">
    <div class="col-2 p-3"></div>
    <div class="col-10 p-3 border rounded-5">
      <span>{{message.text}}</span>
    </div>
  </div>
</div>
```

Now you have an application that:

1. Leverages Bootstrap to have the target layout
2. Leverages Bootstrap for basic styling
3. Leverages Angular data binding to read data dynamic from TypeScript code
   instead of hardcoding it in HTML
4. Leverages Angular directives to modify the DOM by looping through arrays and
   using conditionals to decide whether or not to display specific values or
   text

We've successfully used our current Angular knowledge to create a strong
foundation for our application. In order to add real functionality, however, we
need to dive deeper into Angular features.
