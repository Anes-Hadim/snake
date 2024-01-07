let p=document.getElementById('grid');
for(let i=0;i<100;i++) {
  p.innerHTML+=`<div class="box" id="box${i}" ></div>`;
}

let snake={
  head:43,
  body:[],
  tail:43
}
document.getElementById(`box${snake.head}`).style.backgroundColor=`black`;

let food_pos;
generate_food();
function generate_food() {
    do {
       food_pos=Math.floor(Math.random()*100);
    } while (food_pos===snake.head||food_pos===snake.tail||snake.body.includes(food_pos));
    document.getElementById(`box${food_pos}`).style.backgroundColor=`red`;
}
let score=0;

let direction=0;
document.addEventListener('keydown',handle_keydown);
function handle_keydown(event) {
  switch (event.key) {
    case 'w':
    case 'ArrowUp' :
      if (direction!==2) {
        direction=1;
      }
    break;
    case 's':
    case 'ArrowDown' :
      if (direction!==1) {
        direction=2;
      } 
    break;
    case 'd':
    case 'ArrowRight':
      if (direction!==4) {
        direction=3;
      }
    break;
    case 'a':
    case 'ArrowLeft' :
      if (direction!==3) {
        direction=4;
      }
    break;
  } 
}

function move() {
  let temp=snake.head;
  remove();
  switch (direction) {
    case 1:
     snake.head = (snake.head>9) ? snake.head-10 : snake.head+90;
    break;
    case 2:
      snake.head = (snake.head<90) ? snake.head+10 : snake.head-90;
    break;
    case 3:
      snake.head = (snake.head%10!==9) ? snake.head+1 : snake.head-9;
    break;
    case 4:
      snake.head = (snake.head%10!==0) ? snake.head-1 : snake.head+9;
    break;
  }
  
  if (snake.body.length===0&&score<1) {
    snake.tail=snake.head;
   } else if (score===1) {
    snake.tail=temp
   }  else {
    snake.tail=snake.body.pop();
    snake.body.unshift(temp);
   }

  color();
  check_eat();
  end_game();
}

let repeat=setInterval(move,170-3*score);

function color() {
  document.getElementById(`box${snake.tail}`).style.backgroundColor=`black`;
  snake.body.forEach(function(element){document.getElementById(`box${element}`).style.backgroundColor=`black`;});
  document.getElementById(`box${snake.head}`).style.backgroundColor=`#333333`;
}

function remove() {
  document.getElementById(`box${snake.head}`).style.backgroundColor=`white`;
  snake.body.forEach(function(element){document.getElementById(`box${element}`).style.backgroundColor=`white`;});
  document.getElementById(`box${snake.tail}`).style.backgroundColor=`white`;
}

function check_eat() {
  if (snake.head===food_pos) { 
    score++;
    document.querySelector('p').innerHTML=`score : ${score}`;
    if (snake.head!==snake.tail) {
      snake.body.push(snake.tail);
    }
    switch (direction) {
      case 1:
        snake.tail-=1
      break;
      case 2:
        snake.tail+=1
      break;
      case 3:
        snake.tail-=1
      break;
      case 4:
        snake.tail+=1
      break;
    }
    remove();
    color();
    generate_food();
  }
}

function end_game() {
   let check=false;
   for (let i=0;i<snake.body.length;i++) {
     if (snake.head===snake.body[i]||snake.head===snake.tail) {
      check=true;
     }
   }
   if (check) {
    clearInterval(repeat);
    document.querySelector('p').innerHTML+=`<br>You lost`;
    document.getElementById('phone').style='';
    document.getElementById('phone').innerHTML=`<button><a href="snake.html"><img src="refresh.png"></a></button>`;
   }
}