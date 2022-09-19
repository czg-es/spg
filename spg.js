// circles 1 y 2 radius
let r1 = 100
let r2 = 100

let a1 =0
let a2 =0
// to hold positions of the outer circle
let prevX
let prevY

let a1_inc
let a2_inc

let ancho = window.innerWidth
let alto = window.innerHeight

let velo = 1;

let containerDiv;

let colorPicker;


function setup() {
    // controls div
  containerDiv = createDiv();
  containerDiv.addClass('controls');
  
  button0 = createButton('reload').parent(containerDiv);
  //button0.position(0, 0);
  button0.mousePressed(reload)
  button0.id('boton_reload')
  
  button1 = createButton('stop').parent(containerDiv);
  //button1.position(0, 0);
  button1.mousePressed(run);
  button1.id('boton_paro')
  
  button2 = createButton('clear').parent(containerDiv);
  //button2.position(30, 0);
  button2.mousePressed(clearit);
  button2.id('boton_clear')
  
      //StrokeWeigth ancho de linea
  slider1 = createSlider(1, 10, 1, 0.01).parent(containerDiv);
  slider1.id('slider1')
  slider1_text = createP(slider1.value()).parent(containerDiv);
  slider1.changed(update_text)
      // Velocity
  slider2 = createSlider(1, 100, 1, 1).parent(containerDiv);
  slider2.id('slider2')
  slider2_text = createP(slider2.value()).parent(containerDiv);
  slider2.changed(update_text)
  
 
createCanvas(ancho, alto)
angleMode(DEGREES)
background(0,0)
// random circles radius
r1 = floor(random(50, alto ))
r2 = floor(random(50, alto /2))
// random increment
a1_inc = random(0.1, 5)
a2_inc = random(0.1, 5)
 
custom_r1 = createInput(r1).parent(containerDiv);

custom_r2 = createInput(r2).parent(containerDiv);
button_change = createButton('Change').parent(containerDiv);
button_change.mousePressed(change_r);

colorPicker = createColorPicker().parent(containerDiv);
colorPicker.changed(change_color)

button3 = createButton('multicolor').parent(containerDiv);
button3.mousePressed(multicolor)
button3.id('boton_multicolor')
  
}
let linecolor;
function draw(){
  
  translate(ancho/2 , alto/2)
  stroke(255)
  strokeWeight(slider1.value())
  // operations per draw cycle
  velo = slider2.value()  
  //let aux1 = slider3.value()
  //a1 = a1 +aux1
  for (let i = 0; i < velo ; i++){
           
        // inner circle
        let x1 = r1 * cos(a1) 
        let y1 = r1 * sin(a1) 
        // outer circle
        let x2 = x1 + r2 * cos(a2)
        let y2 = y1 + r2 * sin(a2)
        // Color
        if(!linecolor){
          let r = map(sin(frameCount), -1, 1, 100, 200)
          let g = map(cos(frameCount), -1, 1, 100, 200)
          let b = map(sin(frameCount), -1, 1, 200, 100)
          stroke(r, g, b)
        }else{
          stroke(linecolor)
        }

        line(prevX, prevY, x2, y2)
        
        prevX = x2 
        prevY = y2 

        a1 += a1_inc
        a2 += a2_inc
        
      }
}
// Auxiliary functions

function showdata(){
  console.log(r1)
  console.log(r2)
  console.log(a1)
  console.log(a2)
  console.log(prevX)
  console.log(prevY)
  console.log(a1_inc)
  console.log(a2_inc)
}
showdata();

// start stop drawing
let running = true
function run(){

  running ? (noLoop(), running = false ) : (loop() , running = true)
  boton = document.getElementById('boton_paro')
  boton.innerHTML == "stop" ? boton.innerHTML = "play" : boton.innerHTML = "stop"
  
}
// Clear canvas
function clearit(){
  clear()
}
// reload page
function reload(){
  window.location.reload()
}
// update text in slider labels
function update_text(){
  slider1_text.html('ancho: '+slider1.value())
  slider2_text.html('velocidad: '+slider2.value())

}
// change r1 & r2 values
function change_r(){
  r1 = custom_r1.value()
  r2 = custom_r2.value()

}

// change line color
function change_color(){
  linecolor = colorPicker.value()
}
// reset color to multi color
function multicolor(){
  linecolor = ""
}


