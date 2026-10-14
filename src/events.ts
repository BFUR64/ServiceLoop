declare global {
  interface GlobalEventHandlersEventMap {
    "app:folder-changed": Event;
    "app:authorization-changed": AuthorizationChangedEvent;
    "app:theme-changed": Event;
  }
}

interface AuthorizationChangedEvent extends CustomEvent<{
  authorized: boolean;
}> {}
