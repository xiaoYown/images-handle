
let open = module.exports.open = function (name, v) {
  let version = v || 1;
  let req = global.indexedDB.open(name, version);

  req.onerror = function (e) {
    console.log(e.currentTarget.error.message);
  };
  req.onsuccess = function (e) {
    let db = e.target.result;
    console.log(e.target.result);
  };
  req.onupgradeneeded = function(e){
    console.log('DB version changed to ' + version);
  };

  return req;
}

let close = module.exports.close = function (db) {
  db.close();
}

let del = module.exports.del = function (name) {
  global.deleteDatabase(name);
}

let getStore = module.exports.getStore = function (db, store) {
  let _db = open(db);
  let transaction;
  let objStore;

  transaction = db.transaction([store]);
  objStore = transaction.objectStore(store);

  return objectStore
}

let createStore = module.exports.createStore = function (name, store) {
  let req = global.indexedDB.open(name, 2);
  
  req.onerror = function (e) {
    console.log(e.currentTarget.error.message);
  };
  req.onsuccess = function (e) {
  };
  req.onupgradeneeded = function(e){
    let __db = e.target.result;
    let tran = __db.transaction([store.key], 'readwrite');
    // let objStore = __db.createObjectStore(store.key, {});
    // objStore.add(store);
  };
}
