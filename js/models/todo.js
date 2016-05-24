define([
    'underscore',
    'backbone'
],function(
    _,
    Backbone
){
    var TodoModel = Backbone.Model.extend({
        defaults : {
            content : 'empty todo...',
            done : false
        },

        initialize : function(){
            if(!this.get('content')){
                this.set({'content' : this.defaults.content})
            }
        },

        toggle : function(){
            this.save({done:!this.get('done')})
        },

        clear : function(){
            this.destroy();
        }
    });
    return TodoModel;
});