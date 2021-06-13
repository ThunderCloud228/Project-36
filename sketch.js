var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed = 0;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog = createButton("Feed the Dog");
  feedTheDog.position(700, 100);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 100);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  //write code to read fedtime value from the database 
  foodObj.lastFed = hour();
 
  //write code to display text lastFed time here
  fill("white");
  if (foodObj.lastFed == 0 || foodObj.lastFed < 13){
    text("Last Fed : "+ foodObj.lastFed+" AM", 350, 33);
  }
  else {
    text("Last Fed : "+ (foodObj.lastFed-12)+" PM", 350, 33);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);
  if(foodS>0) {
    foodS--;
  }
  database.ref('/').update({
    Food:foodS
  })

  getFedTime(hour());
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
