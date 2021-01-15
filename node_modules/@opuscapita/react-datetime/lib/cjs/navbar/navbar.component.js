"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _keys = require("../keys");

require("./navbar.component.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Navbar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Navbar, _Component);

  function Navbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleNextClick", function () {
      var onNextClick = _this.props.onNextClick;
      if (onNextClick) onNextClick();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreviousClick", function () {
      var onPreviousClick = _this.props.onPreviousClick;
      if (onPreviousClick) onPreviousClick();
    });

    _defineProperty(_assertThisInitialized(_this), "handleNextKeyDown", function (e) {
      if (e.keyCode !== _keys.ENTER && e.keyCode !== _keys.SPACE) return;
      e.preventDefault();

      _this.handleNextClick();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreviousKeyDown", function (e) {
      if (e.keyCode !== _keys.ENTER && e.keyCode !== _keys.SPACE) return;
      e.preventDefault();

      _this.handlePreviousClick();
    });

    return _this;
  }

  var _proto = Navbar.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
        labels = _this$props.labels,
        dir = _this$props.dir,
        showPreviousButton = _this$props.showPreviousButton,
        showNextButton = _this$props.showNextButton;
    return nextProps.labels !== labels || nextProps.dir !== dir || showPreviousButton !== nextProps.showPreviousButton || showNextButton !== nextProps.showNextButton;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        showPreviousButton = _this$props2.showPreviousButton,
        showNextButton = _this$props2.showNextButton,
        labels = _this$props2.labels,
        dir = _this$props2.dir;
    var previousClickHandler;
    var nextClickHandler;
    var previousKeyDownHandler;
    var nextKeyDownHandler;
    var shouldShowPrevious;
    var shouldShowNext;

    if (dir === 'rtl') {
      previousClickHandler = this.handleNextClick;
      nextClickHandler = this.handlePreviousClick;
      previousKeyDownHandler = this.handleNextKeyDown;
      nextKeyDownHandler = this.handlePreviousKeyDown;
      shouldShowNext = showPreviousButton;
      shouldShowPrevious = showNextButton;
    } else {
      previousClickHandler = this.handlePreviousClick;
      nextClickHandler = this.handleNextClick;
      previousKeyDownHandler = this.handlePreviousKeyDown;
      nextKeyDownHandler = this.handleNextKeyDown;
      shouldShowNext = showNextButton;
      shouldShowPrevious = showPreviousButton;
    }

    var previousClassName = shouldShowPrevious ? 'DayPicker-NavButton prev' : 'DayPicker-NavButton--interactionDisabled';
    var nextClassName = shouldShowNext ? 'DayPicker-NavButton next' : 'DayPicker-NavButton--interactionDisabled';

    var previousButton = _react["default"].createElement("span", {
      tabIndex: "0",
      role: "button",
      "aria-label": labels.previousMonth,
      key: "previous",
      className: previousClassName,
      onKeyDown: shouldShowPrevious ? previousKeyDownHandler : undefined,
      onClick: shouldShowPrevious ? previousClickHandler : undefined
    }, "\u25C0");

    var nextButton = _react["default"].createElement("span", {
      tabIndex: "0",
      role: "button",
      "aria-label": labels.nextMonth,
      key: "right",
      className: nextClassName,
      onKeyDown: shouldShowNext ? nextKeyDownHandler : undefined,
      onClick: shouldShowNext ? nextClickHandler : undefined
    }, "\u25B6");

    return _react["default"].createElement("div", {
      className: "DayPicker-NavBar"
    }, dir === 'rtl' ? [nextButton, previousButton] : [previousButton, nextButton]);
  };

  return Navbar;
}(_react.Component);

exports["default"] = Navbar;

