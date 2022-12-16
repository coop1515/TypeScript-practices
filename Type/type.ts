function haha(){
    let a:boolean = true
    return a

}

var a = true;
var b : number[]= []
b.push(1)

const player : {
    name : string,
    age ?: number // number | undefined
} = {
    name: "nico"
}

// if (player.age < 10){} error문장 player가 undefined일 수 있음.

if(player.age && player.age < 10){

}

// type을 만들어서 넣어줄 수 있음.
type Name = string;
type Age = number;

type Player = {
   readonly name : Name, //string,
    age ?: Age, //number
}

const nico : Player = {
    name:"nico"
}

// 일반적인 함수의 형태
// function playerMaker(name:string) : Player{
//     return {
//         name
//     }
// }

// 화살표 함수로 사용하는 법
const playerMaker = (name:string) :Player => ({name})

const nico2 = playerMaker("nico")

//function playerMaker의 타입을 Player로 지정 안해주면 에러남.
nico2.age = 12;
// nico2.name = "readonly때문에 변경이 불가능해서 에러가 남."; 

const numbers: readonly number[] = [1,2,3,4]
// numbers.push(1) // readonly를 지우면 error 사라짐.

// Tuple
const players : [string, number, boolean] = ["nico", 1, true];
players[0] = "스트링만 들어가야함 숫자 들어가면 에러난다."

// any : TS(Type Checker)에서 탈출시켜주는 타입. JS처럼 자유분방해짐.
// 무분별한 사용은 추천하지 않음.
const c : any[] = [12,3,4]
const d : any = true

// unknown : 변수의 타입을 미리 알지 못할 때 사용하는 타입.
let e: unknown;

if(typeof e === 'number'){
    const f = e + 1
}

if(typeof e === 'string'){
    const f = e.toUpperCase();
}

// void : 아무것도 return하지 않는 함수를 대상으로 사용하는 타입.
// 대체적으로 void를 적지 않아도 return값이 없으면 자동으로 void타입 지정해줌.
function hello(){
    console.log('x');
}

// never : 함수가 절대 retrun하지 않을 때 발생함.
function hello2():never{
    // console.log("xxx") //error를 발생시키지 않으면 error가 남.
    throw new Error("xxx")
}

function hello3(name:string|number) {
    // name + 1 //name이 string일수도 있어서 error가 남.
    if(typeof name === "string"){
        name // type이 string이 되어있음.
    }else if(typeof name === "number"){
        name // type이 number이 되어있음.
    }else {
        name // type이 never가 되어있음.
    }
}

