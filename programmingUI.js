'use strict';

// default empty display to show for new led matrixes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultDisplay = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

// the form created for every label in the moel

var EventForm = function (_React$Component) {
  _inherits(EventForm, _React$Component);

  function EventForm(props) {
    _classCallCheck(this, EventForm);

    var _this = _possibleConstructorReturn(this, (EventForm.__proto__ || Object.getPrototypeOf(EventForm)).call(this, props));

    _this.saveFunction = _this.saveFunction.bind(_this);
    _this.state = {
      servoSequence: [],
      display: [JSON.parse(JSON.stringify(defaultDisplay))],
      timeDelay: 250
    };
    _this.setServoSequence = _this.setServoSequence.bind(_this);
    _this.setDisplay = _this.setDisplay.bind(_this);
    _this.testBtnOnClick = _this.testBtnOnClick.bind(_this);
    _this.setTiming = _this.setTiming.bind(_this);
    _this.addDisplayItem = _this.addDisplayItem.bind(_this);
    _this.removeDisplayItem = _this.removeDisplayItem.bind(_this);
    return _this;
  }

  _createClass(EventForm, [{
    key: 'setDisplay',
    value: function setDisplay(displayIndex, row, index, value) {
      var newDisplay = [].concat(_toConsumableArray(this.state.display));
      newDisplay[displayIndex][row][index] = value;
      this.setState({
        display: newDisplay
      });
    }
  }, {
    key: 'setServoSequence',
    value: function setServoSequence(e) {
      this.setState({ servoSequence: e.target.value });
    }
  }, {
    key: 'setTiming',
    value: function setTiming(e) {
      this.setState({ timeDelay: e.target.value });
    }
  }, {
    key: 'addDisplayItem',
    value: function addDisplayItem(e) {
      e.preventDefault();
      var newDisplay = [].concat(_toConsumableArray(this.state.display));
      newDisplay.push(JSON.parse(JSON.stringify(defaultDisplay)));
      this.setState({
        display: newDisplay
      });
    }
  }, {
    key: 'removeDisplayItem',
    value: function removeDisplayItem(e) {
      e.preventDefault();
      var indexToRemove = parseInt(e.target.getAttribute('index'));
      var newDisplay = [].concat(_toConsumableArray(this.state.display));
      // console.log('newDisplay before: ', [...newDisplay]);
      // console.log('indexToRemove: ', indexToRemove);
      newDisplay.splice(indexToRemove, 1);
      // console.log('newDisplay after: ', [...newDisplay]);
      this.setState({
        display: newDisplay
      });
    }
  }, {
    key: 'testBtnOnClick',
    value: function testBtnOnClick(e) {
      e.preventDefault();
      if (paired) {
        var fn = ' servoSequence([' + this.state.servoSequence + '], ' + this.state.timeDelay + ');\n        writeDisplay(' + JSON.stringify(this.state.display) + ', ' + this.state.timeDelay + ');\n      ';
        // console.log('fn: ', fn);
        try {
          eval(fn);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('Please pair your Microbit first!');
      }
    }
  }, {
    key: 'saveFunction',
    value: function saveFunction(e) {
      e.preventDefault();
      var fnName = 'got' + formatLabel(this.props.label);

      var newFunction = 'servoSequence([' + this.state.servoSequence + '], ' + this.state.timeDelay + ');\n       writeDisplay(' + JSON.stringify(this.state.display) + ', ' + this.state.timeDelay + ');\n      ';

      predictFns[fnName] = new Function([], newFunction);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'form',
        null,
        React.createElement(
          'div',
          { className: 'header' },
          this.props.label != 'test' ? React.createElement(
            'label',
            null,
            'When I receive ',
            React.createElement(
              'span',
              { className: 'ml-label' },
              this.props.label
            )
          ) : React.createElement(
            'label',
            null,
            'Test your Microbit here!'
          ),
          this.props.label != 'test' && React.createElement(
            'button',
            { onClick: this.saveFunction, className: 'save-btn' },
            'save'
          )
        ),
        React.createElement(
          'div',
          { className: 'params' },
          React.createElement(ServoItem, { onChange: this.setServoSequence, value: this.state.servoSequence }),
          React.createElement(
            'div',
            { className: 'display-item-container' },
            this.state.display.map(function (item, index) {
              return React.createElement(DisplayItem, { key: index, index: index, setDisplay: _this2.setDisplay, display: _this2.state.display[index],
                removeDisplay: _this2.removeDisplayItem });
            }),
            React.createElement(
              'button',
              { className: 'add-led-btn', onClick: this.addDisplayItem },
              '+'
            )
          ),
          React.createElement(TimingItem, { onChange: this.setTiming, value: this.state.timeDelay }),
          React.createElement(TestBtn, { onClick: this.testBtnOnClick })
        )
      );
    }
  }]);

  return EventForm;
}(React.Component);

