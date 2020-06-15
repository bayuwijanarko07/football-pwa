document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('ul.tabs');
    M.Tabs.init(tabs);
    let item = getDetailClubById();
    const save = document.getElementById("fav");
    const dlt = document.getElementById("del");
    let urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get("id"));
    let isFromSaved = urlParams.get("saved");
    
    if(isFromSaved){
      save.style.display = 'none';
    }else{
      dlt.style.display = 'none';
    }
      save.onclick = function() {
     
        item.then(function (team) {
            addFavTeam(team);
        });
        item.then(function () {
            save.setAttribute("disabled","");
        });
    }
      dlt.onclick = function() {
        console.log("Tombol FAB di klik.");
        item.then(function (id) {
            dltFavTeam(id);
            isFromSaved = false
        });
        item.then(function () {
            dlt.setAttribute("disabled","");
        });
    }
});
