/**
 * Created by wangkehan on 16/7/14.
 */

import './phone.scss';

function createDiv(width){
    const $div = document.createElement('div');
    $div.style.width = width;
    $div.addClass('toast-phone');
    $div.setAttribute('touch-action','none');
    return $div;
}

export default {
    show(html, timeout=2500,width='') {
        const $e = createDiv(width);
        document.body.appendChild($e);
        $e.innerHTML = html;
        setTimeout(function () {
            $e.addClass('show');
        },100);
        setTimeout(function () {
            $e.removeClass('show');
        }, timeout);
        setTimeout(function () {
            document.body.removeChild($e);
        }, timeout + 800);
    }
}