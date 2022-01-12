const winkNLP = require( 'wink-nlp' );
const model = require( 'wink-eng-lite-web-model' );
const nlp = winkNLP( model )
var lemmatize = require( 'wink-lemmatizer' );
window.nlp = nlp;
window.lemmatize = lemmatize;

// Acquire "its" and "as" helpers from nlp.
const its = nlp.its;
const as = nlp.as;
window.its = its;
window.as = as;
