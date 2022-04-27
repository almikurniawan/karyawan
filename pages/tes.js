const Tes = () => {
    const input = ["Enter uid1234 Spiderman", "Leave uid1234", "Enter uid1234 Hulk", "Leave uid1234"]

    let users = []
    let response = [];

    input.forEach(function(item){
        let temp = item.split(" ")

        if(temp[0]=="Enter"){
            users[temp[1]] = temp[2]
            response.push({
                "user": users[temp[1]],
                "action": "came in"
            })
        }else if(temp[0]=="Leave"){
            response.push({
                "user": users[temp[1]],
                "action": "has left."
            })
        }else{
            users[temp[1]] = temp[2]
            response.forEach(function(responseItem){
                responseItem['user'] = temp[2]
            })
        }
    })

    let result = []
    response.forEach(function(responseItem){
        result.push(responseItem['user'] + " " + responseItem['action'])
    })

    // return result

    console.log(result)

    return (
        <h1>Hai</h1>
    );
}

export default Tes