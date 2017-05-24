import Vue from 'vue';
import ajax from '@local/common/ajax';
import { platform, qiniuHost } from '@local/common/core';
import changeTitle from 'root/utils/changeTitle';
import { toast, loading } from 'root/config';

Object.defineProperties(
    Vue.prototype, 
    {
        $ajax: { value:ajax },
        $platform: { value:platform },
        $toast: { value:toast },
        $loading: { value:loading },
        $qiniuHost: { value:qiniuHost },
        $title: { 
            get(){ return document.title },
            set: changeTitle
        },
        $href: {
            value(url){ window.location = url }
        },
        $goto: {
            value( name, opt = {} ){ 
                opt.name = name;
                this.$router.push(opt);
            }
        },
        $replace: {
            value( name, opt = {} ){
                opt.name = name;
                this.$router.replace(opt);
            }
        },
        $systemError: {
            value(msg="服务器漫游世界中,请稍候再试～"){
                toast.show(msg);
            }
        },
        $qiniuLink: {
            value(key){ return `${qiniuHost}/${key}`; }
        }
    }
);