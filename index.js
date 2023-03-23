//examples of SOLID
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Ниже пример принципа единственной ответственности, его смысл в том, чтобы каждый класс отвечал за одну конкретную задачу, делать один большой класс с множеством методов - это плохо, потому что будет сложно использовать такой класс в дальнейшем, также со временем что-то может измениться в реализации методов и нам придется переделывать все дальнейщие экземпляры класса, такой класс сложно тестировать и сопровождать в дальнейшем. Горазло проще каждый метод вынести в отдельный класс, такие классы легче переиспользовать, тестировать, поддерживать при разрастании кода и сразу понятно, что конкретно делает каждый класс
//single-responsibility bad example
var InformationUpdate = /** @class */ (function () {
    function InformationUpdate() {
    }
    InformationUpdate.prototype.getData = function () { };
    InformationUpdate.prototype.sortData = function () { };
    InformationUpdate.prototype.updateData = function () { };
    return InformationUpdate;
}());
//single-responsibility good example
var DataGet = /** @class */ (function () {
    function DataGet() {
    }
    DataGet.prototype.getData = function () { };
    return DataGet;
}());
var DataSort = /** @class */ (function () {
    function DataSort() {
    }
    DataSort.prototype.sortData = function () { };
    return DataSort;
}());
var DataUpdate = /** @class */ (function () {
    function DataUpdate() {
    }
    DataUpdate.prototype.updateData = function () { };
    return DataUpdate;
}());
//Принцип открытости-закрытости означает, что наш объект открыт для расширения, но закрыт для модификации. В примере ниже у нас есть класс с помощью метода которого мы можем получать информацию "в какой стране расположена трасса Ф1". Он реализован с помощью switch. В случае, если у нас появится еще одна страна (например где-то еще откроют новую трассу), нам будет необходимо изменить switch, т.е. изменить класс, что нарушает наш принцип. Гораздо удобнее создать отдельный класс расположения трассы и далее наследовать его. Т.е., если в дальнейшем у нас появится новая трасса, мы можем просто добавить новый класс-наследник и не менять наш основной класс
//open-closed bad example
var F1TrackBad = /** @class */ (function () {
    function F1TrackBad(name, country, circleLength) {
        this.name = name;
        this.country = country;
        this.circleLength = circleLength;
    }
    F1TrackBad.prototype.getTrackLocation = function () {
        switch (this.country) {
            case "Italy":
                console.log("This track is located in ".concat(this.country));
                break;
            case "Russia":
                console.log("This track is located in ".concat(this.country));
                break;
            case "Hungary":
                console.log("This track is located in ".concat(this.country));
                break;
            default:
                console.log("Not found");
        }
    };
    return F1TrackBad;
}());
var monza = new F1TrackBad("Monza", "Italy", 5793);
var sochi = new F1TrackBad("Sochi", "Russia", 5848);
monza.getTrackLocation();
sochi.getTrackLocation();
//open-closed good example
var F1TrackGood = /** @class */ (function () {
    function F1TrackGood(name, country, circleLength) {
        this.name = name;
        this.country = country;
        this.circleLength = circleLength;
    }
    F1TrackGood.prototype.getTrackLocation = function () {
        return this.country.getTrackLocation();
    };
    return F1TrackGood;
}());
var F1TrackCountry = /** @class */ (function () {
    function F1TrackCountry() {
    }
    F1TrackCountry.prototype.getTrackLocation = function () { };
    return F1TrackCountry;
}());
var Italy = /** @class */ (function (_super) {
    __extends(Italy, _super);
    function Italy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Italy.prototype.getTrackLocation = function () {
        return "Italy";
    };
    return Italy;
}(F1TrackCountry));
var Russia = /** @class */ (function (_super) {
    __extends(Russia, _super);
    function Russia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Russia.prototype.getTrackLocation = function () {
        return "Russia";
    };
    return Russia;
}(F1TrackCountry));
var Hungary = /** @class */ (function (_super) {
    __extends(Hungary, _super);
    function Hungary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hungary.prototype.getTrackLocation = function () {
        return "Hungary";
    };
    return Hungary;
}(F1TrackCountry));
var hungaroring = new F1TrackGood("Hungaroring", new Hungary(), 4381);
console.log(hungaroring);
//Принцип подстановки означает, что каждый класс-наследник должен уметь делать то, что делает родитель. Класс-наследник может дополнить поведение родителя, но не изменить его. В данном примере классы Cat и Dog могут заменить родительский класс Animal. Класс Bird нарушает принцип подстановки, потому что он не реализует свой собственный makeSound из родительского Animal класса. Вместо этого он наследует общий звук
//Liskov substitution good example
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.makeSound = function () {
        console.log("".concat(this.name, " makes a sound"));
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log("".concat(this.name, " barks"));
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.makeSound = function () {
        console.log("".concat(this.name, " meows"));
    };
    return Cat;
}(Animal));
function makeAnimalSound(animal) {
    animal.makeSound();
}
var lion = new Animal("Lion");
makeAnimalSound(lion);
var dog = new Dog("Jessy");
makeAnimalSound(dog);
var cat = new Cat("Kuzya");
makeAnimalSound(cat);
//Liskov substitution bad example
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bird.prototype.fly = function () {
        console.log("".concat(this.name, " can fly"));
    };
    return Bird;
}(Animal));
var bird = new Bird("Kesha");
makeAnimalSound(bird);
bird.fly();
var Gymnast = /** @class */ (function () {
    function Gymnast() {
    }
    Gymnast.prototype.run = function () {
        console.log("Гимнаст должен уметь бегать");
    };
    Gymnast.prototype.swim = function () {
        console.log("Гимнасту не нужно уметь плавать");
    };
    Gymnast.prototype.jump = function () {
        console.log("Гимнаст должен уметь прыгать");
    };
    return Gymnast;
}());
var Swimmer = /** @class */ (function () {
    function Swimmer() {
    }
    Swimmer.prototype.run = function () {
        console.log("Пловцу не нужно уметь бегать");
    };
    Swimmer.prototype.swim = function () {
        console.log("Пловец должен уметь плавать");
    };
    Swimmer.prototype.jump = function () {
        console.log("Пловец должен уметь прыгать");
    };
    return Swimmer;
}());
var Gymnast1 = /** @class */ (function () {
    function Gymnast1() {
    }
    Gymnast1.prototype.run = function () {
        console.log("Гимнаст должен уметь бегать");
    };
    Gymnast1.prototype.jump = function () {
        console.log("Гимнаст должен уметь прыгать");
    };
    return Gymnast1;
}());
var Swimmer1 = /** @class */ (function () {
    function Swimmer1() {
    }
    Swimmer1.prototype.swim = function () {
        console.log("Пловец должен уметь плавать");
    };
    return Swimmer1;
}());
//Принцип инверсии зависимостей означает, что необходимо писать код, зависящий от более общих абстракций, при этом абстракции не должны зависеть от деталей. Таким образом можно изменять код более низкого уровня, при этом не меняя код более высокого уровня. Например, у нас есть класс Music с методом get и функция getMusic с помощью которой мы получаем данные для экземпляра класса Music. Далее, например, у нас появился новый класс с более современным методом получения музыки и получается, что нам надо переделывать нашу функцию. А если появится еще новый класс, то опять переделывать и т.д. Будет разумно создать общий интерфейс с методом получения музыки, который могут наследовать классы и абстракцию между клиентом и различными API.
//dependency inversion bad example
var Music = /** @class */ (function () {
    function Music() {
    }
    Music.prototype.get = function () { };
    return Music;
}());
function getMusic() {
    var API = new Music();
    API.get();
}
var NewMusic = /** @class */ (function () {
    function NewMusic() {
    }
    NewMusic.prototype.getAll = function () { };
    return NewMusic;
}());
var Music1 = /** @class */ (function () {
    function Music1() {
    }
    Music1.prototype.getMusic = function () { };
    return Music1;
}());
var NewMusic1 = /** @class */ (function () {
    function NewMusic1() {
    }
    NewMusic1.prototype.getMusic = function () { };
    return NewMusic1;
}());
var MusicClient = /** @class */ (function () {
    function MusicClient(client) {
        this.client = client;
    }
    MusicClient.prototype.getMusic = function () {
        this.client.getMusic();
    };
    return MusicClient;
}());
function getMusic1() {
    var API = new MusicClient(new Music1());
    API.getMusic();
}
