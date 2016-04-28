;(function () {
  'use strict';

  /**
   * @fileoverview ヘッダー描画担当
   */
  Yosegakky.Views.Header = Backbone.View.extend({
    /**
     * 描画するHTMLのタグ名
     * @param {string}
     */
    tagName: 'h1',

    /**
     * viewのテンプレート
     * @param {function}
     */
    tmpl: _.template($("#tmpl-header").html()),

    /**
     * 初期化
     */
    initialize: function() {
      _.bindAll(this, 'render');
    },

    /**
     * ヘッダー部分の描画
     * @returns {Yosegakky.Views.Header} ヘッダーView
     */
    render: function () {
      document.title = this.model.get('title'); // meta title を書き換え

      var template = this.tmpl(this.model.toJSON());
      this.$el.html(template);

      return this;
    }

  });

})();
