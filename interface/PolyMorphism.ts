// PolyMorphism & generic & interface & class

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