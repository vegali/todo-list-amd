define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todos.html'
],function(
    $,
    _,
    Backbone,
    todosTemplate
){
    var TodoView = Backbone.View.extend({
        tagName : 'li',
        template : _.template(todosTemplate),

        events : {
            'click .check' : 'toggleDone',
            'dblclick div.todo-content' : 'edit',
            'click span.todo-destroy' : 'clear',
            'keypress .todo-input' : 'updateOnEnter',
            'blur input' : 'close'
        },

        initialize : function(){
            this.listenTo(this.model,'change',this.render);
            this.listenTo(this.model,'destroy',this.remove);
        },

        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.cacheInput();
            return this;
        },

        cacheInput : function(){
            this.$input = this.$('.todo-input');
        },

        toggleDone : function(){
            this.model.toggle();
        },

        edit : function(){
            this.$el.addClass('editing');
            this.$input.focus();
        },

        close : function(){
            this.model.save({content:this.$input.val()});
            this.$el.removeClass('editing');
        },

        updateOnEnter : function(e){
            if(e.keyCode == 13){
                this.close();
            }
        },

        remove : function(){
            this.stopListening();
            this.undelegateEvents();
            this.$el.remove();
        },

        clear : function(){
            this.model.clear();
        }
    });
    return TodoView;
});