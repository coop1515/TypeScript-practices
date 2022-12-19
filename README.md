# TypeScript-practices


```
타입스크립트를 사용하는 이유

1. JavaScript는 모든것을 허용해줘서 프로그램을 실행하기 전까지 에러를 보여주지 않는다.
그렇기 때문에 타입스크립트를 사용하여 실행전에 미리 에러를 잡기 위해 사용한다.
ex) JS는 "a" + 1 을 하게되면 "a1"이 되어버림 == 터무니 없는 것

2. 자바스크립트는 변수의 타입을 지정해주지 않는 반면 타입스크립트는 변수의 타입을 지정해줘야한다.

```
## Chapter1 - Type
1. Type 설정하기
```
let a:boolean = true
var b : number[]= []
```
2. Type 만들기
```
type Name = string;
type Age = number;

type Player = {
    name : Name, //string,
    age ?: Age, //number
}

const nico : Player = {
    name:"nico"
}
```
3. 함수 타입 지정하는 법
```
일반적인 함수의 형태
 function playerMaker(name:string) : Player{
     return {
         name
     }
 }

화살표 함수로 사용하는 법
const playerMaker = (name:string) :Player => ({name})

const nico2 = playerMaker("nico")
```

4. readonly : 한번 정의한 변수를 변경하지 못하도록 해줌.
```
const numbers: readonly number[] = [1,2,3,4]
// numbers.push(1) // readonly를 지우면 error 사라짐.
```
5. any : TS(Type Checker)에서 탈출시켜주는 타입. JS처럼 자유분방해짐.
```
const c : any[] = [12,3,4]
const d : any = true
```
6.void 는 값을 반환하지 않는 함수의 반환 값을 나타냅니다. 함수에 return 문이 없거나 해당 return 문에서 명시적 값을 반환하지 않을 때 항상 유추되는 타입입니다.
```
// The inferred return type is void
function noop() {
return;
}
```
7. unknown 타입은 모든 값을 나타냅니다. 이것은 any타입과 비슷하지만 any보다 unknown이 더 안전합니다. 이유는 unknown값으로 작업을 수행하는 것은 합법적이지 않기 때문입니다.
```
function hello(a: any) {
a.b(); // OK
}

function hello2(a: unknown) {
a.b(); // 에러: Object is of type 'unknown'.
}
```
8. never : 일부 함수는 값을 반환하지 않습니다. 이는 함수가 예외를 throw하거나 프로그램 실행을 종료함을 의미합니다.
```
function fail(msg: string): never {
throw new Error(msg);
}
```
void > unknown > never 순으로 많이 사용함.
https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

## Chapter2 - Function
1. call signature : 함수에 대한 설명(일반적으로 함수명에 마우스커서를 올리면 나오는 설명)
```

const add_ArrowFunction = (a:number, b:number) => a+b : 일반적인 매개변수의 타입지정

type Add = (a:number, b:number) => number;
const add_ArrowFunction :Add = (a,b) => a+b 
```
2. OverLoading : 같은 이름의 함수를 재사용 하는 방법 => 매개변수에 차이를 줌.
```
type Add2 = {
    (a: number, b: number) : number
    (a: number, b: string) : number
}

const add_OverLoading2: Add2 = (a,b) => {
    if(typeof b === "string") return a
    return a + b
}

type Add3 = { 
    (a:number, b:number) : number;
    (a:number, b:number, c:number) : number;
}

const add_OverLoading3 : Add3 = (a,b,c?:number) => { 
    if(c) return a + b + c 
    return a + b
}
```
3. PolyMorphos : Poly(다양한) + Morphos(구조, 건축물) => 다형성
```
type SuperPrint = {
    (arr: number[]):void
    (arr:boolean[]):void
    (arr:string[]):void
    (arr:(number|boolean)[]):void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}
superPrint([1,2])
superPrint([true,false])
superPrint(["a","b","c"])
superPrint([1,2,true,false])
```
4. any와 generic의 차이
```
any와 generic은 둘 다 타입을 내가 선언하지 않아서 자유롭게 사용할 수 있지만
generic은 타입을 설정해주기 때문에 코드상의 문제가 생기면 error를 내줌.
any는 타입 설정이 없기때문에 코드상의 문제를 잡아주지 않음.
```
5. PloyMorphos - generic : 자동으로 타입을 정해준다.
```
type SuperPrint2 = {
    <Potato>(arr: Potato[]):Potato 
}

const superPrint2: SuperPrint2 = (arr) => {
    return arr[0]
}

const print1 = superPrint2([1,2])
const print5 =superPrint2([1,2,true,false, "ㅎㅎㅎㅎ"])

여러개의 generic 사용

type SuperPrint3 = {
    <Potato, T>(arr: Potato[], b:T):Potato 
}

const superPrint3: SuperPrint3 = (arr) => {
    return arr[0]
}

const print11 = superPrint3([1,2]," ")
```

6. PolyMorphos - generic2 : 함수형태로 사용하는 generic
```
function superPrint4<V>(a:V[]) {
    return a[0]
}

const print12 = superPrint4<number>([1,2]) //함수이름<type>은 type을 명시해주는것.
const print22 = superPrint4([true,false])
```

7. PolyMorphos - generic3 : type에 사용하는 generic
```
type Player<E> = {
    name:string
    extraInfo:E
}

const nico: Player<{favFood:string}> = {
    name:"nico",
    extraInfo: {
        favFood:"kimchi"
    }
} 

type NicoPlayer = Player<{ favFood:string}>

const nico2: NicoPlayer = {
    name:"nico",
    extraInfo: {
        favFood:"kimchi"
    }
}

type NicoExtra = {
    favFodd:string
}

type NicoPlayer2 = Player<NicoExtra>
```
## Chapter3 - CLASSES AND INTERFACES
1. class : 접근제어자 <br/>
접근제어자는 private, protected, public이 있는데
private는 해당 클래스에서만 사용 가능하고,
protecte는 해당 클래스와 상속받은 클래스에서 사용 가능하고,
public은 해당 클래스 포함 모든 곳에서 사용 가능하다.
해당 기능은 JS에서는 사용 불가능. => JS에서는 접근제어자가 보이지 않음.
```
class Player {
    constructor(
        private firstName:string,
        protected lastName:string,
        public nickname:string
    ){}
}
const nico = new Player("nico", "las", "니꼬" );
nico.nickname

firstName과 lastName은 접근제어자때문에 접근 불가.
```

2. class : 추상클래스
```
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
    getNickName(): void {
        this.lastName // protected는 상속받으면 사용 가능.
    }
}

const nico2 = new Player2("nico", "las", "니꼬");
nico2.getFullName2() // 메소드도 접근제어자가 가능하다.

메소드란? 클래스 내에서 정의된 함수를 말함.
```

3. simple dictionary
```
classes => Dict.js

static method
```

4. 
## Chapter4
