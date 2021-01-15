*# Changelog

* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.

## <next>

## 3.7.2
* Fix bug when pasting date string to empty DateInput caused by wrong setState callback scope

## 3.7.1
* Change weeknumber colors to fix current day borders in Chrome

## 3.7.0
* Added `calendarType` prop which can be used to change calendar to static type instead of popup

## 3.6.2
* Fixed: same format 'L' must be used when formatting 'L' formatted string back to moment

## 3.6.1
* Fixed bug: if UTC offset is negative and UTC date differs from local date, the day picker shows local date selected (day before UTC date) but the date input the UTC date.
* Fix to an IE11 specific issue where tethering was done incorrectly and datetime component was overlapping the input element.

## 3.6.0
* Added `formatDate` prop

## 3.5.1
* Popup will now open over the input field, if it has no space to open below it.

## 3.5.0
* Added `disabledDays` prop

## 3.4.0
* Added possibility to have own onChange callbacks for date input field and datepicker.
* Added onBlur callback call for date input field

## 3.3.2
* "clear value" button disabled if input is disabled

## 3.3.1
* Hide clear button when value is not present

## 3.3.0
* Added "clear value" button next to the input field. Prop `showClearValue` is `true` by default

## 3.2.12
* Custom Navbar element to remove base64 encoded png arrows

## 3.2.11
* Make a possibility to disable a time picker via passing disabled props from parent component

## 3.2.10
* Added autocomplete="off" to input to prevent auto complete popup to block picker element
* Upgraded some packages

## 3.2.9
* .oc-datetime z-index set to 1

## 3.2.8
* Added class attribute

## 3.2.7
* Updated npm packages

## 3.2.6
* Fixed onBlur handler

## 3.2.5
* Changed locale default en_GB -> en-GB
* Fixed: changing year or month from caption updated daypicker view accordingly
* Fixed: year or month get selected from caption even if date is unselected (empty)

## 3.2.3
* Fixed month initialization

## 3.2.2
* Added showOverlay prop

## 3.2.1
* Added selectedDays prop

## 3.2.0
* Fixed an issue #21: because of default first day of week, default locale is changed to en_GB
* Added onDayClick prop

## 3.1.1
* Fixed an issue: Changing year or month in "day picker" doesn't affect the selected date

## 3.1.0
* Fixed an issue: Typing invalid value clears date input
* Added date prettifying on input blurring

## 3.0.1
* Added OpusCapita brand colors.

## 3.0.0
* Changed React version to 16.3. Fixed methods related to a new component lifecycle
* Fixed handling of empty value of 'value' property

## 2.2.4
* Bug fix: time handling fixes in handleDayClick function

## 2.2.3
* Bug fix: Github Issue #11 - Internet Explorer related style fixes

## 2.2.2
* Bug fix: Github Issue #9 - Overlaying calendar should fallback to window if parentElement container is scrollable.

## 2.2.1
* Fixed handling of disabled days. Now a user cannot choose a disabled day from a date picker.

## 2.2.0
* TimePicker is now also exported as an independent input control
* TimePicker new prop: minutesInterval
* Small bugfix - timepicker now allows to select 11 PM.

## 2.1.1
* DayPicker's first day of the week is now derived from locale

## 2.1.0
* Year/month select boxes to browse through month views in day picker

## 2.0.2
* Bug fix: state will now get updated upon external change

## 2.0.1
* Changed moment parsing from local time to UTC format

## 2.0.0
* Component will now automatically format the input value keeping the (model) value in props and using its own state to display the formatted visible value
* Some bug fixes and improvements
* Implemented first version of the time picker and date-time-input wrapper
* NOTE: Contains breaking changes

## 1.0.0
* Initial release
