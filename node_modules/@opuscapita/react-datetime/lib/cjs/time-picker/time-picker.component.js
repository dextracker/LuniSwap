"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./time-picker.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var _Object$assign;

      var _this$props = _this.props,
          time = _this$props.time,
          onChange = _this$props.onChange;

      var oldTime = _extends({}, time);

      var newTime = Object.assign(oldTime, (_Object$assign = {}, _Object$assign[e.target.name] = Number(e.target.value), _Object$assign));
      onChange(newTime);
    });

    _defineProperty(_assertThisInitialized(_this), "getPaddedNumber", function (number) {
      return number < 10 ? "0" + number : number;
    });

    _defineProperty(_assertThisInitialized(_this), "getHourListValues", function () {
      for (var i = 0; i < 24; i += 1) {
        _this.hours.push(i);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMinuteListValues", function () {
      var minutesInterval = _this.props.minutesInterval;

      for (var i = 0; i < 60; i += minutesInterval) {
        _this.minutes.push(i);
      }
    });

    _this.hours = [];
    _this.minutes = [];
    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.getHourListValues();
    this.getMinuteListValues();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        _this$props2$time = _this$props2.time,
        minute = _this$props2$time.minute,
        hour = _this$props2$time.hour,
        disabled = _this$props2.disabled;
    return _react["default"].createElement("div", {
      className: "oc-time-picker-container"
    }, _react["default"].createElement(_reactBootstrap.FormControl, {
      name: "hour",
      componentClass: "select",
      value: hour,
      onChange: this.onChange,
      disabled: disabled
    }, this.hours.map(function (h) {
      return _react["default"].createElement("option", {
        key: "hour-" + h,
        value: h
      }, _this2.getPaddedNumber(h));
    })), _react["default"].createElement(_reactBootstrap.FormControl, {
      name: "minute",
      componentClass: "select",
      value: minute,
      onChange: this.onChange,
      disabled: disabled
    }, this.minutes.map(function (m) {
      return _react["default"].createElement("option", {
        key: "minute-" + m,
        value: m
      }, _this2.getPaddedNumber(m));
    })));
  };

  return TimePicker;
}(_react["default"].Component);

exports["default"] = TimePicker;

