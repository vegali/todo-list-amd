define([
    //todo 模块所依赖的其他模块
    'underscore',
    'backbone'
],function(
    //实例化依赖的模块
    _,
    Backbone
){
    //扩展Backbone.Model类为TodoModel
    var TodoModel = Backbone.Model.extend({
        defaults : {//设置todo模型的默认属性
            content : 'empty todo...',
            done : false
        },

        initialize : function(){//初始化todo模型，确保都有content属性
            if(!this.get('content')){//如果todo没有content，则为其设置默认属性
                this.set({'content' : this.defaults.content})
            }
        },

        toggle : function(){//切换todo模型的done值
            this.save({done:!this.get('done')})
        },

        clear : function(){//清除todo模型
            this.destroy();//从模型中删除
        }
    });
    return TodoModel;//返回TodoModel类
});