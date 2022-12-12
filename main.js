song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    Canvas = createCanvas(600,500);
    Canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function modalLoaded(){
    console.log('Pose is Initialized');
}

function gotPoses(results){
    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "+scoreRightWrist+"scoreLeftWrist = "+scoreLeftWrist);
        

        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX+ "leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+ "rightWristY = "+rightWristY);
    }
}

function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");

    if(scoreRightWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);

    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("Speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY <=500)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist>0.2){
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("Volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
}
}

function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

