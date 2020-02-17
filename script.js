document.addEventListener('DOMContentLoaded', initPlayer);
function initPlayer() {
    DZ.init({
        appId: '395144',
        channelUrl: 'http://mypleerNoer.com/channel.html',
        player: {
            container: 'dz-root',
            width: 450,
            height: 450,
            format: 'square',
            onload: function () {
            }
        }
    });
}

let inputSearchName = document.getElementById("inputSearchName");
let inputSearchTrack = document.getElementById("inputSearchTrack");
let searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
      let request = new XMLHttpRequest();
      let url = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=artist:'";
    //  let urlTrack = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=track:'";
      if(inputSearchTrack.value != "" && inputSearchName.value != "") {
        url += inputSearchName.value + "'" + "track:'" + inputSearchTrack.value + "'";
      }
      else if (inputSearchName.value != "") {
          url += inputSearchName.value + "'";
      }
      else if (inputSearchTrack.value != "") {
          url += "'" + "track:'" + inputSearchTrack.value + "'";
      }
      console.log(url);
      request.open('GET', url);
      request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
          let array = JSON.parse(request.responseText);
          if(typeof array.data[0] != "undefined"){
              DZ.player.playTracks([array.data[0].id]);
          }
          else{
              alert("К сожаления ничего не найдено");
          }
      }
  });
  request.send();
  });
}

