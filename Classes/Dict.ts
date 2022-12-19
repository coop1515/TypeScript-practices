type Words = {
    [key:string]: string
}

let dict : Words = {
    1: "food",
    2: "food2",
    3: "food3"
}

class Dict {
    private words: Words
    constructor(){
        this.words = {}
    }

    // 단어 추가
    add(word: Word){
        if (this.words[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }

    // 단어 조회
    def(term:string){
        return this.words[term]
    }

    // 단어 삭제
    delete(word: Word){
        if (this.words[word.term]){
            delete this.words[word.term]
        }
    }
    
    // 단어 업데이트
    update(word: Word){
        if (this.words[word.term]){
            this.words[word.term] = word.def
        }
    }
    static hello(){
        return "hello"
    }
}

// static이 없으면 에러남.
Dict.hello()


class Word {
    constructor(
        public term:string,
        public def :string
    ){}

    // 단어의 정의 추가 및 수정하는 메소드
    add(term ?:string, def ?:string){
        if(term){
            this.term = term
        }
        if(def){
            this.def = def
        }
    }

    // 단어 출력 메소드
    print(){
        const a:string = this.term + " " + this.def
        console.log(a)
        return a
    }
}

const kimchi = new Word("kimchi", "한국의 음식")
const kimchi2 = new Word("kimchi2", "한국의 음식")
const kimchi3 = new Word("kimchi3", "한국의 음식")
const kimchi4 = new Word("kimchi4", "한국의 음식")
const kimchi5 = new Word("kimchi4", "한국의 맛")

const dict2 = new Dict()

dict2.add(kimchi)
dict2.add(kimchi2)
dict2.add(kimchi3)
dict2.add(kimchi4)
dict2.def("kimchi") //kimchi는 key 
