//examples of SOLID PRINCIPLES

//single-responsibility bad example
class InformationUpdate {
  getData() {}
  sortData() {}
  updateData() {}
}

//single-responsibility good example
class DataGet {
  getData() {}
}
class DataSort {
  sortData() {}
}
class DataUpdate {
  updateData() {}
}

//open-closed bad example
class F1TrackBad {
  name: string;
  country: string;
  circleLength: number;
  constructor(name: string, country: string, circleLength: number) {
    this.name = name;
    this.country = country;
    this.circleLength = circleLength;
  }
  getTrackLocation(): void {
    switch (this.country) {
      case "Italy":
        console.log(`This track is located in ${this.country}`);
        break;
      case "Russia":
        console.log(`This track is located in ${this.country}`);
        break;
      case "Hungary":
        console.log(`This track is located in ${this.country}`);
        break;
      default:
        console.log("Not found");
    }
  }
}

const monza = new F1TrackBad("Monza", "Italy", 5793);
const sochi = new F1TrackBad("Sochi", "Russia", 5848);
monza.getTrackLocation();
sochi.getTrackLocation();

//open-closed good example
class F1TrackGood {
  name: string;
  country: any;
  circleLength: number;
  constructor(name: string, country: any, circleLength: number) {
    this.name = name;
    this.country = country;
    this.circleLength = circleLength;
  }
  getTrackLocation(): any {
    return this.country.getTrackLocation();
  }
}

class F1TrackCountry {
  getTrackLocation(): any {}
}

class Italy extends F1TrackCountry {
  getTrackLocation(): any {
    return "Italy";
  }
}

class Russia extends F1TrackCountry {
  getTrackLocation(): any {
    return "Russia";
  }
}

class Hungary extends F1TrackCountry {
  getTrackLocation(): any {
    return "Hungary";
  }
}

const hungaroring = new F1TrackGood("Hungaroring", new Hungary(), 4381);
console.log(hungaroring);

//Liskov substitution good example
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log(`${this.name} barks`);
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log(`${this.name} meows`);
  }
}

function makeAnimalSound(animal: any) {
  animal.makeSound();
}

const lion = new Animal("Lion");
makeAnimalSound(lion);
const dog = new Dog("Jessy");
makeAnimalSound(dog);
const cat = new Cat("Kuzya");
makeAnimalSound(cat);

//Liskov substitution bad example
class Bird extends Animal {
  fly(): void {
    console.log(`${this.name} can fly`);
  }
}

const bird = new Bird("Kesha");
makeAnimalSound(bird);
bird.fly();

//interface segregation bad example
interface Sportsman {
  run(): void;
  swim(): void;
  jump(): void;
}

class Gymnast implements Sportsman {
  run(): void {
    console.log("Гимнаст должен уметь бегать");
  }
  swim(): void {
    console.log("Гимнасту не нужно уметь плавать");
  }
  jump(): void {
    console.log("Гимнаст должен уметь прыгать");
  }
}

class Swimmer implements Sportsman {
  run(): void {
    console.log("Пловцу не нужно уметь бегать");
  }
  swim(): void {
    console.log("Пловец должен уметь плавать");
  }
  jump(): void {
    console.log("Пловец должен уметь прыгать");
  }
}

//interface segregation good example
interface canRun {
  run(): void;
}

interface canSwim {
  swim(): void;
}

interface canJump {
  jump(): void;
}

class Gymnast1 implements canRun, canJump {
  run(): void {
    console.log("Гимнаст должен уметь бегать");
  }
  jump(): void {
    console.log("Гимнаст должен уметь прыгать");
  }
}

class Swimmer1 implements canSwim {
  swim(): void {
    console.log("Пловец должен уметь плавать");
  }
}

//dependency inversion bad example
class Music {
  get() {}
}

function getMusic() {
  const API = new Music();
  API.get();
}

class NewMusic {
  getAll() {}
}

//dependency inversion good example
interface MusicApi {
  getMusic(): void;
}

class Music1 implements MusicApi {
  getMusic(): void {}
}

class NewMusic1 implements MusicApi {
  getMusic(): void {}
}

class MusicClient implements MusicApi {
  client: MusicApi;
  constructor(client: MusicApi) {
    this.client = client;
  }
  getMusic() {
    this.client.getMusic();
  }
}

function getMusic1() {
  const API = new MusicClient(new Music1());
  API.getMusic();
}
