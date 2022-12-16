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
1.
 



## Chapter
## Chapter
## Chapter
## Chapter
## Chapter
