function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import TetherComponent from 'react-tether';
import 'react-day-picker/lib/style.css'; // App imports

import TimePicker from './time-picker/time-picker.component';
import YearMonthPicker from './year-month-picker/year-month-picker.component';
import Navbar from './navbar/navbar.component';
import './date-input.scss'; // Date formats used by the component (mainly by the getDate method)

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
      var momentDate = moment.utc(value, moment.ISO_8601);
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
    var momentDate = typeof date === 'string' ? moment.utc(date, dateFormat) : date;
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
        return new Date(moment(momentDate.format('L'), 'L'));
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
      return moment.localeData(locale).firstDayOfWeek();
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


      if (moment.utc(inputDate, dateFormat).isValid() && _this.isValidFormat(inputDate)) {
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

      var momentDate = moment.utc(moment(day).format('L'), 'L');
      var timeAdjustedDate = null;
      var currentMomentDate = moment(value, moment.ISO_8601).utc();
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
      var momentDate = moment.utc(value);
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
      var momentDate = value ? moment.utc(value, moment.ISO_8601) : moment.utc();
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
      return DateUtils.isSameDay(selectedDay, day);
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
      var momentDate = moment.utc(value, moment.ISO_8601);
      var inputDate = formatDate ? formatDate(value) : DateInput.getDate(momentDate, FORMATS.PRETTY_DATE, dateFormat);

      _this.setState({
        inputDate: inputDate
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCaptionElement", function (_ref) {
      var date = _ref.date;
      var locale = _this.props.locale;
      return React.createElement(YearMonthPicker, {
        date: date,
        onChange: _this.handleYearMonthChange,
        locale: locale
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderClearValueButton", function () {
      var disabled = _this.props.disabled;
      var className = classPrefix + "-clear-value" + (disabled ? ' disabled' : '');
      return React.createElement("button", {
        type: "button",
        className: className,
        onClick: _this.handleClearClick,
        disabled: disabled
      }, React.createElement("span", null, "x"));
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
      return React.createElement(FormGroup, {
        className: classPrefix + "-input-container"
      }, React.createElement(FormControl, _extends({
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
      var momentDate = moment.utc(value, moment.ISO_8601);
      var timeObj = {
        hour: momentDate.hour(),
        minute: momentDate.minute()
      };
      var month = dayPickerVisibleMonth || (typeof selectedDay === 'string' ? undefined : selectedDay);
      return React.createElement("div", {
        role: "presentation",
        className: classPrefix + "-calendar",
        ref: function ref(el) {
          _this.calendarContainer = el;
        },
        onMouseDown: _this.handleOnOverlayMouseDown
      }, React.createElement(DayPicker, _extends({}, otherProps, {
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
        navbarElement: Navbar,
        onDayClick: _this.handleDayClick
      })), time && React.createElement(TimePicker, {
        onChange: _this.handleTimePickerChange,
        time: timeObj,
        minutesInterval: minutesInterval
      }));
    });

    var _formatDate = props.formatDate,
        _value = props.value;

    var _momentDate = moment.utc(_value, moment.ISO_8601);

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
    _this.localeUtils = Object.assign(LocaleUtils, {
      getFirstDayOfWeek: function getFirstDayOfWeek() {
        return moment.localeData().firstDayOfWeek();
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
      return React.createElement(TetherComponent, {
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

    return React.createElement("div", null, this.renderDateInput(), React.createElement("div", {
      className: classPrefix + " " + className + " " + classPrefix + "-static-container"
    }, this.renderCalendar()));
  };

  return DateInput;
}(React.Component);

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

export { DateInput as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlLWlucHV0LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJGb3JtR3JvdXAiLCJGb3JtQ29udHJvbCIsIm1vbWVudCIsIkRheVBpY2tlciIsIkRhdGVVdGlscyIsIkxvY2FsZVV0aWxzIiwiVGV0aGVyQ29tcG9uZW50IiwiVGltZVBpY2tlciIsIlllYXJNb250aFBpY2tlciIsIk5hdmJhciIsIkZPUk1BVFMiLCJVVEMiLCJQUkVUVFlfREFURSIsIkRBVEVfT0JKRUNUIiwiREFURVRJTUVfUE9QVVBfSEVJR0hUIiwiY2xhc3NQcmVmaXgiLCJEYXRlSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJwcm9wcyIsInN0YXRlIiwiZm9ybWF0RGF0ZSIsInZhbHVlIiwic2hvd092ZXJsYXkiLCJsYXN0VmFsdWUiLCJtb21lbnREYXRlIiwidXRjIiwiSVNPXzg2MDEiLCJpbnB1dERhdGUiLCJnZXREYXRlIiwiZGF0ZUZvcm1hdCIsInNlbGVjdGVkRGF5IiwiZGF0ZSIsInR5cGUiLCJpc1ZhbGlkIiwicmVtb3ZlSW52aXNpYmxlQ2hhcnMiLCJmb3JtYXQiLCJ0b0lTT1N0cmluZyIsIkRhdGUiLCJlIiwiY2FsZW5kYXJDb250YWluZXIiLCJjb250YWlucyIsInRhcmdldCIsImlucHV0IiwiY2xvc2VPdmVybGF5IiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Eb2N1bWVudENsaWNrIiwibG9jYWxlIiwibG9jYWxlRGF0YSIsImZpcnN0RGF5T2ZXZWVrIiwidGltZSIsImlucHV0RGltZW5zaW9ucyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImF0dGFjaG1lbnQiLCJwb3B1cEhlaWdodCIsInBvcHVwQm90dG9tWSIsImhlaWdodCIsInkiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsIm9uRm9jdXMiLCJpbnB1dFByb3BzIiwic2V0U3RhdGUiLCJzZXRUaW1lb3V0IiwiZGF5UGlja2VyIiwic2hvd01vbnRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQmx1ciIsImZvY3VzIiwib25DaGFuZ2UiLCJpc1ZhbGlkRm9ybWF0IiwicHJldHRpZnlJbnB1dERhdGUiLCJtb3VzZUNsaWNrZWRPbkNvbnRhaW5lciIsImRheSIsIm1vZGlmaWVycyIsImRpc2FibGVkIiwib25EYXlDbGljayIsInRpbWVBZGp1c3RlZERhdGUiLCJjdXJyZW50TW9tZW50RGF0ZSIsImN1cnJlbnRIb3VycyIsImdldCIsImN1cnJlbnRNaW51dGVzIiwic2V0Iiwic3RhcnRPZiIsImJsdXIiLCJuZXdUaW1lIiwiaG91ciIsIm1pbnV0ZXMiLCJtaW51dGUiLCJ2YWwiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5UGlja2VyVmlzaWJsZU1vbnRoIiwiVHlwZUVycm9yIiwiaXNTYW1lRGF5IiwicGF0dGVybiIsInRlc3QiLCJ0cmltIiwiaGFuZGxlWWVhck1vbnRoQ2hhbmdlIiwiY2xhc3NOYW1lIiwiaGFuZGxlQ2xlYXJDbGljayIsImlucHV0UmVmIiwic2hvd0NsZWFyVmFsdWUiLCJlbCIsImhhbmRsZUlucHV0Q2hhbmdlIiwiaGFuZGxlSW5wdXRGb2N1cyIsImhhbmRsZUlucHV0Qmx1ciIsInJlbmRlckNsZWFyVmFsdWVCdXR0b24iLCJzZWxlY3RlZERheXMiLCJzaG93V2Vla051bWJlcnMiLCJtaW51dGVzSW50ZXJ2YWwiLCJkaXNhYmxlZERheXMiLCJjYWxlbmRhclR5cGUiLCJvdGhlclByb3BzIiwidGltZU9iaiIsInVuZGVmaW5lZCIsImhhbmRsZU9uT3ZlcmxheU1vdXNlRG93biIsImxvY2FsZVV0aWxzIiwiZ2V0Rmlyc3REYXlPZldlZWsiLCJyZW5kZXJDYXB0aW9uRWxlbWVudCIsImhhbmRsZURheUNsaWNrIiwiaGFuZGxlVGltZVBpY2tlckNoYW5nZSIsImJpbmQiLCJPYmplY3QiLCJhc3NpZ24iLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbmRlciIsImdldFRldGhlckNvbXBvbmVudEF0dGFjaG1lbnRMb2NhdGlvbiIsInRvIiwicGluIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2FsZW5kYXIiLCJDb21wb25lbnQiLCJzdHIiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLFdBQXBCLFFBQXVDLGlCQUF2QztBQUNBLE9BQU9DLE1BQVAsTUFBbUIsUUFBbkI7QUFDQSxPQUFPQyxTQUFQLElBQW9CQyxTQUFwQixRQUFxQyxrQkFBckM7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLHlCQUF4QjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsY0FBNUI7QUFDQSxPQUFPLGdDQUFQLEMsQ0FFQTs7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLHFDQUF2QjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsaURBQTVCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQiwyQkFBbkI7QUFDQSxPQUFPLG1CQUFQLEMsQ0FFQTs7QUFDQSxJQUFNQyxPQUFPLEdBQUc7QUFDZEMsRUFBQUEsR0FBRyxFQUFFLEtBRFM7QUFFZEMsRUFBQUEsV0FBVyxFQUFFLGFBRkM7QUFHZEMsRUFBQUEsV0FBVyxFQUFFO0FBSEMsQ0FBaEIsQyxDQU1BOztBQUNBLElBQU1DLHFCQUFxQixHQUFHLEdBQTlCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLGFBQXBCOztJQUVxQkMsUzs7Ozs7WUE2Q1pDLHdCLEdBQVAsa0NBQWdDQyxLQUFoQyxFQUF1Q0MsS0FBdkMsRUFBOEM7QUFBQSxRQUNwQ0MsVUFEb0MsR0FDZEYsS0FEYyxDQUNwQ0UsVUFEb0M7QUFBQSxRQUN4QkMsS0FEd0IsR0FDZEgsS0FEYyxDQUN4QkcsS0FEd0I7O0FBRTVDLFFBQUksQ0FBQ0YsS0FBSyxDQUFDRyxXQUFQLElBQXNCRCxLQUFLLEtBQUtGLEtBQUssQ0FBQ0ksU0FBMUMsRUFBcUQ7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QnZELEVBQUFBLElBQUksRUFBRSxLQWhCYztBQWlCcEIrRCxFQUFBQSxlQUFlLEVBQUUsQ0FqQkc7QUFrQnBCRSxFQUFBQSxZQUFZLEVBQUU7QUFsQk0sQzs7U0F4QkhuRyxTIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgRGF5UGlja2VyLCB7IERhdGVVdGlscyB9IGZyb20gJ3JlYWN0LWRheS1waWNrZXInO1xuaW1wb3J0IExvY2FsZVV0aWxzIGZyb20gJ3JlYWN0LWRheS1waWNrZXIvbW9tZW50JztcbmltcG9ydCBUZXRoZXJDb21wb25lbnQgZnJvbSAncmVhY3QtdGV0aGVyJztcbmltcG9ydCAncmVhY3QtZGF5LXBpY2tlci9saWIvc3R5bGUuY3NzJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBUaW1lUGlja2VyIGZyb20gJy4vdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCBZZWFyTW9udGhQaWNrZXIgZnJvbSAnLi95ZWFyLW1vbnRoLXBpY2tlci95ZWFyLW1vbnRoLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IE5hdmJhciBmcm9tICcuL25hdmJhci9uYXZiYXIuY29tcG9uZW50JztcbmltcG9ydCAnLi9kYXRlLWlucHV0LnNjc3MnO1xuXG4vLyBEYXRlIGZvcm1hdHMgdXNlZCBieSB0aGUgY29tcG9uZW50IChtYWlubHkgYnkgdGhlIGdldERhdGUgbWV0aG9kKVxuY29uc3QgRk9STUFUUyA9IHtcbiAgVVRDOiAnVVRDJyxcbiAgUFJFVFRZX0RBVEU6ICdQUkVUVFlfREFURScsXG4gIERBVEVfT0JKRUNUOiAnREFURV9PQkpFQ1QnLFxufTtcblxuLy8gVXNlZCBpbiBnZXRUZXRoZXJDb21wb25lbnRBdHRhY2htZW50TG9jYXRpb24gZm5cbmNvbnN0IERBVEVUSU1FX1BPUFVQX0hFSUdIVCA9IDIwMDtcbmNvbnN0IGNsYXNzUHJlZml4ID0gJ29jLWRhdGV0aW1lJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHJlbW92ZUludmlzaWJsZUNoYXJzID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoL1xcdTIwMEUvZywgJycpO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXREYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlucHV0UmVmOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXlzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMub2JqZWN0LCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGlzYWJsZWREYXlzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMub2JqZWN0LCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgc2hvd092ZXJsYXk6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0NsZWFyVmFsdWU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1pbnV0ZXNJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjYWxlbmRhclR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3BvcHVwJywgJ3N0YXRpYyddKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdmFsdWU6ICcnLFxuICAgIGRhdGVGb3JtYXQ6ICdMJyxcbiAgICBmb3JtYXREYXRlOiB1bmRlZmluZWQsXG4gICAgbG9jYWxlOiAnZW4tR0InLFxuICAgIG9uQ2hhbmdlKCkge30sXG4gICAgb25EYXlDbGljazogKCkgPT4ge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgaW5wdXRSZWYoKSB7fSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2VsZWN0ZWREYXlzOiBudWxsLFxuICAgIGRpc2FibGVkRGF5czogbnVsbCxcbiAgICBzaG93T3ZlcmxheTogZmFsc2UsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiB0cnVlLFxuICAgIHNob3dDbGVhclZhbHVlOiB0cnVlLFxuICAgIHRpbWU6IGZhbHNlLFxuICAgIG1pbnV0ZXNJbnRlcnZhbDogNSxcbiAgICBjYWxlbmRhclR5cGU6ICdwb3B1cCcsXG4gIH07XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBjb25zdCB7IGZvcm1hdERhdGUsIHZhbHVlIH0gPSBwcm9wcztcbiAgICBpZiAoIXN0YXRlLnNob3dPdmVybGF5ICYmIHZhbHVlICE9PSBzdGF0ZS5sYXN0VmFsdWUpIHtcbiAgICAgIGNvbnN0IG1vbWVudERhdGUgPSBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpO1xuICAgICAgY29uc3QgaW5wdXREYXRlID0gZm9ybWF0RGF0ZVxuICAgICAgICA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICAgIDogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5QUkVUVFlfREFURSwgcHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYXN0VmFsdWU6IHZhbHVlLFxuICAgICAgICBzZWxlY3RlZERheTogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5EQVRFX09CSkVDVCksXG4gICAgICAgIHNob3dPdmVybGF5OiBwcm9wcy5zaG93T3ZlcmxheSB8fCBzdGF0ZS5zaG93T3ZlcmxheSxcbiAgICAgICAgaW5wdXREYXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgZ2l2ZW4gZGF0ZSBpbnRvIHdhbnRlZCB0eXBlIChzdHJpbmcvZGF0ZSBvYmplY3QpXG4gICAqIEBwYXJhbSBkYXRlIC0ge3N0cmluZywgbW9tZW50IG9iamVjdH1cbiAgICogQHBhcmFtIHR5cGUgLSB7c3RyaW5nLCBkYXRlIG9iamVjdH0gdHlwZSBvZiB0aGUgcmV0dXJuIHZhbHVlXG4gICAqIEBwYXJhbSBkYXRlRm9ybWF0IHtzdHJpbmd9IGRhdGUgZm9ybWF0LCBkZWZhdWx0cyB0byAnTS9EL1lZWVknXG4gICAqICgnTS9EL1lZWVknIGg6bW0gd2hlbiB1c2luZyBEYXRlVGltZSlcbiAgICogKiBAcmV0dXJucyB7c3RyaW5nLCBkYXRlfVxuICAgKi9cbiAgc3RhdGljIGdldERhdGUoZGF0ZSwgdHlwZSwgZGF0ZUZvcm1hdCkge1xuICAgIGNvbnN0IG1vbWVudERhdGUgPSB0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgPyBtb21lbnQudXRjKGRhdGUsIGRhdGVGb3JtYXQpIDogZGF0ZTtcbiAgICBpZiAoIW1vbWVudERhdGUuaXNWYWxpZCgpIHx8ICFkYXRlKSByZXR1cm4gJyc7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZPUk1BVFMuUFJFVFRZX0RBVEU6XG4gICAgICAgIHJldHVybiBEYXRlSW5wdXQucmVtb3ZlSW52aXNpYmxlQ2hhcnMobW9tZW50RGF0ZS5mb3JtYXQoZGF0ZUZvcm1hdCkpO1xuICAgICAgY2FzZSBGT1JNQVRTLlVUQzpcbiAgICAgICAgcmV0dXJuIERhdGVJbnB1dC5yZW1vdmVJbnZpc2libGVDaGFycyhtb21lbnREYXRlLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgY2FzZSBGT1JNQVRTLkRBVEVfT0JKRUNUOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVVRDIGRheSBtaWdodCBkaWZmZXIgZnJvbSBsb2NhbCBkYXksIHRoZXJlZm9yZSBVVEMgb2Zmc2V0XG4gICAgICAgIC8vIG11c3QgYmUgZGlzY291bnRlZC5cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1vbWVudChtb21lbnREYXRlLmZvcm1hdCgnTCcpLCAnTCcpKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHsgZm9ybWF0RGF0ZSwgdmFsdWUgfSA9IHByb3BzO1xuICAgIGNvbnN0IG1vbWVudERhdGUgPSBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpO1xuICAgIHRoaXMub25Eb2N1bWVudENsaWNrID0gdGhpcy5vbkRvY3VtZW50Q2xpY2suYmluZCh0aGlzKTtcbiAgICBjb25zdCBpbnB1dERhdGUgPSBmb3JtYXREYXRlXG4gICAgICA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICAvLyBpbnB1dERhdGU6IFByZXR0aWZpZWQgc3RyaW5nIHNob3duIGluIGlucHV0IGZpZWxkXG4gICAgICA6IERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuUFJFVFRZX0RBVEUsIHByb3BzLmRhdGVGb3JtYXQpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cbiAgICAgIGxhc3RWYWx1ZTogbnVsbCxcbiAgICAgIHNob3dPdmVybGF5OiBmYWxzZSxcbiAgICAgIC8vIHNlbGVjdGVkRGF5OiBTZWxlY3RlZCBkYXkgaW4gY2FsZW5kYXIgKGRhdGUgb2JqZWN0KVxuICAgICAgc2VsZWN0ZWREYXk6IERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuREFURV9PQkpFQ1QsIHByb3BzLmRhdGVGb3JtYXQpLFxuICAgICAgaW5wdXREYXRlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvY2FsZVV0aWxzID0gT2JqZWN0LmFzc2lnbihMb2NhbGVVdGlscywge1xuICAgICAgZ2V0Rmlyc3REYXlPZldlZWs6ICgpID0+IG1vbWVudC5sb2NhbGVEYXRhKCkuZmlyc3REYXlPZldlZWsoKSxcbiAgICB9KTtcblxuICAgIHRoaXMuaW5wdXQgPSBudWxsO1xuICAgIHRoaXMuZGF5UGlja2VyID0gbnVsbDtcblxuICAgIC8vIFVzZWQgaW4gb25CbHVyIGhhbmRsZXIgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGJsdXIgaGFwcGVuZWQgYmVjYXVzZSBvZiBhIGNsaWNrXG4gICAgLy8gb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLm1vdXNlQ2xpY2tlZE9uQ29udGFpbmVyID0gZmFsc2U7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBldmVyeSB0aW1lIGRheVBpY2tlciBpcyBvcGVuIGFuZCBkb2N1bWVudCBpcyBjbGlja2VkXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvbkRvY3VtZW50Q2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5jYWxlbmRhckNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgeyBzaG93T3ZlcmxheSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAvLyBDbG9zZXMgb3ZlcmxheSBpZiB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSBjYWxlbmRhciAoYW5kIGlucHV0IGZpZWxkKVxuICAgIGlmIChcbiAgICAgICF0aGlzLmNhbGVuZGFyQ29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KVxuICAgICAgJiYgc2hvd092ZXJsYXlcbiAgICAgICYmIGUudGFyZ2V0ICE9PSB0aGlzLmlucHV0XG4gICAgKSB7XG4gICAgICB0aGlzLmNsb3NlT3ZlcmxheSgpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IG9mIHRoZSB3ZWVrIGJhc2VkIG9uIGxvY2FsZSAodXNlZCBieSBEYXlQaWNrZXIpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRGaXJzdERheU9mV2VlayA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKS5maXJzdERheU9mV2VlaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgcG9wdXAgaGFzIHNwYWNlIHRvIG9wZW4gYmVsb3cgdGhlIGlucHV0IGZpZWxkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gYW4gXCJhbmNob3IgcG9pbnRcIiBpbiBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBnZXRUZXRoZXJDb21wb25lbnRBdHRhY2htZW50TG9jYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlucHV0RGltZW5zaW9ucyA9IHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFBvcHVwIHdpbGwgb3BlbiBiZWxvdyB0aGUgaW5wdXQgYnkgZGVmYXVsdFxuICAgIGxldCBhdHRhY2htZW50ID0gJ3RvcCBjZW50ZXInO1xuXG4gICAgaWYgKGlucHV0RGltZW5zaW9ucykge1xuICAgICAgLyogSWYgdGhlcmUncyB0aW1lIGlucHV0cyBwcmVzZW50LCB0aGUgcG9wdXAgd2lsbCBiZSBzbGlnaHRseSB0YWxsZXIuIEhlaWdodCBoYXMgdG8gYmVcbiAgICAgIGhhcmQgY29kZWQsIGJlY2F1c2Ugd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVpZ2h0IG9mIHRoZSBwb3B1cCBiZWZvcmUgd2UgaGF2ZSBvcGVuZWQgaXQgKi9cbiAgICAgIGNvbnN0IHBvcHVwSGVpZ2h0ID0gdGltZSA/IERBVEVUSU1FX1BPUFVQX0hFSUdIVCArIDUwIDogREFURVRJTUVfUE9QVVBfSEVJR0hUO1xuICAgICAgY29uc3QgcG9wdXBCb3R0b21ZID0gcG9wdXBIZWlnaHQgKyBpbnB1dERpbWVuc2lvbnMuaGVpZ2h0ICsgaW5wdXREaW1lbnNpb25zLnk7XG4gICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgIC8vIFBvcHVwIGhhcyBubyBzcGFjZSB0byBvcGVuIGJlbG93IHRoZSBpbnB1dCwgc28uLlxuICAgICAgaWYgKHdpbmRvd0hlaWdodCA8IHBvcHVwQm90dG9tWSkgYXR0YWNobWVudCA9ICdib3R0b20gY2VudGVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBpbnB1dCBmb2N1cyBldmVudC4gU2hvd3MgYW4gb3ZlcmxheSBhbmQgYWRkcyBhbiBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgZG9jdW1lbnRcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGhhbmRsZUlucHV0Rm9jdXMgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgaW5wdXRQcm9wczogeyBvbkZvY3VzIH0gfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd092ZXJsYXk6IHRydWUgfSwgKCkgPT4ge1xuICAgICAgLy8gRGVsYXlzIHRoZSBleGVjdXRpb24gc28gdGhhdCB0aGUgZGF5UGlja2VyIG9wZW5zIGJlZm9yZSBzZWxlY3RpbmcgYSBkYXlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHNob3dPdmVybGF5LCBzZWxlY3RlZERheSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFzaG93T3ZlcmxheSAmJiB0aGlzLmRheVBpY2tlciAmJiBzZWxlY3RlZERheSkgdGhpcy5kYXlQaWNrZXIuc2hvd01vbnRoKHNlbGVjdGVkRGF5KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgaWYgKG9uRm9jdXMpIG9uRm9jdXMoZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBvdmVybGF5LiBDYWxsZWQgZnJvbSBvbkRvY3VtZW50Q2xpY2suXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBjbG9zZU92ZXJsYXkgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93T3ZlcmxheTogZmFsc2UgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzaG93T3ZlcmxheSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IHsgaW5wdXRQcm9wczogeyBvbkJsdXIgfSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzaG93T3ZlcmxheSkgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgaWYgKG9uQmx1cikgb25CbHVyKGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGlucHV0IGNoYW5nZSwgY2hlY2tzIHZhbGlkaXR5IGFuZCB1cGRhdGVzIG1vZGVsIHZhbHVlIGFuZCB0aGUgZGF5IHBpY2tlclxuICAgKiBAcGFyYW0gZSB7ZXZlbnR9XG4gICAqL1xuICBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRlID0gZS50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgeyBkYXRlRm9ybWF0LCBpbnB1dFByb3BzLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dERhdGUgfSk7XG4gICAgLy8gVGhpcyBmaXJlcyBvbmx5IGlmIHRoZSBuZXcgZGF0ZSBpcyB2YWxpZCBpbiBnaXZlbiBmb3JtYXRcbiAgICBpZiAobW9tZW50LnV0YyhpbnB1dERhdGUsIGRhdGVGb3JtYXQpLmlzVmFsaWQoKSAmJiB0aGlzLmlzVmFsaWRGb3JtYXQoaW5wdXREYXRlKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkRGF5OiBEYXRlSW5wdXQuZ2V0RGF0ZShpbnB1dERhdGUsIEZPUk1BVFMuREFURV9PQkpFQ1QsIGRhdGVGb3JtYXQpLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzZWxlY3RlZERheSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAvLyBJZiBkYXlQaWNrZXIgaXMgb3Blbiwgd2Ugd2lsbCBzaG93IHRoZSBjb3JyZWN0IG1vbnRoXG4gICAgICAgICAgaWYgKHRoaXMuZGF5UGlja2VyKSB0aGlzLmRheVBpY2tlci5zaG93TW9udGgoc2VsZWN0ZWREYXkpO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIGlmIChpbnB1dFByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICAgIGlucHV0UHJvcHMub25DaGFuZ2UoRGF0ZUlucHV0LnJlbW92ZUludmlzaWJsZUNoYXJzKGlucHV0RGF0ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25DaGFuZ2UoRGF0ZUlucHV0LmdldERhdGUoaW5wdXREYXRlLCBGT1JNQVRTLlVUQywgZGF0ZUZvcm1hdCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgaW52YWxpZCB3ZSByZXNldCB0aGUgbW9kZWwgdmFsdWVcbiAgICAgIG9uQ2hhbmdlKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVJbnB1dEJsdXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgaW5wdXRQcm9wczogeyBvbkJsdXIgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByZXR0aWZ5SW5wdXREYXRlKCk7XG5cbiAgICAvLyBXZSB3YW50IHRvIGNsb3NlIHRoZSBvdmVybGF5IG9uIGJsdXIsIHVubGVzcyBpdCB3YXMgY2F1c2VkIGJ5IGEgY2xpY2sgb24gdGhlIGNhbGVuZGFyXG4gICAgLy8gb3ZlcmxheVxuICAgIGlmICghdGhpcy5tb3VzZUNsaWNrZWRPbkNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3dPdmVybGF5OiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm1vdXNlQ2xpY2tlZE9uQ29udGFpbmVyID0gZmFsc2U7XG4gICAgaWYgKG9uQmx1cikgb25CbHVyKGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGRheVBpY2tlciBjbGlja1xuICAgKiBAcGFyYW0gZGF5IHtkYXRlfVxuICAgKi9cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBtb2RpZmllcnMgPSB7fSkgPT4ge1xuICAgIGlmIChtb2RpZmllcnMuZGlzYWJsZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICBmb3JtYXREYXRlLFxuICAgICAgdmFsdWUsXG4gICAgICB0aW1lLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBvbkRheUNsaWNrLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIFVUQyBkYXkgbWlnaHQgZGlmZmVyIGZyb20gbG9jYWwgZGF0ZSB0aGVyZWZvcmUgVVRDIG9mZnNldCBtdXN0IGJlIGRpc2NvdW50ZWQuXG4gICAgY29uc3QgbW9tZW50RGF0ZSA9IG1vbWVudC51dGMobW9tZW50KGRheSkuZm9ybWF0KCdMJyksICdMJyk7XG4gICAgbGV0IHRpbWVBZGp1c3RlZERhdGUgPSBudWxsO1xuICAgIGNvbnN0IGN1cnJlbnRNb21lbnREYXRlID0gbW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLnV0YygpO1xuICAgIGNvbnN0IGN1cnJlbnRIb3VycyA9IGN1cnJlbnRNb21lbnREYXRlLmdldCgnaG91cicpO1xuICAgIGNvbnN0IGN1cnJlbnRNaW51dGVzID0gY3VycmVudE1vbWVudERhdGUuZ2V0KCdtaW51dGUnKTtcblxuICAgIGlmICh0aW1lKSB7XG4gICAgICAvLyBTZXQgY3VycmVudCAocHJldmlvdXNseSBzZWxlY3RlZCkgdGltZSB0byBuZXdseSBwaWNrZWQgZGF0ZVxuICAgICAgdGltZUFkanVzdGVkRGF0ZSA9IG1vbWVudERhdGUuc2V0KCdob3VyJywgY3VycmVudEhvdXJzKS5zZXQoJ21pbnV0ZScsIGN1cnJlbnRNaW51dGVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgd2UgZG9uJ3QgbmVlZCB0byBib3RoZXIgb3Vyc2VsdmVzIHdpdGggYW4gZXhhY3QgdGltZSxcbiAgICAgIC8vIHdlIGNhbiBzZXQgdGltZSB0byBUMDA6MDA6MDAuMDAwWlxuICAgICAgdGltZUFkanVzdGVkRGF0ZSA9IG1vbWVudERhdGUuc3RhcnRPZignZGF5Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXREYXRlID0gZm9ybWF0RGF0ZVxuICAgICAgPyBmb3JtYXREYXRlKHRpbWVBZGp1c3RlZERhdGUpXG4gICAgICA6IERhdGVJbnB1dC5nZXREYXRlKHRpbWVBZGp1c3RlZERhdGUsIEZPUk1BVFMuUFJFVFRZX0RBVEUsIGRhdGVGb3JtYXQpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZERheTogZGF5LFxuICAgICAgc2hvd092ZXJsYXk6IGZhbHNlLFxuICAgICAgaW5wdXREYXRlLFxuICAgIH0sICgpID0+IHtcbiAgICAgIG9uQ2hhbmdlKERhdGVJbnB1dC5nZXREYXRlKHRpbWVBZGp1c3RlZERhdGUsIEZPUk1BVFMuVVRDLCBkYXRlRm9ybWF0KSk7XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9KTtcblxuICAgIG9uRGF5Q2xpY2soZGF5LCBtb2RpZmllcnMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRpbWUgcGlja2VyIChzZWxlY3QgYm94ZXMpIGNoYW5nZVxuICAgKiBAcGFyYW0gbmV3VGltZVxuICAgKi9cbiAgaGFuZGxlVGltZVBpY2tlckNoYW5nZSA9IChuZXdUaW1lKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIGZvcm1hdERhdGUsXG4gICAgICB2YWx1ZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBtb21lbnREYXRlID0gbW9tZW50LnV0Yyh2YWx1ZSk7XG4gICAgbW9tZW50RGF0ZSA9IG1vbWVudERhdGUuaG91cihuZXdUaW1lLmhvdXIpO1xuICAgIG1vbWVudERhdGUgPSBtb21lbnREYXRlLm1pbnV0ZXMobmV3VGltZS5taW51dGUpO1xuICAgIGNvbnN0IGlucHV0RGF0ZSA9IGZvcm1hdERhdGVcbiAgICAgID8gZm9ybWF0RGF0ZSh2YWx1ZSlcbiAgICAgIDogRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5QUkVUVFlfREFURSwgZGF0ZUZvcm1hdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0RGF0ZSB9LCAoKSA9PiB7XG4gICAgICBvbkNoYW5nZShEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLlVUQywgZGF0ZUZvcm1hdCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHllYXItbW9udGggcGlja2VyIChzZWxlY3QgYm94ZXMpIGNoYW5nZVxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgaGFuZGxlWWVhck1vbnRoQ2hhbmdlID0gKHZhbCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIGZvcm1hdERhdGUsXG4gICAgICBvbkNoYW5nZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtb21lbnREYXRlID0gdmFsdWUgPyBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpIDogbW9tZW50LnV0YygpO1xuXG4gICAgbW9tZW50RGF0ZS55ZWFyKHZhbC5nZXRGdWxsWWVhcigpKS5tb250aCh2YWwuZ2V0TW9udGgoKSk7XG4gICAgY29uc3QgaW5wdXREYXRlID0gZm9ybWF0RGF0ZVxuICAgICAgPyBmb3JtYXREYXRlKHZhbHVlKVxuICAgICAgOiBEYXRlSW5wdXQuZ2V0RGF0ZShtb21lbnREYXRlLCBGT1JNQVRTLlBSRVRUWV9EQVRFLCBkYXRlRm9ybWF0KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXREYXRlLFxuICAgICAgc2VsZWN0ZWREYXk6IERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuREFURV9PQkpFQ1QsIGRhdGVGb3JtYXQpLFxuICAgICAgZGF5UGlja2VyVmlzaWJsZU1vbnRoOiB2YWwsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgb25DaGFuZ2UoRGF0ZUlucHV0LmdldERhdGUobW9tZW50RGF0ZSwgRk9STUFUUy5VVEMsIGRhdGVGb3JtYXQpKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhIGNsaWNrIG9uIHRoZSBvdmVybGF5XG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBoYW5kbGVPbk92ZXJsYXlNb3VzZURvd24gPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLmNhbGVuZGFyQ29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgdGhpcy5tb3VzZUNsaWNrZWRPbkNvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgaW5wdXQgdmFsdWVcbiAgICovXG4gIGhhbmRsZUNsZWFyQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uQ2hhbmdlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWFjdC1kYXRldGltZTogb25DaGFuZ2UgY2FsbGJhY2sgaXMgbm90IHNldCcpO1xuICAgIG9uQ2hhbmdlKCcnKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHNlbGVjdGVkIGRheSBpcyBzYW1lIGFzIGEgZGF5IGluIGNhbGVuZGFyXG4gICAqIFVzZWQgYnkgZGF5UGlja2VyXG4gICAqIEBwYXJhbSBkYXkge2RhdGV9XG4gICAqL1xuICBpc1NhbWVEYXkgPSAoZGF5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZERheSB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gRGF0ZVV0aWxzLmlzU2FtZURheShzZWxlY3RlZERheSwgZGF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgZ2l2ZW4gaXMgdmFsaWQgZm9ybWF0IHdpc2UuIFVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBtb21lbnQncyBpc1ZhbGlkIG1ldGhvZFxuICAgKiBBIGxpdHRsZSBsZXNzIHN0cmljdCB0aGFuIG1vbWVudCdzIGlzVmFsaWQgd2l0aCBzdHJpY3QgbW9kZSBlbmFibGVkXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNWYWxpZEZvcm1hdCA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBwYXR0ZXJuID0gL15cXGR7MSw0fVsuXFwtL117MX1cXGR7MSwyfVsuXFwtL117MX1cXGR7MSw0fSQvO1xuICAgIGlmICh0aW1lKSB7XG4gICAgICBwYXR0ZXJuID0gL15cXGR7MSw0fVsuXFwtL117MX1cXGR7MSwyfVsuXFwtL117MX1cXGR7MSw0fVxcc3swLDF9XFxkezAsMn0oWzouXSk/XFxkezAsMn0kLztcbiAgICB9XG4gICAgcmV0dXJuIHBhdHRlcm4udGVzdChkYXRlLnRyaW0oKSk7XG4gIH07XG5cbiAgcHJldHRpZnlJbnB1dERhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSwgZGF0ZUZvcm1hdCwgZm9ybWF0RGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtb21lbnREYXRlID0gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxKTtcbiAgICBjb25zdCBpbnB1dERhdGUgPSBmb3JtYXREYXRlXG4gICAgICA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICA6IERhdGVJbnB1dC5nZXREYXRlKG1vbWVudERhdGUsIEZPUk1BVFMuUFJFVFRZX0RBVEUsIGRhdGVGb3JtYXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dERhdGUgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgc2VsZWN0IGJveGVzIGFib3ZlIHRoZSBjYWxlbmRhclxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHJlbmRlckNhcHRpb25FbGVtZW50ID0gKHsgZGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxZZWFyTW9udGhQaWNrZXJcbiAgICAgICAgZGF0ZT17ZGF0ZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlWWVhck1vbnRoQ2hhbmdlfVxuICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNsZWFyVmFsdWVCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtjbGFzc1ByZWZpeH0tY2xlYXItdmFsdWUke2Rpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGVhckNsaWNrfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICA+XG4gICAgICAgIDxzcGFuPng8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlucHV0UmVmLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBmb3JtYXREYXRlLFxuICAgICAgaW5wdXRQcm9wcyxcbiAgICAgIHNob3dDbGVhclZhbHVlLFxuICAgICAgdmFsdWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgaW5wdXREYXRlLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybUdyb3VwIGNsYXNzTmFtZT17YCR7Y2xhc3NQcmVmaXh9LWlucHV0LWNvbnRhaW5lcmB9PlxuICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaW5wdXRSZWY9eyhlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGVsO1xuICAgICAgICAgICAgaW5wdXRSZWYoZWwpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdmFsdWU9e2lucHV0RGF0ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgcmVhZE9ubHk9eyEhZm9ybWF0RGF0ZX1cbiAgICAgICAgICBhdXRvQ29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgIHsuLi5pbnB1dFByb3BzfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cbiAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlSW5wdXRCbHVyfVxuICAgICAgICAvPlxuICAgICAgICB7c2hvd0NsZWFyVmFsdWUgJiYgdmFsdWUgJiYgdGhpcy5yZW5kZXJDbGVhclZhbHVlQnV0dG9uKCl9XG4gICAgICA8L0Zvcm1Hcm91cD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgbG9jYWxlLFxuICAgICAgdGltZSxcbiAgICAgIHZhbHVlLFxuICAgICAgaW5wdXRQcm9wcyxcbiAgICAgIGlucHV0UmVmLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZERheXMsXG4gICAgICBzaG93V2Vla051bWJlcnMsXG4gICAgICBtaW51dGVzSW50ZXJ2YWwsXG4gICAgICBzaG93Q2xlYXJWYWx1ZSxcbiAgICAgIGRpc2FibGVkRGF5cyxcbiAgICAgIGZvcm1hdERhdGUsXG4gICAgICBjYWxlbmRhclR5cGUsXG4gICAgICAuLi5vdGhlclByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgZGF5UGlja2VyVmlzaWJsZU1vbnRoLFxuICAgICAgc2VsZWN0ZWREYXksXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbW9tZW50RGF0ZSA9IG1vbWVudC51dGModmFsdWUsIG1vbWVudC5JU09fODYwMSk7XG4gICAgY29uc3QgdGltZU9iaiA9IHtcbiAgICAgIGhvdXI6IG1vbWVudERhdGUuaG91cigpLFxuICAgICAgbWludXRlOiBtb21lbnREYXRlLm1pbnV0ZSgpLFxuICAgIH07XG4gICAgY29uc3QgbW9udGggPSBkYXlQaWNrZXJWaXNpYmxlTW9udGhcbiAgICAgIHx8ICh0eXBlb2Ygc2VsZWN0ZWREYXkgPT09ICdzdHJpbmcnID8gdW5kZWZpbmVkIDogc2VsZWN0ZWREYXkpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICBjbGFzc05hbWU9e2Ake2NsYXNzUHJlZml4fS1jYWxlbmRhcmB9XG4gICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxlbmRhckNvbnRhaW5lciA9IGVsO1xuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVPbk92ZXJsYXlNb3VzZURvd259XG4gICAgICA+XG4gICAgICAgIDxEYXlQaWNrZXJcbiAgICAgICAgICB7Li4ub3RoZXJQcm9wc31cbiAgICAgICAgICByZWY9eyhlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXlQaWNrZXIgPSBlbDtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGRpc2FibGVkRGF5cz17ZGlzYWJsZWREYXlzfVxuICAgICAgICAgIHNlbGVjdGVkRGF5cz17c2VsZWN0ZWREYXlzIHx8IHRoaXMuaXNTYW1lRGF5fVxuICAgICAgICAgIGxvY2FsZVV0aWxzPXt0aGlzLmxvY2FsZVV0aWxzfVxuICAgICAgICAgIG1vbnRoPXttb250aH1cbiAgICAgICAgICBzaG93V2Vla051bWJlcnM9e3Nob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICBmaXJzdERheU9mV2Vlaz17dGhpcy5nZXRGaXJzdERheU9mV2VlaygpfVxuICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgIGNhcHRpb25FbGVtZW50PXt0aGlzLnJlbmRlckNhcHRpb25FbGVtZW50fVxuICAgICAgICAgIG5hdmJhckVsZW1lbnQ9e05hdmJhcn1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAvPlxuICAgICAgICB7dGltZSAmJiAoXG4gICAgICAgICAgPFRpbWVQaWNrZXJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVRpbWVQaWNrZXJDaGFuZ2V9XG4gICAgICAgICAgICB0aW1lPXt0aW1lT2JqfVxuICAgICAgICAgICAgbWludXRlc0ludGVydmFsPXttaW51dGVzSW50ZXJ2YWx9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIGNhbGVuZGFyVHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNob3dPdmVybGF5IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKGNhbGVuZGFyVHlwZSA9PT0gJ3BvcHVwJykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRldGhlckNvbXBvbmVudFxuICAgICAgICAgIGF0dGFjaG1lbnQ9e3RoaXMuZ2V0VGV0aGVyQ29tcG9uZW50QXR0YWNobWVudExvY2F0aW9uKCl9XG4gICAgICAgICAgY29uc3RyYWludHM9e1t7XG4gICAgICAgICAgICB0bzogJ3Njcm9sbFBhcmVudCcsXG4gICAgICAgICAgICBwaW46IFsndG9wJ10sXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxuICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcbiAgICAgICAgICB9XX1cbiAgICAgICAgICBjbGFzc05hbWU9e2Ake2NsYXNzUHJlZml4fSAke2NsYXNzTmFtZX0gJHtjbGFzc1ByZWZpeH0tcG9wdXAtY29udGFpbmVyYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGVJbnB1dCgpfVxuICAgICAgICAgIHtzaG93T3ZlcmxheSAmJiB0aGlzLnJlbmRlckNhbGVuZGFyKCl9XG4gICAgICAgIDwvVGV0aGVyQ29tcG9uZW50PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnJlbmRlckRhdGVJbnB1dCgpfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NQcmVmaXh9ICR7Y2xhc3NOYW1lfSAke2NsYXNzUHJlZml4fS1zdGF0aWMtY29udGFpbmVyYH0+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2FsZW5kYXIoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=