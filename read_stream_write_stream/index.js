const fs=require('fs')
const read_stream=fs.createReadStream('big.txt')
const write_stream=fs.createWriteStream('out.txt')
let counter=0
read_stream.on('data',(chunk)=>{
    console.log(chunk)
    write_stream.write(chunk)
    counter+=1
    console.log("Written chunk: "+counter+" to output file.")
})

///alternative way : pipe

read_stream.pipe(write_stream)