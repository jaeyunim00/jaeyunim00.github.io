var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

var time = 0;
function updateTime() {
  time++; // 초당 1씩 증가
  if (Eco_currentImage === img__1) {
    Eco_currentImage = img__3;
  } else if (Eco_currentImage === img__3) {
    Eco_currentImage = img__4;
  } else if (Eco_currentImage === img__4) {
    Eco_currentImage = img__5;
  } else if (Eco_currentImage === img__5) {
    Eco_currentImage = img__1;
  } // 2초에 한 번씩 호출
}

setInterval(updateTime, 1000);
var img__1 = new Image();
img__1.src = "eco1.png";
var img__3 = new Image();
img__3.src = "eco2.png";
var img__4 = new Image();
img__4.src = "eco3.png"; //표창
var img__5 = new Image();
img__5.src = "eco4.png";
var collidedObstacles = [];
var button = false;
var dino = {
  x: 450,
  y: canvas.height / 2 - 30,
  width: 40,
  height: 60,
  jumpHeight: 270,
  jumpVelocity: 0,
  jumpPower: 6,
  canJump: true,
  jumping: false,
};
var human = {
  x: 480,
  y: canvas.height / 2 - 30,
  width: 50,
  height: 70,
  jumping: false,
  jumpHeight: 270,
  jumpVelocity: 0,
  jumpPower: 6,
  canJump: true,
};
var img_1 = new Image();
var img_2 = new Image();
var img_3 = new Image();
var img_4 = new Image();
var img_5 = new Image();
var img_6 = new Image();
var img_7 = new Image();
var img_8 = new Image();
var img_9 = new Image();
img_1.src = "jumping.png";
img_2.src = "running2.png";
img_3.src = "running3.png";
img_4.src = "running4.png";
img_5.src = "running5.png";
img_6.src = "running6.png";
img_7.src = "running7.png";
img_8.src = "running8.png";
img_9.src = "running9.png";

var human_currentImage = img_2;

var Eco_currentImage = img__3;

var img__2 = new Image();
img__2.src = "tumbler.png";

// 배경 이미지 로딩 여부 확인 변수
var backgroundLoaded = false;
var score = 0;
// 배경 이미지

// bear의 초기 y 위치
var initialDinoY = canvas.height / 2 - 30;

// bear의 현재 y 위치
var dinoY = initialDinoY;
var collidedObstacleCount = 0;
var maxCollidedObstacleCount = 3;

class Obstacle {
  //에코백이랑 텀블러
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = canvas.width;
    Eco_currentImage;
    this.y = canvas.height / 2 - 240;
    this.collided = false;
    this.velocity = 5;
    if (obstacles.length > 0) {
      var lastObstacle = obstacles[obstacles.length - 1];
      this.x = lastObstacle.x + 400;
    }
  }

  draw() {
    ctx.fillStyle = "purple";
    ctx.drawImage(
      Eco_currentImage,
      this.x + 15,
      this.y - 30,
      this.width * 1.5,
      this.height * 1.5
    );
  }
}

class SpecialObstacle extends Obstacle {
  //텀블러
  constructor() {
    super();
    this.width = 40;
    this.height = dino.height + 20;
    this.y = canvas.height / 2 - 40;
  }

  draw() {
    ctx.drawImage(
      img__2,
      this.x - 15,
      this.y - 30,
      this.width * 4.5,
      this.height * 2.5
    );
  }
}

class PurpleObstacle extends Obstacle {
  constructor() {
    //에코백
    super();
    this.width = 50;
    this.height = 50;
    this.y = canvas.height / 2 - 240;
  }

  draw() {
    ctx.drawImage(
      Eco_currentImage,
      this.x + 15,
      this.y - 30,
      this.width * 1.5,
      this.height * 1.5
    );
  }
}
const Cartimage = new Image();
Cartimage.src = "cart.png";

function drawCart() {
  ctx.drawImage(Cartimage, 10, 10, canvas.width * 0.04, canvas.height * 0.05);
}

var number = 0;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(Cartimage.x + 80, Cartimage.y + 23, 12, 0, 10 * Math.PI);
  ctx.fillStyle = "skyblue";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.font = "bold 20px Arial";
  ctx.fillText(number, Cartimage.x + 75, Cartimage.y + 30);
}
var backgroundImage1 = new Image();
backgroundImage1.src = "background.png";
backgroundImage1.onload = function () {
  backgroundLoaded = true;
};

