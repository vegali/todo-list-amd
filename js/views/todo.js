define([
    //todo 模块依赖的其他模块
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todos.html'
],function(
    //实例化依赖模块
    $,
    _,
    Backbone,
    todosTemplate
){
    //扩展Backbone.View类为TodoView
    var TodoView = Backbone.View.extend({
        tagName : 'li',// 隐式创建li元素
        template : _.template(todosTemplate),//设置todo的模版，使用underscore的template函数将javascript模版编译为可以插入页面的函数

        events : {//绑定时间
            'click .check' : 'toggleDone',
            'dblclick div.todo-content' : 'edit',
            'click span.todo-destroy' : 'clear',
            'keypress .todo-input' : 'updateOnEnter',
            'blur input' : 'close'
        },

        initialize : function(){//初始化模型
            this.listenTo(this.model,'change',this.render);//模型监听change事件
            this.listenTo(this.model,'destroy',this.remove);//模型监听destroy事件
        },

        render : function(){//渲染模型
            this.$el.html(this.template(this.model.toJSON()));//为模版注入数据，并写入到生成的标签中
            this.cacheInput();
            return this;//只要是render函数，都要返回this
        },

        cacheInput : function(){//将实例化模版的inout元素缓存到this.$input
            this.$input = this.$('.todo-input');
        },

        toggleDone : function(){
            this.model.toggle();//调用模型上的切换方法
        },

        edit : function(){//二次编辑调用方法
            this.$el.addClass('editing');
            this.$input.focus();
        },

        close : function(){//关闭时保存模型
            this.model.save({content:this.$input.val()});
            this.$el.removeClass('editing');//jquery api
        },

        updateOnEnter : function(e){//回车键时触发close方法
            if(e.keyCode == 13){
                this.close();
            }
        },

        remove : function(){
            this.stopListening();//停止监听所有事件
            this.undelegateEvents();//移除所有绑定的事件
            this.$el.remove();//jquery api 从页面中删除单项
        },

        clear : function(){
            this.model.clear();//从model中删除所有属性
        }
    });
    return TodoView;//返回 TodoView 类
});