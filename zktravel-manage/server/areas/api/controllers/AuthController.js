const SController = requireRoot('common/SController');
const { DEBUG, PORT, DES_PWD } = requireRoot('env');
const loginUrl = `http://${DEBUG?'wx.test.zouke.com':'w.zouke.com'}/zksystem/auth/qr-login?port=${PORT}&path=trigger%2Fauth%2Flogin`;

const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';
const DES = require('@local/des');
const des = new DES(DES_PWD);

const User = requireRoot('service/user/User');

module.exports = class AuthController extends SController{
    qrCode(){
        if(this.session.uid){
            //已有uid
            return this.throw(404);
        }

        const now = new Date();
        const code = des.encrypt(this.sessionId+'/'+ now.valueOf());
        this.session[codeKey] = code;
        this.session[codeExpriesKey] = now.valueOf() + (DEBUG?60000:30000);
        const url = `${loginUrl}&code=${encodeURIComponent(code)}`;
        
        console.log('========== qr-url', url);

        return this.renderQR(url);
    }
    // uid | code/codeExpries 互斥
    async isLogin(){
        const now = new Date();
        const { [codeKey]: code, [codeExpriesKey]:codeExpries, uid } = this.session;

        if(code&&codeExpries>=now.valueOf()){
            this.renderJSON({code:1, msg:'not login'});
            return;
        }

        delete this.session[codeKey];
        delete this.session[codeExpriesKey];

        if(!uid) {
            this.renderJSON({code:9, msg:'qrcode invalid'});
            return;
        }

        console.log('\tuid: ',this.session.uid);
    
        const user = await User.get(uid);
        if(!user){
            delete this.session.uid;
            this.renderJSON({ code: 2, msg: 'user not permitted' });
            return;
        }

        this.renderJSON({ code: 0, userInfo: {
            id: user.id,
            name: user.name,
            p: user.p,
            role: user.role,
            roleName: user.roleName
        } });
    }
    logout(){
        console.log('\tuid: ',this.session.uid);
        this.session = null;
        this.renderJSON({ code:0, msg:'logout ok' });
    }
}