var noseX = 0;
var noseY = 0;
var difference = 0;
var leftWristX = 0;
var rightWristX = 0;
var sampleText = 0;

function preload() { }

function setup() {
    video = createCapture(VIDEO);
    video.position(10, 180);
    video.size(550, 500);

    canvas = createCanvas(450, 450);
    canvas.position(570, 150);

    posenet = ml5.poseNet(video, function () {
        console.log("model loaded.");
    });

    posenet.on('pose', function (results) {
        if (results.length > 0) {
            console.log(results); 
            
            noseX = results[0].pose.nose.x;
            noseY = results[0].pose.nose.y;
            console.log("Nose x: " + noseX + " y: " + noseY);

            leftWristX = results[0].pose.leftWrist.x;
            rightWristX = results[0].pose.rightWrist.x;
            difference = floor(leftWristX - rightWristX);
            console.log("Font Size: " + difference);
        }
        
    });
}

function draw() {
   
    background("#3E8C47");
    sampleText = document.getElementById("text").value;
    textSize(difference);
    fill(0, 102, 153);
    text(sampleText, noseX, noseY);
    document.getElementById("font-size").innerHTML = "Size of the font will be " + difference;
}
