/**
 * Created by wangkehan on 16/7/15.
 */


export default function getRefCounter(){
    const refNumber={
        _number:0,
        get number(){
            return this._number;
        },
        set number(v){
            if(v<0){
                v=0;
            }
            this._number=v;
        }
    };

    return {
        add(){
            ++refNumber.number;
            return refNumber.number === 1;
        },
        sub(){
            -- refNumber.number;
            return refNumber.number === 0;
        },
        getNumber(){
            return refNumber.number;
        }
    };
}