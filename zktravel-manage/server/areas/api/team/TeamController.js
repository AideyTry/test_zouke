const LController = requireRoot('common/LController');

module.exports = class TeamController extends LController {
    $getUser(){
        return {
            id: this.userInfo.id,
            name: this.userInfo.name,
            role: this.userInfo.role,
            role_name: this.userInfo.roleName
        }
    }
}