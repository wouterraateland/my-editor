import * as _ from "utils";
import { openDB } from "idb";

import BaseResource from "./BaseResource";

const dbPromise = openDB("my-editor", 1, {
  upgrade(db) {
    db.createObjectStore("nodes");
  },
});

const idbKeyval = {
  async get(key) {
    return (await dbPromise).get("nodes", key);
  },
  async set(key, val) {
    return (await dbPromise).put("nodes", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("nodes", key);
  },
  async clear() {
    return (await dbPromise).clear("nodes");
  },
  async keys() {
    return (await dbPromise).getAllKeys("nodes");
  },
};

class StorageResource extends BaseResource {
  constructor({ key, initialValue }) {
    super();
    this.key = key;
    this.fetch(initialValue);
  }
  async fetch(fallback) {
    const value = await idbKeyval.get(this.key);

    if (_.isNothing(value)) {
      this.setState(fallback);
    } else {
      this.onNext(value);
    }
  }

  setState(v) {
    const nextData = typeof v === "function" ? v(this.data) : v;
    this.onNext(nextData);

    idbKeyval.set(this.key, nextData);
  }
}

export default StorageResource;
