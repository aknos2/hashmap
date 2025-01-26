export class HashMap {
  constructor(initialCapacity = 16) {
    this.loadFactor = 0.75;
    this.bucket = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucket.length;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const bucket = this.bucket[hashCode];
    let entrySize = this.bucket.length * this.loadFactor;

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (entrySize < this.size) {
      this.resize();
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucket[hashCode];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucket[hashCode];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.bucket[hashCode];

    for (let i = 0; i < bucket.length; i++) {
      //access only the key with [0];
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    if (this.size >= 0) {
      return this.size;
    }
    return null;
  }

  clear() {
    this.bucket = new Array(this.bucket.length).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];

    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        keysArray.push(pair[0]);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        valuesArray.push(pair[1]);
      }
    }
    return valuesArray;
  }

  entries() {
    const pairArray = [];

    this.bucket.forEach((pair) => {
      pairArray.push(...pair);
    });
    return pairArray;
  }

  resize() {
    const newBucketLength = this.bucket.length * 2;
    const newBucket = new Array(newBucketLength).fill(null).map(() => []);

    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        const newHashCode = this.hashWithCustomLength(pair[0], newBucketLength);
        newBucket[newHashCode].push(pair);
      }
    }

    this.bucket = newBucket;
  }

  hashWithCustomLength(key, bucketLength) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    }

    return hashCode;
  }
}
