# react-datetime

### Description
React date time picker and input component

### Installation
```
npm install @opuscapita/react-datetime
npm install moment
```

### Demo
View the [DEMO](https://opuscapita.github.io/react-datetime)

### Builds
#### UMD
The default build with compiled styles in the .js file. Also minified version available in the lib/umd directory.
#### CommonJS/ES Module
You need to configure your module loader to use `cjs` or `es` fields of the package.json to use these module types.
Also you need to configure sass loader, since all the styles are in sass format.
* With webpack use [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields) to configure the module type.
* Add [SASS loader](https://github.com/webpack-contrib/sass-loader) to support importing of SASS styles.

### API
| Prop name       | Type                    | Default    | Description                                                                                                          |
| --------------- | ----------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| className       | string                  | ''         | The class attribute of the element                                                                                   |
| value           | string                  | ''         | Current date value                                                                                                   |
| onChange        | function                |            | onChange callback returns new date string                                                                            |
| onDayClick      | function                |            | onDayClick callback http://react-day-picker.js.org/api/DayPicker#onDayClick                                          |
| locale          | string                  | 'en'       | Locale                                                                                                               |
| dateFormat      | string                  | 'M/D/YYYY' | Date format as MomentJS [format](https://momentjs.com/docs/#/displaying/format)                                      |
| inputProps      | object                  |            | Custom props for the input field                                                                                     |
| inputRef        | function                |            | Input component ref function                                                                                         |
| disabled        | boolean                 |            | Is component disabled                                                                                                |
| time            | boolean                 | false      | Time picker on/off. Prefer DateTime component if possible                                                            |
| minutesInterval | number                  | 5          | Minutes interval for the timepicker                                                                                  |
| showOverlay     | boolean                 | false      | Show overlay                                                                                                         |
| showClearValue  | boolean                 | true       | Show "clear value" button                                                                                            |
| showWeekNumber  | boolean                 | true       | Show week number in calendar                                                                                         |
| selectedDays    | array, object, function | null       | http://react-day-picker.js.org/api/DayPicker#selectedDays                                                            |
| disabledDays    | array, object, function | null       | http://react-day-picker.js.org/api/DayPicker#disabledDays                                                            |
| formatDate      | function                | undefined  | If formatDate is defined, it is used to format the input date instead of dateFormat and the input date is read-only. |
| calendarType    | enum ['popup','static'] | 'popup'    | How calendar is rendered, default popup |

### Code example

```jsx
import React from 'react';
import { DateInput, DateTimeInput } from '@opuscapita/react-datetime';

constructor(props) {
  super(props)
  this.state = {
    date: null,
    dateTime: null,
    time: {
      hour: 10,
      minute: 30,
    },
  }
}

export default class SomeView extends React.Component {
  render() {
    return (
      <DateInput
        value={this.state.date}
        onChange={this.changeDate}
      />

      <DataTimeInput
        value={this.state.dateTime}
        onChange={this.changeDateTime}
      />

      <TimePicker
        time={this.state.time}
        onChange={this.changeTime}
        minutesInterval={2}
      />
    );
  }
}
```
