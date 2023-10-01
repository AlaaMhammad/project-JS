let controlButton = document.querySelector(".control-button")
let start = document.querySelector(".control-button span")
let playerName = document.querySelector(".player")
let tries = document.querySelector(".tries")
let parentBlocks = document.querySelector(".memory-blocks")
let btn = document.querySelector(" .info button i")
let blocks = Array.from(parentBlocks.children)
let blocksNum = blocks.length ;
let orderRange = [...Array(blocks.length).keys()]  

btn.onclick = _=>{
    location.reload();
}
shuffle(orderRange);
start.onclick = function(){
    let yourName = prompt("What Your Name ?")
    if(yourName == "" || yourName == null){
        playerName.innerHTML = "Unknown";
    }
    else {
        playerName.innerHTML = yourName ;
    }
    controlButton.style.display = "none"
}
blocks.forEach((block,index)=>{ //  اضافة خاصية الاوردر
    block.style.order = orderRange[index]
    block.addEventListener('click',function(){
        flipBlock(block)
    })
})

function flipBlock(selectBlock){

    selectBlock.classList.add("rotate")
    console.log()
    let allFlipBlock = blocks.filter(flipBlock=>flipBlock.classList.contains("rotate"))
    if(allFlipBlock.length == 2 ){
        stopClicking();
        matchedBlock(allFlipBlock[0],allFlipBlock[1])
    }
}

// Function stop click
function stopClicking(){
    //add class no clicking 
    parentBlocks.classList.add("no-clicking")

    // remove class after time 
    setTimeout(()=>{
        parentBlocks.classList.remove("no-clicking")
    },1500)
}
// Function Check Matched 
function matchedBlock(block1 , block2){
    if(block1.dataset.technology === block2.dataset.technology){
        block1.classList.remove("rotate")
        block2.classList.remove("rotate")
        block1.classList.add("matched")
        block2.classList.add("matched")
        checkFinich();
        document.querySelector("#success").play();
    }
    else {
        tries.innerHTML ++ ;
        setTimeout(()=>{
            block1.classList.remove("rotate")
        block2.classList.remove("rotate")
        },1000)
        document.getElementById("fail").play();
    }
}
function shuffle(arr){ // ترتيب عشوائي للارري
    let current = arr.length ,
    temp ,
    random ;
    while(current>0){
        random = Math.floor(Math.random()*current)
        current -- ;
        temp = arr[current];
        arr[current]= arr[random]
        arr[random]= temp
    }
    return arr ;
}
function checkFinich(){
    let arr =[]
    blocks.forEach(block=>{
        if(block.classList.contains("matched")){
            arr.push(true);
        }
    })
    if(arr.length === 20){
        document.querySelector(".numTries span").innerHTML = tries.innerHTML ;
        document.querySelector(".finishGame").style.display="block"
    }
}
document.querySelector(".finishGame .again").onclick=()=>{
    location.reload();
}