"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _moment = _interopRequireDefault(require("moment"));

var _reactDayPicker = _interopRequireWildcard(require("react-day-picker"));

var _moment2 = _interopRequireDefault(require("react-day-picker/moment"));

var _reactTether = _interopRequireDefault(require("react-tether"));

require("react-day-picker/lib/style.css");

var _timePicker = _interopRequireDefault(require("./time-picker/time-picker.component"));

var _yearMonthPicker = _interopRequireDefault(require("./year-month-picker/year-month-picker.component"));

var _navbar = _interopRequireDefault(require("./navbar/navbar.component"));

require("./date-input.scss");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Date formats used by the component (mainly by the getDate method)
var FORMATS = {
  UTC: 'UTC',
  PRETTY_DATE: 'PRETTY_DATE',
  DATE_OBJECT: 'DATE_OBJECT'
}; // Used in getTetherComponentAttachmentLocation fn

var DATETIME_POPUP_HEIGHT = 200;
var classPrefix = 'oc-datetime';

var DateInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateInput, _React$Component);

  DateInput.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    var formatDate = props.formatDate,
        value = props.value;

    if (!state.showOverlay && value !== state.lastValue) {
      var momentDate = _moment["default"].utc(value, _moment["default"].ISO_8601);

      var inputDate = formatDate ? formatDate(value) : DateInput.getDate(momentDate, FORMATS.PRETTY_DATE, props.dateFormat);
      return {
        lastValue: value,
        selectedDay: DateInput.getDate(momentDate, FORMATS.DATE_OBJECT),
        showOverlay: props.showOverlay || state.showOverlay,
        inputDate: inputDate
      };
    }

    return null;
  }
  /**
   * Converts given date into wanted type (string/date object)
   * @param date - {string, moment object}
   * @param type - {string, date object} type of the return value
   * @param dateFormat {string} date format, defaults to 'M/D/YYYY'
   * ('M/D/YYYY' h:mm when using DateTime)
   * * @returns {string, date}
   */
  ;

  DateInput.getDate = function getDate(date, type, dateFormat) {
    var momentDate = typeof date === 'string' ? _moment["default"].utc(date, dateFormat) : date;
    if (!momentDate.isValid() || !date) return '';

    switch (type) {
      case FORMATS.PRETTY_DATE:
        return DateInput.removeInvisibleChars(momentDate.format(dateFormat));

      case FORMATS.UTC:
        return DateInput.removeInvisibleChars(momentDate.toISOString());

      case FORMATS.DATE_OBJECT:
      default:
        // UTC day might differ from local day, therefore UTC offset
        // must be discounted.
        return new Date((0, _moment["default"])(momentDate.format('L'), 'L'));
    }
  };

  function DateInput(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onDocumentClick", function (e) {
      if (!_this.calendarContainer) return;
      var showOverlay = _this.state.showOverlay; // Closes overlay if user clicks outside the calendar (and input field)

      if (!_this.calendarContainer.contains(e.target) && showOverlay && e.target !== _this.input) {
        _this.closeOverlay();

        document.removeEventListener('click', _this.onDocumentClick);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFirstDayOfWeek", function () {
      var locale = _this.props.locale;
      return _moment["default"].localeData(locale).firstDayOfWeek();
    });

    _defineProperty(_assertThisInitialized(_this), "getTetherComponentAttachmentLocation", function () {
      var time = _this.props.time;

      var inputDimensions = _this.input && _this.input.getBoundingClientRect(); // Popup will open below the input by default


      var attachment = 'top center';

      if (inputDimensions) {
        /* If there's time inputs present, the popup will be slightly taller. Height has to be
        hard coded, because we cannot determine the height of the popup before we have opened it */
        var popupHeight = time ? DATETIME_POPUP_HEIGHT + 50 : DATETIME_POPUP_HEIGHT;
        var popupBottomY = popupHeight + inputDimensions.height + inputDimensions.y;
        var windowHeight = window.innerHeight; // Popup has no space to open below the input, so..

        if (windowHeight < popupBottomY) attachment = 'bottom center';
      }

      return attachment;
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFocus", function (e) {
      var onFocus = _this.props.inputProps.onFocus;

      _this.setState({
        showOverlay: true
      }, function () {
        // Delays the execution so that the dayPicker opens before selecting a day
        setTimeout(function () {
          var _this$state = _this.state,
              showOverlay = _this$state.showOverlay,
              selectedDay = _this$state.selectedDay;
          if (!showOverlay && _this.dayPicker && selectedDay) _this.dayPicker.showMonth(selectedDay);
        });
      });

      document.addEventListener('click', _this.onDocumentClick);
      if (onFocus) onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "closeOverlay", function (e) {
      _this.setState({
        showOverlay: false
      }, function () {
        var showOverlay = _this.state.showOverlay;
        var onBlur = _this.props.inputProps.onBlur;
        if (showOverlay) _this.input.focus();
        if (onBlur) onBlur(e);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (e) {
      var inputDate = e.target.value;
      var _this$props = _this.props,
          dateFormat = _this$props.dateFormat,
          inputProps = _this$props.inputProps,
          onChange = _this$props.onChange;

      _this.setState({
        inputDate: inputDate
      }); // This fires only if the new date is valid in given format


      if (_moment["default"].utc(inputDate, dateFormat).isValid() && _this.isValidFormat(inputDate)) {
        _this.setState({
          selectedDay: DateInput.getDate(inputDate, FORMATS.DATE_OBJECT, dateFormat)
        }, function () {
          var selectedDay = _this.state.selectedDay; // If dayPicker is open, we will show the correct month

          if (_this.dayPicker) _this.dayPicker.showMonth(selectedDay);
        });

        if (inputProps.onChange) {
          inputProps.onChange(DateInput.removeInvisibleChars(inputDate));
        } else {
          onChange(DateInput.getDate(inputDate, FORMATS.UTC, dateFormat));
        }
      } else {
        // If the value is invalid we reset the model value
        onChange(null);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (e) {
      var onBlur = _this.props.inputProps.onBlur;

      _this.prettifyInputDate(); // We want to close the overlay on blur, unless it was caused by a click on the calendar
      // overlay


      if (!_this.mouseClickedOnContainer) {
        _this.setState({
          showOverlay: false
        });
      }

      _this.mouseClickedOnContainer = false;
      if (onBlur) onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDayClick", function (day, modifiers) {
      if (modifiers === void 0) {
        modifiers = {};
      }

      if (modifiers.disabled) return;
      var _this$props2 = _this.props,
          dateFormat = _this$props2.dateFormat,
          formatDate = _this$props2.formatDate,
          value = _this$props2.value,
          time = _this$props2.time,
          onChange = _this$props2.onChange,
          onDayClick = _this$props2.onDayClick; // UTC day might differ from local date therefore UTC offset must be discounted.

      var momentDate = _moment["default"].utc((0, _moment["default"])(day).format('L'), 'L');

      var timeAdjustedDate = null;
      var currentMomentDate = (0, _moment["default"])(value, _moment["default"].ISO_8601).utc();
      var currentHours = currentMomentDate.get('hour');
      var currentMinutes = currentMomentDate.get('minute');

      if (time) {
        // Set current (previously selected) time to newly picked date
        timeAdjustedDate = momentDate.set('hour', currentHours).set('minute', currentMinutes);
      } else {
        // If we don't need to bother ourselves with an exact time,
        // we can set time to T00:00:00.000Z
        timeAdjustedDate = momentDate.startOf('day');
      }

      var inputDate = formatDate ? formatDate(timeAdjustedDate) : DateInput.getDate(timeAdjustedDate, FORMATS.PRETTY_DATE, dateFormat);

      _this.setState({
        selectedDay: day,
        showOverlay: false,
        inputDate: inputDate
      }, function () {
        onChange(DateInput.getDate(timeAdjustedDate, FORMATS.UTC, dateFormat));

        _this.input.blur();
      });

      onDayClick(day, modifiers);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTimePickerChange", function (newTime) {
      var _this$props3 = _this.props,
          dateFormat = _this$props3.dateFormat,
          formatDate = _this$props3.formatDate,
          value = _this$props3.value,
          onChange = _this$props3.onChange;

      var momentDate = _moment["default"].utc(value);

      momentDate = momentDate.hour(newTime.hour);
      momentDate = momentDate.minutes(newTime.minute);
      var inputDate = formatDate ? formatDate(value) : DateInput.getDate(momentDate, FORMATS.PRETTY_DATE, dateFormat);

      _this.setState({
        inputDate: inputDate
      }, function () {
        onChange(DateInput.getDate(momentDate, FORMATS.UTC, dateFormat));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearMonthChange", function (val) {
      var _this$props4 = _this.props,
          value = _this$props4.value,
          dateFormat = _this$props4.dateFormat,
          formatDate = _this$props4.formatDate,
          onChange = _this$props4.onChange;
      var momentDate = value ? _moment["default"].utc(value, _moment["default"].ISO_8601) : _moment["default"].utc();
      momentDate.year(val.getFullYear()).month(val.getMonth());
      var inputDate = formatDate ? formatDate(value) : DateInput.getDate(momentDate, FORMATS.PRETTY_DATE, dateFormat);

      _this.setState({
        inputDate: inputDate,
        selectedDay: DateInput.getDate(momentDate, FORMATS.DATE_OBJECT, dateFormat),
        dayPickerVisibleMonth: val
      }, function () {
        onChange(DateInput.getDate(momentDate, FORMATS.UTC, dateFormat));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnOverlayMouseDown", function (e) {
      if (_this.calendarContainer.contains(e.target)) {
        _this.mouseClickedOnContainer = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClearClick", function () {
      var onChange = _this.props.onChange;
      if (!onChange) throw new TypeError('react-datetime: onChange callback is not set');
      onChange('');
    });

    _defineProperty(_assertThisInitialized(_this), "isSameDay", function (day) {
      var selectedDay = _this.state.selectedDay;
      return _reactDayPicker.DateUtils.isSameDay(selectedDay, day);
    });

    _defineProperty(_assertThisInitialized(_this), "isValidFormat", function (date) {
      var time = _this.props.time;
      var pattern = /^\d{1,4}[.\-/]{1}\d{1,2}[.\-/]{1}\d{1,4}$/;

      if (time) {
        pattern = /^\d{1,4}[.\-/]{1}\d{1,2}[.\-/]{1}\d{1,4}\s{0,1}\d{0,2}([:.])?\d{0,2}$/;
      }

      return pattern.test(date.trim());
    });

    _defineProperty(_assertThisInitialized(_this), "prettifyInputDate", function () {
      var _this$props5 = _this.props,
          value = _this$props5.value,
          dateFormat = _this$props5.dateFormat,
          formatDate = _this$props5.formatDate;

      var momentDate = _moment["default"].utc(value, _moment["default"].ISO_8601);

      var inputDate = formatDate ? formatDate(value) : DateInput.getDate(momentDate, FORMATS.PRETTY_DATE, dateFormat);

      _this.setState({
        inputDate: inputDate
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCaptionElement", function (_ref) {
      var date = _ref.date;
      var locale = _this.props.locale;
      return _react["default"].createElement(_yearMonthPicker["default"], {
        date: date,
        onChange: _this.handleYearMonthChange,
        locale: locale
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderClearValueButton", function () {
      var disabled = _this.props.disabled;
      var className = classPrefix + "-clear-value" + (disabled ? ' disabled' : '');
      return _react["default"].createElement("button", {
        type: "button",
        className: className,
        onClick: _this.handleClearClick,
        disabled: disabled
      }, _react["default"].createElement("span", null, "x"));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateInput", function () {
      var _this$props6 = _this.props,
          _inputRef = _this$props6.inputRef,
          disabled = _this$props6.disabled,
          formatDate = _this$props6.formatDate,
          inputProps = _this$props6.inputProps,
          showClearValue = _this$props6.showClearValue,
          value = _this$props6.value;
      var inputDate = _this.state.inputDate;
      return _react["default"].createElement(_reactBootstrap.FormGroup, {
        className: classPrefix + "-input-container"
      }, _react["default"].createElement(_reactBootstrap.FormControl, _extends({
        type: "text",
        inputRef: function inputRef(el) {
          _this.input = el;

          _inputRef(el);
        },
        value: inputDate,
        disabled: disabled,
        readOnly: !!formatDate,
        autoComplete: "off"
      }, inputProps, {
        onChange: _this.handleInputChange,
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur
      })), showClearValue && value && _this.renderClearValueButton());
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendar", function () {
      var _this$props7 = _this.props,
          className = _this$props7.className,
          locale = _this$props7.locale,
          time = _this$props7.time,
          value = _this$props7.value,
          inputProps = _this$props7.inputProps,
          inputRef = _this$props7.inputRef,
          disabled = _this$props7.disabled,
          selectedDays = _this$props7.selectedDays,
          showWeekNumbers = _this$props7.showWeekNumbers,
          minutesInterval = _this$props7.minutesInterval,
          showClearValue = _this$props7.showClearValue,
          disabledDays = _this$props7.disabledDays,
          formatDate = _this$props7.formatDate,
          calendarType = _this$props7.calendarType,
          otherProps = _objectWithoutPropertiesLoose(_this$props7, ["className", "locale", "time", "value", "inputProps", "inputRef", "disabled", "selectedDays", "showWeekNumbers", "minutesInterval", "showClearValue", "disabledDays", "formatDate", "calendarType"]);

      var _this$state2 = _this.state,
          dayPickerVisibleMonth = _this$state2.dayPickerVisibleMonth,
          selectedDay = _this$state2.selectedDay;

      var momentDate = _moment["default"].utc(value, _moment["default"].ISO_8601);

      var timeObj = {
        hour: momentDate.hour(),
        minute: momentDate.minute()
      };
      var month = dayPickerVisibleMonth || (typeof selectedDay === 'string' ? undefined : selectedDay);
      return _react["default"].createElement("div", {
        role: "presentation",
        className: classPrefix + "-calendar",
        ref: function ref(el) {
          _this.calendarContainer = el;
        },
        onMouseDown: _this.handleOnOverlayMouseDown
      }, _react["default"].createElement(_reactDayPicker["default"], _extends({}, otherProps, {
        ref: function ref(el) {
          _this.dayPicker = el;
        },
        disabledDays: disabledDays,
        selectedDays: selectedDays || _this.isSameDay,
        localeUtils: _this.localeUtils,
        month: month,
        showWeekNumbers: showWeekNumbers,
        firstDayOfWeek: _this.getFirstDayOfWeek(),
        locale: locale,
        captionElement: _this.renderCaptionElement,
        navbarElement: _navbar["default"],
        onDayClick: _this.handleDayClick
      })), time && _react["default"].createElement(_timePicker["default"], {
        onChange: _this.handleTimePickerChange,
        time: timeObj,
        minutesInterval: minutesInterval
      }));
    });

    var _formatDate = props.formatDate,
        _value = props.value;

    var _momentDate = _moment["default"].utc(_value, _moment["default"].ISO_8601);

    _this.onDocumentClick = _this.onDocumentClick.bind(_assertThisInitialized(_this));

    var _inputDate = _formatDate ? _formatDate(_value) // inputDate: Prettified string shown in input field
    : DateInput.getDate(_momentDate, FORMATS.PRETTY_DATE, props.dateFormat);

    _this.state = {
      /* eslint-disable-next-line react/no-unused-state */
      lastValue: null,
      showOverlay: false,
      // selectedDay: Selected day in calendar (date object)
      selectedDay: DateInput.getDate(_momentDate, FORMATS.DATE_OBJECT, props.dateFormat),
      inputDate: _inputDate
    };
    _this.localeUtils = Object.assign(_moment2["default"], {
      getFirstDayOfWeek: function getFirstDayOfWeek() {
        return _moment["default"].localeData().firstDayOfWeek();
      }
    });
    _this.input = null;
    _this.dayPicker = null; // Used in onBlur handler to determine whether or not blur happened because of a click
    // on the overlay

    _this.mouseClickedOnContainer = false;
    return _this;
  }

  var _proto = DateInput.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }
  /**
   * Fires every time dayPicker is open and document is clicked
   * @param e
   */
  ;

  _proto.render = function render() {
    var _this$props8 = this.props,
        className = _this$props8.className,
        calendarType = _this$props8.calendarType;
    var showOverlay = this.state.showOverlay;

    if (calendarType === 'popup') {
      return _react["default"].createElement(_reactTether["default"], {
        attachment: this.getTetherComponentAttachmentLocation(),
        constraints: [{
          to: 'scrollParent',
          pin: ['top']
        }, {
          to: 'window',
          attachment: 'together'
        }],
        className: classPrefix + " " + className + " " + classPrefix + "-popup-container"
      }, this.renderDateInput(), showOverlay && this.renderCalendar());
    }

    return _react["default"].createElement("div", null, this.renderDateInput(), _react["default"].createElement("div", {
      className: classPrefix + " " + className + " " + classPrefix + "-static-container"
    }, this.renderCalendar()));
  };

  return DateInput;
}(_react["default"].Component);

exports["default"] = DateInput;

_defineProperty(DateInput, "removeInvisibleChars", function (str) {
  return str.replace(/\u200E/g, '');
});

_defineProperty(DateInput, "defaultProps", {
  className: '',
  value: '',
  dateFormat: 'L',
  formatDate: undefined,
  locale: 'en-GB',
  onChange: function onChange() {},
  onDayClick: function onDayClick() {},
  inputProps: {},
  inputRef: function inputRef() {},
  disabled: false,
  selectedDays: null,
  disabledDays: null,
  showOverlay: false,
  showWeekNumbers: true,
  showClearValue: true,
  time: false,
  minutesInterval: 5,
  calendarType: 'popup'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlLWlucHV0LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiRk9STUFUUyIsIlVUQyIsIlBSRVRUWV9EQVRFIiwiREFURV9PQkpFQ1QiLCJEQVRFVElNRV9QT1BVUF9IRUlHSFQiLCJjbGFzc1ByZWZpeCIsIkRhdGVJbnB1dCIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsInByb3BzIiwic3RhdGUiLCJmb3JtYXREYXRlIiwidmFsdWUiLCJzaG93T3ZlcmxheSIsImxhc3RWYWx1ZSIsIm1vbWVudERhdGUiLCJtb21lbnQiLCJ1dGMiLCJJU09fODYwMSIsImlucHV0RGF0ZSIsImdldERhdGUiLCJkYXRlRm9ybWF0Iiwic2VsZWN0ZWREYXkiLCJkYXRlIiwidHlwZSIsImlzVmFsaWQiLCJyZW1vdmVJbnZpc2libGVDaGFycyIsImZvcm1hdCIsInRvSVNPU3RyaW5nIiwiRGF0ZSIsImUiLCJjYWxlbmRhckNvbnRhaW5lciIsImNvbnRhaW5zIiwidGFyZ2V0IiwiaW5wdXQiLCJjbG9zZU92ZXJsYXkiLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJsb2NhbGUiLCJsb2NhbGVEYXRhIiwiZmlyc3REYXlPZldlZWsiLCJ0aW1lIiwiaW5wdXREaW1lbnNpb25zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYXR0YWNobWVudCIsInBvcHVwSGVpZ2h0IiwicG9wdXBCb3R0b21ZIiwiaGVpZ2h0IiwieSIsIndpbmRvd0hlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0Iiwib25Gb2N1cyIsImlucHV0UHJvcHMiLCJzZXRTdGF0ZSIsInNldFRpbWVvdXQiLCJkYXlQaWNrZXIiLCJzaG93TW9udGgiLCJhZGRFdmVudExpc3RlbmVyIiwib25CbHVyIiwiZm9jdXMiLCJvbkNoYW5nZSIsImlzVmFsaWRGb3JtYXQiLCJwcmV0dGlmeUlucHV0RGF0ZSIsIm1vdXNlQ2xpY2tlZE9uQ29udGFpbmVyIiwiZGF5IiwibW9kaWZpZXJzIiwiZGlzYWJsZWQiLCJvbkRheUNsaWNrIiwidGltZUFkanVzdGVkRGF0ZSIsImN1cnJlbnRNb21lbnREYXRlIiwiY3VycmVudEhvdXJzIiwiZ2V0IiwiY3VycmVudE1pbnV0ZXMiLCJzZXQiLCJzdGFydE9mIiwiYmx1ciIsIm5ld1RpbWUiLCJob3VyIiwibWludXRlcyIsIm1pbnV0ZSIsInZhbCIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXlQaWNrZXJWaXNpYmxlTW9udGgiLCJUeXBlRXJyb3IiLCJEYXRlVXRpbHMiLCJpc1NhbWVEYXkiLCJwYXR0ZXJuIiwidGVzdCIsInRyaW0iLCJoYW5kbGVZZWFyTW9udGhDaGFuZ2UiLCJjbGFzc05hbWUiLCJoYW5kbGVDbGVhckNsaWNrIiwiaW5wdXRSZWYiLCJzaG93Q2xlYXJWYWx1ZSIsImVsIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJoYW5kbGVJbnB1dEZvY3VzIiwiaGFuZGxlSW5wdXRCbHVyIiwicmVuZGVyQ2xlYXJWYWx1ZUJ1dHRvbiIsInNlbGVjdGVkRGF5cyIsInNob3dXZWVrTnVtYmVycyIsIm1pbnV0ZXNJbnRlcnZhbCIsImRpc2FibGVkRGF5cyIsImNhbGVuZGFyVHlwZSIsIm90aGVyUHJvcHMiLCJ0aW1lT2JqIiwidW5kZWZpbmVkIiwiaGFuZGxlT25PdmVybGF5TW91c2VEb3duIiwibG9jYWxlVXRpbHMiLCJnZXRGaXJzdERheU9mV2VlayIsInJlbmRlckNhcHRpb25FbGVtZW50IiwiTmF2YmFyIiwiaGFuZGxlRGF5Q2xpY2siLCJoYW5kbGVUaW1lUGlja2VyQ2hhbmdlIiwiYmluZCIsIk9iamVjdCIsImFzc2lnbiIsIkxvY2FsZVV0aWxzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJnZXRUZXRoZXJDb21wb25lbnRBdHRhY2htZW50TG9jYXRpb24iLCJ0byIsInBpbiIsInJlbmRlckRhdGVJbnB1dCIsInJlbmRlckNhbGVuZGFyIiwiUmVhY3QiLCJDb21wb25l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LEVBQUFBLFVBQVUsRUFBRSxHQUhRO0FBSXBCVixFQUFBQSxVQUFVLEVBQUVvRyxTQUpRO0FBS3BCeEUsRUFBQUEsTUFBTSxFQUFFLE9BTFk7QUFNcEJ1QixFQUFBQSxRQU5vQixzQkFNVCxDQUFFLENBTk87QUFPcEJPLEVBQUFBLFVBQVUsRUFBRSxzQkFBTSxDQUFFLENBUEE7QUFRcEJmLEVBQUFBLFVBQVUsRUFBRSxFQVJRO0FBU3BCMkMsRUFBQUEsUUFUb0Isc0JBU1QsQ0FBRSxDQVRPO0FBVXBCN0IsRUFBQUEsUUFBUSxFQUFFLEtBVlU7QUFXcEJvQyxFQUFBQSxZQUFZLEVBQUUsSUFYTTtBQVlwQkcsRUFBQUEsWUFBWSxFQUFFLElBWk07QUFhcEI5RixFQUFBQSxXQUFXLEVBQUUsS0FiTztBQWNwQjRGLEVBQUFBLGVBQWUsRUFBRSxJQWRHO0FBZXBCUCxFQUFBQSxjQUFjLEVBQUUsSUFmSTtBQWdCcEJ4RCxFQUFBQSxJQUFJLEVBQUUsS0FoQmM7QUFpQnBCZ0UsRUFBQUEsZUFBZSxFQUFFLENBakJHO0FBa0JwQkUsRUFBQUEsWUFBWSxFQUFFO0FBbEJNLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBEYXlQaWNrZXIsIHsgRGF0ZVV0aWxzIH0gZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XG5pbXBvcnQgTG9jYWxlVXRpbHMgZnJvbSAncmVhY3QtZGF5LXBpY2tlci9tb21lbnQnO1xuaW1wb3J0IFRldGhlckNvbXBvbmVudCBmcm9tICdyZWFjdC10ZXRoZXInO1xuaW1wb3J0ICdyZWFjdC1kYXktcGlja2VyL2xpYi9zdHlsZS5jc3MnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IFRpbWVQaWNrZXIgZnJvbSAnLi90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IFllYXJNb250aFBpY2tlciBmcm9tICcuL3llYXItbW9udGgtcGlja2VyL3llYXItbW9udGgtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4vbmF2YmFyL25hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0ICcuL2RhdGUtaW5wdXQuc2Nzcyc7XG5cbi8vIERhdGUgZm9ybWF0cyB1c2VkIGJ5IHRoZSBjb21wb25lbnQgKG1haW5seSBieSB0aGUgZ2V0RGF0ZSBtZXRob2QpXG5jb25zdCBGT1JNQVRTID0ge1xuICBVVEM6ICdVVEMnLFxuICBQUkVUVFlfREFURTogJ1BSRVRUWV9EQVRFJyxcbiAgREFURV9PQkpFQ1Q6ICdEQVRFX09CSkVDVCcsXG59O1xuXG4vLyBVc2VkIGluIGdldFRldGhlckNvbXBvbmVudEF0dGFjaG1lbnRMb2NhdGlvbiBmblxuY29uc3QgREFURVRJTUVfUE9QVVBfSEVJR0hUID0gMjAwO1xuY29uc3QgY2xhc3NQcmVmaXggPSAnb2MtZGF0ZXRpbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcmVtb3ZlSW52aXNpYmxlQ2hhcnMgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvXFx1MjAwRS9nLCAnJyk7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvcm1hdERhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5wdXRSZWY6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERheXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5vYmplY3QsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgICBkaXNhYmxlZERheXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5vYmplY3QsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgICBzaG93T3ZlcmxheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Q2xlYXJWYWx1ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWludXRlc0ludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGNhbGVuZGFyVHlwZTogUHJvcFR5cGVzLm9uZU9mKFsncG9wdXAnLCAnc3RhdGljJ10pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB2YWx1ZTogJycsXG4gICAgZGF0ZUZvcm1hdDogJ0wnLFxuICAgIGZvcm1hdERhdGU6IHVuZGVmaW5lZCxcbiAgICBsb2NhbGU6ICdlbi1HQicsXG4gICAgb25DaGFuZ2UoKSB7fSxcbiAgICBvbkRheUNsaWNrOiAoKSA9PiB7fSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBpbnB1dFJlZigpIHt9LFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzZWxlY3RlZERheXM6IG51bGwsXG4gICAgZGlzYWJsZWREYXlzOiBudWxsLFxuICAgIHNob3dPdmVybGF5OiBmYWxzZSxcbiAgICBzaG93V2Vla051bWJlcnM6IHRydWUsXG4gICAgc2hvd0NsZWFyVmFsdWU6IHRydWUsXG4gICAgdGltZTogZmFsc2UsXG4gICAgbWludXRlc0ludGVydmFsOiA1LFxuICAgIGNhbGVuZGFyVHlwZTogJ3BvcHVwJyxcbiAgfTtcblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIGNvbnN0IHsgZm9ybWF0RGF0ZSwgdmFsdWUgfSA9IHByb3BzO1xuICAgIGlmICghc3RhdGUuc2hvd092ZXJsYXkgJiYgdmFsdWUgIT09IHN0YXRlLmxhc3RWYWx1ZSkge1xuICAgICAgY29uc3QgbW9tZW50RGF0ZSA9IG1vbWVudC51dGModmFsdWUsIG1vbWVudC5JU09fODYwMSk7XG4gICAgICBjb25zdCBpbnB1dERhdGUgPSBmb3JtYXREYXRlXG4gICAgICAgID8gZm9ybWF0RGF0ZSh2YWx1ZSlcbiAgICAgICAgOiBEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLlBSRVRUWV9EQVRFLCBwcm9wcy5kYXRlRm9ybWF0KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhc3RWYWx1ZTogdmFsdWUsXG4gICAgICAgIHNlbGVjdGVkRGF5OiBEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLkRBVEVfT0JKRUNUKSxcbiAgICAgICAgc2hvd092ZXJsYXk6IHByb3BzLnNob3dPdmVybGF5IHx8IHN0YXRlLnNob3dPdmVybGF5LFxuICAgICAgICBpbnB1dERhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBnaXZlbiBkYXRlIGludG8gd2FudGVkIHR5cGUgKHN0cmluZy9kYXRlIG9iamVjdClcbiAgICogQHBhcmFtIGRhdGUgLSB7c3RyaW5nLCBtb21lbnQgb2JqZWN0fVxuICAgKiBAcGFyYW0gdHlwZSAtIHtzdHJpbmcsIGRhdGUgb2JqZWN0fSB0eXBlIG9mIHRoZSByZXR1cm4gdmFsdWVcbiAgICogQHBhcmFtIGRhdGVGb3JtYXQge3N0cmluZ30gZGF0ZSBmb3JtYXQsIGRlZmF1bHRzIHRvICdNL0QvWVlZWSdcbiAgICogKCdNL0QvWVlZWScgaDptbSB3aGVuIHVzaW5nIERhdGVUaW1lKVxuICAgKiAqIEByZXR1cm5zIHtzdHJpbmcsIGRhdGV9XG4gICAqL1xuICBzdGF0aWMgZ2V0RGF0ZShkYXRlLCB0eXBlLCBkYXRlRm9ybWF0KSB7XG4gICAgY29uc3QgbW9tZW50RGF0ZSA9IHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IG1vbWVudC51dGMoZGF0ZSwgZGF0ZUZvcm1hdCkgOiBkYXRlO1xuICAgIGlmICghbW9tZW50RGF0ZS5pc1ZhbGlkKCkgfHwgIWRhdGUpIHJldHVybiAnJztcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRk9STUFUUy5QUkVUVFlfREFURTpcbiAgICAgICAgcmV0dXJuIERhdGVJbnB1dC5yZW1vdmVJbnZpc2libGVDaGFycyhtb21lbnREYXRlLmZvcm1hdChkYXRlRm9ybWF0KSk7XG4gICAgICBjYXNlIEZPUk1BVFMuVVRDOlxuICAgICAgICByZXR1cm4gRGF0ZUlucHV0LnJlbW92ZUludmlzaWJsZUNoYXJzKG1vbWVudERhdGUudG9JU09TdHJpbmcoKSk7XG4gICAgICBjYXNlIEZPUk1BVFMuREFURV9PQkpFQ1Q6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBVVEMgZGF5IG1pZ2h0IGRpZmZlciBmcm9tIGxvY2FsIGRheSwgdGhlcmVmb3JlIFVUQyBvZmZzZXRcbiAgICAgICAgLy8gbXVzdCBiZSBkaXNjb3VudGVkLlxuICAgICAgICByZXR1cm4gbmV3IERhdGUobW9tZW50KG1vbWVudERhdGUuZm9ybWF0KCdMJyksICdMJykpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgeyBmb3JtYXREYXRlLCB2YWx1ZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgbW9tZW50RGF0ZSA9IG1vbWVudC51dGModmFsdWUsIG1vbWVudC5JU09fODYwMSk7XG4gICAgdGhpcy5vbkRvY3VtZW50Q2xpY2sgPSB0aGlzLm9uRG9jdW1lbnRDbGljay5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGlucHV0RGF0ZSA9IGZvcm1hdERhdGVcbiAgICAgID8gZm9ybWF0RGF0ZSh2YWx1ZSlcbiAgICAgIC8vIGlucHV0RGF0ZTogUHJldHRpZmllZCBzdHJpbmcgc2hvd24gaW4gaW5wdXQgZmllbGRcbiAgICAgIDogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5QUkVUVFlfREFURSwgcHJvcHMuZGF0ZUZvcm1hdCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuICAgICAgbGFzdFZhbHVlOiBudWxsLFxuICAgICAgc2hvd092ZXJsYXk6IGZhbHNlLFxuICAgICAgLy8gc2VsZWN0ZWREYXk6IFNlbGVjdGVkIGRheSBpbiBjYWxlbmRhciAoZGF0ZSBvYmplY3QpXG4gICAgICBzZWxlY3RlZERheTogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5EQVRFX09CSkVDVCwgcHJvcHMuZGF0ZUZvcm1hdCksXG4gICAgICBpbnB1dERhdGUsXG4gICAgfTtcblxuICAgIHRoaXMubG9jYWxlVXRpbHMgPSBPYmplY3QuYXNzaWduKExvY2FsZVV0aWxzLCB7XG4gICAgICBnZXRGaXJzdERheU9mV2VlazogKCkgPT4gbW9tZW50LmxvY2FsZURhdGEoKS5maXJzdERheU9mV2VlaygpLFxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5kYXlQaWNrZXIgPSBudWxsO1xuXG4gICAgLy8gVXNlZCBpbiBvbkJsdXIgaGFuZGxlciB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgYmx1ciBoYXBwZW5lZCBiZWNhdXNlIG9mIGEgY2xpY2tcbiAgICAvLyBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMubW91c2VDbGlja2VkT25Db250YWluZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGV2ZXJ5IHRpbWUgZGF5UGlja2VyIGlzIG9wZW4gYW5kIGRvY3VtZW50IGlzIGNsaWNrZWRcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIG9uRG9jdW1lbnRDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLmNhbGVuZGFyQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCB7IHNob3dPdmVybGF5IH0gPSB0aGlzLnN0YXRlO1xuICAgIC8vIENsb3NlcyBvdmVybGF5IGlmIHVzZXIgY2xpY2tzIG91dHNpZGUgdGhlIGNhbGVuZGFyIChhbmQgaW5wdXQgZmllbGQpXG4gICAgaWYgKFxuICAgICAgIXRoaXMuY2FsZW5kYXJDb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpXG4gICAgICAmJiBzaG93T3ZlcmxheVxuICAgICAgJiYgZS50YXJnZXQgIT09IHRoaXMuaW5wdXRcbiAgICApIHtcbiAgICAgIHRoaXMuY2xvc2VPdmVybGF5KCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3Qgb2YgdGhlIHdlZWsgYmFzZWQgb24gbG9jYWxlICh1c2VkIGJ5IERheVBpY2tlcilcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldEZpcnN0RGF5T2ZXZWVrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpLmZpcnN0RGF5T2ZXZWVrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCBwb3B1cCBoYXMgc3BhY2UgdG8gb3BlbiBiZWxvdyB0aGUgaW5wdXQgZmllbGRcbiAgICogQHJldHVybnMge3N0cmluZ30gLSBhbiBcImFuY2hvciBwb2ludFwiIGluIGlucHV0IGVsZW1lbnRcbiAgICovXG4gIGdldFRldGhlckNvbXBvbmVudEF0dGFjaG1lbnRMb2NhdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5wdXREaW1lbnNpb25zID0gdGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gUG9wdXAgd2lsbCBvcGVuIGJlbG93IHRoZSBpbnB1dCBieSBkZWZhdWx0XG4gICAgbGV0IGF0dGFjaG1lbnQgPSAndG9wIGNlbnRlcic7XG5cbiAgICBpZiAoaW5wdXREaW1lbnNpb25zKSB7XG4gICAgICAvKiBJZiB0aGVyZSdzIHRpbWUgaW5wdXRzIHByZXNlbnQsIHRoZSBwb3B1cCB3aWxsIGJlIHNsaWdodGx5IHRhbGxlci4gSGVpZ2h0IGhhcyB0byBiZVxuICAgICAgaGFyZCBjb2RlZCwgYmVjYXVzZSB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZWlnaHQgb2YgdGhlIHBvcHVwIGJlZm9yZSB3ZSBoYXZlIG9wZW5lZCBpdCAqL1xuICAgICAgY29uc3QgcG9wdXBIZWlnaHQgPSB0aW1lID8gREFURVRJTUVfUE9QVVBfSEVJR0hUICsgNTAgOiBEQVRFVElNRV9QT1BVUF9IRUlHSFQ7XG4gICAgICBjb25zdCBwb3B1cEJvdHRvbVkgPSBwb3B1cEhlaWdodCArIGlucHV0RGltZW5zaW9ucy5oZWlnaHQgKyBpbnB1dERpbWVuc2lvbnMueTtcbiAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgLy8gUG9wdXAgaGFzIG5vIHNwYWNlIHRvIG9wZW4gYmVsb3cgdGhlIGlucHV0LCBzby4uXG4gICAgICBpZiAod2luZG93SGVpZ2h0IDwgcG9wdXBCb3R0b21ZKSBhdHRhY2htZW50ID0gJ2JvdHRvbSBjZW50ZXInO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRhY2htZW50O1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGlucHV0IGZvY3VzIGV2ZW50LiBTaG93cyBhbiBvdmVybGF5IGFuZCBhZGRzIGFuIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBkb2N1bWVudFxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgaGFuZGxlSW5wdXRGb2N1cyA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBpbnB1dFByb3BzOiB7IG9uRm9jdXMgfSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93T3ZlcmxheTogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICAvLyBEZWxheXMgdGhlIGV4ZWN1dGlvbiBzbyB0aGF0IHRoZSBkYXlQaWNrZXIgb3BlbnMgYmVmb3JlIHNlbGVjdGluZyBhIGRheVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2hvd092ZXJsYXksIHNlbGVjdGVkRGF5IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoIXNob3dPdmVybGF5ICYmIHRoaXMuZGF5UGlja2VyICYmIHNlbGVjdGVkRGF5KSB0aGlzLmRheVBpY2tlci5zaG93TW9udGgoc2VsZWN0ZWREYXkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICBpZiAob25Gb2N1cykgb25Gb2N1cyhlKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIG92ZXJsYXkuIENhbGxlZCBmcm9tIG9uRG9jdW1lbnRDbGljay5cbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGNsb3NlT3ZlcmxheSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dPdmVybGF5OiBmYWxzZSB9LCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHNob3dPdmVybGF5IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgeyBpbnB1dFByb3BzOiB7IG9uQmx1ciB9IH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHNob3dPdmVybGF5KSB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICBpZiAob25CbHVyKSBvbkJsdXIoZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgaW5wdXQgY2hhbmdlLCBjaGVja3MgdmFsaWRpdHkgYW5kIHVwZGF0ZXMgbW9kZWwgdmFsdWUgYW5kIHRoZSBkYXkgcGlja2VyXG4gICAqIEBwYXJhbSBlIHtldmVudH1cbiAgICovXG4gIGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQsIGlucHV0UHJvcHMsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0RGF0ZSB9KTtcbiAgICAvLyBUaGlzIGZpcmVzIG9ubHkgaWYgdGhlIG5ldyBkYXRlIGlzIHZhbGlkIGluIGdpdmVuIGZvcm1hdFxuICAgIGlmIChtb21lbnQudXRjKGlucHV0RGF0ZSwgZGF0ZUZvcm1hdCkuaXNWYWxpZCgpICYmIHRoaXMuaXNWYWxpZEZvcm1hdChpbnB1dERhdGUpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWREYXk6IERhdGVJbnB1dC5nZXREYXRlKGlucHV0RGF0ZSwgRk9STUFUUy5EQVRFX09CSkVDVCwgZGF0ZUZvcm1hdCksXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGVkRGF5IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgIC8vIElmIGRheVBpY2tlciBpcyBvcGVuLCB3ZSB3aWxsIHNob3cgdGhlIGNvcnJlY3QgbW9udGhcbiAgICAgICAgICBpZiAodGhpcy5kYXlQaWNrZXIpIHRoaXMuZGF5UGlja2VyLnNob3dNb250aChzZWxlY3RlZERheSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgaWYgKGlucHV0UHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgaW5wdXRQcm9wcy5vbkNoYW5nZShEYXRlSW5wdXQucmVtb3ZlSW52aXNpYmxlQ2hhcnMoaW5wdXREYXRlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShEYXRlSW5wdXQuZ2V0RGF0ZShpbnB1dERhdGUsIEZPUk1BVFMuVVRDLCBkYXRlRm9ybWF0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBpbnZhbGlkIHdlIHJlc2V0IHRoZSBtb2RlbCB2YWx1ZVxuICAgICAgb25DaGFuZ2UobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUlucHV0Qmx1ciA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBpbnB1dFByb3BzOiB7IG9uQmx1ciB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJldHRpZnlJbnB1dERhdGUoKTtcblxuICAgIC8vIFdlIHdhbnQgdG8gY2xvc2UgdGhlIG92ZXJsYXkgb24gYmx1ciwgdW5sZXNzIGl0IHdhcyBjYXVzZWQgYnkgYSBjbGljayBvbiB0aGUgY2FsZW5kYXJcbiAgICAvLyBvdmVybGF5XG4gICAgaWYgKCF0aGlzLm1vdXNlQ2xpY2tlZE9uQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd092ZXJsYXk6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMubW91c2VDbGlja2VkT25Db250YWluZXIgPSBmYWxzZTtcbiAgICBpZiAob25CbHVyKSBvbkJsdXIoZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgZGF5UGlja2VyIGNsaWNrXG4gICAqIEBwYXJhbSBkYXkge2RhdGV9XG4gICAqL1xuICBoYW5kbGVEYXlDbGljayA9IChkYXksIG1vZGlmaWVycyA9IHt9KSA9PiB7XG4gICAgaWYgKG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgY29uc3Qge1xuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIGZvcm1hdERhdGUsXG4gICAgICB2YWx1ZSxcbiAgICAgIHRpbWUsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIG9uRGF5Q2xpY2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gVVRDIGRheSBtaWdodCBkaWZmZXIgZnJvbSBsb2NhbCBkYXRlIHRoZXJlZm9yZSBVVEMgb2Zmc2V0IG11c3QgYmUgZGlzY291bnRlZC5cbiAgICBjb25zdCBtb21lbnREYXRlID0gbW9tZW50LnV0Yyhtb21lbnQoZGF5KS5mb3JtYXQoJ0wnKSwgJ0wnKTtcbiAgICBsZXQgdGltZUFkanVzdGVkRGF0ZSA9IG51bGw7XG4gICAgY29uc3QgY3VycmVudE1vbWVudERhdGUgPSBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkudXRjKCk7XG4gICAgY29uc3QgY3VycmVudEhvdXJzID0gY3VycmVudE1vbWVudERhdGUuZ2V0KCdob3VyJyk7XG4gICAgY29uc3QgY3VycmVudE1pbnV0ZXMgPSBjdXJyZW50TW9tZW50RGF0ZS5nZXQoJ21pbnV0ZScpO1xuXG4gICAgaWYgKHRpbWUpIHtcbiAgICAgIC8vIFNldCBjdXJyZW50IChwcmV2aW91c2x5IHNlbGVjdGVkKSB0aW1lIHRvIG5ld2x5IHBpY2tlZCBkYXRlXG4gICAgICB0aW1lQWRqdXN0ZWREYXRlID0gbW9tZW50RGF0ZS5zZXQoJ2hvdXInLCBjdXJyZW50SG91cnMpLnNldCgnbWludXRlJywgY3VycmVudE1pbnV0ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBkb24ndCBuZWVkIHRvIGJvdGhlciBvdXJzZWx2ZXMgd2l0aCBhbiBleGFjdCB0aW1lLFxuICAgICAgLy8gd2UgY2FuIHNldCB0aW1lIHRvIFQwMDowMDowMC4wMDBaXG4gICAgICB0aW1lQWRqdXN0ZWREYXRlID0gbW9tZW50RGF0ZS5zdGFydE9mKCdkYXknKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dERhdGUgPSBmb3JtYXREYXRlXG4gICAgICA/IGZvcm1hdERhdGUodGltZUFkanVzdGVkRGF0ZSlcbiAgICAgIDogRGF0ZUlucHV0LmdldERhdGUodGltZUFkanVzdGVkRGF0ZSwgRk9STUFUUy5QUkVUVFlfREFURSwgZGF0ZUZvcm1hdCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkRGF5OiBkYXksXG4gICAgICBzaG93T3ZlcmxheTogZmFsc2UsXG4gICAgICBpbnB1dERhdGUsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgb25DaGFuZ2UoRGF0ZUlucHV0LmdldERhdGUodGltZUFkanVzdGVkRGF0ZSwgRk9STUFUUy5VVEMsIGRhdGVGb3JtYXQpKTtcbiAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgIH0pO1xuXG4gICAgb25EYXlDbGljayhkYXksIG1vZGlmaWVycyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGltZSBwaWNrZXIgKHNlbGVjdCBib3hlcykgY2hhbmdlXG4gICAqIEBwYXJhbSBuZXdUaW1lXG4gICAqL1xuICBoYW5kbGVUaW1lUGlja2VyQ2hhbmdlID0gKG5ld1RpbWUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgZm9ybWF0RGF0ZSxcbiAgICAgIHZhbHVlLFxuICAgICAgb25DaGFuZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG1vbWVudERhdGUgPSBtb21lbnQudXRjKHZhbHVlKTtcbiAgICBtb21lbnREYXRlID0gbW9tZW50RGF0ZS5ob3VyKG5ld1RpbWUuaG91cik7XG4gICAgbW9tZW50RGF0ZSA9IG1vbWVudERhdGUubWludXRlcyhuZXdUaW1lLm1pbnV0ZSk7XG4gICAgY29uc3QgaW5wdXREYXRlID0gZm9ybWF0RGF0ZVxuICAgICAgPyBmb3JtYXREYXRlKHZhbHVlKVxuICAgICAgOiBEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLlBSRVRUWV9EQVRFLCBkYXRlRm9ybWF0KTtcbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXREYXRlIH0sICgpID0+IHtcbiAgICAgIG9uQ2hhbmdlKERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuVVRDLCBkYXRlRm9ybWF0KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgeWVhci1tb250aCBwaWNrZXIgKHNlbGVjdCBib3hlcykgY2hhbmdlXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqL1xuICBoYW5kbGVZZWFyTW9udGhDaGFuZ2UgPSAodmFsKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgZm9ybWF0RGF0ZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1vbWVudERhdGUgPSB2YWx1ZSA/IG1vbWVudC51dGModmFsdWUsIG1vbWVudC5JU09fODYwMSkgOiBtb21lbnQudXRjKCk7XG5cbiAgICBtb21lbnREYXRlLnllYXIodmFsLmdldEZ1bGxZZWFyKCkpLm1vbnRoKHZhbC5nZXRNb250aCgpKTtcbiAgICBjb25zdCBpbnB1dERhdGUgPSBmb3JtYXREYXRlXG4gICAgICA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICA6IERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuUFJFVFRZX0RBVEUsIGRhdGVGb3JtYXQpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dERhdGUsXG4gICAgICBzZWxlY3RlZERheTogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5EQVRFX09CSkVDVCwgZGF0ZUZvcm1hdCksXG4gICAgICBkYXlQaWNrZXJWaXNpYmxlTW9udGg6IHZhbCxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBvbkNoYW5nZShEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLlVUQywgZGF0ZUZvcm1hdCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgY2xpY2sgb24gdGhlIG92ZXJsYXlcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGhhbmRsZU9uT3ZlcmxheU1vdXNlRG93biA9IChlKSA9PiB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXJDb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICB0aGlzLm1vdXNlQ2xpY2tlZE9uQ29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgaGFuZGxlQ2xlYXJDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25DaGFuZ2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlYWN0LWRhdGV0aW1lOiBvbkNoYW5nZSBjYWxsYmFjayBpcyBub3Qgc2V0Jyk7XG4gICAgb25DaGFuZ2UoJycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3Qgc2VsZWN0ZWQgZGF5IGlzIHNhbWUgYXMgYSBkYXkgaW4gY2FsZW5kYXJcbiAgICogVXNlZCBieSBkYXlQaWNrZXJcbiAgICogQHBhcmFtIGRheSB7ZGF0ZX1cbiAgICovXG4gIGlzU2FtZURheSA9IChkYXkpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkRGF5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBEYXRlVXRpbHMuaXNTYW1lRGF5KHNlbGVjdGVkRGF5LCBkYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBnaXZlbiBpcyB2YWxpZCBmb3JtYXQgd2lzZS4gVXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIG1vbWVudCdzIGlzVmFsaWQgbWV0aG9kXG4gICAqIEEgbGl0dGxlIGxlc3Mgc3RyaWN0IHRoYW4gbW9tZW50J3MgaXNWYWxpZCB3aXRoIHN0cmljdCBtb2RlIGVuYWJsZWRcbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc1ZhbGlkRm9ybWF0ID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHBhdHRlcm4gPSAvXlxcZHsxLDR9Wy5cXC0vXXsxfVxcZHsxLDJ9Wy5cXC0vXXsxfVxcZHsxLDR9JC87XG4gICAgaWYgKHRpbWUpIHtcbiAgICAgIHBhdHRlcm4gPSAvXlxcZHsxLDR9Wy5cXC0vXXsxfVxcZHsxLDJ9Wy5cXC0vXXsxfVxcZHsxLDR9XFxzezAsMX1cXGR7MCwyfShbOi5dKT9cXGR7MCwyfSQvO1xuICAgIH1cbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KGRhdGUudHJpbSgpKTtcbiAgfTtcblxuICBwcmV0dGlmeUlucHV0RGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHZhbHVlLCBkYXRlRm9ybWF0LCBmb3JtYXREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1vbWVudERhdGUgPSBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpO1xuICAgIGNvbnN0IGlucHV0RGF0ZSA9IGZvcm1hdERhdGVcbiAgICAgID8gZm9ybWF0RGF0ZSh2YWx1ZSlcbiAgICAgIDogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5QUkVUVFlfREFURSwgZGF0ZUZvcm1hdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0RGF0ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyBzZWxlY3QgYm94ZXMgYWJvdmUgdGhlIGNhbGVuZGFyXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgcmVuZGVyQ2FwdGlvbkVsZW1lbnQgPSAoeyBkYXRlIH0pID0+IHtcbiAgICBjb25zdCB7IGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFllYXJNb250aFBpY2tlclxuICAgICAgICBkYXRlPXtkYXRlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVZZWFyTW9udGhDaGFuZ2V9XG4gICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ2xlYXJWYWx1ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRpc2FibGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke2NsYXNzUHJlZml4fS1jbGVhci12YWx1ZSR7ZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsZWFyQ2xpY2t9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4+eDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaW5wdXRSZWYsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIGZvcm1hdERhdGUsXG4gICAgICBpbnB1dFByb3BzLFxuICAgICAgc2hvd0NsZWFyVmFsdWUsXG4gICAgICB2YWx1ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBpbnB1dERhdGUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtR3JvdXAgY2xhc3NOYW1lPXtgJHtjbGFzc1ByZWZpeH0taW5wdXQtY29udGFpbmVyYH0+XG4gICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpbnB1dFJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gZWw7XG4gICAgICAgICAgICBpbnB1dFJlZihlbCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB2YWx1ZT17aW5wdXREYXRlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICByZWFkT25seT17ISFmb3JtYXREYXRlfVxuICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgey4uLmlucHV0UHJvcHN9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVJbnB1dEJsdXJ9XG4gICAgICAgIC8+XG4gICAgICAgIHtzaG93Q2xlYXJWYWx1ZSAmJiB2YWx1ZSAmJiB0aGlzLnJlbmRlckNsZWFyVmFsdWVCdXR0b24oKX1cbiAgICAgIDwvRm9ybUdyb3VwPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDYWxlbmRhciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBsb2NhbGUsXG4gICAgICB0aW1lLFxuICAgICAgdmFsdWUsXG4gICAgICBpbnB1dFByb3BzLFxuICAgICAgaW5wdXRSZWYsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHNlbGVjdGVkRGF5cyxcbiAgICAgIHNob3dXZWVrTnVtYmVycyxcbiAgICAgIG1pbnV0ZXNJbnRlcnZhbCxcbiAgICAgIHNob3dDbGVhclZhbHVlLFxuICAgICAgZGlzYWJsZWREYXlzLFxuICAgICAgZm9ybWF0RGF0ZSxcbiAgICAgIGNhbGVuZGFyVHlwZSxcbiAgICAgIC4uLm90aGVyUHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBkYXlQaWNrZXJWaXNpYmxlTW9udGgsXG4gICAgICBzZWxlY3RlZERheSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBtb21lbnREYXRlID0gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxKTtcbiAgICBjb25zdCB0aW1lT2JqID0ge1xuICAgICAgaG91cjogbW9tZW50RGF0ZS5ob3VyKCksXG4gICAgICBtaW51dGU6IG1vbWVudERhdGUubWludXRlKCksXG4gICAgfTtcbiAgICBjb25zdCBtb250aCA9IGRheVBpY2tlclZpc2libGVNb250aFxuICAgICAgfHwgKHR5cGVvZiBzZWxlY3RlZERheSA9PT0gJ3N0cmluZycgPyB1bmRlZmluZWQgOiBzZWxlY3RlZERheSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgIGNsYXNzTmFtZT17YCR7Y2xhc3NQcmVmaXh9LWNhbGVuZGFyYH1cbiAgICAgICAgcmVmPXsoZWwpID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29udGFpbmVyID0gZWw7XG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU9uT3ZlcmxheU1vdXNlRG93bn1cbiAgICAgID5cbiAgICAgICAgPERheVBpY2tlclxuICAgICAgICAgIHsuLi5vdGhlclByb3BzfVxuICAgICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRheVBpY2tlciA9IGVsO1xuICAgICAgICAgIH19XG4gICAgICAgICAgZGlzYWJsZWREYXlzPXtkaXNhYmxlZERheXN9XG4gICAgICAgICAgc2VsZWN0ZWREYXlzPXtzZWxlY3RlZERheXMgfHwgdGhpcy5pc1NhbWVEYXl9XG4gICAgICAgICAgbG9jYWxlVXRpbHM9e3RoaXMubG9jYWxlVXRpbHN9XG4gICAgICAgICAgbW9udGg9e21vbnRofVxuICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17c2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrPXt0aGlzLmdldEZpcnN0RGF5T2ZXZWVrKCl9XG4gICAgICAgICAgbG9jYWxlPXtsb2NhbGV9XG4gICAgICAgICAgY2FwdGlvbkVsZW1lbnQ9e3RoaXMucmVuZGVyQ2FwdGlvbkVsZW1lbnR9XG4gICAgICAgICAgbmF2YmFyRWxlbWVudD17TmF2YmFyfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aW1lICYmIChcbiAgICAgICAgICA8VGltZVBpY2tlclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlVGltZVBpY2tlckNoYW5nZX1cbiAgICAgICAgICAgIHRpbWU9e3RpbWVPYmp9XG4gICAgICAgICAgICBtaW51dGVzSW50ZXJ2YWw9e21pbnV0ZXNJbnRlcnZhbH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgY2FsZW5kYXJUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc2hvd092ZXJsYXkgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoY2FsZW5kYXJUeXBlID09PSAncG9wdXAnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV0aGVyQ29tcG9uZW50XG4gICAgICAgICAgYXR0YWNobWVudD17dGhpcy5nZXRUZXRoZXJDb21wb25lbnRBdHRhY2htZW50TG9jYXRpb24oKX1cbiAgICAgICAgICBjb25zdHJhaW50cz17W3tcbiAgICAgICAgICAgIHRvOiAnc2Nyb2xsUGFyZW50JyxcbiAgICAgICAgICAgIHBpbjogWyd0b3AnXSxcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB0bzogJ3dpbmRvdycsXG4gICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxuICAgICAgICAgIH1dfVxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y2xhc3NQcmVmaXh9ICR7Y2xhc3NOYW1lfSAke2NsYXNzUHJlZml4fS1wb3B1cC1jb250YWluZXJgfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgICAge3Nob3dPdmVybGF5ICYmIHRoaXMucmVuZGVyQ2FsZW5kYXIoKX1cbiAgICAgICAgPC9UZXRoZXJDb21wb25lbnQ+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtjbGFzc1ByZWZpeH0gJHtjbGFzc05hbWV9ICR7Y2xhc3NQcmVmaXh9LXN0YXRpYy1jb250YWluZXJgfT5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDYWxlbmRhcigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==