declare global {
  interface GlobalEventHandlersEventMap {
    "app:data-store-changed": Event;
    "app:theme-changed": Event;
    "app:folder-changed": Event;
    "app:authorization-changed": CustomEvent<{
      authorized: "granted" | "prompt" | "denied";
    }>;
  }
}
