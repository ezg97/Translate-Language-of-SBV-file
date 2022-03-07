document.getElementById('input-file')
  .addEventListener('change', getFile);
  
document.getElementById('paste').addEventListener('change', translateToJap);
let globalTimeStamps = [];

function translateToJap(e) {
// e.preventDefault();
let jap = e.target.value;

console.log(jap);
console.log(globalTimeStamps);
let japTSCount = (jap.split('||||').length-1);
console.log('total scs', japTSCount);
let replaceNew
  for (let i = 0; i < japTSCount; i++) {
  	if (i === 0) {
      replaceNew = (globalTimeStamps[i] + '\n');
    } else {
      replaceNew = ("\n\n" + globalTimeStamps[i] + '\n');

    }
  	console.log('#'+i+') replaceNew -> ' + replaceNew);
    jap = jap.replace('||||', replaceNew);
  }
  console.log('new jap w/ tmestamps: ', jap);
  console.log('value: ', document.getElementById('paste').value);
  document.getElementById('paste').value = jap;
}

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
  	console.log('1) get file - executed');
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
    	console.log('2) place file - executed');

  	target.value = content;
    let newC = content;
    
    // Look for a colon, grab the whole line, if the line has 4 colons, then replace line with |||| and remove new line
    newC = newC.split('\n');
    let newString = [];
    for (let i=0; i<newC.length; i++) {
    	let colonCount = (newC[i].split(':').length-1);
    	if(colonCount === 4) {
      	newString.push(' |||| ');
        globalTimeStamps.push(newC[i].replace(/(\r\n|\n|\r)/gm, ""));
      }
      else {
        newString.push(newC[i]);
      }
    }
    
    newC = newString.join('\n').replace(/(\r\n|\n|\r)/gm, "");
    //newC = newC.replace(/(\r\n|\n|\r)/gm, "");
	target.value = newC;
    
    console.log(newC);
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader();
    	console.log('3) read file - executed');

  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}