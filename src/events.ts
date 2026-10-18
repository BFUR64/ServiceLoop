declare global {
  interface GlobalEventHandlersEventMap {
    "app:data-store-changed": Event;
    "app:theme-changed": Event;
  }
}
