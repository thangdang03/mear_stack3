

const {StatusCodes,ReasonPhrases}=require("../ultils/httpSatusCode");

//contructor sucessrequest 
class SucessRequest {
      constructor({message,statuscode=StatusCodes.OK,reasionCode = ReasonPhrases.OK,metadata={}}){
        this.message =!message?reasionCode : message ;
        this.statuscode = statuscode;
        this.metadata = metadata;
      }

      send({res,hedear={},cookie={}}){
        if(cookie.store){
            if(cookie.store && cookie.data){
                
                res.cookie(cookie.store,cookie.data,{
                    httpOly: true,
                    secure: false,
                    sameSite:"strict",
                });
            }

            if(cookie.clear && cookie.store){
                res.clearCookie(cookie.store);
            }
        }
        return res.status(this.statuscode).json(this); 
      }
}


class OK extends SucessRequest {
    constructor({message,metadata}){
        super({message,metadata});
    }
}

class CREATED extends SucessRequest {
    constructor({message , statuscode=StatusCodes.CREATED,reasionCode = ReasonPhrases.CREATED,metadata}){
        super({message,statuscode,reasionCode,metadata});
    }
}

module.exports ={
    OK,
    CREATED
}