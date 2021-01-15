"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _tether = _interopRequireDefault(require("tether"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (!_tether.default) {
  console.error('It looks like Tether has not been included. Please load this dependency first https://github.com/HubSpot/tether');
}

var hasCreatePortal = _reactDom.default.createPortal !== undefined;
var renderElementToPropTypes = [_propTypes.default.string, _propTypes.default.shape({
  appendChild: _propTypes.default.func.isRequired
})];

var childrenPropType = function childrenPropType(_ref, propName, componentName) {
  var children = _ref.children;

  var childCount = _react.Children.count(children);

  if (childCount <= 0) {
    return new Error("".concat(componentName, " expects at least one child to use as the target element."));
  }

  if (childCount > 2) {
    return new Error("Only a max of two children allowed in ".concat(componentName, "."));
  }
};

var attachmentPositions = ['auto auto', 'top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

var TetherComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(TetherComponent, _Component);

  function TetherComponent(props) {
    var _this;

    _classCallCheck(this, TetherComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TetherComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_targetNode", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_elementParentNode", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_tether", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_elementComponent", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_targetComponent", null);

    _this.updateChildrenComponents(_this.props);

    return _this;
  }

  _createClass(TetherComponent, [{
    key: "updateChildrenComponents",
    value: function updateChildrenComponents(props) {
      var childArray = _react.Children.toArray(props.children);

      this._targetComponent = childArray[0];
      this._elementComponent = childArray[1];

      if (this._targetComponent && this._elementComponent) {
        this._createContainer();
      }
    } // eslint-disable-next-line react/no-deprecated

  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      this.updateChildrenComponents(nextProps);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._update();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._destroy();
    }
  }, {
    key: "getTetherInstance",
    value: function getTetherInstance() {
      return this._tether;
    }
  }, {
    key: "disable",
    value: function disable() {
      this._tether.disable();
    }
  }, {
    key: "enable",
    value: function enable() {
      this._tether.enable();
    }
  }, {
    key: "on",
    value: function on(event, handler, ctx) {
      this._tether.on(event, handler, ctx);
    }
  }, {
    key: "once",
    value: function once(event, handler, ctx) {
      this._tether.once(event, handler, ctx);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      this._tether.off(event, handler);
    }
  }, {
    key: "position",
    value: function position() {
      this._tether.position();
    }
  }, {
    key: "_registerEventListeners",
    value: function _registerEventListeners() {
      var _this2 = this;

      this.on('update', function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this2.props.onUpdate && _this2.props.onUpdate.apply(_this2, args);
      });
      this.on('repositioned', function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this2.props.onRepositioned && _this2.props.onRepositioned.apply(_this2, args);
      });
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      if (this._elementParentNode) {
        if (!hasCreatePortal) {
          _reactDom.default.unmountComponentAtNode(this._elementParentNode);
        }

        this._elementParentNode.parentNode.removeChild(this._elementParentNode);
      }

      if (this._tether) {
        this._tether.destroy();
      }

      this._elementParentNode = null;
      this._tether = null;
      this._targetNode = null;
      this._targetComponent = null;
      this._elementComponent = null;
    }
  }, {
    key: "_createContainer",
    value: function _createContainer() {
      // Create element node container if it hasn't been yet
      if (!this._elementParentNode) {
        var renderElementTag = this.props.renderElementTag; // Create a node that we can stick our content Component in

        this._elementParentNode = document.createElement(renderElementTag); // Append node to the render node

        this._renderNode.appendChild(this._elementParentNode);
      }
    }
  }, {
    key: "_update",
    value: function _update() {
      var _this3 = this;

      // If no element component provided, bail out
      var shouldDestroy = !this._elementComponent || !this._targetComponent;

      if (!shouldDestroy) {
        this._targetNode = _reactDom.default.findDOMNode(this);
        shouldDestroy = !this._targetNode;
      }

      if (shouldDestroy) {
        // Destroy Tether element, or parent node, if those has been created
        this._destroy();

        return;
      }

      if (hasCreatePortal) {
        this._updateTether();
      } else {
        // Render element component into the DOM
        _reactDom.default.unstable_renderSubtreeIntoContainer(this, this._elementComponent, this._elementParentNode, function () {
          // If we're not destroyed, update Tether once the subtree has finished rendering
          if (_this3._elementParentNode) {
            _this3._updateTether();
          }
        });
      }
    }
  }, {
    key: "_updateTether",
    value: function _updateTether() {
      var _this$props = this.props,
          children = _this$props.children,
          renderElementTag = _this$props.renderElementTag,
          renderElementTo = _this$props.renderElementTo,
          id = _this$props.id,
          className = _this$props.className,
          style = _this$props.style,
          options = _objectWithoutProperties(_this$props, ["children", "renderElementTag", "renderElementTo", "id", "className", "style"]);

      var tetherOptions = _objectSpread({
        target: this._targetNode,
        element: this._elementParentNode
      }, options);

      var idStr = id || '';

      if (this._elementParentNode.id !== idStr) {
        this._elementParentNode.id = idStr;
      }

      var classStr = className || '';

      if (this._elementParentNode.className !== classStr) {
        this._elementParentNode.className = classStr;
      }

      if (style) {
        var elementStyle = this._elementParentNode.style;
        Object.keys(style).forEach(function (key) {
          if (elementStyle[key] !== style[key]) {
            elementStyle[key] = style[key];
          }
        });
      }

      if (this._tether) {
        this._tether.setOptions(tetherOptions);
      } else {
        this._tether = new _tether.default(tetherOptions);

        this._registerEventListeners();
      }

      this._tether.position();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._targetComponent) {
        return null;
      }

      if (!hasCreatePortal || !this._elementComponent) {
        return this._targetComponent;
      }

      return [this._targetComponent, _reactDom.default.createPortal(this._elementComponent, this._elementParentNode)];
    }
  }, {
    key: "_renderNode",
    get: function get() {
      var renderElementTo = this.props.renderElementTo;

      if (typeof renderElementTo === 'string') {
        return document.querySelector(renderElementTo);
      }

      return renderElementTo || document.body;
    }
  }]);

  return TetherComponent;
}(_react.Component);

_defineProperty(TetherComponent, "propTypes", {
  renderElementTag: _propTypes.default.string,
  renderElementTo: _propTypes.default.oneOfType(renderElementToPropTypes),
  attachment: _propTypes.default.oneOf(attachmentPositions).isRequired,
  targetAttachment: _propTypes.default.oneOf(attachmentPositions),
  offset: _propTypes.default.string,
  targetOffset: _propTypes.default.string,
  targetModifier: _propTypes.default.string,
  enabled: _propTypes.default.bool,
  classes: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  optimizations: _propTypes.default.object,
  constraints: _propTypes.default.array,
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onUpdate: _propTypes.default.func,
  onRepositioned: _propTypes.default.func,
  children: childrenPropType
});

_defineProperty(TetherComponent, "defaultProps", {
  renderElementTag: 'div',
  renderElementTo: null
});

var _default = TetherComponent;
exports.default = _default;