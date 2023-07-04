const JWT =require('jsonwebtoken');

const createtokens = async({payload,publickey,privatekey})=>{
    try {
        const acesstoken = await JWT.sign(payload,privatekey,{
            algorithm: 'RS256',
            expiresIn: '2 days'
        });

        const refeshtoken = await JWT.sign(payload,privatekey,{
            // thuat toan bat doi xung 
            algorithm: 'RS256',
            expiresIn: '7 days'
        });
        
        JWT.verify(acesstoken,publickey,(error,decode)=>{
            if(error){
                console.log(error);
            }else{
                console.log({decode});
            }
        });

        return({acesstoken,refeshtoken});
    } catch (error) {
        console.log("errror ::",error);
        return null;
    }
}
module.exports = {
    createtokens
}