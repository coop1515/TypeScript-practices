// 접근 제어자 Access modifier
// class 
class Player {
    constructor(
        private firstName:string,
        protected lastName:string,
        public nickname:string
    ){}
}

const nico = new Player("nico", "las", "니꼬" );
nico.nickname // firstName과 lastName은 접근제어자때문에 접근 불가.

// 추상클래스 abstract class
abstract class User {
    constructor(
        private firstName:string,
        protected lastName:string,
        public nickname:string
        // public은 기본값이라 지정해주지 않아도 됨. 
    ){}
    private getFullName(){
        return `${this.firstName} ${this.lastName}`
    }

    public getFullName2(){
        return `${this.firstName} ${this.lastName}`
    }

    // 추상 메소드 : 추상클래스를 상속받는 모든것들이 구현을 해야함.
    // abstract getNickName(ar:string):void
    abstract getNickName():void

    
}

class Player2 extends User{
    // 상속받은 추상메소드 구현. -> 무조건 해줘야함.
    getNickName(): void {
        this.lastName // protected는 상속받으면 사용 가능.
    }
}

const nico2 = new Player2("nico", "las", "니꼬");
nico2.getFullName2() // 메소드도 접근제어자가 가능하다.

// new User("nico", "las", "니꼬");

/* 접근제어자는 private, protected, public이 있는데
private는 해당 클래스에서만 사용 가능하고,
protecte는 해당 클래스와 상속받은 클래스에서 사용 가능하고,
public은 해당 클래스 포함 모든 곳에서 사용 가능하다.
해당 기능은 JS에서는 사용 불가능.
=> JS에서는 접근제어자가 보이지 않음.

메소드란? 클래스 내에서 정의된 함수를 말함.
*/