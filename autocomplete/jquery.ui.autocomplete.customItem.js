/*
 * extension for jQuery UI 1.8 autocomplete which provides option for
 * customizing items in suggestion list.
 *
 * Copyright (c) 2010, Christopher Russell (http://github.com/crussell52/jquery-ui-extensions/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * MIT license: http://www.opensource.org/licenses/mit-license.php
 * GPLv2 license: http://www.gnu.org/licenses/gpl-2.0.html
 */
(function ($) {
  /*
   * To use, set customItem option to a callback which returns a jQuery
   * selection of the anchor tag used to display suggestion text. The function
   * should have the following signature, where item represents the selected item
   * and term represents the search term used to get the results:
   *   function (term, item)
   */
  var renderItem = $.ui.autocomplete.prototype._renderItem;
  $.ui.autocomplete.prototype._renderItem = function (ul, item) {
    // always let the base implementation execute
    var li = renderItem.apply(this, [ul,item]);
    // if customItem is configured, then replace the anchor created by the
    // base implementation with the output of the custom function.
    if (this.options.customItem) {
      $('a', li).replaceWith(this.options.customItem(ul, item));
    }
  };
})(jQuery);