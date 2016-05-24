define([
    'jquery',
    'underscore',
    'backbone',
    'views/todo',
    'text!templates/stats.html'
],function(
    $,
    _,
    Backbone,
    TodoView,
    statsTemplate
){
    var AppView = Backbone.View.extend({
        el : $('#todoapp'),
        statsTemplate : _.template(statsTemplate),
        events : {
            'keypress #new-todo' : 'createOnEnter',
            'keyup #new-todo' : 'showTooltip',
            'click .todo-clear a' : 'clearCompleted'
        },
        initialize : function(){
            this.input = this.$('#new-todo');
            this.listenTo(this.collection,'add',this.addOne);
            this.listenTo(this.collection,'reset',this.addAll);
            this.listenTo(this.collection,'all',this.render);

            this.collection.fetch();
        },

        render : function(){
            var done = this.collection.done().length;
            this.$('#todo-stats').html(this.statsTemplate({
                total : this.collection.length,
                done : this.collection.done().lenth,
                remaining : this.collection.remaining().length
            }))
        },

        addOne : function(todo){
            var view = new TodoView({model : todo});
            this.$('#todo-list').append(view.render().el);
        },

        addAll : function(){
            this.collection.each(this.addOne)
        },

        newAttributes : function(){
            return {
                content : this.input.val(),
                order : this.collection.nextOrder(),
                done : false
            }
        },

        createOnEnter : function(e){
            if(e.keyCode == 13){
                this.collection.create(this.newAttributes());
                this.input.val('')
            }
        },

        clearCompleted : function(){
            _.each(this.collection.done(),function(todo){todo.clear()})
            return false;
        },

        showTooltip : function(){
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