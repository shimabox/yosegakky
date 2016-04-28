/**
 * @fileoverview 設定
 *  <ul>
 *    <li>title @type {string}
 *      <ul>
 *        <li>titleの設定</li>
 *        <li>dafault: "Thanks!!"</li>
 *      </ul>
 *    </li>
 *    <li>assets_path @type {string}
 *      <ul>
 *        <li>素材配置パス</li>
 *        <li>dafault: "assets/memories/"</li>
 *      </ul>
 *    </li>
 *    <li>line_clamp_class_name @type {string}
 *      <ul>
 *        <li>メッセージ表示行数制御用cssクラス名(line-clamp-x のxの数値行まで表示する)<br />参照:-webkit-line-clamp</li>
 *        <li>dafault: "line-clamp-5"</li>
 *      </ul>
 *    </li>
 *    <li>shuffle_message @type {boolean}
 *      <ul>
 *        <li>メッセージをランダムで表示するか</li>
 *        <li>dafault: true</li>
 *      </ul>
 *    </li>
 *    <li>message_chunk_cnt @type {number}
 *      <ul>
 *        <li>メッセージを何個ずつ描画するか(0だとすべてのメッセージを一括で表示する)</li>
 *        <li>dafault: 4</li>
 *      </ul>
 *    </li>
 *    <li>interval_render_message @type {number}
 *      <ul>
 *        <li>message_chunk_cntで分割させたメッセージを何msの間隔で描画させるか</li>
 *        <li>dafault: 100</li>
 *      </ul>
 *    </li>
 *    <li>overlay_fadeout_time @type {number}
 *      <ul>
 *        <li>overlay(loading)を何msかけてfadeoutさせるか</li>
 *        <li>default: 1500</li>
 *      </ul>
 *    </li>
 *    <li>memories @type {array}
 *      <ul>
 *        <li>ヘッダーのタイトルクリック時に表示させるスライドショーの内容定義</li>
 *        <li>default: []</li>
 *        <li>e.g. [ {"file_name": "hoge.jpg", "title": "hoge"}, {"file_name": "piyo.mp4", "title": "piyo"} ]</li>
 *      </ul>
 *    </li>
 *  </ul>
 */
Yosegakky.Config = {
  // @type {string} titleの設定
  "title": "Thanks!!",

  // @type {string} 素材配置パス
  "assets_path": "assets/memories/",

  // @type {string} メッセージを何行まで表示するか(line-clamp-x のxの数値行まで表示する) 参照:-webkit-line-clamp
  "line_clamp_class_name": "line-clamp-5",

  // @type {boolean} メッセージをランダムで表示するか
  "shuffle_message": true,

  // @type {number} メッセージを何個ずつ描画するか(0だとすべてのメッセージを一括で表示する)
  "message_chunk_cnt": 4,

  // @type {number} message_chunk_cntで分割させたメッセージを何msの間隔で描画させるか
  "interval_render_message": 100,

  // @type {number} overlay(loading)を何msかけてfadeoutさせるか
  "overlay_fadeout_time": 1500,
  
  // @type {array} ヘッダーのタイトルクリック時に表示させるスライドショーの内容定義
  "memories": [
    // {"file_name": "", "title": ""}
  ]
};