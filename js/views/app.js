define([
    //views app 模块所依赖的其他模块
    'jquery',
    'underscore',
    'backbone',
    'views/todo',
    'text!templates/stats.html'
],function(
    //实例化依赖的模块
    $,
    _,
    Backbone,
    TodoView,
    statsTemplate
){
    //创建app的视图类
    var AppView = Backbone.View.extend({
        el : $('#todoapp'),//对index.html中的#todoapp元素进行引用
        statsTemplate : _.template(statsTemplate),//设置stats的模版，使用underscore的template函数将javascript模版编译为可以插入页面的函数
        events : {//为元素代理事件
            'keypress #new-todo' : 'createOnEnter',
            'keyup #new-todo' : 'showTooltip',
            'click .todo-clear a' : 'clearCompleted'
        },
        initialize : function(){//初始化视图
            this.input = this.$('#new-todo');//对index.html中的#new-todo元素进行引用

            this.listenTo(this.collection,'add',this.addOne);//监听集合的add事件
            this.listenTo(this.collection,'reset',this.addAll);//监听集合的reset事件
            this.listenTo(this.collection,'all',this.render);//监听集合的所有事件

            this.collection.fetch();//从服务器拉取默认的模型设置，成功后配置到集合中
        },

        render : function(){//默认渲染方法
            this.$('#todo-stats').html(this.statsTemplate({//为statsTemplate模版注入数据，并写入到index.html中的#todo-stats内
                total : this.collection.length,//集合的数量
                done : this.collection.done().length,//集合调用模型的done()方法，返回已完成项目的数量
                remaining : this.collection.remaining().length//集合调用模型的remaining()方法，返回未完成项目的数量
            }))
        },

        addOne : function(todo){//添加一个模型
            var view = new TodoView({model : todo});//实例化一个todo视图对象，参数为对象
            this.$('#todo-list').append(view.render().el);//视图也随之插入一个对象。参数为todo视图对象渲染的el属性。【重载render可以实现从模型数据渲染视图模板，并可用新的 HTML 更新 this.el。】
        },

        addAll : function(){
            this.collection.each(this.addOne);//集合调用underscore的each方法，
        },

        newAttributes : function(){//为新的todo项生成属性
            return {
                content : this.input.val(),
                order : this.collection.nextOrder(),
                done : false
            }
        },

        createOnEnter : function(e){//回车键返回方法
            if(e.keyCode == 13){
                this.collection.create(this.newAttributes());
                this.input.val('')
            }
        },

        clearCompleted : function(){//清除所有完成项，调用todo模型的clear方法
            _.each(this.collection.done(),function(todo){todo.clear()});
            return false;
        },

        showTooltip : function(){//显示提示文字信息
            var tooltip = this.$('.ui-tooltip-top'),
                val = this.input.val(),
                show;
            tooltip.fadeOut();
            if(this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
            if(val === '' || val == this.input.attr('placeholder')){
                return
            }
            show = function(){tooltip.show().fadeIn()};
            this.tooltipTimeout = _.delay(show,1000);

        }
    });
    return AppView;
});