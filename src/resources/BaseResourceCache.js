class BaseResourceCache {
  resources = {};

  getKey(entry) {
    return JSON.stringify(entry);
  }

  get(entry) {
    const key = this.getKey(entry);
    if (!(key in this.resources)) {
      this.resources[key] = this.createResource(entry);
    }
    return this.resources[key];
  }
}

export default BaseResourceCache;
