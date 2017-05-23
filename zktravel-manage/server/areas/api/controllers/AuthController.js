const BController = requireRoot('common/BController');
const qrcode = require('qrcode');
const { DEBUG } = requireRoot('env');
const loginUrl = `http://${DEBUG?'wx.test.zouke.com':'w.zouke.com'}/login/qr?port=8081&path=%2Ftrigger%2Fauth%2Flogin`;

const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';
const DES = require('@local/des');
const des = new DES('zouke7788');

module.exports = class AuthController extends BController{
    async qrCode(){
        const now = new Date();
        const key = des.encrypt(this.sessionId+'/'+ now.valueOf());
        console.log(key);
        this.session[codeKey] = key;
        this.session[codeExpriesKey] = now.valueOf() + 30000;
        const url = `${loginUrl}&code=${encodeURIComponent(key)}`;
        
        return new Promise((r,j)=>{
            qrcode.toString(
                url,
                {
                    type: 'svg'
                },
                (err, string)=>{
                    if(err) j(err);
                    else{
                        this.renderSVG(string);
                        r();
                    }
                }
            );
        });
    }
    async isLogin(){
        const now = new Date();
        const { [codeKey]: code, [codeExpriesKey]:codeExpries, uid } = this.session;

        if(uid){
            this.renderJSON({code:0});
            return;
        }

        if(code&&codeExpries>now.valueOf()){
            this.renderJSON({code:1, msg:'not login'});
            return;
        }

        delete this.session[codeKey];
        delete this.session[codeExpriesKey];

        this.renderJSON({code:9, msg:'qrcode invalid'});

    }
}