_defineProperty(TimePicker, "defaultProps", {
  time: {
    hour: 0,
    minute: 0
  },
  minutesInterval: 5,
  disabled: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRpbWVQaWNrZXIiLCJwcm9wcyIsImUiLCJ0aW1lIiwib25DaGFuZ2UiLCJvbGRUaW1lIiwibmV3VGltZSIsIk9iamVjdCIsImFzc2lnbiIsInRhcmdldCIsIm5hbWUiLCJOdW1iZXIiLCJ2YWx1ZSIsIm51bWJlciIsImkiLCJob3VycyIsInB1c2giLCJtaW51dGVzSW50ZXJ2YWwiLCJtaW51dGVzIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZ2V0SG91ckxpc3RWYWx1ZXMiLCJnZXRNaW51dGVMaXN0VmFsdWVzIiwicmVuZGVyIiwibWludXRlIiwiaG91ciIsImRpc2FibGVkIiwibWFwIiwiaCIsImdldFBhZGRlZE51bWJlciIsIm0iLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7OztBQW9CbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsd0NBQU1BLEtBQU47O0FBRGlCLCtEQVlSLFVBQUNDLENBQUQsRUFBTztBQUFBOztBQUFBLHdCQUNXLE1BQUtELEtBRGhCO0FBQUEsVUFDUkUsSUFEUSxlQUNSQSxJQURRO0FBQUEsVUFDRkMsUUFERSxlQUNGQSxRQURFOztBQUVoQixVQUFNQyxPQUFPLGdCQUFRRixJQUFSLENBQWI7O0FBQ0EsVUFBTUcsT0FBTyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0gsT0FBZCx1Q0FDYkgsQ0FBQyxDQUFDTyxNQUFGLENBQVNDLElBREksSUFDR0MsTUFBTSxDQUFDVCxDQUFDLENBQUNPLE1BQUYsQ0FBU0csS0FBVixDQURULGtCQUFoQjtBQUdBUixNQUFBQSxRQUFRLENBQUNFLE9BQUQsQ0FBUjtBQUNELEtBbkJrQjs7QUFBQSxzRUEwQkQsVUFBQ08sTUFBRDtBQUFBLGFBQWNBLE1BQU0sR0FBRyxFQUFWLFNBQW9CQSxNQUFwQixHQUErQkEsTUFBNUM7QUFBQSxLQTFCQzs7QUFBQSx3RUFnQ0MsWUFBTTtBQUN4QixXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsSUFBSSxDQUE3QixFQUFnQztBQUM5QixjQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JGLENBQWhCO0FBQ0Q7QUFDRixLQXBDa0I7O0FBQUEsMEVBeUNHLFlBQU07QUFBQSxVQUNsQkcsZUFEa0IsR0FDRSxNQUFLaEIsS0FEUCxDQUNsQmdCLGVBRGtCOztBQUUxQixXQUFLLElBQUlILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsSUFBSUcsZUFBN0IsRUFBOEM7QUFDNUMsY0FBS0MsT0FBTCxDQUFhRixJQUFiLENBQWtCRixDQUFsQjtBQUNEO0FBQ0YsS0E5Q2tCOztBQUdqQixVQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUtHLE9BQUwsR0FBZSxFQUFmO0FBSmlCO0FBS2xCOzs7O1NBRURDLGtCLEdBQUEsOEJBQXFCO0FBQ25CLFNBQUtDLGlCQUFMO0FBQ0EsU0FBS0MsbUJBQUw7QUFDRCxHOztTQXNDREMsTSxHQUFBLGtCQUFTO0FBQUE7O0FBQUEsdUJBSUgsS0FBS3JCLEtBSkY7QUFBQSx5Q0FFTEUsSUFGSztBQUFBLFFBRUdvQixNQUZILHFCQUVHQSxNQUZIO0FBQUEsUUFFV0MsSUFGWCxxQkFFV0EsSUFGWDtBQUFBLFFBR0xDLFFBSEssZ0JBR0xBLFFBSEs7QUFLUCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFLGdDQUFDLDJCQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLE1BQUEsY0FBYyxFQUFDLFFBRmpCO0FBR0UsTUFBQSxLQUFLLEVBQUVELElBSFQ7QUFJRSxNQUFBLFFBQVEsRUFBRSxLQUFLcEIsUUFKakI7QUFLRSxNQUFBLFFBQVEsRUFBRXFCO0FBTFosT0FPRyxLQUFLVixLQUFMLENBQVdXLEdBQVgsQ0FBZSxVQUFDQyxDQUFEO0FBQUEsYUFDZDtBQUNFLFFBQUEsR0FBRyxZQUFVQSxDQURmO0FBRUUsUUFBQSxLQUFLLEVBQUVBO0FBRlQsU0FJRyxNQUFJLENBQUNDLGVBQUwsQ0FBcUJELENBQXJCLENBSkgsQ0FEYztBQUFBLEtBQWYsQ0FQSCxDQURGLEVBa0JFLGdDQUFDLDJCQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLE1BQUEsY0FBYyxFQUFDLFFBRmpCO0FBR0UsTUFBQSxLQUFLLEVBQUVKLE1BSFQ7QUFJRSxNQUFBLFFBQVEsRUFBRSxLQUFLbkIsUUFKakI7QUFLRSxNQUFBLFFBQVEsRUFBRXFCO0FBTFosT0FPRyxLQUFLUCxPQUFMLENBQWFRLEdBQWIsQ0FBaUIsVUFBQ0csQ0FBRDtBQUFBLGFBQ2hCO0FBQ0UsUUFBQSxHQUFHLGNBQVlBLENBRGpCO0FBRUUsUUFBQSxLQUFLLEVBQUVBO0FBRlQsU0FJRyxNQUFJLENBQUNELGVBQUwsQ0FBcUJDLENBQXJCLENBSkgsQ0FEZ0I7QUFBQSxLQUFqQixDQVBILENBbEJGLENBREY7QUFxQ0QsRzs7O0VBOUdxQ0Msa0JBQU1DLFM7Ozs7Z0JBQXpCL0IsVSxrQkFXRztBQUNwQkcsRUFBQUEsSUFBSSxFQUFFO0FBQ0pxQixJQUFBQSxJQUFJLEVBQUUsQ0FERjtBQUVKRCxJQUFBQSxNQUFNLEVBQUU7QUFGSixHQURjO0FBS3BCTixFQUFBQSxlQUFlLEVBQUUsQ0FMRztBQU1wQlEsRUFBQUEsUUFBUSxFQUFFO0FBTlUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0ICcuL3RpbWUtcGlja2VyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0aW1lOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaG91cjogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG1pbnV0ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICB9KSxcbiAgICBtaW51dGVzSW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdGltZToge1xuICAgICAgaG91cjogMCxcbiAgICAgIG1pbnV0ZTogMCxcbiAgICB9LFxuICAgIG1pbnV0ZXNJbnRlcnZhbDogNSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhvdXJzID0gW107XG4gICAgdGhpcy5taW51dGVzID0gW107XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5nZXRIb3VyTGlzdFZhbHVlcygpO1xuICAgIHRoaXMuZ2V0TWludXRlTGlzdFZhbHVlcygpO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgdGltZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgb2xkVGltZSA9IHsgLi4udGltZSB9O1xuICAgIGNvbnN0IG5ld1RpbWUgPSBPYmplY3QuYXNzaWduKG9sZFRpbWUsIHtcbiAgICAgIFtlLnRhcmdldC5uYW1lXTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSxcbiAgICB9KTtcbiAgICBvbkNoYW5nZShuZXdUaW1lKTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhIG51bWJlciB3aXRoIHRoYXQgMC1wcmVmaXgsIGlmIGl0J3MgPCAxMFxuICAgKiBAcGFyYW0gbnVtYmVyXG4gICAqIEByZXR1cm5zIG51bWJlciB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0UGFkZGVkTnVtYmVyID0gKG51bWJlcikgPT4gKChudW1iZXIgPCAxMCkgPyBgMCR7bnVtYmVyfWAgOiBudW1iZXIpO1xuXG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIHZhbHVlcyBmb3IgdGhlIGhvdXIgc2VsZWN0IGJveFxuICAgKi9cbiAgZ2V0SG91ckxpc3RWYWx1ZXMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmhvdXJzLnB1c2goaSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyB2YWx1ZXMgZm9yIHRoZSBtaW51dGUgc2VsZWN0IGJveFxuICAgKi9cbiAgZ2V0TWludXRlTGlzdFZhbHVlcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IG1pbnV0ZXNJbnRlcnZhbCB9ID0gdGhpcy5wcm9wcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpICs9IG1pbnV0ZXNJbnRlcnZhbCkge1xuICAgICAgdGhpcy5taW51dGVzLnB1c2goaSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aW1lOiB7IG1pbnV0ZSwgaG91ciB9LFxuICAgICAgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtdGltZS1waWNrZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgIG5hbWU9XCJob3VyXCJcbiAgICAgICAgICBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e2hvdXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMuaG91cnMubWFwKChoKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgIGtleT17YGhvdXItJHtofWB9XG4gICAgICAgICAgICAgIHZhbHVlPXtofVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5nZXRQYWRkZWROdW1iZXIoaCl9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Gb3JtQ29udHJvbD5cblxuICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICBuYW1lPVwibWludXRlXCJcbiAgICAgICAgICBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e21pbnV0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5taW51dGVzLm1hcCgobSkgPT4gKFxuICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICBrZXk9e2BtaW51dGUtJHttfWB9XG4gICAgICAgICAgICAgIHZhbHVlPXttfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5nZXRQYWRkZWROdW1iZXIobSl9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==