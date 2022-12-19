function add (a : number, b : number){ // a,b를 타입안주면 any로 칭하긴 하나 error남.
    return a + b
}

// call signature : 함수에 대한 설명해주는 것.
type Add = (a:number, b:number) => number;
const add_ArrowFunction2 :Add = (a,b) => a+b 

// type을 정해주지않으면 이와 같은 형태로 적어야함.
const add_ArrowFunction = (a:number, b:number) => a+b

// 이 함수는 number을 반환해야하는 함수기 때문에 error가 남.
// const add_ArrowFunction2 :Add = (a,b) => {a+b} \

// OverLoading : 같은 이름의 함수를 재사용 하는 방법 => 매개변수에 차이를 줌.
type Add2 = {
    (a: number, b: number) : number
    (a: number, b: string) : number
}

// b가 string일수도 있어서 error남.
// const add_OverLoading: Add2 = (a,b) => a + b 
const add_OverLoading2: Add2 = (a,b) => {
    if(typeof b === "string") return a
    return a + b
}

type Config = {
    path:string,
    state: object
}
type Push = {
    (path:string):void;
    (config:Config):void
}

const push:Push = (config) => {
    if(typeof config === "string"){
    console.log(config)
    } else{
    console.log(config.path, config.state)
    }
}

type Add3 = { //이런게 call signature임.
    (a:number, b:number) : number;
    (a:number, b:number, c:number) : number;
}

// c는 Ts가 못정하기때문에 말해줘야함(있는지 없는지).
const add_OverLoading3 : Add3 = (a,b,c?:number) => { 
    if(c) return a + b + c 
    return a + b
}

add_OverLoading3(1,2)
add_OverLoading3(1,2,3)

// PolyMorphos
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

// PolyMorphos - generic <anyName>
type SuperPrint2 = {
    <Potato>(arr: Potato[]):Potato 
}

const superPrint2: SuperPrint2 = (arr) => {
    return arr[0]
}

const print1 = superPrint2([1,2])
const print2 =superPrint2([true,false])
const print3 =superPrint2(["a","b","c"])
const print4 =superPrint2([1,2,true,false])
const print5 =superPrint2([1,2,true,false, "ㅎㅎㅎㅎ"])

type SuperPrint3 = {
    <Potato, T>(arr: Potato[], b:T):Potato 
}

const superPrint3: SuperPrint3 = (arr) => {
    return arr[0]
}

const print11 = superPrint3([1,2]," ")

// generic - 2
function superPrint4<V>(a:V[]) {
    return a[0]
}

const print12 = superPrint4<number>([1,2]) //함수이름<type>은 type을 명시해주는것.
const print22 = superPrint4([true,false])
const print33 = superPrint4(["a","b","c"])
const print44 = superPrint4([1,2,true,false])
const print55 = superPrint4([1,2,true,false, "ㅎㅎㅎㅎ"])

// generic - 3
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

const lynn: Player<null> = {
    name: "lynn",
    extraInfo:null
}

type a = Array<number>

let a:a = [1,2,3,4]

function printAllNumbers(arr: Array<number>){

}

// generic - react
// useState<number>()