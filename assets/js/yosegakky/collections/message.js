;(function () {
  'use strict';

  /**
   * @fileoverview Yosegakky.Models.Messageを束ねるCollection
   */
  Yosegakky.Collections.Messages = Backbone.Collection.extend({
    model: Yosegakky.Models.Message
  });

})();