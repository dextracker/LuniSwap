function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './time-picker.scss';

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
    return React.createElement("div", {
      className: "oc-time-picker-container"
    }, React.createElement(FormControl, {
      name: "hour",
      componentClass: "select",
      value: hour,
      onChange: this.onChange,
      disabled: disabled
    }, this.hours.map(function (h) {
      return React.createElement("option", {
        key: "hour-" + h,
        value: h
      }, _this2.getPaddedNumber(h));
    })), React.createElement(FormControl, {
      name: "minute",
      componentClass: "select",
      value: minute,
      onChange: this.onChange,
      disabled: disabled
    }, this.minutes.map(function (m) {
      return React.createElement("option", {
        key: "minute-" + m,
        value: m
      }, _this2.getPaddedNumber(m));
    })));
  };

  return TimePicker;
}(React.Component);

_defineProperty(TimePicker, "defaultProps", {
  time: {
    hour: 0,
    minute: 0
  },
  minutesInterval: 5,
  disabled: false
});

export { TimePicker as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiRm9ybUNvbnRyb2wiLCJQcm9wVHlwZXMiLCJUaW1lUGlja2VyIiwicHJvcHMiLCJlIiwidGltZSIsIm9uQ2hhbmdlIiwib2xkVGltZSIsIm5ld1RpbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YXJnZXQiLCJuYW1lIiwiTnVtYmVyIiwidmFsdWUiLCJudW1iZXIiLCJpIiwiaG91cnMiLCJwdXNoIiwibWludXRlc0ludGVydmFsIiwibWludXRlcyIsImNvbXBvbmVudFdpbGxNb3VudCIsImdldEhvdXJMaXN0VmFsdWVzIiwiZ2V0TWludXRlTGlzdFZhbHVlcyIsInJlbmRlciIsIm1pbnV0ZSIsImhvdXIiLCJkaXNhYmxlZCIsIm1hcCIsImgiLCJnZXRQYWRkZWROdW1iZXIiLCJtIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLGlCQUE1QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPLG9CQUFQOztJQUVxQkMsVTs7Ozs7QUFvQm5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLHdDQUFNQSxLQUFOOztBQURpQiwrREFZUixVQUFDQyxDQUFELEVBQU87QUFBQTs7QUFBQSx3QkFDVyxNQUFLRCxLQURoQjtBQUFBLFVBQ1JFLElBRFEsZUFDUkEsSUFEUTtBQUFBLFVBQ0ZDLFFBREUsZUFDRkEsUUFERTs7QUFFaEIsVUFBTUMsT0FBTyxnQkFBUUYsSUFBUixDQUFiOztBQUNBLFVBQU1HLE9BQU8sR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWNILE9BQWQsdUNBQ2JILENBQUMsQ0FBQ08sTUFBRixDQUFTQyxJQURJLElBQ0dDLE1BQU0sQ0FBQ1QsQ0FBQyxDQUFDTyxNQUFGLENBQVNHLEtBQVYsQ0FEVCxrQkFBaEI7QUFHQVIsTUFBQUEsUUFBUSxDQUFDRSxPQUFELENBQVI7QUFDRCxLQW5Ca0I7O0FBQUEsc0VBMEJELFVBQUNPLE1BQUQ7QUFBQSxhQUFjQSxNQUFNLEdBQUcsRUFBVixTQUFvQkEsTUFBcEIsR0FBK0JBLE1BQTVDO0FBQUEsS0ExQkM7O0FBQUEsd0VBZ0NDLFlBQU07QUFDeEIsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLElBQUksQ0FBN0IsRUFBZ0M7QUFDOUIsY0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCRixDQUFoQjtBQUNEO0FBQ0YsS0FwQ2tCOztBQUFBLDBFQXlDRyxZQUFNO0FBQUEsVUFDbEJHLGVBRGtCLEdBQ0UsTUFBS2hCLEtBRFAsQ0FDbEJnQixlQURrQjs7QUFFMUIsV0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLElBQUlHLGVBQTdCLEVBQThDO0FBQzVDLGNBQUtDLE9BQUwsQ0FBYUYsSUFBYixDQUFrQkYsQ0FBbEI7QUFDRDtBQUNGLEtBOUNrQjs7QUFHakIsVUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFLRyxPQUFMLEdBQWUsRUFBZjtBQUppQjtBQUtsQjs7OztTQUVEQyxrQixHQUFBLDhCQUFxQjtBQUNuQixTQUFLQyxpQkFBTDtBQUNBLFNBQUtDLG1CQUFMO0FBQ0QsRzs7U0FzQ0RDLE0sR0FBQSxrQkFBUztBQUFBOztBQUFBLHVCQUlILEtBQUtyQixLQUpGO0FBQUEseUNBRUxFLElBRks7QUFBQSxRQUVHb0IsTUFGSCxxQkFFR0EsTUFGSDtBQUFBLFFBRVdDLElBRlgscUJBRVdBLElBRlg7QUFBQSxRQUdMQyxRQUhLLGdCQUdMQSxRQUhLO0FBS1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxvQkFBQyxXQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLE1BQUEsY0FBYyxFQUFDLFFBRmpCO0FBR0UsTUFBQSxLQUFLLEVBQUVELElBSFQ7QUFJRSxNQUFBLFFBQVEsRUFBRSxLQUFLcEIsUUFKakI7QUFLRSxNQUFBLFFBQVEsRUFBRXFCO0FBTFosT0FPRyxLQUFLVixLQUFMLENBQVdXLEdBQVgsQ0FBZSxVQUFDQyxDQUFEO0FBQUEsYUFDZDtBQUNFLFFBQUEsR0FBRyxZQUFVQSxDQURmO0FBRUUsUUFBQSxLQUFLLEVBQUVBO0FBRlQsU0FJRyxNQUFJLENBQUNDLGVBQUwsQ0FBcUJELENBQXJCLENBSkgsQ0FEYztBQUFBLEtBQWYsQ0FQSCxDQURGLEVBa0JFLG9CQUFDLFdBQUQ7QUFDRSxNQUFBLElBQUksRUFBQyxRQURQO0FBRUUsTUFBQSxjQUFjLEVBQUMsUUFGakI7QUFHRSxNQUFBLEtBQUssRUFBRUosTUFIVDtBQUlFLE1BQUEsUUFBUSxFQUFFLEtBQUtuQixRQUpqQjtBQUtFLE1BQUEsUUFBUSxFQUFFcUI7QUFMWixPQU9HLEtBQUtQLE9BQUwsQ0FBYVEsR0FBYixDQUFpQixVQUFDRyxDQUFEO0FBQUEsYUFDaEI7QUFDRSxRQUFBLEdBQUcsY0FBWUEsQ0FEakI7QUFFRSxRQUFBLEtBQUssRUFBRUE7QUFGVCxTQUlHLE1BQUksQ0FBQ0QsZUFBTCxDQUFxQkMsQ0FBckIsQ0FKSCxDQURnQjtBQUFBLEtBQWpCLENBUEgsQ0FsQkYsQ0FERjtBQXFDRCxHOzs7RUE5R3FDaEMsS0FBSyxDQUFDaUMsUzs7Z0JBQXpCOUIsVSxrQkFXRztBQUNwQkcsRUFBQUEsSUFBSSxFQUFFO0FBQ0pxQixJQUFBQSxJQUFJLEVBQUUsQ0FERjtBQUVKRCxJQUFBQSxNQUFNLEVBQUU7QUFGSixHQURjO0FBS3BCTixFQUFBQSxlQUFlLEVBQUUsQ0FMRztBQU1wQlEsRUFBQUEsUUFBUSxFQUFFO0FBTlUsQzs7U0FYSHpCLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCAnLi90aW1lLXBpY2tlci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdGltZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGhvdXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtaW51dGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfSksXG4gICAgbWludXRlc0ludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRpbWU6IHtcbiAgICAgIGhvdXI6IDAsXG4gICAgICBtaW51dGU6IDAsXG4gICAgfSxcbiAgICBtaW51dGVzSW50ZXJ2YWw6IDUsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5ob3VycyA9IFtdO1xuICAgIHRoaXMubWludXRlcyA9IFtdO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZ2V0SG91ckxpc3RWYWx1ZXMoKTtcbiAgICB0aGlzLmdldE1pbnV0ZUxpc3RWYWx1ZXMoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHRpbWUsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG9sZFRpbWUgPSB7IC4uLnRpbWUgfTtcbiAgICBjb25zdCBuZXdUaW1lID0gT2JqZWN0LmFzc2lnbihvbGRUaW1lLCB7XG4gICAgICBbZS50YXJnZXQubmFtZV06IE51bWJlcihlLnRhcmdldC52YWx1ZSksXG4gICAgfSk7XG4gICAgb25DaGFuZ2UobmV3VGltZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgYSBudW1iZXIgd2l0aCB0aGF0IDAtcHJlZml4LCBpZiBpdCdzIDwgMTBcbiAgICogQHBhcmFtIG51bWJlclxuICAgKiBAcmV0dXJucyBudW1iZXIge3N0cmluZ31cbiAgICovXG4gIGdldFBhZGRlZE51bWJlciA9IChudW1iZXIpID0+ICgobnVtYmVyIDwgMTApID8gYDAke251bWJlcn1gIDogbnVtYmVyKTtcblxuXG4gIC8qKlxuICAgKiBQcm92aWRlcyB2YWx1ZXMgZm9yIHRoZSBob3VyIHNlbGVjdCBib3hcbiAgICovXG4gIGdldEhvdXJMaXN0VmFsdWVzID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ob3Vycy5wdXNoKGkpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUHJvdmlkZXMgdmFsdWVzIGZvciB0aGUgbWludXRlIHNlbGVjdCBib3hcbiAgICovXG4gIGdldE1pbnV0ZUxpc3RWYWx1ZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBtaW51dGVzSW50ZXJ2YWwgfSA9IHRoaXMucHJvcHM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSArPSBtaW51dGVzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMubWludXRlcy5wdXNoKGkpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGltZTogeyBtaW51dGUsIGhvdXIgfSxcbiAgICAgIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXRpbWUtcGlja2VyLWNvbnRhaW5lclwiPlxuICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICBuYW1lPVwiaG91clwiXG4gICAgICAgICAgY29tcG9uZW50Q2xhc3M9XCJzZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtob3VyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmhvdXJzLm1hcCgoaCkgPT4gKFxuICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICBrZXk9e2Bob3VyLSR7aH1gfVxuICAgICAgICAgICAgICB2YWx1ZT17aH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMuZ2V0UGFkZGVkTnVtYmVyKGgpfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvRm9ybUNvbnRyb2w+XG5cbiAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgbmFtZT1cIm1pbnV0ZVwiXG4gICAgICAgICAgY29tcG9uZW50Q2xhc3M9XCJzZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXttaW51dGV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMubWludXRlcy5tYXAoKG0pID0+IChcbiAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAga2V5PXtgbWludXRlLSR7bX1gfVxuICAgICAgICAgICAgICB2YWx1ZT17bX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMuZ2V0UGFkZGVkTnVtYmVyKG0pfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=