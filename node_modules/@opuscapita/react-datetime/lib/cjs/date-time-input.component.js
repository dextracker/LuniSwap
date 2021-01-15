"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateInput = _interopRequireDefault(require("./date-input.component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _react["default"].createElement(_dateInput["default"], _extends({
      time: true,
      dateFormat: dateFormat
    }, this.props));
  };

  return DateTimeInput;
}(_react["default"].Component);

exports["default"] = DateTimeInput;

_defineProperty(DateTimeInput, "defaultProps", {
  dateFormat: 'L LT',
  minutesInterval: 5
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlLXRpbWUtaW5wdXQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRlVGltZUlucHV0IiwicmVuZGVyIiwiZGF0ZUZvcm1hdCIsInByb3BzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJtaW51dGVzSW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGE7Ozs7Ozs7Ozs7O1NBV25CQyxNLEdBQUEsa0JBQVM7QUFBQSxRQUNDQyxVQURELEdBQ2dCLEtBQUtDLEtBRHJCLENBQ0NELFVBREQ7QUFFUCxXQUNFLGdDQUFDLHFCQUFEO0FBQ0UsTUFBQSxJQUFJLE1BRE47QUFFRSxNQUFBLFVBQVUsRUFBRUE7QUFGZCxPQUdNLEtBQUtDLEtBSFgsRUFERjtBQU9ELEc7OztFQXBCd0NDLGtCQUFNQyxTOzs7O2dCQUE1QkwsYSxrQkFNRztBQUNwQkUsRUFBQUEsVUFBVSxFQUFFLE1BRFE7QUFFcEJJLEVBQUFBLGVBQWUsRUFBRTtBQUZHLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4vZGF0ZS1pbnB1dC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pbnV0ZXNJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRhdGVGb3JtYXQ6ICdMIExUJyxcbiAgICBtaW51dGVzSW50ZXJ2YWw6IDUsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPERhdGVJbnB1dFxuICAgICAgICB0aW1lXG4gICAgICAgIGRhdGVGb3JtYXQ9e2RhdGVGb3JtYXR9XG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0=