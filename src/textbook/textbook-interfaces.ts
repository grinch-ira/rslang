export interface IPublisher {
  register(subscriber: ISubscriber): void;
  unregister(subscriber: ISubscriber): void;
  notify(): void;
}

export interface ISubscriber {
  update(): void;
}
