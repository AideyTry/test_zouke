const TaskQueue = require('@local/task-queue');

const taskQueue = new TaskQueue(2);

function createTask(i){
    return new Promise(r=>{
        setTimeout(r, i*1000, i);
    })
}

module.exports = async function(){
    const result = [];
    for(let i=0; i<4; ++i){
        if(!taskQueue.isFree()){
            result.push(await taskQueue.race());
        }
        taskQueue.push(createTask(i));
    }
    result.push(...await taskQueue.all());
    for(let i=0; i<4; ++i){
        if(!result.includes(i)) throw new Error('task queue fail');
    }
}