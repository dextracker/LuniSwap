function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SPACE, ENTER } from '../keys';
import './navbar.component.scss';

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
      if (e.keyCode !== ENTER && e.keyCode !== SPACE) return;
      e.preventDefault();

      _this.handleNextClick();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreviousKeyDown", function (e) {
      if (e.keyCode !== ENTER && e.keyCode !== SPACE) return;
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
    var previousButton = React.createElement("span", {
      tabIndex: "0",
      role: "button",
      "aria-label": labels.previousMonth,
      key: "previous",
      className: previousClassName,
      onKeyDown: shouldShowPrevious ? previousKeyDownHandler : undefined,
      onClick: shouldShowPrevious ? previousClickHandler : undefined
    }, "\u25C0");
    var nextButton = React.createElement("span", {
      tabIndex: "0",
      role: "button",
      "aria-label": labels.nextMonth,
      key: "right",
      className: nextClassName,
      onKeyDown: shouldShowNext ? nextKeyDownHandler : undefined,
      onClick: shouldShowNext ? nextClickHandler : undefined
    }, "\u25B6");
    return React.createElement("div", {
      className: "DayPicker-NavBar"
    }, dir === 'rtl' ? [nextButton, previousButton] : [previousButton, nextButton]);
  };

  return Navbar;
}(Component);

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

export { Navbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJTUEFDRSIsIkVOVEVSIiwiTmF2YmFyIiwib25OZXh0Q2xpY2siLCJwcm9wcyIsIm9uUHJldmlvdXNDbGljayIsImUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVOZXh0Q2xpY2siLCJoYW5kbGVQcmV2aW91c0NsaWNrIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibGFiZWxzIiwiZGlyIiwic2hvd1ByZXZpb3VzQnV0dG9uIiwic2hvd05leHRCdXR0b24iLCJyZW5kZXIiLCJwcmV2aW91c0NsaWNrSGFuZGxlciIsIm5leHRDbGlja0hhbmRsZXIiLCJwcmV2aW91c0tleURvd25IYW5kbGVyIiwibmV4dEtleURvd25IYW5kbGVyIiwic2hvdWxkU2hvd1ByZXZpb3VzIiwic2hvdWxkU2hvd05leHQiLCJoYW5kbGVOZXh0S2V5RG93biIsImhhbmRsZVByZXZpb3VzS2V5RG93biIsInByZXZpb3VzQ2xhc3NOYW1lIiwibmV4dENsYXNzTmFtZSIsInByZXZpb3VzQnV0dG9uIiwicHJldmlvdXNNb250aCIsInVuZGVmaW5lZCIsIm5leHRCdXR0b24iLCJuZXh0TW9udGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLEtBQWhCLFFBQTZCLFNBQTdCO0FBQ0EsT0FBTyx5QkFBUDs7SUFFcUJDLE07Ozs7Ozs7Ozs7Ozs7O3NFQXdDRCxZQUFNO0FBQUEsVUFDZEMsV0FEYyxHQUNFLE1BQUtDLEtBRFAsQ0FDZEQsV0FEYztBQUV0QixVQUFJQSxXQUFKLEVBQWlCQSxXQUFXO0FBQzdCLEs7OzBFQUVxQixZQUFNO0FBQUEsVUFD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LGtCQUFrQixHQUFHSixvQkFBSCxHQUEwQlk7QUFQdkQsZ0JBREY7QUFjQSxRQUFNQyxVQUFVLEdBQ2Q7QUFDRSxNQUFBLFFBQVEsRUFBQyxHQURYO0FBRUUsTUFBQSxJQUFJLEVBQUMsUUFGUDtBQUdFLG9CQUFZbEIsTUFBTSxDQUFDbUIsU0FIckI7QUFJRSxNQUFBLEdBQUcsRUFBQyxPQUpOO0FBS0UsTUFBQSxTQUFTLEVBQUVMLGFBTGI7QUFNRSxNQUFBLFNBQVMsRUFBRUosY0FBYyxHQUFHRixrQkFBSCxHQUF3QlMsU0FObkQ7QUFPRSxNQUFBLE9BQU8sRUFBRVAsY0FBYyxHQUFHSixnQkFBSCxHQUFzQlc7QUFQL0MsZ0JBREY7QUFjQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHaEIsR0FBRyxLQUFLLEtBQVIsR0FDRyxDQUFDaUIsVUFBRCxFQUFhSCxjQUFiLENBREgsR0FFRyxDQUFDQSxjQUFELEVBQWlCRyxVQUFqQixDQUhOLENBREY7QUFPRCxHOzs7RUF4SWlDakMsUzs7Z0JBQWZJLE0sa0JBYUc7QUFDcEJZLEVBQUFBLEdBQUcsRUFBRSxLQURlO0FBRXBCRCxFQUFBQSxNQUFNLEVBQUU7QUFDTmdCLElBQUFBLGFBQWEsRUFBRSxnQkFEVDtBQUVORyxJQUFBQSxTQUFTLEVBQUU7QUFGTCxHQUZZO0FBTXBCakIsRUFBQUEsa0JBQWtCLEVBQUUsSUFOQTtBQU9wQkMsRUFBQUEsY0FBYyxFQUFFLElBUEk7QUFRcEJYLEVBQUFBLGVBQWUsRUFBRSxJQVJHO0FBU3BCRixFQUFBQSxXQUFXLEVBQUU7QUFUTyxDOztTQWJIRCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBTUEFDRSwgRU5URVIgfSBmcm9tICcuLi9rZXlzJztcbmltcG9ydCAnLi9uYXZiYXIuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHNob3dQcmV2aW91c0J1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd05leHRCdXR0b246IFByb3BUeXBlcy5ib29sLFxuICAgIG9uUHJldmlvdXNDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25OZXh0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYWJlbHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBwcmV2aW91c01vbnRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuZXh0TW9udGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KSxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlyOiAnbHRyJyxcbiAgICBsYWJlbHM6IHtcbiAgICAgIHByZXZpb3VzTW9udGg6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICBuZXh0TW9udGg6ICdOZXh0IE1vbnRoJyxcbiAgICB9LFxuICAgIHNob3dQcmV2aW91c0J1dHRvbjogdHJ1ZSxcbiAgICBzaG93TmV4dEJ1dHRvbjogdHJ1ZSxcbiAgICBvblByZXZpb3VzQ2xpY2s6IG51bGwsXG4gICAgb25OZXh0Q2xpY2s6IG51bGwsXG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbGFiZWxzLFxuICAgICAgZGlyLFxuICAgICAgc2hvd1ByZXZpb3VzQnV0dG9uLFxuICAgICAgc2hvd05leHRCdXR0b24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIG5leHRQcm9wcy5sYWJlbHMgIT09IGxhYmVsc1xuICAgICAgfHwgbmV4dFByb3BzLmRpciAhPT0gZGlyXG4gICAgICB8fCBzaG93UHJldmlvdXNCdXR0b24gIT09IG5leHRQcm9wcy5zaG93UHJldmlvdXNCdXR0b25cbiAgICAgIHx8IHNob3dOZXh0QnV0dG9uICE9PSBuZXh0UHJvcHMuc2hvd05leHRCdXR0b25cbiAgICApO1xuICB9XG5cbiAgaGFuZGxlTmV4dENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25OZXh0Q2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTmV4dENsaWNrKSBvbk5leHRDbGljaygpO1xuICB9XG5cbiAgaGFuZGxlUHJldmlvdXNDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uUHJldmlvdXNDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25QcmV2aW91c0NsaWNrKSBvblByZXZpb3VzQ2xpY2soKTtcbiAgfVxuXG4gIGhhbmRsZU5leHRLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlICE9PSBFTlRFUiAmJiBlLmtleUNvZGUgIT09IFNQQUNFKSByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaGFuZGxlTmV4dENsaWNrKCk7XG4gIH1cblxuICBoYW5kbGVQcmV2aW91c0tleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgIT09IEVOVEVSICYmIGUua2V5Q29kZSAhPT0gU1BBQ0UpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5oYW5kbGVQcmV2aW91c0NsaWNrKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1ByZXZpb3VzQnV0dG9uLFxuICAgICAgc2hvd05leHRCdXR0b24sXG4gICAgICBsYWJlbHMsXG4gICAgICBkaXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcHJldmlvdXNDbGlja0hhbmRsZXI7XG4gICAgbGV0IG5leHRDbGlja0hhbmRsZXI7XG4gICAgbGV0IHByZXZpb3VzS2V5RG93bkhhbmRsZXI7XG4gICAgbGV0IG5leHRLZXlEb3duSGFuZGxlcjtcbiAgICBsZXQgc2hvdWxkU2hvd1ByZXZpb3VzO1xuICAgIGxldCBzaG91bGRTaG93TmV4dDtcblxuICAgIGlmIChkaXIgPT09ICdydGwnKSB7XG4gICAgICBwcmV2aW91c0NsaWNrSGFuZGxlciA9IHRoaXMuaGFuZGxlTmV4dENsaWNrO1xuICAgICAgbmV4dENsaWNrSGFuZGxlciA9IHRoaXMuaGFuZGxlUHJldmlvdXNDbGljaztcbiAgICAgIHByZXZpb3VzS2V5RG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZU5leHRLZXlEb3duO1xuICAgICAgbmV4dEtleURvd25IYW5kbGVyID0gdGhpcy5oYW5kbGVQcmV2aW91c0tleURvd247XG4gICAgICBzaG91bGRTaG93TmV4dCA9IHNob3dQcmV2aW91c0J1dHRvbjtcbiAgICAgIHNob3VsZFNob3dQcmV2aW91cyA9IHNob3dOZXh0QnV0dG9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0NsaWNrSGFuZGxlciA9IHRoaXMuaGFuZGxlUHJldmlvdXNDbGljaztcbiAgICAgIG5leHRDbGlja0hhbmRsZXIgPSB0aGlzLmhhbmRsZU5leHRDbGljaztcbiAgICAgIHByZXZpb3VzS2V5RG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZVByZXZpb3VzS2V5RG93bjtcbiAgICAgIG5leHRLZXlEb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlTmV4dEtleURvd247XG4gICAgICBzaG91bGRTaG93TmV4dCA9IHNob3dOZXh0QnV0dG9uO1xuICAgICAgc2hvdWxkU2hvd1ByZXZpb3VzID0gc2hvd1ByZXZpb3VzQnV0dG9uO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzQ2xhc3NOYW1lID0gc2hvdWxkU2hvd1ByZXZpb3VzXG4gICAgICA/ICdEYXlQaWNrZXItTmF2QnV0dG9uIHByZXYnXG4gICAgICA6ICdEYXlQaWNrZXItTmF2QnV0dG9uLS1pbnRlcmFjdGlvbkRpc2FibGVkJztcblxuICAgIGNvbnN0IG5leHRDbGFzc05hbWUgPSBzaG91bGRTaG93TmV4dFxuICAgICAgPyAnRGF5UGlja2VyLU5hdkJ1dHRvbiBuZXh0J1xuICAgICAgOiAnRGF5UGlja2VyLU5hdkJ1dHRvbi0taW50ZXJhY3Rpb25EaXNhYmxlZCc7XG5cbiAgICBjb25zdCBwcmV2aW91c0J1dHRvbiA9IChcbiAgICAgIDxzcGFuXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHMucHJldmlvdXNNb250aH1cbiAgICAgICAga2V5PVwicHJldmlvdXNcIlxuICAgICAgICBjbGFzc05hbWU9e3ByZXZpb3VzQ2xhc3NOYW1lfVxuICAgICAgICBvbktleURvd249e3Nob3VsZFNob3dQcmV2aW91cyA/IHByZXZpb3VzS2V5RG93bkhhbmRsZXIgOiB1bmRlZmluZWR9XG4gICAgICAgIG9uQ2xpY2s9e3Nob3VsZFNob3dQcmV2aW91cyA/IHByZXZpb3VzQ2xpY2tIYW5kbGVyIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICDil4BcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgY29uc3QgbmV4dEJ1dHRvbiA9IChcbiAgICAgIDxzcGFuXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHMubmV4dE1vbnRofVxuICAgICAgICBrZXk9XCJyaWdodFwiXG4gICAgICAgIGNsYXNzTmFtZT17bmV4dENsYXNzTmFtZX1cbiAgICAgICAgb25LZXlEb3duPXtzaG91bGRTaG93TmV4dCA/IG5leHRLZXlEb3duSGFuZGxlciA6IHVuZGVmaW5lZH1cbiAgICAgICAgb25DbGljaz17c2hvdWxkU2hvd05leHQgPyBuZXh0Q2xpY2tIYW5kbGVyIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICDilrZcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRGF5UGlja2VyLU5hdkJhclwiPlxuICAgICAgICB7ZGlyID09PSAncnRsJ1xuICAgICAgICAgID8gW25leHRCdXR0b24sIHByZXZpb3VzQnV0dG9uXVxuICAgICAgICAgIDogW3ByZXZpb3VzQnV0dG9uLCBuZXh0QnV0dG9uXX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==