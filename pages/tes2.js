const Tes = () => {
    let input = "xxxxxxxxxxyyy"
    let count = input.length

    let resultArray = []

    const compress = (divider) => {
        let inputArray = input.split("")
        let tempChar = inputArray[0]
        let number = 1
        let result = ""
        let nomor = 1;
        
        inputArray.forEach(function(value, key){
            if(tempChar==value && nomor!=divider){
                number++
            }else{
                if(nomor==divider){
                    result = result.concat(number+""+tempChar)
                }else{
                    if(key==count){
                        result = result.concat(value)
                    }
                    number++;

                    // result = result.concat(value)
                    // if(number==1){
                    // }else{
                    //     result = result.concat(number+""+tempChar)
                    // }
                }
            }
            tempChar = value
            
            if(nomor == divider){
                number = 1
                nomor = 1
            }else{
                nomor++
            }
        })

        return result
    }

    for(let i=1; i<=count; i++){
        resultArray.push(compress(i))
    }

    console.log(resultArray)

    return (
        <h1>Hai</h1>
    );
}

export default Tes