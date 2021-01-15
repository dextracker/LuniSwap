function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './date-input.component';

var DateTimeInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateTimeInput, _React$Component);

  function DateTimeInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DateTimeInput.prototype;

  _proto.render = function render() {
    var dateFormat = this.props.dateFormat;
    return React.createElement(DateInput, _extends({
      time: true,
      dateFormat: dateFormat
    }, this.props));
  };

  return DateTimeInput;
}(React.Component);

_defineProperty(DateTimeInput, "defaultProps", {
  dateFormat: 'L LT',
  minutesInterval: 5
});

export { DateTimeInput as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlLXRpbWUtaW5wdXQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkRhdGVJbnB1dCIsIkRhdGVUaW1lSW5wdXQiLCJyZW5kZXIiLCJkYXRlRm9ybWF0IiwicHJvcHMiLCJDb21wb25lbnQiLCJtaW51dGVzSW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHdCQUF0Qjs7SUFFcUJDLGE7Ozs7Ozs7Ozs7O1NBV25CQyxNLEdBQUEsa0JBQVM7QUFBQSxRQUNDQyxVQURELEdBQ2dCLEtBQUtDLEtBRHJCLENBQ0NELFVBREQ7QUFFUCxXQUNFLG9CQUFDLFNBQUQ7QUFDRSxNQUFBLElBQUksTUFETjtBQUVFLE1BQUEsVUFBVSxFQUFFQTtBQUZkLE9BR00sS0FBS0MsS0FIWCxFQURGO0FBT0QsRzs7O0VBcEJ3Q04sS0FBSyxDQUFDTyxTOztnQkFBNUJKLGEsa0JBTUc7QUFDcEJFLEVBQUFBLFVBQVUsRUFBRSxNQURRO0FBRXBCRyxFQUFBQSxlQUFlLEVBQUU7QUFGRyxDOztTQU5ITCxhIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IERhdGVJbnB1dCBmcm9tICcuL2RhdGUtaW5wdXQuY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtaW51dGVzSW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkYXRlRm9ybWF0OiAnTCBMVCcsXG4gICAgbWludXRlc0ludGVydmFsOiA1LFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgdGltZVxuICAgICAgICBkYXRlRm9ybWF0PXtkYXRlRm9ybWF0fVxuICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19