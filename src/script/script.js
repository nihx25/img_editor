const fileInput=document.querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
filterName=document.querySelector(".filter-info .name"),
filterValue=document.querySelector(".filter-info .value"),
filterSlider=document.querySelector(".slider input"),
rotateOptions=document.querySelectorAll(".rotate button"),
previewImg=document.querySelector(".preview-img img"),
resetFilterBtn=document.querySelector(".reset-filter"),
chooseImgBtn=document.querySelector(".choose-img"),
saveImgBtn=document.querySelector(".save-img");

let brightness=100, saturation=100, inversion=0,grayscale=0; //by default value
let rotate=0,flipVertical=1,flipHorizontal=1;

const applyFilters =()=> {
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipVertical},${flipHorizontal})`;
    previewImg.style.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
}

const loadImage=() =>{
    let file=fileInput.files[0]; //getting user selected file
    if(!file) return; //return if user hasn't selected file
   previewImg.src=URL.createObjectURL(file);//passing file url as preview img src
   previewImg.addEventListener("load", () => {
    resetFilterBtn.click(); //cicking reset buton,so the filter value reset if user select new image
    document.querySelector(".container").classList.remove("disable");
   });
}

filterOptions.forEach(option=>{
    option.addEventListener("click", ()=>{//adding click event listener to all filter buttons
document.querySelector(".filter .active").classList.remove("active");
option.classList.add("active");
filterName.innerText=option.innerText;

if(option.id === "brightness"){
    filterSlider.max="200";
    filterSlider.value=brightness;
    filterValue.innerText=`${brightness}%`;
}

else if(option.id === "saturation"){
    filterSlider.max="200";
    filterSlider.value=saturation;
    filterValue.innerText=`${saturation}%`;
}

else if(option.id === "inversion"){
    filterSlider.max="100";
    filterSlider.value=inversion;
    filterValue.innerText=`${inversion}%`;
}
 else
{ 
    filterSlider.max="100";
    filterSlider.value=grayscale;
 filterValue.innerText=`${grayscale}%`;}



    });
});

const updatefilter=()=>{
   filterValue.innerText=`${filterSlider.value}%`;
   const selectedFilter=document.querySelector(".filter .active");

   if(selectedFilter.id === "brightness"){
    brightness=filterSlider.value;
   }
   else if(selectedFilter.id === "saturation"){
    saturation=filterSlider.value;
   }
   else if(selectedFilter.id === "inversion"){
    inversion=filterSlider.value;
   }
   else
    grayscale=filterSlider.value;
   applyFilters();
}

rotateOptions.forEach(option=> {
    option.addEventListener("click",()=>{ //adding click event listener to all rotate/flip buttons
        if(option.id==="left"){
            rotate -= 90; //if clicked button is left rotate,decrement rotate value by -90
        }
       else if(option.id==="right"){
            rotate += 90; //if clicked button is right rotate,increment rotate value by 90
        }
        if(option.id==="vertical"){//if flipVertical value is 1,set this value to -1 else set 1
        flipVertical=flipVertical===1?-1 :1;
        }
        else{ //if flipHorizontal value is 1,set this value to -1 else set 1
        flipHorizontal=flipHorizontal===1?-1 :1;
        }
applyFilters();
    });
});
const resetFilter=()=>{

    //reseting filters to their default value
    brightness=100; saturation=100; inversion=0;grayscale=0; 
    rotate=0;flipVertical=1;flipHorizontal=1;
    filterOptions[0].click(); //resetting slider value to default
    applyFilters();
}

const saveImage=()=>{
    // console.log("Save image btn clicked");
    const canvas = document.createElement("canvas");//creating canvas element
    const ctx=canvas.getContext("2d"); //canvas.getContext return a drawing context on the canvas
    canvas.width=previewImg.naturalWidth; //setting canvas width to actual image width
    canvas.height=previewImg.naturalHeight; //seting canvas height to actual image height

    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `; //applying user selected filters to the canvas

    ctx.translate(canvas.width/2,canvas.height/2); //translating canvas from center
if(rotate!=0){
    //if rotate value isnt 0,rotate the canvas
    ctx.rotate(rotate*Math.PI/180);
}
ctx.scale(flipVertical,flipHorizontal); //flip canvas

    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    //drawImage(image to draw,dx,dy,dwidth,dheight)
    // document.body.appendChild(canvas);
    const link =document.createElement("a"); //creating <a> element
    link.download="image.jpg";
    link.href=canvas.toDataURL(); //passing <a> tag href value to canvas data url
    //todataurl returns a data url containing representation of image
    link.click(); //clicking <A> tag so the image gets downloaded
}

fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updatefilter);
resetFilterBtn.addEventListener("click",resetFilter);
saveImgBtn.addEventListener("click",saveImage);
chooseImgBtn.addEventListener("click",()=>fileInput.click());;