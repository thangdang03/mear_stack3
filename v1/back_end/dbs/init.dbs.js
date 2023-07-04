const mongoose = require("mongoose");
const congfig = require("../config/init.dbs");
const { checkconnetion } = require("../helmets/check.overload");
const conectionString =`${[process.env.ININTDBS]}/${congfig.db}`;

class DATABASSE {
     constructor(){
        this.connect({type:'mongodb'});
     }

     async connect({type}){
        try {

            if(type === 'sqlserver'){
            }
            if(process.env.NODE_ENV === 'dev'){
                mongoose.set('debug', true);
                mongoose.set('debug',{color: true});
                checkconnetion();
             }

             const connecting = await mongoose.connect(conectionString);
             console.log('connecting to database success');
        } catch (error) {
            console.log('error connecting to database error');
        }
     }

     static getInstance(){
        if(!DATABASSE.instance){
            return DATABASSE.instance = new DATABASSE();
        }
        return DATABASSE.instance;
     }
}

const instancedbs = DATABASSE.getInstance();
module.exports = instancedbs;