const SController = requireRoot('common/SController');
const qrcode = require('qrcode');
const { DEBUG, PORT } = requireRoot('env');
const loginUrl = `http://${DEBUG?'wx.test.zouke.com':'w.zouke.com'}/zksystem/auth/qr-login?port=${PORT}&path=trigger%2Fauth%2Flogin`;

const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';
const DES = require('@local/des');
const des = new DES('zouke7788');

const User = requireRoot('service/user/User');

module.exports = class AuthController extends SController{
    async qrCode(){
        const now = new Date();
        const code = des.encrypt(this.sessionId+'/'+ now.valueOf());
        this.session[codeKey] = code;
        this.session[codeExpriesKey] = now.valueOf() + (DEBUG?60000:30000);
        const url = `${loginUrl}&code=${encodeURIComponent(code)}`;
        
        console.log('========== qr-url', url);

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

        this.logResponse();
        
        if(uid){
            console.log('\tuid: ',this.session.uid);
            const user = await User.get(uid);
            this.renderJSON({code:0, userInfo:{
                name: user.name,
                p: user.p
            }});
            return;
        }

        if(code&&codeExpries>=now.valueOf()){
            this.renderJSON({code:1, msg:'not login'});
            return;
        }

        delete this.session[codeKey];
        delete this.session[codeExpriesKey];

        this.renderJSON({code:9, msg:'qrcode invalid'});

    }
    logout(){
        console.log('\tuid: ',this.session.uid);
        this.session = null;
        this.renderJSON({ code:0, msg:'logout ok' });
    }
}