var backgroundImage2 = new Image();
backgroundImage2.src = "background2.png";

var xPosition1 = 0;
var xPosition2 = canvas.width;

function updateBackground() {
  xPosition1 -= 1;
  xPosition2 -= 1;

  // 첫 번째 이미지가 왼쪽 끝에 도달하면 다시 오른쪽에서 시작
  if (xPosition1 <= -canvas.width) {
    xPosition1 = canvas.width;
  }

  // 두 번째 이미지가 왼쪽 끝에 도달하면 다시 오른쪽에서 시작
  if (xPosition2 <= -canvas.width) {
    xPosition2 = canvas.width;
  }
}
var humanground = new Image();
humanground.src = "ground2.png";
humanground.onload = function () {
  // 이미지가 로드된 후에 그림을 그림
  drawGround();
};

function drawGround() {
  var humanground = new Image();
  humanground.src = "ground2.png";

  ctx.drawImage(
    humanground,
    0,
    canvas.height / 2 - 30,
    canvas.width,
    canvas.height / 2 + 50
  );
}

var groundheight = canvas.height / 2 + 50;
function drawdinoGround() {
  var dinoground = new Image();
  dinoground.src = "ice.png";

  ctx.drawImage(
    dinoground,
    0,
    groundheight - 40,
    canvas.width,
    canvas.height / 2
  );
}
function drawbackGround() {
  ctx.globalCompositeOperation = "destination-over";
  ctx.drawImage(
    backgroundImage2,
    xPosition1,
    40,
    canvas.width,
    canvas.height / 2
  );
  ctx.drawImage(
    backgroundImage1,
    xPosition2,
    40,
    canvas.width,
    canvas.height / 2
  );
  ctx.globalCompositeOperation = "source-over";
}

var obstacles = [];
const gravity = 0.5;

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();
var img6 = new Image();
var currentImage = img1;

img1.src = "bear1.png";
img2.src = "bear2.png";
img3.src = "bear3.png";
img4.src = "bear4.png";
img5.src = "bear5.png";
img6.src = "bear6.png";

var walkingFrameCount = 0;
var maxWalkingFrameCount = 3000;
var jumpingFrameCount = 0;
var maxJumpingFrameCount = 10;

function drawDino() {
  ctx.fillStyle = "green";
  ctx.drawImage(
    currentImage,
    dino.x - 140,
    dinoY - 170,
    dino.width * 6,
    dino.height * 6
  );
}

function drawHuman() {
  ctx.drawImage(
    human_currentImage,
    human.x,
    human.y - 165,
    human.width * 4,
    human.height * 3.5
  );
}

function switchHumanImage() {
  if (human_currentImage === img_2) {
    human_currentImage = img_3;
  } else if (human_currentImage === img_3) {
    human_currentImage = img_4;
  } else if (human_currentImage === img_4) {
    human_currentImage = img_5;
  } else if (human_currentImage === img_5) {
    human_currentImage = img_6;
  } else if (human_currentImage === img_6) {
    human_currentImage = img_7;
  } else if (human_currentImage === img_7) {
    human_currentImage = img_8;
  } else if (human_currentImage === img_8) {
    human_currentImage = img_9;
  } else if (human_currentImage === img_9) {
    human_currentImage = img_2;
  }
  if (human_currentImage === img_1) {
    if (
      human.y >= canvas.height / 2 - human.jumpHeight &&
      human.y < canvas.height / 2 - 30
    ) {
      // 점프 중이 아니면서 내려오는 중이면 이미지를 바꾸지 않음
      human_currentImage = img_1;
    } else {
      human_currentImage = img_2;
    }
  }
}

var maxDinoY = dinoY + 400;

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.x -= obstacle.velocity;
    obstacle.draw();

    if (
      !obstacle.collided &&
      human.x < obstacle.x + obstacle.width &&
      human.x + human.width > obstacle.x &&
      human.y < obstacle.y + obstacle.height &&
      human.y + human.height > obstacle.y
    ) {
      obstacle.collided = true;
      collidedObstacleCount++;
      if (collidedObstacleCount === 1) {
        dinoY += 150; // 적절한 값을 선택하여 조절
        groundheight += 150;
        number++;
      }
      if (collidedObstacleCount === 2) {
        dinoY += 150; // 적절한 값을 선택하여 조절
        groundheight += 150;
        number++;
      }
      if (collidedObstacleCount === 3) {
        number++;
        clearInterval(animationInterval);
        openModal();
      }
    }

    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    }
  });
}

