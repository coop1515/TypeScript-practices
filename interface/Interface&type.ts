type NickName = string
type healthBar = number

type Player = {
    nickname:NickName,
    healthBar:healthBar
}

const nico: Player = {
    nickname: "me",
    healthBar: 450
}

// 타입에 특정 값만 들어오게 하는 방법.
type Team = "red" | "blue" | "yellow"
type Health = 5 | 10 | 15

// type Player2 = {
//     nickname: string,
//     team : Team,
//     health: Health
// }

// interface : 오로지 object의 모양을 정해주기 위해 사용함.
// type과 interface의 차이는 type은 다양하게 사용하는데 반해
// interface는 그저 object의 모양을 정해주는 목적밖에 없음.
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

