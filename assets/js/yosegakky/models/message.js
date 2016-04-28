;(function () {
  'use strict';

  /**
   * @fileoverview メッセージ描画用モデル
   */
  Yosegakky.Models.Message = Backbone.Model.extend({
    defaults: {
      "inlineId": "",
      "userName": "",
      "message": "",
      "video": "",
      "videoPath": "",
      "hasVideo": false,
      "img": "",
      "imgPath": "",
      "hasImg": false,
      "isDummyImg": false,
      "lineClampClassName": ""
    },

    /**
     * メッセージ描画用プロパティのセットなどの準備
     * @returns {Yosegakky.Models.Message} メッセージ描画用モデル
     */
    prepare: function () {
      this._settingVideoConfig();
      this._settingImgConfig();
      this._lineClampClassName();

      this.set('inlineId', this.cid); // ユニーク番号をセットする

      return this;
    },

    /**
     * videoのセット
     */
    _settingVideoConfig: function () {
      var video = this.get('video');
      if (video.trim() === '') {
        return;
      }

      this.set('videoPath', Yosegakky.Config.assets_path + video);
      this.set('hasVideo', true);
    },

    /**
     * 画像のセット
     */
    _settingImgConfig: function () {
      var img = this.get('img');
      if (img.trim() === '') {
        this.set('isDummyImg', true);
      } else {
        this.set('imgPath', Yosegakky.Config.assets_path + img);
      }

      this.set('hasImg', true); // falseにするとメッセージ内の画像は描画されない
    },

    /**
     * メッセージを何行まで表示するかのクラス名をセット
     */
    _lineClampClassName: function () {
      var className = Yosegakky.Config.line_clamp_class_name;
      if (className.trim() === '') {
        return;
      }

      this.set('lineClampClassName', ' ' + className);
    }

  });

})();