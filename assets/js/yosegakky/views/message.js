;(function () {
  'use strict';

  /**
   * @fileoverview 1メッセージの描画担当
   */
  Yosegakky.Views.Message = Backbone.View.extend({
    /**
     * 描画するHTMLのタグ名
     * @param {string}
     */
    tagName: 'div',

    /**
     * 描画するHTMLのクラス名
     * @param {string}
     */
    className: 'card',

    /**
     * viewのテンプレート
     * @param {function}
     */
    tmpl: _.template($("#tmpl-message").html()),

    /**
     * 初期化
     */
    initialize: function () {
      _.bindAll(this, 'render');
    },

    /**
     * メッセージを描画
     * @returns {Yosegakky.Views.Message} メッセージView
     */
    render: function () {
      var template = this.tmpl(this.model.toJSON());
      this.$el.html(template);
      return this;
    }

  });

})();