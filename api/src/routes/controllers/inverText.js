const inverText = (req, res) =>{
    const { text } = req.query;
    if (!text){
        res.status(400).send({
            error: "no text"
        }) 
    }else{
        let arrReverse = text.split("")
        let response = arrReverse.reverse().join("");
        let re = /[\W_]/g;   
        let lowRegStr = response.toLowerCase().replace(re, '');
        var reverseStr = lowRegStr.split('').reverse().join('');
        
        return res.send({
            palindromo: reverseStr === lowRegStr,
            text: response
        })
    }
}

module.exports = {
    inverText
}

