import BaseResourceCache from "./BaseResourceCache";
import StorageResource from "./StorageResource";

class StorageResourceCache extends BaseResourceCache {
  getKey(entry) {
    return entry.key;
  }

  createResource(entry) {
    return new StorageResource(entry);
  }
}

export default StorageResourceCache;
