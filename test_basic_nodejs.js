//객체 생성
function User (_name, _age){
    this.name = _name;
    this.age = _age;
    }

var u1 = new User('이십대', 20);
var u2 = new User('삼십대', 30);

console.log(u1);
console.log(u2);

class User{
    constructor(){
        this.name = _name;
        this.age = _age;
    }
}

var u1 = new User('이십대', 20);
var u2 = new User('삼십대', 30);

console.log(u1);
console.log(u2);

// User 객체에 domain 속성을 추가
User.prototype.domain = "mulcamp.co.kr";
User.Prototype.getEmail = function(){
    return this.name + "@" + this.domain
}

console.log(u1.domain);
console.log(u2.domain);

console.log(u1.getEmail());
console.log(u2.getEmail());

