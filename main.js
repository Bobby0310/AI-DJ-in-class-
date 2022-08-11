
sound="";

RWScore=0
LwScore=0

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;


function preload(){
    sound=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(300,300);
    canvas.position(500,250);

    video =createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)

}

function modelLoaded(){
    console.log("poseNet is turned on");
}


function gotPoses(results){
if(results.length>0)
    console.log(results)

    RWScore=results[0].pose.keypoints[10].score;
    LWScore=results[0].pose.keypoints[9].score;
    console.log("Right wrist score is "+ RWScore +". Left Wrist score is "+ LwScore +".");

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;

    
    console.log("Right wrist x is "+ rightWristX+ ". Right Wrist y is "+rightWristY+".");

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("Left Wrist x is "+ leftWristX+ ". Left Wrist y is "+leftWristY+".");
    
}



function Play(){
   sound.play();
   sound.rate(1);
   sound.setVolume(1);
}


function draw(){
image(video,0,0,300,300)

fill("#ff0000")
stroke("#ff0000")

if(RWScore>0.05){
    circle(rightWristX,rightWristY,20)

    if(rightWristY>0 && rightWristY<100){
        sound.rate(0.5);
        document.getElementById("Speed").innerHTML="Speed = 0.5x"
    }
    else if(rightWristY>100 && rightWristY<200){
        sound.rate(1.0);
        document.getElementById("Speed").innerHTML="Speed = 1.0x"
    }


    else if(rightWristY>200 && rightWristY<300){
        sound.rate(1.5);
        document.getElementById("Speed").innerHTML="Speed = 1.5x"
    }
    else if(rightWristY>300 && rightWristY<400){
        sound.rate(2.0);
        document.getElementById("Speed").innerHTML="Speed = 2.0x"
    }

    else if(rightWristY>400){
        sound.rate(2.5);
        document.getElementById("Speed").innerHTML="Speed = 2.5x"
    }
}

if(LwScore>0.05){
    circle(leftWristX,leftWristY,20);
    GetNumber=Number(leftWristY);
    flooring=floor(GetNumber);
    left_Divid= flooring/500;
    document.getElementById("volumek").innerHTML="Volume"+left_Divid;
    sound.setVolume(left_Divid);
    console.log();
}
}

function Stop_pls(){
    sound.stop();
}