// control the servo with input syntax [motor1_angle, motor2_angle], ...


var ServoItem = function (_React$Component2) {
  _inherits(ServoItem, _React$Component2);

  function ServoItem(props) {
    _classCallCheck(this, ServoItem);

    return _possibleConstructorReturn(this, (ServoItem.__proto__ || Object.getPrototypeOf(ServoItem)).call(this, props));
  }

  _createClass(ServoItem, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'item' },
        React.createElement(
          'label',
          null,
          'Servo sequence: '
        ),
        React.createElement('input', { type: 'text',
          value: this.props.value,
          onChange: this.props.onChange,
          className: 'servo-sequence',
          placeholder: '[90, 90]',
          name: 'servo-sequence'
        }),
        React.createElement(
          'div',
          { className: 'small' },
          '[motor-1-angle, motor-2-angle], ...'
        )
      );
    }
  }]);

  return ServoItem;
}(React.Component);

// the entire display item


var DisplayItem = function (_React$Component3) {
  _inherits(DisplayItem, _React$Component3);

  function DisplayItem(props) {
    _classCallCheck(this, DisplayItem);

    return _possibleConstructorReturn(this, (DisplayItem.__proto__ || Object.getPrototypeOf(DisplayItem)).call(this, props));
  }

  _createClass(DisplayItem, [{
    key: 'render',
    value: function render() {
      var matrix = [];
      for (var i = 0; i < 5; i++) {
        for (var k = 0; k < 5; k++) {
          matrix.push(React.createElement(Led, { key: this.props.index + '-' + i + '-' + k,
            index: this.props.index + '-' + i + '-' + k,
            onChange: this.props.setDisplay,
            value: this.props.display[i][k] }));
        }
      }

      return React.createElement(
        'div',
        { className: 'item' },
        React.createElement(
          'label',
          { className: 'display-label' },
          'LED Display: '
        ),
        React.createElement(
          'div',
          { className: 'display-input' },
          matrix
        ),
        this.props.index !== 0 && React.createElement(
          'button',
          { className: 'delete-display-btn secondary', index: this.props.index, onClick: this.props.removeDisplay },
          'x'
        )
      );
    }
  }]);

  return DisplayItem;
}(React.Component);

// individual LED pixels in the display array


var Led = function (_React$Component4) {
  _inherits(Led, _React$Component4);

  function Led(props) {
    _classCallCheck(this, Led);

    var _this5 = _possibleConstructorReturn(this, (Led.__proto__ || Object.getPrototypeOf(Led)).call(this, props));

    _this5.handleClick = _this5.handleClick.bind(_this5);
    return _this5;
  }

  _createClass(Led, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var displayIndex = this.props.index.split('-')[0];
      var row = this.props.index.split('-')[1];
      var column = this.props.index.split('-')[2];
      var value = !this.props.value ? 1 : 0;
      this.props.onChange(displayIndex, row, column, value);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('input', { type: 'checkbox', className: 'checkbox',
        checked: this.props.value,
        onChange: this.handleClick,
        index: this.props.index });
    }
  }]);

  return Led;
}(React.Component);

// adjust timing in milliseconds between sequences


var TimingItem = function (_React$Component5) {
  _inherits(TimingItem, _React$Component5);

  function TimingItem(props) {
    _classCallCheck(this, TimingItem);

    return _possibleConstructorReturn(this, (TimingItem.__proto__ || Object.getPrototypeOf(TimingItem)).call(this, props));
  }

  _createClass(TimingItem, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'item' },
        React.createElement(
          'label',
          null,
          'Time Delay (ms): '
        ),
        React.createElement('input', { type: 'text',
          value: this.props.value,
          onChange: this.props.onChange,
          placeholder: '250'
        })
      );
    }
  }]);

  return TimingItem;
}(React.Component);

// test display, servo, and timing live


var TestBtn = function (_React$Component6) {
  _inherits(TestBtn, _React$Component6);

  function TestBtn(props) {
    _classCallCheck(this, TestBtn);

    return _possibleConstructorReturn(this, (TestBtn.__proto__ || Object.getPrototypeOf(TestBtn)).call(this, props));
  }

  _createClass(TestBtn, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { className: 'test-btn secondary', onClick: this.props.onClick },
        'test'
      );
    }
  }]);

  return TestBtn;
}(React.Component);