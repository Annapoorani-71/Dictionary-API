function Search() {  
    var word = document.getElementById("input").value;
    let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;  
       
    fetch(api)
        .then(function(response) {  
            let data = response.json();  
            return data;
        })
        .then(function(data) {
            // Input
            document.getElementById('word').innerHTML = word;
            
            // If no Definition
            if (data.message) {
                alert(data.message);
            } else {
                // Definitions
                const definitions = data[0].meanings[0].definitions;
                if (definitions && definitions.length > 0) {
                    document.getElementById('definition1').innerHTML = "1: " + definitions[0].definition;
                    document.getElementById('example1').innerHTML = "1: " + definitions[0].example;
                }
                
                // Synonyms
                const synonyms = data[0].meanings[0].definitions[0].synonyms;
                if (synonyms && synonyms.length > 0) {
                    document.getElementById('synonyms').innerHTML = synonyms.join(", ");
                }
                
                // Antonyms
                const antonyms = data[0].meanings[0].definitions[0].antonyms;
                if (antonyms && antonyms.length > 0) {
                    document.getElementById('antonyms').innerHTML = antonyms.join(", ");
                }
                
                // Audio
                const voiceUrl = data[0].phonetics[0].audio;
                var audio = document.getElementById('audio');
                var src = document.createAttribute("src");
                src.value = voiceUrl;
                audio.setAttributeNode(src);
            }
        });
}
