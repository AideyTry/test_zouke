const length = Symbol('length');
const taskList = Symbol('taskList');

const wrapTask = Symbol('wrapTask');

module.exports = class TaskQueue {
    // [length] 队列长度
    constructor(_length = 4){
        this[length] = _length;
        this[taskList] = [];
    }
    [wrapTask](task){
        const p = task.then(taskResult=>{
            this[taskList].remove(p);
            return taskResult;
        }).catch(e=>{
            this[taskList].remove(p);
            throw e;
        });
        return p;
    }
    race(){
        return Promise.race(this[taskList]);
    }
    all(){
        return Promise.all(this[taskList]);
    }
    isFree(){
        return this[taskList].length<this[length];
    }
    push(task){
        if(this.isFree()){
            this[taskList].push(this[wrapTask](task));
            return true;
        }

        return false;
    }
    static async run(iterator, fn, length = 4){
         const taskQueue = new TaskQueue(length);
         if(Array.isArray(iterator)) iterator = TaskQueue.createIterator(iterator);
         while(await iterator.hasNext()){
             if(!taskQueue.isFree()){
                 await taskQueue.race();
             }
             taskQueue.push(fn(await iterator.next()))
         }
         await taskQueue.all();
    }
    static createIterator(arr){
        let current = 0;
        return {
            hasNext(){
                return arr.length>current;
            },
            next(){
                return arr[current++];
            }
        }
    }
}