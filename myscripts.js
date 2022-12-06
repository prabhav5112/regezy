function newFunc(e){
    console.log(e.id)
    if (e.id.slice(-1) == 0){
        var color = e.style.color;
        e.style.color = "black";
        e.style.backgroundColor = color;
        e.id = e.id.replace(/.$/,"1")
    }
    else {
        e.style.color = e.style.backgroundColor;
        e.style.backgroundColor = '';
        e.id = e.id.replace(/.$/,"0")
    }
    regex();
}
function char_colors(strToArr){
    const letters = /[a-zA-Z]/;
    const digits = /[0-9]/;
    const symbols = /[^\s]/;
    const wspace = /[\s]/
    var i = 0;
    reference = document.getElementById("display")
    reference.innerHTML = "";
    while (i < strToArr.length){
        let tag = document.createElement("a")
        var letter = ["lightblue", "orange", "green","yellow","brown"];
        if (strToArr[i].match(letters)){
            tag.style.color = letter[0];
            tag.id = "char-"+ i + "-" +letter[0] + "-" + strToArr[i] + "-0";
        }
        else if (strToArr[i].match(digits)){
            tag.style.color = letter[1];
            tag.id = "char-"+ i + "-" +letter[1] + "-" + strToArr[i] + "-0";
        }
        else if (strToArr[i].match(symbols)){
            tag.style.color = letter[2];
            tag.id = "char-"+ i + "-" +letter[2] + "-" + strToArr[i] + "-0";
        }
        else if (strToArr[i].match(wspace)){
            tag.style.color = letter[3];
            tag.id = "char-"+ i + "-" +letter[3] + "-" + strToArr[i] + "-0";
        }
        tag.innerHTML = strToArr[i]
        reference.appendChild(tag);
        var elem = document.getElementById(tag.id)
        elem.onclick = () => { newFunc(tag); };
        i++;
    }
}
function display() {
    let inText= document.getElementById("input-text").value;
    document.getElementById("ss-box").innerText = inText;
    var strToArr = inText.split("");
    regex(1);
    char_colors(strToArr)
}
function count() {
    let selected_regex = /^(char).*1$/;
    let selected =[], all=document.getElementById("display").getElementsByTagName('*');
    for (let i=all.length-1;i>=0; i--) if ((all[i].id.match(selected_regex))) selected.push(all[i]);
    return selected;
}
function regex(val=0) {
    let i = count();
    let index_regex = /(\d+)(?=\D)/
    document.getElementById("menu-input4").disabled=true;
    if (val == 1){
        document.getElementById("regular-expression").innerText = '';
        return 0;
    }
    if(i.length == 2){
        document.getElementById("menu-input4").disabled=false;
        let ending_index = parseInt(i[0].id.match(index_regex)[0]);
        let starting_index = parseInt(i[1].id.match(index_regex)[0]);
        let req = document.getElementById("ss-box").innerText.slice(starting_index,ending_index+1);
        let len = req.length;
        req = filter(req);
        if(document.getElementById('menu-input1').checked) {
            re = "/(" + req + ")/";
        }
        else if(document.getElementById('menu-input2').checked) {
            re = "/.{" +starting_index+ "}(" +req+ ")/"
        }
        else if(document.getElementById('menu-input3').checked) {
            re = "/(\\s.{"+ len +"}$|((\\s.{"+ len +"})(?=\\s)))/"
        }
        else if (document.getElementById('menu-input4').checked){
            re = "/("+ req.slice(0,1) + ").*?("+ req.slice(-1) + ")/"
        }
        document.getElementById("regular-expression").innerText = re;
    }
    else if(i.length == 1){
        let index = parseInt(i[0].id.match(index_regex)[0]);
        let req = document.getElementById("ss-box").innerText[index];
        req = filter(req);
        if(document.getElementById('menu-input1').checked) {
            re = "/(" + req + ")/";
        }
        else if(document.getElementById('menu-input2').checked) {
            re = "/.{" +index+ "}(" +req+ ")/"
        }
        else if(document.getElementById('menu-input3').checked) {
            re = "/(\\s.{"+ "1" +"}$|((\\s.{"+ "1" +"})(?=\\s)))/"
        }
        document.getElementById("regular-expression").innerText = re;
    }
    else {
        return -1;
    }
}
function filter(req) {
    let list = ["\\\\","\\s","\\+", "\\*", "\\{","\\}","\\(","\\)","\\[","\\]","\\?","\\^","\\|","\\.","\\$"];
    let i = 0;
    while(i < list.length) {
        let reg_replace = new RegExp(list[i], "g");;
        let escaped_string = "";
        if(i > 0) {
            escaped_string = list[i];
            escaped_string = "\\" + escaped_string.slice(1);
        } else {
            escaped_string = "\\\\";
        }
        req = req.replace(reg_replace, escaped_string);
        i++;
    }
    return req;
}

function copy_regex() {
    // Get the text field
    var copyText = document.getElementById("regular-expression");
  
    // Select the text field
    var regex = copyText.innerText;
    navigator.clipboard.writeText(regex);
    
    // Alert the copied text
    if (regex != ""){
        document.getElementById("tick-mark").style.visibility = "visible";
        setTimeout(function() {document.getElementById("tick-mark").style.visibility = "hidden";},2000);
    }
  }

document.addEventListener("keydown", ({key}) => {
    if (key === "Escape"){
        display();
    }
})
