const inputEl = document.getElementById('input')
const infoTextEl = document.getElementById('info-text')
const errorTextEl = document.getElementById('error-text')
const meaningContainer = document.querySelector(".meaning-container");
const wordTitle = document.getElementById("word-title");
const wordMeaning = document.getElementById("word-meaning");
const audioEl = document.getElementById("audio")

async function fetchData(word){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        infoTextEl.textContent = `search the meaning of "${word}"`
        const result = await fetch(url).then(res => res.json())
        if(result.title){
            infoTextEl.style.display = 'none';
            meaningContainer.style.display = "flex";
            wordMeaning.style.display = 'inline-flex'
            wordTitle.style.display = 'inline-flex'
            wordTitle.textContent = "Word Title: "+ word
            wordMeaning.textContent = "Word Meaning: N/A";
            audioEl.style.display = "none"
    }else{
        infoTextEl.style.display = 'none';
        meaningContainer.style.display = "flex";
        wordMeaning.style.display = 'inline-flex'
        wordTitle.style.display = 'inline-flex'
        wordTitle.textContent = "Word-Title: "+ result[0].word;
        wordMeaning.textContent = "Meaning: "+ result[0].meanings[0].definitions[0].definition;
        audioEl.style.display = "inline-flex"
        audioEl.src = result[0].phonetics[0].audio
    }
        
    console.log(result)
    } catch (error) {
        console.log(error)
        wordMeaning.style.display = 'none'
        wordTitle.style.display = 'none'
        audioEl.style.display = 'none'
        infoTextEl.style.display = "block"
        infoTextEl.textContent = "an error occured! try again later"
    }
}

inputEl.addEventListener('keyup',(e)=>{
    if(e.target.value !== "" && e.key === 'Enter'){
        fetchData(e.target.value)
    }
})