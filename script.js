//
// let inputText = document.getElementById('inputSearchName');
// let searchBtn = document.getElementById('searchBtn');
// searchBtn.addEventListener('click', () => {
// 	fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
// 			"x-rapidapi-key": "1bc74bec7ac42154d1d55c73273d5c66"
// 		}
// 	})
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});
// })


DZ.init({
    appId  : '395144',
    channelUrl : 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search',
    player: {
        container: 'player',
        width : 700,
        height : 200,
        onload : function(){
        }
    }
});
let inputText = document.getElementById('inputSearchName');
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("click", ()=>{
    let trackName = document.getElementById("inputSearchName");
    let request = new XMLHttpRequest();
    let url = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=track:'";
    if(trackName.value != ""){
        url += "track:'" + trackName.value + "'";
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
            alert("По вашему запросу ничего не найдено");
        }
    }
});
request.send();
});
