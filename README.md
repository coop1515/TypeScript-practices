# TypeScript-practices
```
resource : https://nomadcoders.co/typescript-for-beginners/lobby

convert TypeScript to JavaScript in site : TypeScript playground
url : https://www.typescriptlang.org/play
```

```
타입스크립트를 사용하는 이유

1. JavaScript는 모든것을 허용해줘서 프로그램을 실행하기 전까지 에러를 보여주지 않는다.
그렇기 때문에 타입스크립트를 사용하여 실행전에 미리 에러를 잡기 위해 사용한다.
ex) JS는 "a" + 1 을 하게되면 "a1"이 되어버림(다른 타입을 더해버리면 string으로 반환해버림) == 터무니 없는 것

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

9. Utility types : interface or type을 타입으로 사용하는 경우 *T는 interface와 type의 이름, K는 Key값.
```
keyof T: property 원하는 대로 구현 ex) property가 3개면 1개든 2개든 3개든 마음대로 구현하면 됨.

Partial<T> : property 부분 구현 (없는 property를 구현하면 error)

Required<T> : property 모두 구현

Readonly<T> : property 의 값을 변경 불가능.

Record<K,T> : Key값과 Type값
ex)
type Grade = "1"|"2"|"3"|"4"
type Score = "A"|"B"|"C"|"D"|"E";

const score: Record<Grade, Score> = {
    1: "A",
    2: "E",
    3: "C",
    4: "D",
    // 5: "B" 이 부분은 error 키값이 5가 없음.
    // 4: "F" 이 부분도 error Type에 F가 없음.
}

Pick<T,K> : Type안에 존재하는 property중 Key에 적은것만 구현 한다.

Omit<T,K> : Type안에 존재하는 property중 Key에 적은것을 제외하고 구현한다.

Exclude<T1, T2> : T1에 존재하는 type중 T2에 적은 type을 제외한다.
ex)
type T1 = string | number | boolean;
type T2 = Exclude<T1, number> 
T2의 타입은 string | boolean

NonNullable<T> : null 과 undefined를 제외한 type을 반환
ex)
type T1 = string | null | undefined | void
type T2 = NonNullabel<T1>
T2의 타입은 string | void 가 됨.
```

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
file source : Classes and Interface/classes/Dict.js

static method
```

4. Interface&type
```
// 타입에 특정 값만 들어오게 하는 방법.
type Team = "red" | "blue" | "yellow"
type Health = 5 | 10 | 15

타입의 기본 형태
//type Player2 = {
//     nickname: string,
//     team : Team,
//     health: Health
//}

interface : 오로지 object의 모양을 정해주기 위해 사용함.
type과 interface의 차이는 type은 다양하게 사용하는데 반해
interface는 그저 object의 모양을 정해주는 목적밖에 없음.

interface의 기본 형태
interface Player2  {
    nickname: string,
    team : Team,
    health: Health
}

const me: Player2 = {
    nickname: "나다",
    // team과 health는 특정 값을 넣지않으면 에러가 남.
    team: "red",
    health: 10
}

interface User {
    name:string
}

interface Player3 extends User{
}

// interface를 type으로 변환.
// type User = {
//     name: string
// }

// type Player3 = User & {
// }

interface User {
    lastName: string
}

interface User {
    health: string
}

const me2: Player3 = {
    // 상속받아서 name을 사용할 수 있음.
    name:"me",

    // 같은이름을 가진 인터페이스가 있으면 TS가 알아서 합쳐줌.
    lastName:"seok",
    health:"하하"
}
```

5. Interface&class
```
// 추상 클래스는 JS파일로 변환될때 일반 클래스로 바뀜.
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
        sayHi2(name:string) {
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
```
6. PolyMorphism(interface,class,generic) 
```
PolyMorphism & generic & interface & class을 모두 사용한 방법

interface SStorage<T>{
    [key:string] : T
}
class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string){
        return this.storage[key]
    }
    clear(){
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()

stringStorage.get("ㅋㅋ")
stringStorage.set("hello","true")

const booleanStroage = new LocalStorage<boolean>();

booleanStroage.get("zzz")
booleanStroage.set("hello",true)
```

## Chapter4 - Block Chain
1. Type Script Project setting
```
1) json (npm)
ts-node -> ts파일 실행할 수 있도록 해주는 것
nodemon -> 파일이 수정되면 자동으로 파일을 다시 실행해줌.
참고 깃허브(npm module이 모여있는 사이트) : https://github.com/DefinitelyTyped/DefinitelyTyped

2) tsconfig.json
{
    "include": ["src"], // tsconfig를 적용시킬 곳을 정하는 설정.
    "compilerOptions": { 
        "outDir": "build", // (Ts파일에서) 변환된 JS파일을 저장할 폴더
        "target": "es6", // 어떤 문법을 사용할 것인지(변환)
        "lib": ["ES6", "DOM"], // 어떤 환경에서 실행할 것인지.
        "strict": true, // TS파일이 오류 잡아주는 설정
        "allowJs": true, // TS파일안에 JS파일을 허락해주는 설정
    }
}

3) module 만들기.
파일명은 원하는 파일명.d.ts 로 작성하면 됨. ex) example.d.ts

interface Config{
    url: string;
}

declare module "myPackage"{
    function init(config:Config):boolean;
    function exit(code:number):number;
}
이런식으로 선언만 해놓으면 원하는 파일에서 사용하면 됨.
ex) import {init, exit} from "myPackage";

```
2. JSDoc : js파일을 TS와 같이 사용 가능하게 해줌.
```
기본 적인 사용법은
/**
 * 
 * @param {*} bye 
 * @returns 
 */

// 아래의 명령어로 js파일내에서 tscheck를 가능하게함. 
// @ts-check

/** JSDoc
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns number
 */
export function exit(code) {
    return code + 1;
}

```
3. blockchain
```
Please check blockchain/src/index.ts
```

참고자료(사이트) : The TypeScript Handbook
url : https://www.typescriptlang.org/docs/handbook/intro.html
