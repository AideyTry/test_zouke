import changeTitle from 'root/utils/changeTitle';

export default function (to,from) {
    let title = '';
    for(let record of to.matched){
        if('title' in record.meta) title = record.meta.title;
    }
    if(title!==false){
        changeTitle(title);
    }
}