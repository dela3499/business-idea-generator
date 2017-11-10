defaultInput = `#Start -> 
 #Company for #Market 
 #Modifier version of #Company
 Improve #Company with #Concept
 Use #Concept to help #Market
 Create a #Resource for #Noun
 Improve the #Quality of #Company
 Improve #Need with #Tool
 Improve #Need for #Market
 Help #Market #Improve
       

#Tool -> 
 #Company
 #Resource
 #Concept
 #Tool

#Noun -> 
 #Company
 #Market

#Company -> 
 Uber
 Google
 Facebook
 Youtube

#Market -> 
 golfers
 programmers
 home cooks
 nomads
 writers
 researchers
 engineers
 minimalists

#Modifier -> 
 absurd
 friendlier
 space-age
 simpler
 funnier
 safer
 more exciting


#Concept -> 
 context-free grammar
 deep learning
 physics simulation

#Resource -> 
 community
 book
 market
 toolkit
 training tool
 search engine
 knowledge base
 up-to-date list
 messaging system
 notification system
 newsletter
 club

#Quality -> 
 speed
 cost
 quality

#Need -> 
 food
 shelter
 health
 fitness
 romance
 love
 friendship
 learning

#Improve -> 
 learn faster
 reduce frustration
 10x their results
 earn more
 meet friends
 waste less time
`

function formatKey(key) {
  return key.trim().slice(0,-2).trim()
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function parseRules(inputText) {
  var rawLines = inputText.split("\n")
  var lines = []
  
  for (i = 0; i < rawLines.length; i++) { 
    if (rawLines[i] !== "") {
      lines.push(rawLines[i])
    }
  }
  
  var rules = {}
  var key = ""
  var replacements = []
  
  for (i = 0; i < lines.length; i++) { 
    if (lines[i].includes("->")) {
      
      if (key !== "" && replacements.length > 0) {
        rules[key] = replacements
        key = ""
        replacements = []
      }
      
      key = formatKey(lines[i])
      
    } else {
      replacements.push(lines[i].trim())
      
      if (i == (lines.length - 1)) {
        rules[key] = replacements
      }
      
    }
  }
  return rules
}


function generateSentence(rules) {
  function replaceWord(word) {
    if (word[0] !== "#") {
      return word
    } else {
      if (!(word in rules)) {
        console.log(word + " not found (typo?)")
        return word
      } else
        return randomChoice(rules[word])
    }
  }
  
  function replaceWords(words) {
    newWords = []
    for (i = 0; i < words.length; i++) {     
      newWords[i] = replaceWord(words[i])
    }
    return newWords
  }
  

  sentence = randomChoice(rules['#Start'])

  for (j = 0; j < 10; j++) {   
    initialWords = sentence.split(" ")
    newWords = replaceWords(initialWords)
    sentence = newWords.join(" ")
  }

  return sentence
  
}

function generateSentences(rules, n) {
  sentences = []
  for (k = 0; k < n; k++) {   
    sentences.push(generateSentence(rules))
  }  
  return sentences
}

// var rules = parseRules(input)

// generateSentences(rules,10)


var viewSentences = function (results) {
	return m("div", 
			{class: "results"},
			(results.map(function (result) { return m("div", {class: "result"}, result)}))
			)
}		

var view = function (input) {
	var rules = parseRules(input)
	var results = generateSentences(rules,50)
	m.render(root, 
		m("div", 
			[ m("textarea", {id: "userInput", class: "input"}, input),
			  viewSentences(results)
			])
		)
}

var update = function() {
	var inputValue = document.getElementById('userInput').value
	view(inputValue)
}
	
var root = document.getElementById("result")

view(defaultInput)
