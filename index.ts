//examples of SOLID

//Ниже пример принципа единственной ответственности, его смысл в том, чтобы каждый класс отвечал за одну конкретную задачу, делать один большой класс с множеством методов - это плохо, потому что будет сложно использовать такой класс в дальнейшем, также со временем что-то может измениться в реализации методов и нам придется переделывать все дальнейщие экземпляры класса, такой класс сложно тестировать и сопровождать в дальнейшем. Горазло проще каждый метод вынести в отдельный класс, такие классы легче переиспользовать, тестировать, поддерживать при разрастании кода и сразу понятно, что конкретно делает каждый класс

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

//Принцип открытости-закрытости означает, что наш объект открыт для расширения, но закрыт для модификации. В примере ниже у нас есть класс с помощью метода которого мы можем получать информацию "в какой стране расположена трасса Ф1". Он реализован с помощью switch. В случае, если у нас появится еще одна страна (например где-то еще откроют новую трассу), нам будет необходимо изменить switch, т.е. изменить класс, что нарушает наш принцип. Гораздо удобнее создать отдельный класс расположения трассы и далее наследовать его. Т.е., если в дальнейшем у нас появится новая трасса, мы можем просто добавить новый класс-наследник и не менять наш основной класс

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

//Принцип подстановки означает, что каждый класс-наследник должен уметь делать то, что делает родитель. Класс-наследник может дополнить поведение родителя, но не изменить его. В данном примере классы Cat и Dog могут заменить родительский класс Animal. Класс Bird нарушает принцип подстановки, потому что он не реализует свой собственный makeSound из родительского Animal класса. Вместо этого он наследует общий звук

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

//Принцип разделения - лучше иметь несколько небольших интерфейсов, чем один большой. В интерфейсе не должно быть методов, которые не используются. Например, в примере ниже у нас есть интерфейс Sportsman у которого есть методы бегать, плавать и прыгать. Данный интерфейс наследуют другие классы, например, Gymnast и Swimmer, но им не нужны все методы, которые они наследуют, поэтому общий интерфейс лучше разделить

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

//Принцип инверсии зависимостей означает, что необходимо писать код, зависящий от более общих абстракций, при этом абстракции не должны зависеть от деталей. Таким образом можно изменять код более низкого уровня, при этом не меняя код более высокого уровня. Например, у нас есть класс Music с методом get и функция getMusic с помощью которой мы получаем данные для экземпляра класса Music. Далее, например, у нас появился новый класс с более современным методом получения музыки и получается, что нам надо переделывать нашу функцию. А если появится еще новый класс, то опять переделывать и т.д. Будет разумно создать общий интерфейс с методом получения музыки, который могут наследовать классы и абстракцию между клиентом и различными API.

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
