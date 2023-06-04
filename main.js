function preload(){
    alertSound = loadSound("Alert.wav");
}
person = false;

function setup(){
    canvas = createCanvas(600, 600);
    canvas.position(370, 180);

    video = createCapture(VIDEO);
    video.hide()
    cocossd = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded(){
    console.log("modelLoaded");
}

function draw(){
    image(video, 0, 0, 600, 600);
    cocossd.detect(video, detected);
    
}

function detected(error, results){
    if(error){
        console.error(error);
    } else {
        a = false
        for(i = 0; i < results.length; i++){
            if(results[i] == 'person'){
                a = true
            }
        }
        if(a == true){
            person = true
        } else {
            person = false
            if(alertSound.isPlaying() == false){
                alertSound.play()
            }
        }
    }
}