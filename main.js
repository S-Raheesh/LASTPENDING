img = "";
status = "";
objects = [];


function setup(){
    canvas = createCanvas(380,380);
    canvas.position(450,200);
    objectDetector =ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML ="Status:Dedecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
function modelLoaded(){
  status = true;
  console.log("Model is loaded");
  
}
function gotResult(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw(){
    image(video,0,0,380,380);
    
    if(status != ""){
      objectDetector.detect(video,gotResult);
      for(i=0; i<objects.length; i++){
        document.getElementById('status').innerHTML = "Status:Objects detected";
        document.getElementById('No_of_objects').innerHTML = "No of objects" + objects.length;
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects == "Person"){
          document.getElementById("detected").innerHTML = "Baby" + " " + "detected";
          speak_data = "Baby" + "Detected";
          speak();
        }
      }
    }
    function speak(){
      var synth = window.speechSynthesis;
  
      var utterThis = new SpeechSynthesisUtterance(speak_data);
  
      synth.speak(utterThis);
  
      speak_data = "";
  }

    
    
}