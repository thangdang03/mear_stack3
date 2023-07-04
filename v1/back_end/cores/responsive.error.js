

const {StatusCodes,ReasonPhrases} = require("../ultils/httpSatusCode");

class ErorrResponsvie extends Error{
    constructor(message,status){
         super(message);
         this.status = status 
    }
}


class BAD_REQUEST extends ErorrResponsvie {
    constructor (message = ReasonPhrases.BAD_REQUEST ,status= StatusCodes.BAD_REQUEST){
        super(message,status);
    }
}

//403
class FofbidentError extends ErorrResponsvie {
    constructor (message = ReasonPhrases.FORBIDDEN,status= StatusCodes.FORBIDDEN){
        super(message,status);
    }
}

//409
class ConflicError extends ErorrResponsvie {
    constructor (message = ReasonPhrases.ConflicError,status= StatusCodes.ConflicError){
        super(message,status);
    }
}

class NOT_FOUND extends ErorrResponsvie {
    constructor (message = ReasonPhrases.NOT_FOUND,status= StatusCodes.NOT_FOUND){
        super(message,status);
    }
}

//409
class Authererror extends ErorrResponsvie {
    constructor (message = ReasonPhrases.FORBIDDEN,status= StatusCodes.FORBIDDEN){
        super(message,status);
    }
}

module.exports = {
    FofbidentError,
    ConflicError,
    Authererror,
    BAD_REQUEST,
    NOT_FOUND
}

