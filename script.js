var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
var outputSelect = document.querySelector('.output-select');
var APIKey = "AIzaSyD0igbOdZqjh8Q0BX-g52ighB2xZGlHZPI";
var resultsList = document.getElementById("resultsList");
var liContainer = document.createElement("div");
var newLI = document.createElement("li");;

//Event Listeners

liContainer.addEventListener('click', selectVideo);

convertBtn.addEventListener('click', () => {
    var inputStr = URLinput.value

    if(inputStr.startsWith("http" || "www.")){
        console.log("URL: "+URLinput.value);
        console.log(outputSelect.value);
        sendURL(URLinput.value, outputSelect.value);
        URLinput.value = "";
    } else {
        videoSearch(URLinput.value,5);
        convertBtn.innerText = "Search";
        URLinput.value = "";
    }
});

URLinput.addEventListener('input', () => {
    var inputStr = URLinput.value
    if(inputStr.startsWith("http" || "www.")){
        convertBtn.innerText = "Convert"
    }
    else{
        convertBtn.innerText = "Search"
    }
});


//Functions
function videoSearch(search,maxResults) {

    var searchURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyD0igbOdZqjh8Q0BX-g52ighB2xZGlHZPI&q="+search+"&maxResults="+maxResults+"&type=video&part=snippet";
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.responseType = "json";
    xmlHttp.open("GET",searchURL,true);
    xmlHttp.send();

    xmlHttp.onreadystatechange = () => {
        
        liContainer.style.opacity = 0;
        var i;
        for (i=0; i<xmlHttp.response.items.length; i++) {
            console.log(xmlHttp.response.items[i].snippet.title);
            console.log(xmlHttp.response.items[i].id.videoId);

            //create LI and add classlist
            var newLI = document.createElement("LI");
            newLI.classList.add("newLI");

            //add thumbnail
            var thumb = document.createElement("img");
            thumb.src = xmlHttp.response.items[i].snippet.thumbnails.default.url;
            thumb.classList.add("thumbnail");

            //add title
            var titleText = document.createElement("p");
            titleText.innerText = xmlHttp.response.items[i].snippet.title;
            titleText.classList.add("titleText");

            //add videoId
            var vidId = document.createElement("p");
            vidId.innerText = xmlHttp.response.items[i].id.videoId;
            vidId.classList.add("vidId");

            liContainer.classList.add("liContainer");
            liContainer.id = "liContainer";
            
            newLI.appendChild(vidId);
            newLI.appendChild(thumb);
            newLI.appendChild(titleText);
            liContainer.appendChild(newLI);
            resultsList.appendChild(liContainer);
            console.log(resultsList);
            setTimeout(fadeIn,100);

            function fadeIn(){
                liContainer.style.transition = "opacity 1s ease";
            liContainer.style.opacity = 1;
            }
            
        }
    }
    
}

function sendURL(URL,outSel) {
    window.location.href = "https://ytdownloadtest.herokuapp.com/download?URL="+URL+"&output="+outSel;
    //window.location.href = "http://localhost:4000/download?URL="+URL+"&output="+outSel;
    console.log("http://localhost:4000/download?URL="+URL+"&output="+outSel)
}

function selectVideo(e){
    URLinput.value = "http://www.youtube.com/watch?v="+e.target.childNodes[0].innerText;
    convertBtn.innerText = "Convert";
    var fadeElem = document.getElementById("liContainer");
    fadeElem.style.transition = "opacity 1s ease";
    fadeElem.style.opacity = 0;
    setTimeout(removeList, 1000);
}

function removeList(){
    var i;
    while (liContainer.firstChild){
        liContainer.removeChild(liContainer.firstChild);
    }
}