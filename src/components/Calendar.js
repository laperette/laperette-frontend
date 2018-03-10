import React, { Component } from 'react';
import { DataService } from '../services/DataService';
import { Calendar as Cal, CalendarControls } from 'react-yearly-calendar';
import * as moment from 'moment';
import 'moment/locale/fr';
import './calendar.css';

export default class Calendar extends Component {
  constructor() {
    super();
    moment().locale('fr');
    const today = moment();
    this.state = {
      bookings: [],
      year: today.year(),
      selectedDay: today
    };
  }
  componentDidMount() {
    DataService.getInstance()
      .fetchBookings()
      .then(bookings => {
        console.log(bookings);
        this.setState({ bookings });
      });
  }
  onNextYear() {
    const { year } = this.state;
    this.setState({ year: year + 1 });
  }
  onPrevYear() {
    const { year } = this.state;
    this.setState({ year: year - 1 });
  }
  goToToday() {
    const today = moment();
    this.setState({
      selectedDay: today,
      year: today.year()
    });
  }
  renderStyles() {
    let styles = ``;
    let customClasses = {};
    this.state.bookings.forEach(b => {
      const className = `booking-${b.id}`;
      styles += `table.calendar td.${className} {
        background:${b.booker.color};
      } 
      `;
      customClasses[className] = { start: b.start, end: b.end };
    });
    return { styles, customClasses };
  }
  onDayClicked(day, classes) {
    if (classes && classes.indexOf('booking') !== -1) {
      console.log('booking clicked', day, classes);
      console.log(this.getBookingFromDate(day));
    }
  }

  getBookingFromDate(date) {
    return this.state.bookings.find(b => date.isBetween(b.start, b.end));
  }

  render() {
    const { year, selectedDay } = this.state;
    const { styles, customClasses } = this.renderStyles();
    return (
      <div id="calendar">
        <style>{styles}</style>
        <CalendarControls
          year={year}
          onPrevYear={this.onPrevYear.bind(this)}
          onNextYear={this.onNextYear.bind(this)}
          showTodayButton={true}
          goToToday={this.goToToday.bind(this)}
        />
        <Cal
          year={year}
          forceFullWeeks={true}
          firstDayOfWeek={0}
          selectedDay={selectedDay}
          showWeekSeparators={true}
          customClasses={customClasses}
          onPickDate={this.onDayClicked.bind(this)}
        />
      </div>
    );
  }
}
