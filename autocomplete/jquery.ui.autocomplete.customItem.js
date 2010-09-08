/*
 * extension for jQuery UI 1.8 autocomplete which provides option for
 * customizing items in suggestion list.
 *
 * Copyright (c) 2010, Christopher Russell
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
  $.ui.autocomplete.prototype._renderItem = function (ul, item) {
    // if customItem is defined, then use it to generate the anchor
    // otherwise use standard technique.
    var anchor = (this.options.customItem) ?
      this.options.customItem(this.term, item) :
      $("<a></a>").text(item.label);
    
    // build the full item and append it to the list
    // this is the same logic used in the plugin, but we are using
    // the anchor created above.
    return $("<li></li>")
    .data("item.autocomplete", item)
    .append(anchor)
    .appendTo(ul);
  };
})(jQuery);