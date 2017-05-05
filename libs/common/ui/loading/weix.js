/**
 * Created by wangkehan on 16/10/17.
 */

import getRefCounter from '../../core/w/refCounter';
import 'weui';

const refCounter = getRefCounter();

const div = document.createElement('div');
//div.addClass('weui_loading_toast');
div.innerHTML=`
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content"></p>
    </div>`;
const textNode = div.$('.weui-toast__content');

export default {
    open(loadingText){
        textNode.innerText = loadingText;
        if (refCounter.add()){
            document.body.appendChild(div);
        }
    },
    close(){
        if (refCounter.sub()){
            document.body.removeChild(div);
        }
    }
};