define([ 'use!backbone', 'use!underscore', 'jquery' ], function(Backbone, _, $) {
  describe("a Backbone view", function() {
    var tpl, model, view;

    beforeEach(function() {
      tpl = '<div id="my-view"><%= greeting %></div>';
      model = new Backbone.Model({
        greeting : 'Hello, world'
      });

      if (view && view.remove) {
        view.remove();
      }
    });

    it("you should be able to render a view using a template", function() {
      var MyView = Backbone.View.extend({
        template : tpl,
        render : function() {
          // write code here to make the tests below pass
          $(this.el).html(_.template(this.template)(this.model.toJSON()));
          return this;
        }
      });

      view = new MyView({
        model : model
      }).render();

      expect(view.el.innerHTML).to.be.ok();
      expect(view.el.innerHTML).to.contain('Hello, world');
    });

    it("you should be able to update the view when the model changes", function() {
      var MyView = Backbone.View.extend({
        // fill in the code required in the initialize and render methods
        // to make the tests below pass
        initialize : function() {
          this.template = _.template(this.template);
          this.model.bind('change', this.render, this);
        },
        template : tpl,
        render : function() {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

      view = new MyView({
        model : model
      }).render();

      model.set('greeting', 'Goodbye, world');

      expect(view.el.innerHTML).to.contain('Goodbye, world');
      expect(view.el.innerHTML).not.to.contain('Hello, world');
    });

  });

});