function perFrameLogic() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score += 1;
  drawObstacles();
  drawbackGround();

  if (collidedObstacleCount > 0) {
    // 충돌이 발생하면 ground를 앞으로 그립니다.
    drawGround();
  }
  drawdinoGround();
  // 배경 이미지 그리기
  ctx.globalCompositeOperation = "destination-over";
  updateBackground();
  drawbackGround();
  ctx.globalCompositeOperation = "source-over";
  // 게임 요소 그리기
  drawHuman();
  drawCart();
  drawCircle();

  drawDino();
  ctx.fillStyle = "black";
  ctx.font = "bold 20px Arial";
  ctx.fillText("score: " + time + "점", canvas.width - 230, 60);

  if (!human.jumping && Math.random() < 0.05) {
    var obstacle;
    var randomValue = Math.random();
    if (randomValue < 0.4) {
      obstacle = new SpecialObstacle();
    } else if (randomValue < 0.15) {
      obstacle = new PurpleObstacle();
    } else {
      obstacle = new Obstacle();
    }
    obstacles.push(obstacle);
  }

  if (human.jumping && dino.jumping) {
    human.y -= 6;
    dinoY -= 6;
    human.jumpVelocity -= gravity;
    dino.jumpVelocity -= gravity;
    human_currentImage = img_1;

    if (human.y <= canvas.height / 2 - human.jumpHeight) {
      human.jumping = false;
      dino.jumping = false;
      human.jumpVelocity = human.jumpPower;
      dino.jumpVelocity = dino.jumpPower;
      jumpingFrameCount = 0;
      switchHumanImage();

      switchDinoImage();
    } else {
      // 점프 중일 때 이미지 변경을 제어
      jumpingFrameCount++;
    }
  } else {
    if (walkingFrameCount < maxWalkingFrameCount) {
      walkingFrameCount++;

      if (walkingFrameCount % (maxJumpingFrameCount / 2) === 0) {
        switchHumanImage();

        switchDinoImage();
      }
    } else {
      walkingFrameCount = 0;
    }

    human.jumpVelocity += gravity;
    dino.jumpVelocity += gravity;
    human.y += human.jumpVelocity;
    dinoY += dino.jumpVelocity;

    if (human.y >= canvas.height / 2 - 30) {
      human.y = canvas.height / 2 - 30;
      dinoY = canvas.height / 2 - 30;
      if (collidedObstacleCount === 1) {
        dinoY += 150; // 적절한 값을 선택하여 조절
      }
      if (collidedObstacleCount === 2) {
        dinoY += 300; // 적절한 값을 선택하여 조절
      }

      human.jumpVelocity = 0;
      dino.jumpVelocity = 0;
      human.canJump = true;
      dino.canJump = true;
      // switchHumanImage();
    }
  }

  ctx.globalCompositeOperation = "source-over";
}

function switchDinoImage() {
  if (currentImage === img1) {
    currentImage = img2;
  } else if (currentImage === img2) {
    currentImage = img3;
  } else if (currentImage === img3) {
    currentImage = img4;
  } else if (currentImage === img4) {
    currentImage = img5;
  } else if (currentImage === img5) {
    currentImage = img6;
  } else if (currentImage === img6) {
    currentImage = img1;
  }
}

var animationInterval = setInterval(perFrameLogic, 18);

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && human.canJump && dino.canJump) {
    human.jumping = true;
    human.canJump = false;
    dino.jumping = true;
    dino.canJump = false;
  }
});
function restartGame() {
  collidedObstacleCount = 0;
  dinoY = initialDinoY;
  groundheight = canvas.height / 2 + 50;
  number = 0;
  score = 0;
  walkingFrameCount = 0;
  human_currentImage = img_2;
  Eco_currentImage = img__3;
  currentImage = img1;
  clearInterval(animationInterval);
  animationInterval = setInterval(perFrameLogic, 18);
}

// 기존의 alert 대신 모달을 띄우는 함수
$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});
