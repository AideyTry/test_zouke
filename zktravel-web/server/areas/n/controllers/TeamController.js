const WController = requireRoot('common/WController');

module.exports = class TeamController extends WController {
    async test(){
        this.render();
    }
}