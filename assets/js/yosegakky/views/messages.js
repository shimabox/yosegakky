;(function () {
  'use strict';

  /**
   * @fileoverview 全メッセージの描画担当
   */
  Yosegakky.Views.Massages = Backbone.View.extend({
    /**
     * 初期化
     */
    initialize: function () {
      _.bindAll(this, 'render', '_chunkMessages', '_chunk', '_renderMessages', '_appendMessage', '_createMessage');
      this.render();
    },

    /**
     * 描画
     */
    render: function () {
      var models = [];

      if (Yosegakky.Config.shuffle_message === true) {
        models = _.shuffle(this.collection.models);
      } else {
        models = this.collection.models;
      }

      this._renderMessages(this._chunkMessages(models));
    },

    /**
     * メッセージが詰まった配列をYosegakky.Config.message_chunk_cntで設定されている数で再度分割して返す
     * @param {array} models 全てのメッセージ
     * @returns {array} Yosegakky.Config.message_chunk_cnt個ずつ詰めなおされた配列
     */
    _chunkMessages: function (models) {
      var messageChunkCnt = parseInt(Math.abs(Yosegakky.Config.message_chunk_cnt), 10);

      if (messageChunkCnt === 0) { // 0だったらarrayでラップしてそのまま返す
        return [models];
      }

      return this._chunk(models, messageChunkCnt);
    },

    /**
     * 与えられた配列をn個ずつの配列に詰めなおす
     * @param {array} data 全てのメッセージ
     * @param {number} n 詰めなおす数
     * @returns {array} n個ずつ詰めなおされた配列<br />
     *     e.g.) data=[1, 2, 3, 4] を n=2で分割した場合 => [[1, 2],[3, 4]]
     */
    _chunk: function (data, n) {
      return _.chain(data).groupBy(function(element, index){
        return Math.floor(index / n);
      }).toArray()
      .value();
    },

    /**
     * メッセージの描画
     * @param {array} models 全てのメッセージ
     */
    _renderMessages: function (models) {
      this._appendMessage(models[0]); // _chunkで分割された配列のうち、最初の配列要素はここで描画

      // _chunkで分割された配列ごとに描画する
      var self = this;
      (function _render (modelLength, index) {
        _.delay(function () {
          if (modelLength > index) {
            self._appendMessage(models[index]);
            index++;
            _render(modelLength, index);
          } else {
            $('.wrap-overlay-message').fadeOut(Yosegakky.Config.overlay_fadeout_time);
            Yosegakky.mediator.trigger('finishRenderMessage');
            return;
          }
        }, Yosegakky.Config.interval_render_message);
      })(models.length, 1);
    },

    /**
     * _chunkで分割された配列一つ分のメッセージを描画
     * @param {array} models _chunkで分割された配列一つ分のメッセージ
     */
    _appendMessage: function (models) {
      var message = '';
      _.each(models, function(m){
        message += this._createMessage(m);
      }, this);

      $(this.el).append(message);
    },

    /**
     * メッセージ作成
     * @param {Yosegakky.Models.Message} message 一つのメッセージ
     * @returns {string} メッセージ内容を反映したHTML文字列
     */
    _createMessage: function (message) {
      var messageView = new Yosegakky.Views.Message({
        model: message.prepare()
      });

      return messageView.render().el.outerHTML;
    }

  });

})();