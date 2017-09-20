window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Please download and use Google Chrome.")
}

let options = {
    "name": "testDB",
    "version": 1
};

let db;
let tx;
let bt_store;
const DB_NAME = 'test-db';
const CURRENT_VERSION = 1;

let createDatabase = function(){
    console.log("Creating database");
    let dbPromise = idb.open(DB_NAME, CURRENT_VERSION, function(returned_db){
        if(!returned_db.objectStoreNames.contains('binder-template')){
            bt_store = returned_db.createObjectStore('binder-template', {keyPath: 'id', autoIncrement: true});
            bt_store.createIndex("pagesContainer", "pagesContainer", {});
            bt_store.createIndex("columnsContainer", "columnsContainer", {});
            bt_store.createIndex("sheetId", "sheetId", {});
            bt_store.createIndex("flags", "flags", {});
            bt_store.createIndex("savedOn", "savedOn", {});
            bt_store.createIndex("title", "title", {});
            bt_store.createIndex("uniqueID", "uniqueID", {});
        }
    }).then(function(returned_db){
        console.log("Database opened", returned_db);
        db = returned_db;
    })
};

let saveBinderTemplate = function(bt){
    console.log("Running save binder template", bt, db);
    if(db){
        tx = db.transaction(['binder-template'], 'readwrite');
        bt_store = tx.objectStore('binder-template');
        let request = bt_store.add(bt);
        request.onerror = function(e){
            console.log("Error", e.target.error.name);
        };
        request.onsuccess = function(){
            console.log("Success!")
        };
        return tx.complete;
    }
    else{
        throw "Database Not Connected"
    }
};


createDatabase();