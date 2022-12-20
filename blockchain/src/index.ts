import crypto from "crypto"; //ts-node를 설치하면 crypto모듈도 설치됨.

interface BlockShape {
    hash: string,
    prevHash: string,
    height: number,
    data: string
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash= Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, 
                            height:number, 
                            data: string)
                            {
            const toHash = `${prevHash}${height}${data}`;
            return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class BlockChain {
    private blocks: Block[]
    constructor(){
        this.blocks = [];
    }
    private getPrevHash(){
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data:string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    public getBlocks() {
        // return this.blocks // 보안의 위협때문에 아래처럼 작성해야 함.
        return [...this.blocks]
    }
}

const blockchain = new BlockChain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

//getBlocks()때문에 this.blocks이 return 되어 보안에 매우 취약함
blockchain.getBlocks().push(new Block("aaaaa", 11111, "fsdafadgsa")) // return [...this.blocks]으로 변경해서 적용안됨.

console.log(blockchain.getBlocks());