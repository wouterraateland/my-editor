import * as _ from "utils";

import BaseResource from "./BaseResource";

const Storage = {
  get: ({ key }) => ({ value: localStorage.getItem(key) }),
  set: ({ key, value }) => localStorage.setItem(key, value),
};

class StorageResource extends BaseResource {
  constructor({ key, initialValue, options }) {
    super();
    this.key = key;
    this.parse = options?.parse || JSON.parse;
    this.stringify = options?.stringify || JSON.stringify;
    this.fetch(initialValue);
  }
  async fetch(fallback) {
    const { value } = await Storage.get({ key: this.key });

    if (_.isNothing(value)) {
      this.setState(fallback);
    } else {
      this.onNext(this.parse(value));
    }
  }

  setState(v) {
    const nextData = typeof v === "function" ? v(this.data) : v;
    this.onNext(nextData);

    Storage.set({
      key: this.key,
      value: this.stringify(nextData),
    });
  }
}

export default StorageResource;
