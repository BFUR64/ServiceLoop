declare global {
  interface GlobalEventHandlersEventMap {
    "app:folder-changed": Event;
    "app:authorization-changed": AuthorizationChangedEvent;
  }
}

interface AuthorizationChangedEvent extends CustomEvent<{
  authorized: boolean;
}> {}
