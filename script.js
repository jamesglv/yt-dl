var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
var outputSelect = document.querySelector('.output-select');

convertBtn.addEventListener('click', () => {
    console.log("URL: "+URLinput.value);
    console.log(outputSelect.value);
    sendURL(URLinput.value, outputSelect.value);
});

function sendURL(URL,outSel) {
    window.location.href = "https://ytdownloadtest.herokuapp.com/download?URL="+URL+"&output="+outSel;
    console.log("http://localhost:4000/download?URL="+URL+"&output="+outSel)
}