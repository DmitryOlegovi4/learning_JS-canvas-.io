let cvsElem = document.getElementById('cvs');

function resizeHandler() {
    cvsElem.width = window.innerWidth*0.9;
    cvsElem.height = window.innerHeight*0.7;
}
resizeHandler()

let ctx = cvsElem.getContext('2d');
console.log(ctx);

// 1) написать обработчик, который считывает данные из textarea
// 2) преобразовать в объект с помощью JSON.parse()
// 3) применить координаты для перерисовки графика
// 4) сделать интерфейс для перерисовки графика по вверх, вниз, влево, вправо
// [{"x":0, "y":0}, {"x":40, "y":-10},{"x":50, "y":-50},{"x":60, "y":-10},{"x":100, "y":0},{"x":60, "y":10},{"x":50, "y":50},{"x":40, "y":10},{"x":0, "y":0}]

// копирование текста из параграфа (для удобства ввода данных)
let btnCopy = document.getElementById('btnCopy');
let text = document.getElementById('text');
btnCopy.addEventListener('click', function () {
    let range = document.createRange();
    range.selectNodeContents(text);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
});


//процесс отрисовки
let myArr = [{"x":0, "y":0}, {"x":40, "y":-10},{"x":50, "y":-50},{"x":60, "y":-10},{"x":100, "y":0},{"x":60, "y":10},{"x":50, "y":50},{"x":40, "y":10},{"x":0, "y":0}];
let btnStart = document.getElementById('btnStart');
let points = document.getElementById('points');
let changeX = 0;
let changeY = 0;
let step = 10;
btnStart.addEventListener('click', draw)
function draw (event) {
    ctx.clearRect(0,0,cvsElem.width, cvsElem.height)
    let textareaElem = JSON.parse(points.value);
    console.log(textareaElem);
    if (JSON.stringify(myArr) === JSON.stringify(textareaElem)){
        // овал лица
        ctx.fillStyle = "#ffc600";
        ctx.beginPath();
        // ctx.scale(160 / 180, 1);
        ctx.arc(350+changeX, 250+changeY, 180, 0, Math.PI * 2);
        ctx.restore();
        ctx.closePath();
        ctx.fill();
        // глаза (отрисовка textareaElem)
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(200+changeX, 200+changeY);
        for (let i = 0; i<textareaElem.length; i++){
            ctx.lineTo(textareaElem[i].x+200+changeX, textareaElem[i].y+200+changeY)
        }
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(400+changeX, 200+changeY);
        for (let i = 0; i<textareaElem.length; i++){
            ctx.lineTo(textareaElem[i].x+400+changeX, textareaElem[i].y+200+changeY)
        }
        ctx.fill();
        // улыбка и нос
        ctx.fillStyle = 'rgb(223, 6, 6)';
        ctx.beginPath();
        ctx.moveTo(250+changeX, 300+changeY);
        ctx.arcTo(350+changeX, 350+changeY, 450+changeX, 300+changeY, 70);
        ctx.lineTo(450+changeX, 300+changeY)
        ctx.arcTo(350+changeX, 320+changeY, 250+changeX, 300+changeY, 70);
        ctx.lineTo(250+changeX, 300+changeY)
        ctx.moveTo(380+changeX, 250+changeY);
        ctx.arc(350+changeX,250+changeY,30,0,Math.PI*2)
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(250+changeX, 300+changeY);
        ctx.arcTo(350+changeX, 330+changeY, 450+changeX, 300+changeY, 70);
        ctx.lineTo(450+changeX, 300+changeY)
        ctx.stroke();
        // зрачки глаз
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(260+changeX, 200+changeY);
        ctx.arc(250+changeX,200+changeY,10,0,Math.PI*2)
        ctx.moveTo(460+changeX, 200+changeY);
        ctx.arc(450+changeX,200+changeY,10,0,Math.PI*2)
        ctx.fill();
        // галстук-бабочка
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(230+changeX, 370+changeY);
        ctx.lineTo(470+changeX, 450+changeY)
        ctx.lineTo(470+changeX, 370+changeY)
        ctx.lineTo(230+changeX, 450+changeY)
        ctx.lineTo(230+changeX, 370+changeY)
        ctx.moveTo(370+changeX, 410+changeY);
        ctx.fillRect(330+changeX, 395+changeY, 40, 30);
        ctx.fill();
        // волосы
        for (let j =0; j<=150; j+=3) {
            ctx.beginPath();
            let randomR = Math.round(Math.random()*255);
            let randomG = Math.round(Math.random()*255);
            let randomB = Math.round(Math.random()*255);
            let randomJ = Math.round(Math.random()*5);
            ctx.strokeStyle = `rgb(${randomR}, ${randomG}, ${randomB})`;
            ctx.moveTo(200+j+changeX, 150-j/2+changeY);
            ctx.lineTo(200+j+changeX, 50-j/randomJ+changeY)
            ctx.moveTo(350+j+changeX, 75+j/2+changeY);
            ctx.lineTo(350+j+changeX, 0+j/randomJ+changeY)
            ctx.stroke();
        }
        // облачко разговора
        ctx.beginPath();
        let randomR = Math.round(Math.random()*255);
        let randomG = Math.round(Math.random()*255);
        let randomB = Math.round(Math.random()*255);
        ctx.fillStyle = `rgb(${randomR}, ${randomG}, ${randomB})`;
        ctx.moveTo(600+changeX,150+changeY); // 75, 25  к x + 525, к y + 125
        ctx.quadraticCurveTo(550+changeX,150+changeY,550+changeX,187.5+changeY);
        ctx.quadraticCurveTo(550+changeX,225+changeY,575+changeX,225+changeY);
        ctx.quadraticCurveTo(575+changeX,245+changeY,555+changeX,250+changeY);
        ctx.quadraticCurveTo(585+changeX,245+changeY,590+changeX,225+changeY);
        ctx.quadraticCurveTo(650+changeX,225+changeY,650+changeX,187.5+changeY);
        ctx.quadraticCurveTo(650+changeX,150+changeY,600+changeX,150+changeY);
        ctx.fill();
        // текст в облачке
        let grd = ctx.createLinearGradient(560+changeX,160+changeY,620+changeX,220+changeY);
        grd.addColorStop(0,"#0012ff");
        grd.addColorStop(0.5,"rgb(223, 6, 6)");
        grd.addColorStop(1,"black");
        ctx.fillStyle = grd;
        ctx.font = "24px Arial";
        ctx.fillText(`Hello`,570+changeX,180+changeY);
        ctx.fillText(`World!`,567+changeX,205+changeY);
    } else {
        ctx.beginPath();
        ctx.moveTo(200+changeX, 200+changeY);
        for (let i = 0; i<textareaElem.length; i++){
            ctx.lineTo(textareaElem[i].x+200+changeX, textareaElem[i].y+200+changeY)
        }
        ctx.fill();
    }
}

// функция перрисовки графика в зависимости от нажатия w, s, a, в
window.addEventListener('keypress', function (event) {
    if (event.code === 'KeyW'){
        changeY -= step;
    } else if(event.code === 'KeyS'){
        changeY += step;
    }else if(event.code === 'KeyA'){
        changeX -= step;
    }else if(event.code === 'KeyD'){
        changeX += step;
    }
    draw ()
})