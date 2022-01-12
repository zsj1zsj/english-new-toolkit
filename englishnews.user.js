// ==UserScript==
// @name         China Daily
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  highlight new vocab from sites.
// @author       Lynn
// @match        *://www.chinadaily.com.cn/a/*
// @match        http*://edition.cnn.com/*/index.html
// @icon         https://www.google.com/s2/favicons?domain=zhihu.com
// @require file://D:\DEV\js\bundle.js
// @grant        none
// ==/UserScript==

(function() {
    // Your code here...

    const wordsSet = new Set(wordsArr);

    var content = document.querySelectorAll("#Content > p");

    if(window.location.host.includes('cnn.com')){
        content = document.querySelectorAll("div.zn-body__paragraph")
    }

    for(let i = 0;i<content.length;i++){
        let phtml = content[i];
        let ptext = content[i].textContent;
        var doc = nlp.readDoc(ptext);

        var pos = doc.tokens().out(its.pos);
        var words =doc.tokens().out(its);

        for(let i = 0;i< pos.length;i++){
		let lemmatized = words[i].trim().toLowerCase();
		switch(pos[i]){
			case "VERB":
				lemmatized = lemmatize.verb(lemmatized);
				if(wordsSet.has(lemmatized))continue;
				words[i] = "<span style ='background:red'>" + words[i]+"</span>";
				break;
			case "NOUN":
				lemmatized = lemmatize.noun(lemmatized);
				if(wordsSet.has(lemmatized))continue;
				words[i] = "<span style ='background:yellow'>" + words[i]+"</span>";
				break;
			case "ADJ":
				lemmatized = lemmatize.adjective(lemmatized);
				if(wordsSet.has(lemmatized))continue;
				words[i] = "<span style ='background:yellow'>" + words[i]+"</span>";
				break;
            }
        }

        // doc.entities().each((e) => e.markup());
        phtml.innerHTML = words.join(" ");
    }
})();
