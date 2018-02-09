var fs = require('fs')

var path = think.RESOURCE_PATH + '/keywords'

var map = {}
var array = []

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path, {encoding: 'UTF-8'})
});

lineReader.on('line', function (line) {
  if(!line) return
  addWord(line)
});

function addWord(word) {

  var parent = map
  var arr = array
  
  arr.push(word)

  //parent.push(word)
  for (var i = 0; i < word.length; i++) {
    //if (!parent[word[i]]) parent[word[i]] = {}
    //parent = parent[word[i]]
  }
  //parent.isEnd = true
}

function filter(s) {
  var parent = map

  if (s == null) {
    return ''
  }

  var sWord = ''
  for (var i = 0; i < array.length; i++) {
    //var reg = new RegExp(parent[i], 'g')
    console.log(i);
    //if (array[i].indexOf('*') > -1) {
    //  continue;
    //}
    if (s.indexOf(array[i]) > -1) {
      return array[i];
    }
  }
  return '';
}

function filter0(s) {
  var parent = map

  var find = false
  if (s == null) {
    return ''
  }

  var sWord = ''
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '*') {
      continue
    }

    var found = false
    var skip = 0
    sWord = ''

    for (var j = i; j < s.length; j++) {

      if (!parent[s[j]]) {
        // console.log('skip ', s[j])
        found = false
        skip = j - i
        parent = map
        break;
      }

      sWord = sWord + s[j]
      if (parent[s[j]].isEnd) {
        found = true
        skip = j - i
        break
      }
      parent = parent[s[j]]
    }

    if (skip > 1) {
      i += skip - 1
    }
	
	console.log(sWord)

    if (!found) {
      continue
    }
    else {
      find = true
      break;
    }

    /*var stars = '*'
    for (var k = 0; k < skip; k++) {
      stars = stars + '*'
    }

    var reg = new RegExp(sWord, 'g')
    s = s.replace(reg, stars)*/

  }

  //if(typeof cb === 'function'){
  //  cb(null, find)
  //}

  return sWord
}

function buildMap(wordList) {

    var result = {};

    var count = wordList.length;

    for (var i = 0; i < count; ++i) {

        var map = result;

        var word = wordList[i];

        for (var j = 0; j < word.length; ++j) {

            var ch = word.charAt(j);

            if (typeof(map[ch]) != "undefined") {

                map = map[ch];

                if (map["empty"]) {

                    break;

                }

            }

            else {

                if (map["empty"]) { 

                    delete map["empty"]; 

                }

                map[ch] = {"empty":true};

                map = map[ch];

            }

        }

    }

    return result;

}

          

function check(map, content) {

    var result = [];

    var count = content.length;

    var stack = [];

    var point = map;

    for (var i = 0; i < count; ++i) {

        var ch = content.charAt(i);

        var item = point[ch];

        if (typeof(item) == "undefined") {

            i = i - stack.length;

            stack = [];

            point = map;

        }

        else if (item["empty"]) {

            stack.push(ch);

            result.push(stack.join(""));

            stack = [];

            point = map;

        }

        else {      

            stack.push(ch);

            point = item;

        }

    }

    return result;

}

          

function filter1(content) {

    var map = buildMap(array);         

    var words = check(map, content);

    console.log(words);
	return words;

}



module.exports = {
  filter: filter
}