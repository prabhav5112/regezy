function newFunc(e){
    if (e.id.slice(-1) == 0){
        e.style.backgroundColor = 'currentColor';
        e.id = e.id.replace(/.$/,"1")
    }
    else {
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
        var letter = ["red", "orange", "green","yellow","brown"];
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
    regex(1)
    char_colors(strToArr)
}
function count() {
    let selected_regex = /^(char).*1$/;
    let selected =[], all=document.getElementsByTagName('*');
    for (let i=all.length-1;i>=0; i--) if ((all[i].id.match(selected_regex))) selected.push(all[i]);
    return selected;
}
function regex(val=0) {
    let i = count();
    //console.log(i.length)
    let index_regex = /(\d+)(?=\D)/
    if(i.length == 2){
        let ending_index = parseInt(i[0].id.match(index_regex)[0]);
        let starting_index = parseInt(i[1].id.match(index_regex)[0]);
        let req = document.getElementById("ss-box").innerText.slice(starting_index,ending_index+1);
        if(document.getElementById('menu-input1').checked) {
        re = "/(" + req + ")/";
        }
        else if(document.getElementById('menu-input2').checked) {
        re = "/.{" +starting_index+ "}(" +req+ ")/"
        }
        else if(document.getElementById('menu-input3').checked) {
        re = "/(\\s.{"+ req.length +"}$|((\\s.{"+ req.length +"})(?=\\s)))/"
        }
        document.getElementById("regular-expression").innerText = re;
    }
    else if(i.length == 1){
        let index = parseInt(i[0].id.match(index_regex)[0]);
        //console.log(index)
        let req = document.getElementById("ss-box").innerText[index];
        if(document.getElementById('menu-input1').checked) {
        re = "/(" + req + ")/";
        }
        else if(document.getElementById('menu-input2').checked) {
        re = "/.{" +index+ "}(" +req+ ")/"
        }
        else if(document.getElementById('menu-input3').checked) {
        re = "/(\\s.{"+ req.length +"}$|((\\s.{"+ req.length +"})(?=\\s)))/"
        }
        document.getElementById("regular-expression").innerText = re;
    }
    if (val == 1){
        document.getElementById("regular-expression").innerText = '';
    }
    else {
        return -1;
    }
}
