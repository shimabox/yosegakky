;(function () {
  'use strict';

  /**
   * @fileoverview ヘッダー描画用モデル
   */
  Yosegakky.Models.Header = Backbone.Model.extend({
    defaults: {
      "title": "",
      "memories": [],
      "memories_cnt": 0
    },

    /**
     * 初期化
     */
    initialize: function () {
      this.prepare();
    },

    /**
     * ヘッダー部分描画用プロパティのセットなどの準備
     */
    prepare: function () {
      var memories = this.get('memories');
      var _memories = [];

      _(memories).each(function (memory) {
        var fileName = memory.file_name || '',
            title = memory.title || '';

        if (fileName.trim() === '') {
          return true;
        }

        var tmp = [];
        tmp['file_path'] = Yosegakky.Config.assets_path + fileName;
        tmp['title'] = title.trim() !== '' ? title : Yosegakky.Config.title;
        _memories.push(tmp);

      }, true);

      this.set('memories', _memories);
      this.set('memories_cnt', _memories.length);
    }

  });

})();