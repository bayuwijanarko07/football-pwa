const base_url = "https://api.football-data.org/v2/";
const api_token = '052573ddedca42d4a6aca3f502de1e82'
const kode_liga = 2021
let endpoint_klasemen_liga = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`
let endpoint_informasi_tim = `${base_url}teams/`

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

function getKlasemenLiga() {
  if ('caches' in window) {
    caches.match(endpoint_klasemen_liga).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let tabelKlasemenHtml = "";
          data.standings.forEach(function (klasemen) {
            let dataTabelKlasemen = "";
            klasemen.table.forEach(function (club) {        

              dataTabelKlasemen += `
              <tr>
                <td class="center-align">${club.position}</td>
                  <td>
                    <p class="hide-on-small-only">
                      <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                      ${club.team.name}
                    </p>
                    <p class="hide-on-med-and-up">
                      <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                    </p>
                  </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align">${club.goalDifference}</td>
                <td class="center-align">${club.points}</td>
                <td class="center-align">
                  <a href="./detailteam.html?id=${club.team.id}" class="waves-effect waves-light btn-small">Detail</a>
                  <a href="./matchteam.html?id=${club.team.id}" class="waves-effect waves-light btn-small">Match</a>
                </td>
              </tr>`
        
            })
            tabelKlasemenHtml += `

            <table class="responsive-table striped " >
              <thead class="white-text pink accent-4">
                <tr>
                  <th class="center-align">Position</th>
                  <th>Team</th>
                  <th class="center-align">Played</th>
                  <th class="center-align">Won</th>
                  <th class="center-align">Draw</th>
                  <th class="center-align">Lost</th>
                  <th class="center-align">GF</th>
                  <th class="center-align">GA</th>
                  <th class="center-align">GD</th>
                  <th class="center-align">Points</th>
                  <th class="center-align">More info</th>
                </tr>
              </thead>
              <tbody>` + dataTabelKlasemen + `</tbody>
            </table>
          `
          });
          document.getElementById("standings").innerHTML = tabelKlasemenHtml;
        });
      }
    });
  }

  fetchApi(endpoint_klasemen_liga)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data)
      let tabelKlasemenHtml = "";
          data.standings.forEach(function (klasemen) {
            let dataTabelKlasemen = "";
            klasemen.table.forEach(function (club) {
        
              dataTabelKlasemen += `
              <tr>
                <td class="center-align">${club.position}</td>
                  <td>
                    <p class="hide-on-small-only">
                      <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                      ${club.team.name}
                    </p>
                    <p class="hide-on-med-and-up">
                      <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                    </p>
                  </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align">${club.goalDifference}</td>
                <td class="center-align">${club.points}</td>
                <td class="center-align">
                  <a href="./detailteam.html?id=${club.team.id}" class="waves-effect waves-light btn-small">Detail</a>
                  <a href="./matchteam.html?id=${club.team.id}" class="waves-effect waves-light btn-small">Match</a>
                </td>
              </tr>`
        
            })
            tabelKlasemenHtml += `

            <table class="responsive-table striped" >
              <thead class="white-text pink accent-4">
                <tr>
                  <th class="center-align">Position</th>
                  <th>Team</th>
                  <th class="center-align">Played</th>
                  <th class="center-align">Won</th>
                  <th class="center-align">Draw</th>
                  <th class="center-align">Lost</th>
                  <th class="center-align">GF</th>
                  <th class="center-align">GA</th>
                  <th class="center-align">GD</th>
                  <th class="center-align">Points</th>
                  <th class="center-align">More Info</th>
                </tr>
              </thead>
            <tbody>` + dataTabelKlasemen + `</tbody>
            </table>
          `
          });
          document.getElementById("standings").innerHTML = tabelKlasemenHtml;
    })
    .catch(error);
}

function getDetailClubById(){
  return new Promise(function(resolve, reject){
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    let dataSquadHTML = "";
    let tabelSquadHTML = "";
        if ("caches" in window) {
          caches.match(endpoint_informasi_tim + idParam).then(function (response) {
            if (response) {
              response.json().then(function (data) { 
                let detailHTML = `
                <div class="card">
                    <div class="card-image">
                        <img src="${data.crestUrl}" align="center" width="400" height="400" vspace="50">
                        <span class="card-title deep-purple darken-4">${data.name}</span>
                    </div>
                    <div class="card-content deep-purple darken-4">
                        <h5 class="white-text">Short Name : ${data.shortName}</h5>
                        <h5 class="white-text">TLA : ${data.tla}</h5>
                        <p class="white-text">Address : ${data.address}</p>
                        <p class="white-text">Club Colors : ${data.clubColors}</p>
                        <p class="white-text">venue : ${data.venue}</p>
                        <p class="white-text">Website : <a href="${data.website}">${data.website}<a/></p>
                    </div>
                </div>
                `;
                data.squad.forEach(function (squad) {
                  dataSquadHTML += `
                  <tr>
                    <td class="center-align">${squad.position}</td>
                    <td class="center-align">${squad.name}</td>
                  </tr>
                  `
                });
                  tabelSquadHTML += `
                  <table class="responsive-table" >
                  <thead class="white-text pink accent-4">
                    <tr>
                      <th class="center-align">Position</th>
                      <th class="center-align">Name</th>
                    </tr>
                  </thead>
                  <tbody>` + dataSquadHTML + `</tbody>
                  </table>
                  `
                document.getElementById("squad").innerHTML = tabelSquadHTML;
                document.getElementById("body-content").innerHTML = detailHTML;
                resolve(data);
              });
            }
          });
        }
        
        fetchApi(endpoint_informasi_tim + idParam)
          .then(status)
          .then(json)
          .then(function (data) {
            // console.log(data);
            let detailHTML = `
              <div class="card">
                  <div class="card-image">
                      <img src="${data.crestUrl}" align="center" width="400" height="400" vspace="50">
                      <span class="card-title deep-purple darken-4">${data.name}</span>
                  </div>
                  <div class="card-content deep-purple darken-4">
                      <h5 class="white-text">Short Name : ${data.shortName}</h5>
                      <h5 class="white-text">TLA : ${data.tla}</h5>
                      <p class="white-text">Address : ${data.address}</p>
                      <p class="white-text">Club Colors : ${data.clubColors}</p>
                      <p class="white-text">venue : ${data.venue}</p>
                      <p class="white-text">Website : <a href="${data.website}">${data.website}<a/></p>
                  </div>
              </div>
            `;
            data.squad.forEach(function (squad) {
              dataSquadHTML += `
                  <tr>
                    <td class="center-align">${squad.position}</td>
                    <td class="center-align">${squad.name}</td>
                  </tr>
                  `
                });
                tabelSquadHTML += `
                <table class="responsive-table">
                <thead class="white-text pink accent-4">
                  <tr>
                    <th class="center-align">Position</th>
                    <th class="center-align">Name</th>
                  </tr>
                </thead>
                <tbody>` + dataSquadHTML + `</tbody>
                </table>
                `
            document.getElementById("squad").innerHTML = tabelSquadHTML;
            document.getElementById("body-content").innerHTML = detailHTML;
            resolve(data);
          })
          .catch(error);
  });
}

function getMatchById() {
  return new Promise(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(endpoint_informasi_tim + idParam + "/matches?status=SCHEDULED").then(function (response) {
        if (response) {
          response.json().then(function (data) {
          // console.log(data);
          let dataMatchesHtml = '';
          let match = data.matches;
          let maxLoopData = match.length;
          if (match.length > 1) {
            maxLoopData = 1;
          }
          for (let i = 0; i < maxLoopData; i++) { dataMatchesHtml = `
            <div class="card">
                <div class="card-content">
                    <h4 class="center-align">Matchday: ${match[i].matchday}</h4>
                    <div class="center-align">Kick Off: ${match[i].utcDate}</div>
                    <div class="row">
                      <div class="col s4"><h5 class="center-align">${match[i].homeTeam.name}</span></div>
                      <div class="col s4"><h5 class="center-align">VS</h5></div>
                      <div class="col s4"><h5 class="center-align">${match[i].awayTeam.name}</span></div>
                    </div>
                </div>
            </div>
            `;
              document.getElementById("upmatch").innerHTML = dataMatchesHtml;
          }
          });
        }

      });
    }

    fetchApi(endpoint_informasi_tim + idParam + "/matches?status=SCHEDULED")
      .then(status)
      .then(json)
      .then(function (data) {
        // console.log(data);
        let dataMatchesHtml = '';
        let match = data.matches;
        let maxLoopData = match.length;
        if (match.length > 1) {
          maxLoopData = 1;
        }
        for (let i = 0; i < maxLoopData; i++) {dataMatchesHtml = `
        <div class="card">
          <div class="card-content">
              <h4 class="center-align">Matchday: ${match[i].matchday}</h4>
              <div class="center-align">Kick Off: ${match[i].utcDate}</div>
              <div class="row">
                <div class="col s4"><h5 class="center-align">${match[i].homeTeam.name}</h5></div>
                <div class="col s4"><h5 class="center-align">VS</h5></div>
                <div class="col s4"><h5 class="center-align">${match[i].awayTeam.name}</h5></div>
              </div>
          </div>
        </div>
        `;
        document.getElementById("upmatch").innerHTML = dataMatchesHtml;
        }
      })
      .catch(error);
  });
}

function getFavTeam() {
  getAll().then(function(team) {
    console.log(team);
    var saveHTML = "";
    team.forEach(function(teams) {
      saveHTML += `
                  <div class="card">
                    <a href="./detailteam.html?id=${teams.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                      <img src="${teams.crestUrl}" align="center" width="400" height="400" vspace="50">
                      <span class="card-title deep-purple darken-4">More Details</span>
                      </div>
                    </a>
                  </div>
                `;
    });
    if(team.length == 0) saveHTML += '<h6 class="center-align white-black">Tidak ada data Team yang Difavoritkan!</6>';
    document.getElementById("body-content").innerHTML = saveHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(teams) {
    saveHTML = '';
    var saveHTML = `
                    <div class="card">
                      <a href="./detailteam.html?id=${teams.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}" align="center" width="400" height="400" vspace="50">
                        <span class="card-title deep-purple darken-4">See More Details</span>
                        </div>
                      </a>
                    </div>
                `;
    if(team.length == 0) saveHTML += '<h6 class="center-align white-black">Tidak ada data Team yang Difavoritkan!</6>';
    document.getElementById("body-content").innerHTML = saveHTML;
  });
}