_defineProperty(Navbar, "defaultProps", {
  dir: 'ltr',
  labels: {
    previousMonth: 'Previous Month',
    nextMonth: 'Next Month'
  },
  showPreviousButton: true,
  showNextButton: true,
  onPreviousClick: null,
  onNextClick: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiTmF2YmFyIiwib25OZXh0Q2xpY2siLCJwcm9wcyIsIm9uUHJldmlvdXNDbGljayIsImUiLCJrZXlDb2RlIiwiRU5URVIiLCJTUEFDRSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlTmV4dENsaWNrIiwiaGFuZGxlUHJldmlvdXNDbGljayIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImxhYmVscyIsImRpciIsInNob3dQcmV2aW91c0J1dHRvbiIsInNob3dOZXh0QnV0dG9uIiwicmVuZGVyIiwicHJldmlvdXNDbGlja0hhbmRsZXIiLCJuZXh0Q2xpY2tIYW5kbGVyIiwicHJldmlvdXNLZXlEb3duSGFuZGxlciIsIm5leHRLZXlEb3duSGFuZGxlciIsInNob3VsZFNob3dQcmV2aW91cyIsInNob3VsZFNob3dOZXh0IiwiaGFuZGxlTmV4dEtleURvd24iLCJoYW5kbGVQcmV2aW91c0tleURvd24iLCJwcmV2aW91c0NsYXNzTmFtZSIsIm5leHRDbGFzc05hbWUiLCJwcmV2aW91c0J1dHRvbiIsInByZXZpb3VzTW9udGgiLCJ1bmRlZmluZWQiLCJuZXh0QnV0dG9uIiwibmV4dE1vbnRoIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0VBd0NELFlBQU07QUFBQSxVQUNkQyxXQURjLEdBQ0UsTUFBS0MsS0FEUCxDQUNkRCxXQURjO0FBRXRCLFVBQUlBLFdBQUosRUFBaUJBLFdBQVc7QUFDN0IsSzs7MEVBRXFCLFlBQU07QUFBQSxVQUNsQkUsZUFEa0IsR0FDRSxNQUFLRCxLQURQLENBQ2xCQyxlQURrQjtBQUUxQixVQUFJQSxlQUFKLEVBQXFCQSxlQUFlO0FBQ3JDLEs7O3dFQUVtQixVQUFDQyxDQUFELEVBQU87QUFDekIsVUFBSUEs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QUFHRSxvQkFBWWxCLE1BQU0sQ0FBQ21CLFNBSHJCO0FBSUUsTUFBQSxHQUFHLEVBQUMsT0FKTjtBQUtFLE1BQUEsU0FBUyxFQUFFTCxhQUxiO0FBTUUsTUFBQSxTQUFTLEVBQUVKLGNBQWMsR0FBR0Ysa0JBQUgsR0FBd0JTLFNBTm5EO0FBT0UsTUFBQSxPQUFPLEVBQUVQLGNBQWMsR0FBR0osZ0JBQUgsR0FBc0JXO0FBUC9DLGdCQURGOztBQWNBLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0doQixHQUFHLEtBQUssS0FBUixHQUNHLENBQUNpQixVQUFELEVBQWFILGNBQWIsQ0FESCxHQUVHLENBQUNBLGNBQUQsRUFBaUJHLFVBQWpCLENBSE4sQ0FERjtBQU9ELEc7OztFQXhJaUNFLGdCOzs7O2dCQUFmakMsTSxrQkFhRztBQUNwQmMsRUFBQUEsR0FBRyxFQUFFLEtBRGU7QUFFcEJELEVBQUFBLE1BQU0sRUFBRTtBQUNOZ0IsSUFBQUEsYUFBYSxFQUFFLGdCQURUO0FBRU5HLElBQUFBLFNBQVMsRUFBRTtBQUZMLEdBRlk7QUFNcEJqQixFQUFBQSxrQkFBa0IsRUFBRSxJQU5BO0FBT3BCQyxFQUFBQSxjQUFjLEVBQUUsSUFQSTtBQVFwQmIsRUFBQUEsZUFBZSxFQUFFLElBUkc7QUFTcEJGLEVBQUFBLFdBQVcsRUFBRTtBQVRPLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFNQQUNFLCBFTlRFUiB9IGZyb20gJy4uL2tleXMnO1xuaW1wb3J0ICcuL25hdmJhci5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc2hvd1ByZXZpb3VzQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmV4dEJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25QcmV2aW91c0NsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk5leHRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhYmVsczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHByZXZpb3VzTW9udGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5leHRNb250aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXI6ICdsdHInLFxuICAgIGxhYmVsczoge1xuICAgICAgcHJldmlvdXNNb250aDogJ1ByZXZpb3VzIE1vbnRoJyxcbiAgICAgIG5leHRNb250aDogJ05leHQgTW9udGgnLFxuICAgIH0sXG4gICAgc2hvd1ByZXZpb3VzQnV0dG9uOiB0cnVlLFxuICAgIHNob3dOZXh0QnV0dG9uOiB0cnVlLFxuICAgIG9uUHJldmlvdXNDbGljazogbnVsbCxcbiAgICBvbk5leHRDbGljazogbnVsbCxcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBsYWJlbHMsXG4gICAgICBkaXIsXG4gICAgICBzaG93UHJldmlvdXNCdXR0b24sXG4gICAgICBzaG93TmV4dEJ1dHRvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgbmV4dFByb3BzLmxhYmVscyAhPT0gbGFiZWxzXG4gICAgICB8fCBuZXh0UHJvcHMuZGlyICE9PSBkaXJcbiAgICAgIHx8IHNob3dQcmV2aW91c0J1dHRvbiAhPT0gbmV4dFByb3BzLnNob3dQcmV2aW91c0J1dHRvblxuICAgICAgfHwgc2hvd05leHRCdXR0b24gIT09IG5leHRQcm9wcy5zaG93TmV4dEJ1dHRvblxuICAgICk7XG4gIH1cblxuICBoYW5kbGVOZXh0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbk5leHRDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25OZXh0Q2xpY2spIG9uTmV4dENsaWNrKCk7XG4gIH1cblxuICBoYW5kbGVQcmV2aW91c0NsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25QcmV2aW91c0NsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvblByZXZpb3VzQ2xpY2spIG9uUHJldmlvdXNDbGljaygpO1xuICB9XG5cbiAgaGFuZGxlTmV4dEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgIT09IEVOVEVSICYmIGUua2V5Q29kZSAhPT0gU1BBQ0UpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5oYW5kbGVOZXh0Q2xpY2soKTtcbiAgfVxuXG4gIGhhbmRsZVByZXZpb3VzS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSAhPT0gRU5URVIgJiYgZS5rZXlDb2RlICE9PSBTUEFDRSkgcmV0dXJuO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmhhbmRsZVByZXZpb3VzQ2xpY2soKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93UHJldmlvdXNCdXR0b24sXG4gICAgICBzaG93TmV4dEJ1dHRvbixcbiAgICAgIGxhYmVscyxcbiAgICAgIGRpcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBwcmV2aW91c0NsaWNrSGFuZGxlcjtcbiAgICBsZXQgbmV4dENsaWNrSGFuZGxlcjtcbiAgICBsZXQgcHJldmlvdXNLZXlEb3duSGFuZGxlcjtcbiAgICBsZXQgbmV4dEtleURvd25IYW5kbGVyO1xuICAgIGxldCBzaG91bGRTaG93UHJldmlvdXM7XG4gICAgbGV0IHNob3VsZFNob3dOZXh0O1xuXG4gICAgaWYgKGRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIHByZXZpb3VzQ2xpY2tIYW5kbGVyID0gdGhpcy5oYW5kbGVOZXh0Q2xpY2s7XG4gICAgICBuZXh0Q2xpY2tIYW5kbGVyID0gdGhpcy5oYW5kbGVQcmV2aW91c0NsaWNrO1xuICAgICAgcHJldmlvdXNLZXlEb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlTmV4dEtleURvd247XG4gICAgICBuZXh0S2V5RG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZVByZXZpb3VzS2V5RG93bjtcbiAgICAgIHNob3VsZFNob3dOZXh0ID0gc2hvd1ByZXZpb3VzQnV0dG9uO1xuICAgICAgc2hvdWxkU2hvd1ByZXZpb3VzID0gc2hvd05leHRCdXR0b247XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzQ2xpY2tIYW5kbGVyID0gdGhpcy5oYW5kbGVQcmV2aW91c0NsaWNrO1xuICAgICAgbmV4dENsaWNrSGFuZGxlciA9IHRoaXMuaGFuZGxlTmV4dENsaWNrO1xuICAgICAgcHJldmlvdXNLZXlEb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlUHJldmlvdXNLZXlEb3duO1xuICAgICAgbmV4dEtleURvd25IYW5kbGVyID0gdGhpcy5oYW5kbGVOZXh0S2V5RG93bjtcbiAgICAgIHNob3VsZFNob3dOZXh0ID0gc2hvd05leHRCdXR0b247XG4gICAgICBzaG91bGRTaG93UHJldmlvdXMgPSBzaG93UHJldmlvdXNCdXR0b247XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNDbGFzc05hbWUgPSBzaG91bGRTaG93UHJldmlvdXNcbiAgICAgID8gJ0RheVBpY2tlci1OYXZCdXR0b24gcHJldidcbiAgICAgIDogJ0RheVBpY2tlci1OYXZCdXR0b24tLWludGVyYWN0aW9uRGlzYWJsZWQnO1xuXG4gICAgY29uc3QgbmV4dENsYXNzTmFtZSA9IHNob3VsZFNob3dOZXh0XG4gICAgICA/ICdEYXlQaWNrZXItTmF2QnV0dG9uIG5leHQnXG4gICAgICA6ICdEYXlQaWNrZXItTmF2QnV0dG9uLS1pbnRlcmFjdGlvbkRpc2FibGVkJztcblxuICAgIGNvbnN0IHByZXZpb3VzQnV0dG9uID0gKFxuICAgICAgPHNwYW5cbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscy5wcmV2aW91c01vbnRofVxuICAgICAgICBrZXk9XCJwcmV2aW91c1wiXG4gICAgICAgIGNsYXNzTmFtZT17cHJldmlvdXNDbGFzc05hbWV9XG4gICAgICAgIG9uS2V5RG93bj17c2hvdWxkU2hvd1ByZXZpb3VzID8gcHJldmlvdXNLZXlEb3duSGFuZGxlciA6IHVuZGVmaW5lZH1cbiAgICAgICAgb25DbGljaz17c2hvdWxkU2hvd1ByZXZpb3VzID8gcHJldmlvdXNDbGlja0hhbmRsZXIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIOKXgFxuICAgICAgPC9zcGFuPlxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0QnV0dG9uID0gKFxuICAgICAgPHNwYW5cbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscy5uZXh0TW9udGh9XG4gICAgICAgIGtleT1cInJpZ2h0XCJcbiAgICAgICAgY2xhc3NOYW1lPXtuZXh0Q2xhc3NOYW1lfVxuICAgICAgICBvbktleURvd249e3Nob3VsZFNob3dOZXh0ID8gbmV4dEtleURvd25IYW5kbGVyIDogdW5kZWZpbmVkfVxuICAgICAgICBvbkNsaWNrPXtzaG91bGRTaG93TmV4dCA/IG5leHRDbGlja0hhbmRsZXIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIOKWtlxuICAgICAgPC9zcGFuPlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJEYXlQaWNrZXItTmF2QmFyXCI+XG4gICAgICAgIHtkaXIgPT09ICdydGwnXG4gICAgICAgICAgPyBbbmV4dEJ1dHRvbiwgcHJldmlvdXNCdXR0b25dXG4gICAgICAgICAgOiBbcHJldmlvdXNCdXR0b24sIG5leHRCdXR0b25dfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19