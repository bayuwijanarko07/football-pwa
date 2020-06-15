var dbPromised = idb.open("football_db", 1, function(upgradeDb) {
  if(!upgradeDb.objectStoreNames.contains('team')){
    var articlesObjectStore = upgradeDb.createObjectStore("team", {
      keyPath: "id"
    });
  }
  articlesObjectStore.createIndex("team_name", "name", { unique: false });
});

function addFavTeam(id,name){
  dbPromised
  .then(function(db) {
    var tx = db.transaction("team", "readwrite");
    var store = tx.objectStore("team");
    store.put(id);
    M.toast({html: `Berhasil di tambahkan ke Favorite`,classes: 'rounded'})
    return tx.complete;
  })
  .then(function() {
    console.log("Team berhasil di favoritkan");
  });
}

function dltFavTeam(id){
  dbPromised
  .then(function(db) {
    var tx = db.transaction("team", "readwrite");
    var store = tx.objectStore("team");
    store.delete(id.id);
    M.toast({html: `Berhasil di hapus dari Favorite`,classes: 'rounded'})
    return tx.complete;
  })
  .then(function() {
    console.log("Team berhasil di delete");
  });
}


function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("team", "readonly");
            var store = tx.objectStore("team");
            return store.getAll();
        })
        .then(function(team) {
            resolve(team);
        });
    });
}

function getById() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("team", "readonly");
            var store = tx.objectStore("team");
            return store.getAll();
        })
        .then(function(team) {
            resolve(team);
        });
    });
  }