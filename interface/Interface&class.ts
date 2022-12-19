// 추상 클래스는 JS파일로 변환될때 일반 클래스로 바뀜.
import HUD from './../../../Project_KK/src/scenes/SceneBattleHUD';
abstract class User2 {
    constructor(
        protected firstName:string,
        protected lastName:string
    ){}
    abstract sayHi(name:string):string
    abstract fullName():string
}

// new User2() //추상클래스는 인스턴스를 직접 만드는것을 허용하지 않는다.

class Player4 extends User2{

    fullName(): string {
        // firstName과 lastName을 private으로 하면 사용 불가능.
        return `${this.firstName} ${this.lastName}`
    }

    sayHi(name: string): string {
        return `Hello ${name} My name is ${this.fullName()}`
    }
}

// 인터페이스는 JS파일로 변환할 때 사라져버려서 코드가 보여지지 않음.
// 인터페이스를 상속(구현)받을때 private과 protected를 못쓴다는 문제점이 있음.

interface User3 {
    firstName2:string,
    lastName2:string,
    sayHi2(name:string):string,
    fullName2():string
}

interface Human {
    health:number
}
class Player5 implements User3, Human{
    constructor(
        public firstName2:string,
        public lastName2:string,
        public health:number
    ){}
    fullName2(): string {
        // firstName과 lastName을 private으로 하면 사용 불가능.
        return `${this.firstName2} ${this.lastName2}`
    }

    sayHi2(name: string): string {
        return `Hello ${name} My name is ${this.fullName2()}`
    }
}

function makeUser(user:User3){
    // return "Hi"
    return {
        firstName2:"me",
        lastName2:"em",
        fullName2: () => "xx",
        sayHi2(name) {
            return "student"
        },
    }
}

makeUser({
    firstName2:"me",
    lastName2:"em",
    fullName2: () => "xx",
    sayHi2(name) {
        return "student"
    },
})