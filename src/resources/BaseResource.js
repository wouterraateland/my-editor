export class BaseResource {
  observers = [];
  unsubscribe = null;
  pending = true;
  data = undefined;
  error = null;
  promise = null;
  resolve = () => {};
  reject = () => {};

  constructor(provider) {
    this.provider = provider;
  }

  isListening() {
    return this.unsubscribe !== null;
  }

  listenContinuously() {
    return () => {};
  }

  async listenOnce() {}

  onNext(data) {
    this.pending = false;
    this.data = data;
    this.observers.forEach((observer) => observer.onNext(this.data));
    this.resolve(this.data);
  }

  onError(error) {
    this.pending = false;
    this.error = error;
    this.observers.forEach((observer) => observer.onError(this.error));
    this.reject(this.error);
  }

  onComplete() {
    this.pending = false;
    this.observers.forEach((observer) => observer.onNext(this.data));
    this.resolve(this.data);
  }

  startListening() {
    if (!this.promise) {
      this.promise = new Promise(async (resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
    this.unsubscribe = this.listenContinuously();
  }

  fetchOnce() {
    if (this.pending && !this.promise) {
      this.fetch();
    }
  }

  fetch() {
    if (!this.promise) {
      this.promise = new Promise(async (resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
    this.listenOnce();
  }

  async stopListening() {
    try {
      if (typeof this.unsubscribe === "function") {
        await this.promise;
        this.unsubscribe();
      }
    } catch (error) {
      console.error(error);
    }
    this.unsubscribe = null;
  }

  subscribe(observer) {
    if (!this.isListening()) {
      this.startListening();
    }

    this.observers = [...this.observers, observer];
    if (this.error) {
      observer.onError(this.error);
    } else if (!this.pending) {
      observer.onNext(this.data);
    }
    return () => {
      this.observers = this.observers.filter((o) => o !== observer);
    };
  }

  read() {
    if (this.pending) {
      if (!this.promise) {
        this.startListening();
      }
      throw this.promise;
    }
    if (this.error) {
      setTimeout(() => this.stopListening());
      throw this.error;
    }
    return this.data;
  }

  readOnce() {
    if (this.pending) {
      if (!this.promise) {
        this.fetch();
      }
      throw this.promise;
    }
    if (this.error) {
      setTimeout(() => this.stopListening());
      throw this.error;
    }
    return this.data;
  }
}

export default BaseResource;
