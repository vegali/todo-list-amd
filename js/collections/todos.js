define([
    //todos 模块所依赖的其他模块
    'underscore',
    'backbone',
    'storage',
    'models/todo'
],function(
    //实例化依赖模块
    _,
    Backbone,
    Store,
    Todo
){
    //创建Todo模型的集合类
    var TodosCollection = Backbone.Collection.extend({
        model : Todo,//设置集合的模型

        localStorage : new Store('todos'),//实例化Store对象，命名空间为todos

        done : function(){//过滤完成的项目
            return this.filter(function(todo){
                return todo.get('done');
            })
        },

        remaining : function(){//过滤未完成的项目
            return this.without.apply(this,this.done());
        },

        nextOrder : function(){//获取项目的序号
            if(!this.length){//没有项目返回1
                return 1;
            }else{//有项目返回最后一项的order值加1
                return this.last().get('order') + 1
            }
        },

        comparator : function(todo){//排序
            return todo.get('order')
        }
    });
    return new TodosCollection();//返回 并实例化Todo模型的集合
});