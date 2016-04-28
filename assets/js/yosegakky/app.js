(function () {
  'use strict';

  /**
   * @fileoverview ヘッダー、メッセージ描画などのメイン処理を担当
   */
  Yosegakky.App = Backbone.View.extend({
    /**
     * view 対象要素
     * @param {string}
     */
    el: '#app',

    /**
     * 初期化
     * @param {object} [config={}]
     */
    initialize: function (config) {
      $.extend(true, Yosegakky.Config, typeof config === 'object' ? config : {});

      Yosegakky.mediator = {};
      _.extend(Yosegakky.mediator, Backbone.Events);
      Yosegakky.mediator.on('finishRenderMessage', this._finishRenderMessageHandler);
    },

    /**
     * イベント定義
     * @param {object}
     */
    events: {
      'click #memories': 'onClickHeader'
    },

    /**
     * ヘッダー押下時のイベント
     */
    onClickHeader: function () {
      // lightcase:memories:slideshow を発動させる
      $('.memory-1').click();
    },

    /**
     * 描画
     * @param {array} [data=array]
     */
    render: function (data) {
      try {
        this._renderHeader();
        this._renderMessages(Array.isArray(data) ? data : []);
      } catch(e) {
        console.log(e);
      }
    },

    /**
     * ヘッダー描画
     */
    _renderHeader: function () {
      var m = new Yosegakky.Models.Header({
        'title': Yosegakky.Config.title,
        'memories': Yosegakky.Config.memories
      });
      var view = new Yosegakky.Views.Header({
        model: m
      });

      $(this.$el.find("#header")).append(view.render().el);
      $("a[data-rel='lightcase:memories:slideshow']").lightcase();
    },

    /**
     * メッセージ描画
     * @param {array} messages
     */
    _renderMessages: function (messages) {
      var c = new Yosegakky.Collections.Messages(messages);
      new Yosegakky.Views.Massages({
        el: this.$el.find("#messages"),
        collection: c
      });
    },

    /**
     * メッセージの描画が全て完了した時に呼ばれるハンドラー
     */
    _finishRenderMessageHandler: function () {
      $("a[data-rel='lightcase:messages:slideshow']").lightcase();
      $("a[data-rel='lightcase']").lightcase();
    }

  });

})();