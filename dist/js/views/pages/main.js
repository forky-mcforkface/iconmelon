// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/pages/main', ['views/pages/PageView', 'views/IconSelectView', 'models/IconSelectModel', 'underscore'], function(PageView, IconSelectView, IconSelectModel, _) {
    var Main, _ref;

    Main = (function(_super) {
      __extends(Main, _super);

      function Main() {
        _ref = Main.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Main.prototype.template = '#main-template';

      Main.prototype.className = "cf";

      Main.prototype.events = {
        'click .js-download': 'download'
      };

      Main.prototype.initialize = function() {
        this.isNoPageAnima = true;
        Main.__super__.initialize.apply(this, arguments);
        return this;
      };

      Main.prototype.render = function() {
        var _this = this;

        Main.__super__.render.apply(this, arguments);
        this.iconSelectView = new IconSelectView({
          model: new IconSelectModel,
          $el: this.$('#js-icons-select-view-place'),
          isRender: true
        });
        this.$mainLogo = this.$('.main-logo-b');
        this.$melon = this.$('.logo-large-e');
        this.$mainSection = this.$('#js-icons-select-view-place');
        _.defer(function() {
          !App.mainAnimated && _this.animate();
          return App.mainAnimated && _this.show();
        });
        return this;
      };

      Main.prototype.download = function() {
        if (App.iconsSelected.length === 0) {
          App.notifier.show({
            type: 'error',
            text: 'select at least one icon to download'
          });
          return;
        }
        return $.ajax({
          type: 'post',
          url: '/download-icons',
          data: {
            icons: App.iconsSelected,
            filters: App.filtersSelected
          },
          success: function(filename) {
            return location.href = "/generated-icons/" + filename + ".zip";
          },
          error: function(e) {
            return console.error(e);
          }
        });
      };

      Main.prototype.animate = function() {
        var _this = this;

        this.$mainLogo.addClass('animated fadeInRightBig');
        this.$melon.addClass('animated swing');
        return setTimeout((function() {
          _this.$mainSection.addClass('animated fadeInDown');
          return App.mainAnimated = true;
        }), 1000);
      };

      Main.prototype.show = function() {
        this.$mainLogo.addClass('is-no-translateX');
        this.$melon.removeClass('is-rotated');
        this.$mainSection.addClass('animated fadeInDown');
        return this.$mainLogo.addClass('animated fadeInDown');
      };

      return Main;

    })(PageView);
    return Main;
  });

}).call(this);