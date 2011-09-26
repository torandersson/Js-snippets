(function() {
  var Application;
  window.PlaceHolder = (function() {
    function PlaceHolder(elements) {
      this.elements = {
        inputs: elements
      };
      this.pairs = [];
      this.placeHolderClassName = "p-l-a-c-e-h-o-l-d-e-r";
      this.createPlaceHolder();
      this.bindEvents();
    }
    PlaceHolder.prototype.createPlaceHolder = function() {
      var createdTag, current, pair, tagToCreate, _i, _len, _ref;
      _ref = this.elements.inputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        current = _ref[_i];
        tagToCreate = current.tagName;
        createdTag = document.createElement(tagToCreate);
        $(current).before(createdTag);
        if (tagToCreate === "INPUT") {
          createdTag.value = $(current).val();
          $(current).val("");
        }
        pair = {
          elem: current,
          placeHolder: createdTag
        };
        this.pairs.push(pair);
      }
      return this.positioning();
    };
    PlaceHolder.prototype.positioning = function() {
      var pair, pos, _i, _len, _ref, _results;
      _ref = this.pairs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        pos = $(pair.elem).position();
        $(pair.placeHolder).css({
          "position": "absolute"
        });
        $(pair.placeHolder).css({
          "z-index": "0"
        });
        $(pair.elem).css({
          'background-color': 'transparent'
        });
        pos = $(pair.elem).position();
        $(pair.placeHolder).addClass(this.placeHolderClassName);
        _results.push($(pair.placeHolder).css({
          "left": pos.left + "px",
          "top": pos.top + "px"
        }));
      }
      return _results;
    };
    PlaceHolder.prototype.bindEvents = function() {
      $(this.elements.inputs).each(function() {
        $(this).focus(function() {
          return $(this).css({
            'background-color': '#FFF'
          });
        });
        return $(this).blur(function() {
          if (!$(this).val()) {
            return $(this).css({
              'background-color': 'transparent'
            });
          }
        });
      });
      return $($("." + this.placeHolderClassName)).focus(function() {
        return $(this).next('input, textarea').focus();
      });
    };
    return PlaceHolder;
  })();
  Application = (function() {
    function Application() {
      this.elements = {
        input: $("input")
      };
      this.placeHolder = new PlaceHolder(this.elements.input);
    }
    return Application;
  })();
  $(function() {
    return window.app = new Application;
  });
}).call(this);
