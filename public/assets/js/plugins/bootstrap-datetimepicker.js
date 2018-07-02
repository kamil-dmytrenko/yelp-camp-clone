/*! version : 4.17.47
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */

/*


     Creative Tim Modifications

     We added class btn-primary for custom styling button.


*/

!(function(e) {
  'use strict';
  if (typeof define === 'function' && define.amd) define(['jquery', 'moment'], e);
  else if (typeof exports === 'object') module.exports = e(require('jquery'), require('moment'));
  else {
    if (typeof jQuery === 'undefined') throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
    if (typeof moment === 'undefined') throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
    e(jQuery, moment);
  }
}(function(e, t) {
  'use strict';
  if (!t) throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
  var n = function(n, a) {
    var r; var i; var o; var s; var d; var l; var p; var c = {};


    var u = !0;


    var f = !1;


    var h = !1;


    var m = 0;


    var y = [{
      clsName: 'days',
      navFnc: 'M',
      navStep: 1,
    }, {
      clsName: 'months',
      navFnc: 'y',
      navStep: 1,
    }, {
      clsName: 'years',
      navFnc: 'y',
      navStep: 10,
    }, {
      clsName: 'decades',
      navFnc: 'y',
      navStep: 100,
    }];


    var b = ['days', 'months', 'years', 'decades'];


    var g = ['top', 'bottom', 'auto'];


    var w = ['left', 'right', 'auto'];


    var v = ['default', 'top', 'bottom'];


    var k = {
      up: 38,
      38: 'up',
      down: 40,
      40: 'down',
      left: 37,
      37: 'left',
      right: 39,
      39: 'right',
      tab: 9,
      9: 'tab',
      escape: 27,
      27: 'escape',
      enter: 13,
      13: 'enter',
      pageUp: 33,
      33: 'pageUp',
      pageDown: 34,
      34: 'pageDown',
      shift: 16,
      16: 'shift',
      control: 17,
      17: 'control',
      space: 32,
      32: 'space',
      t: 84,
      84: 't',
      delete: 46,
      46: 'delete',
    };


    var D = {};


    var C = function() {
      return void 0 !== t.tz && void 0 !== a.timeZone && a.timeZone !== null && a.timeZone !== '';
    };


    var x = function(e) {
      var n;
      return n = void 0 === e || e === null ? t() : t.isDate(e) || t.isMoment(e) ? t(e) : C() ? t.tz(e, l, a.useStrict, a.timeZone) : t(e, l, a.useStrict), C() && n.tz(a.timeZone), n;
    };


    var T = function(e) {
      if (typeof e !== 'string' || e.length > 1) throw new TypeError('isEnabled expects a single character string parameter');
      switch (e) {
        case 'y':
          return d.indexOf('Y') !== -1;
        case 'M':
          return d.indexOf('M') !== -1;
        case 'd':
          return d.toLowerCase().indexOf('d') !== -1;
        case 'h':
        case 'H':
          return d.toLowerCase().indexOf('h') !== -1;
        case 'm':
          return d.indexOf('m') !== -1;
        case 's':
          return d.indexOf('s') !== -1;
        default:
          return !1;
      }
    };


    var M = function() {
      return T('h') || T('m') || T('s');
    };


    var S = function() {
      return T('y') || T('M') || T('d');
    };


    var O = function() {
      var t = e('<thead>').append(e('<tr>').append(e('<th>').addClass('prev').attr('data-action', 'previous').append(e('<span>').addClass(a.icons.previous))).append(e('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', a.calendarWeeks ? '6' : '5')).append(e('<th>').addClass('next').attr('data-action', 'next').append(e('<span>').addClass(a.icons.next))));


      var n = e('<tbody>').append(e('<tr>').append(e('<td>').attr('colspan', a.calendarWeeks ? '8' : '7')));
      return [e('<div>').addClass('datepicker-days').append(e('<table>').addClass('table-condensed').append(t).append(e('<tbody>'))), e('<div>').addClass('datepicker-months').append(e('<table>').addClass('table-condensed').append(t.clone()).append(n.clone())), e('<div>').addClass('datepicker-years').append(e('<table>').addClass('table-condensed').append(t.clone()).append(n.clone())), e('<div>').addClass('datepicker-decades').append(e('<table>').addClass('table-condensed').append(t.clone()).append(n.clone()))];
    };


    var P = function() {
      var t = e('<tr>');


      var n = e('<tr>');


      var r = e('<tr>');
      return T('h') && (t.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.incrementHour,
      }).addClass('btn').attr('data-action', 'incrementHours').append(e('<span>').addClass(a.icons.up)))), n.append(e('<td>').append(e('<span>').addClass('timepicker-hour').attr({
        'data-time-component': 'hours',
        title: a.tooltips.pickHour,
      }).attr('data-action', 'showHours'))), r.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.decrementHour,
      }).addClass('btn').attr('data-action', 'decrementHours').append(e('<span>').addClass(a.icons.down))))), T('m') && (T('h') && (t.append(e('<td>').addClass('separator')), n.append(e('<td>').addClass('separator').html(':')), r.append(e('<td>').addClass('separator'))), t.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.incrementMinute,
      }).addClass('btn').attr('data-action', 'incrementMinutes').append(e('<span>').addClass(a.icons.up)))), n.append(e('<td>').append(e('<span>').addClass('timepicker-minute').attr({
        'data-time-component': 'minutes',
        title: a.tooltips.pickMinute,
      }).attr('data-action', 'showMinutes'))), r.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.decrementMinute,
      }).addClass('btn').attr('data-action', 'decrementMinutes').append(e('<span>').addClass(a.icons.down))))), T('s') && (T('m') && (t.append(e('<td>').addClass('separator')), n.append(e('<td>').addClass('separator').html(':')), r.append(e('<td>').addClass('separator'))), t.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.incrementSecond,
      }).addClass('btn btn-link').attr('data-action', 'incrementSeconds').append(e('<span>').addClass(a.icons.up)))), n.append(e('<td>').append(e('<span>').addClass('timepicker-second').attr({
        'data-time-component': 'seconds',
        title: a.tooltips.pickSecond,
      }).attr('data-action', 'showSeconds'))), r.append(e('<td>').append(e('<a>').attr({
        href: '#',
        tabindex: '-1',
        title: a.tooltips.decrementSecond,
      }).addClass('btn btn-link').attr('data-action', 'decrementSeconds').append(e('<span>').addClass(a.icons.down))))), s || (t.append(e('<td>').addClass('separator')), n.append(e('<td>').append(e('<button>').addClass('btn btn-primary').attr({
        'data-action': 'togglePeriod',
        tabindex: '-1',
        title: a.tooltips.togglePeriod,
      }))), r.append(e('<td>').addClass('separator'))), e('<div>').addClass('timepicker-picker').append(e('<table>').addClass('table-condensed').append([t, n, r]));
    };


    var E = function() {
      var t = e('<div>').addClass('timepicker-hours').append(e('<table>').addClass('table-condensed'));


      var n = e('<div>').addClass('timepicker-minutes').append(e('<table>').addClass('table-condensed'));


      var a = e('<div>').addClass('timepicker-seconds').append(e('<table>').addClass('table-condensed'));


      var r = [P()];
      return T('h') && r.push(t), T('m') && r.push(n), T('s') && r.push(a), r;
    };


    var H = function() {
      var t = [];
      return a.showTodayButton && t.push(e('<td>').append(e('<a>').attr({
        'data-action': 'today',
        title: a.tooltips.today,
      }).append(e('<span>').addClass(a.icons.today)))), !a.sideBySide && S() && M() && t.push(e('<td>').append(e('<a>').attr({
        'data-action': 'togglePicker',
        title: a.tooltips.selectTime,
      }).append(e('<span>').addClass(a.icons.time)))), a.showClear && t.push(e('<td>').append(e('<a>').attr({
        'data-action': 'clear',
        title: a.tooltips.clear,
      }).append(e('<span>').addClass(a.icons.clear)))), a.showClose && t.push(e('<td>').append(e('<a>').attr({
        'data-action': 'close',
        title: a.tooltips.close,
      }).append(e('<span>').addClass(a.icons.close)))), e('<table>').addClass('table-condensed').append(e('<tbody>').append(e('<tr>').append(t)));
    };


    var I = function() {
      var t = e('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu');


      var n = e('<div>').addClass('datepicker').append(O());


      var r = e('<div>').addClass('timepicker').append(E());


      var i = e('<ul>').addClass('list-unstyled');


      var o = e('<li>').addClass('picker-switch' + (a.collapse ? ' accordion-toggle' : '')).append(H());
      return a.inline && t.removeClass('dropdown-menu'), s && t.addClass('usetwentyfour'), T('s') && !s && t.addClass('wider'), a.sideBySide && S() && M() ? (t.addClass('timepicker-sbs'), a.toolbarPlacement === 'top' && t.append(o), t.append(e('<div>').addClass('row').append(n.addClass('col-md-6')).append(r.addClass('col-md-6'))), a.toolbarPlacement === 'bottom' && t.append(o), t) : (a.toolbarPlacement === 'top' && i.append(o), S() && i.append(e('<li>').addClass(a.collapse && M() ? 'collapse show' : '').append(n)), a.toolbarPlacement === 'default' && i.append(o), M() && i.append(e('<li>').addClass(a.collapse && S() ? 'collapse' : '').append(r)), a.toolbarPlacement === 'bottom' && i.append(o), t.append(i));
    };


    var Y = function() {
      var t; var r = (f || n).position();


      var i = (f || n).offset();


      var o = a.widgetPositioning.vertical;


      var s = a.widgetPositioning.horizontal;
      if (a.widgetParent) t = a.widgetParent.append(h);
      else if (n.is('input')) t = n.after(h).parent();
      else {
        if (a.inline) return void (t = n.append(h));
        t = n, n.children().first().after(h);
      }
      if (o === 'auto' && (o = i.top + 1.5 * h.height() >= e(window).height() + e(window).scrollTop() && h.height() + n.outerHeight() < i.top ? 'top' : 'bottom'), s === 'auto' && (s = t.width() < i.left + h.outerWidth() / 2 && i.left + h.outerWidth() > e(window).width() ? 'right' : 'left'), o === 'top' ? h.addClass('top').removeClass('bottom') : h.addClass('bottom').removeClass('top'), s === 'right' ? h.addClass('pull-right') : h.removeClass('pull-right'), t.css('position') === 'static' && (t = t.parents().filter(function() {
        return e(this).css('position') !== 'static';
      }).first()), t.length === 0) throw new Error('datetimepicker component should be placed within a non-static positioned container');
      h.css({
        top: o === 'top' ? 'auto' : r.top + n.outerHeight(),
        bottom: o === 'top' ? t.outerHeight() - (t === n ? 0 : r.top) : 'auto',
        left: s === 'left' ? t === n ? 0 : r.left : 'auto',
        right: s === 'left' ? 'auto' : t.outerWidth() - n.outerWidth() - (t === n ? 0 : r.left),
      }), setTimeout(function() {
        h.addClass('open');
      }, 180);
    };


    var q = function(e) {
      e.type === 'dp.change' && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate) || n.trigger(e);
    };


    var B = function(e) {
      e === 'y' && (e = 'YYYY'), q({
        type: 'dp.update',
        change: e,
        viewDate: i.clone(),
      });
    };


    var j = function(e) {
      h && (e && (p = Math.max(m, Math.min(3, p + e))), h.find('.datepicker > div').hide().filter('.datepicker-' + y[p].clsName).show());
    };


    var A = function() {
      var t = e('<tr>');


      var n = i.clone().startOf('w').startOf('d');
      for (!0 === a.calendarWeeks && t.append(e('<th>').addClass('cw').text('#')); n.isBefore(i.clone().endOf('w'));) t.append(e('<th>').addClass('dow').text(n.format('dd'))), n.add(1, 'd');
      h.find('.datepicker-days thead').append(t);
    };


    var F = function(e) {
      return !0 === a.disabledDates[e.format('YYYY-MM-DD')];
    };


    var L = function(e) {
      return !0 === a.enabledDates[e.format('YYYY-MM-DD')];
    };


    var W = function(e) {
      return !0 === a.disabledHours[e.format('H')];
    };


    var z = function(e) {
      return !0 === a.enabledHours[e.format('H')];
    };


    var N = function(t, n) {
      if (!t.isValid()) return !1;
      if (a.disabledDates && n === 'd' && F(t)) return !1;
      if (a.enabledDates && n === 'd' && !L(t)) return !1;
      if (a.minDate && t.isBefore(a.minDate, n)) return !1;
      if (a.maxDate && t.isAfter(a.maxDate, n)) return !1;
      if (a.daysOfWeekDisabled && n === 'd' && a.daysOfWeekDisabled.indexOf(t.day()) !== -1) return !1;
      if (a.disabledHours && (n === 'h' || n === 'm' || n === 's') && W(t)) return !1;
      if (a.enabledHours && (n === 'h' || n === 'm' || n === 's') && !z(t)) return !1;
      if (a.disabledTimeIntervals && (n === 'h' || n === 'm' || n === 's')) {
        var r = !1;
        if (e.each(a.disabledTimeIntervals, function() {
          if (t.isBetween(this[0], this[1])) return r = !0, !1;
        }), r) return !1;
      }
      return !0;
    };


    var V = function() {
      for (var t = [], n = i.clone().startOf('y').startOf('d'); n.isSame(i, 'y');) t.push(e('<span>').attr('data-action', 'selectMonth').addClass('month').text(n.format('MMM'))), n.add(1, 'M');
      h.find('.datepicker-months td').empty().append(t);
    };


    var Z = function() {
      var t = h.find('.datepicker-months');


      var n = t.find('th');


      var o = t.find('tbody').find('span');
      n.eq(0).find('span').attr('title', a.tooltips.prevYear), n.eq(1).attr('title', a.tooltips.selectYear), n.eq(2).find('span').attr('title', a.tooltips.nextYear), t.find('.disabled').removeClass('disabled'), N(i.clone().subtract(1, 'y'), 'y') || n.eq(0).addClass('disabled'), n.eq(1).text(i.year()), N(i.clone().add(1, 'y'), 'y') || n.eq(2).addClass('disabled'), o.removeClass('active'), r.isSame(i, 'y') && !u && o.eq(r.month()).addClass('active'), o.each(function(t) {
        N(i.clone().month(t), 'M') || e(this).addClass('disabled');
      });
    };


    var R = function() {
      var e = h.find('.datepicker-years');


      var t = e.find('th');


      var n = i.clone().subtract(5, 'y');


      var o = i.clone().add(6, 'y');


      var s = '';
      for (t.eq(0).find('span').attr('title', a.tooltips.prevDecade), t.eq(1).attr('title', a.tooltips.selectDecade), t.eq(2).find('span').attr('title', a.tooltips.nextDecade), e.find('.disabled').removeClass('disabled'), a.minDate && a.minDate.isAfter(n, 'y') && t.eq(0).addClass('disabled'), t.eq(1).text(n.year() + '-' + o.year()), a.maxDate && a.maxDate.isBefore(o, 'y') && t.eq(2).addClass('disabled'); !n.isAfter(o, 'y');) s += '<span data-action="selectYear" class="year' + (n.isSame(r, 'y') && !u ? ' active' : '') + (N(n, 'y') ? '' : ' disabled') + '">' + n.year() + '</span>', n.add(1, 'y');
      e.find('td').html(s);
    };


    var Q = function() {
      var e; var n = h.find('.datepicker-decades');


      var o = n.find('th');


      var s = t({
        y: i.year() - i.year() % 100 - 1,
      });


      var d = s.clone().add(100, 'y');


      var l = s.clone();


      var p = !1;


      var c = !1;


      var u = '';
      for (o.eq(0).find('span').attr('title', a.tooltips.prevCentury), o.eq(2).find('span').attr('title', a.tooltips.nextCentury), n.find('.disabled').removeClass('disabled'), (s.isSame(t({
        y: 1900,
      })) || a.minDate && a.minDate.isAfter(s, 'y')) && o.eq(0).addClass('disabled'), o.eq(1).text(s.year() + '-' + d.year()), (s.isSame(t({
        y: 2e3,
      })) || a.maxDate && a.maxDate.isBefore(d, 'y')) && o.eq(2).addClass('disabled'); !s.isAfter(d, 'y');) e = s.year() + 12, p = a.minDate && a.minDate.isAfter(s, 'y') && a.minDate.year() <= e, c = a.maxDate && a.maxDate.isAfter(s, 'y') && a.maxDate.year() <= e, u += '<span data-action="selectDecade" class="decade' + (r.isAfter(s) && r.year() <= e ? ' active' : '') + (N(s, 'y') || p || c ? '' : ' disabled') + '" data-selection="' + (s.year() + 6) + '">' + (s.year() + 1) + ' - ' + (s.year() + 12) + '</span>', s.add(12, 'y');
      u += '<span></span><span></span><span></span>', n.find('td').html(u), o.eq(1).text(l.year() + 1 + '-' + s.year());
    };


    var U = function() {
      var t; var n; var o; var s = h.find('.datepicker-days');


      var d = s.find('th');


      var l = [];


      var p = [];
      if (S()) {
        for (d.eq(0).find('span').attr('title', a.tooltips.prevMonth), d.eq(1).attr('title', a.tooltips.selectMonth), d.eq(2).find('span').attr('title', a.tooltips.nextMonth), s.find('.disabled').removeClass('disabled'), d.eq(1).text(i.format(a.dayViewHeaderFormat)), N(i.clone().subtract(1, 'M'), 'M') || d.eq(0).addClass('disabled'), N(i.clone().add(1, 'M'), 'M') || d.eq(2).addClass('disabled'), t = i.clone().startOf('M').startOf('w').startOf('d'), o = 0; o < 42; o++) t.weekday() === 0 && (n = e('<tr>'), a.calendarWeeks && n.append('<td class="cw">' + t.week() + '</td>'), l.push(n)), p = ['day'], t.isBefore(i, 'M') && p.push('old'), t.isAfter(i, 'M') && p.push('new'), t.isSame(r, 'd') && !u && p.push('active'), N(t, 'd') || p.push('disabled'), t.isSame(x(), 'd') && p.push('today'), t.day() !== 0 && t.day() !== 6 || p.push('weekend'), q({
          type: 'dp.classify',
          date: t,
          classNames: p,
        }), n.append('<td data-action="selectDay" data-day="' + t.format('L') + '" class="' + p.join(' ') + '"><div>' + t.date() + '</div></td>'), t.add(1, 'd');
        s.find('tbody').empty().append(l), Z(), R(), Q();
      }
    };


    var G = function() {
      var t = h.find('.timepicker-hours table');


      var n = i.clone().startOf('d');


      var a = [];


      var r = e('<tr>');
      for (i.hour() > 11 && !s && n.hour(12); n.isSame(i, 'd') && (s || i.hour() < 12 && n.hour() < 12 || i.hour() > 11);) n.hour() % 4 == 0 && (r = e('<tr>'), a.push(r)), r.append('<td data-action="selectHour" class="hour' + (N(n, 'h') ? '' : ' disabled') + '"><div>' + n.format(s ? 'HH' : 'hh') + '</div></td>'), n.add(1, 'h');
      t.empty().append(a);
    };


    var J = function() {
      for (var t = h.find('.timepicker-minutes table'), n = i.clone().startOf('h'), r = [], o = e('<tr>'), s = a.stepping === 1 ? 5 : a.stepping; i.isSame(n, 'h');) n.minute() % (4 * s) == 0 && (o = e('<tr>'), r.push(o)), o.append('<td data-action="selectMinute" class="minute' + (N(n, 'm') ? '' : ' disabled') + '"><div>' + n.format('mm') + '</div></td>'), n.add(s, 'm');
      t.empty().append(r);
    };


    var K = function() {
      for (var t = h.find('.timepicker-seconds table'), n = i.clone().startOf('m'), a = [], r = e('<tr>'); i.isSame(n, 'm');) n.second() % 20 == 0 && (r = e('<tr>'), a.push(r)), r.append('<td data-action="selectSecond" class="second' + (N(n, 's') ? '' : ' disabled') + '"><div>' + n.format('ss') + '</div></td>'), n.add(5, 's');
      t.empty().append(a);
    };


    var X = function() {
      var e; var t; var n = h.find('.timepicker span[data-time-component]');
      s || (e = h.find('.timepicker [data-action=togglePeriod]'), t = r.clone().add(r.hours() >= 12 ? -12 : 12, 'h'), e.text(r.format('A')), N(t, 'h') ? e.removeClass('disabled') : e.addClass('disabled')), n.filter('[data-time-component=hours]').text(r.format(s ? 'HH' : 'hh')), n.filter('[data-time-component=minutes]').text(r.format('mm')), n.filter('[data-time-component=seconds]').text(r.format('ss')), G(), J(), K();
    };


    var $ = function() {
      h && (U(), X());
    };


    var _ = function(e) {
      var t = u ? null : r;
      if (!e) return u = !0, o.val(''), n.data('date', ''), q({
        type: 'dp.change',
        date: !1,
        oldDate: t,
      }), void $();
      if (e = e.clone().locale(a.locale), C() && e.tz(a.timeZone), a.stepping !== 1)
        for (e.minutes(Math.round(e.minutes() / a.stepping) * a.stepping).seconds(0); a.minDate && e.isBefore(a.minDate);) e.add(a.stepping, 'minutes');
      N(e) ? (i = (r = e).clone(), o.val(r.format(d)), n.data('date', r.format(d)), u = !1, $(), q({
        type: 'dp.change',
        date: r.clone(),
        oldDate: t,
      })) : (a.keepInvalid ? q({
        type: 'dp.change',
        date: e,
        oldDate: t,
      }) : o.val(u ? '' : r.format(d)), q({
        type: 'dp.error',
        date: e,
        oldDate: t,
      }));
    };


    var ee = function() {
      var t = !1;
      return h ? (h.find('.collapse').each(function() {
        var n = e(this).data('collapse');
        return !n || !n.transitioning || (t = !0, !1);
      }), t ? c : (f && f.hasClass('btn') && f.toggleClass('active'), e(window).off('resize', Y), h.off('click', '[data-action]'), h.off('mousedown', !1), h.removeClass('open'), void setTimeout(function() {
        return h.remove(), h.hide(), h = !1, q({
          type: 'dp.hide',
          date: r.clone(),
        }), o.blur(), p = 0, i = r.clone(), c;
      }, 400))) : c;
    };


    var te = function() {
      _(null);
    };


    var ne = function(e) {
      return void 0 === a.parseInputDate ? (!t.isMoment(e) || e instanceof Date) && (e = x(e)) : e = a.parseInputDate(e), e;
    };


    var ae = {
      next: function() {
        var e = y[p].navFnc;
        i.add(y[p].navStep, e), U(), B(e);
      },
      previous: function() {
        var e = y[p].navFnc;
        i.subtract(y[p].navStep, e), U(), B(e);
      },
      pickerSwitch: function() {
        j(1);
      },
      selectMonth: function(t) {
        var n = e(t.target).closest('tbody').find('span').index(e(t.target));
        i.month(n), p === m ? (_(r.clone().year(i.year()).month(i.month())), a.inline || ee()) : (j(-1), U()), B('M');
      },
      selectYear: function(t) {
        var n = parseInt(e(t.target).text(), 10) || 0;
        i.year(n), p === m ? (_(r.clone().year(i.year())), a.inline || ee()) : (j(-1), U()), B('YYYY');
      },
      selectDecade: function(t) {
        var n = parseInt(e(t.target).data('selection'), 10) || 0;
        i.year(n), p === m ? (_(r.clone().year(i.year())), a.inline || ee()) : (j(-1), U()), B('YYYY');
      },
      selectDay: function(t) {
        var n = i.clone();
        e(t.target).is('.old') && n.subtract(1, 'M'), e(t.target).is('.new') && n.add(1, 'M'), _(n.date(parseInt(e(t.target).text(), 10))), M() || a.keepOpen || a.inline || ee();
      },
      incrementHours: function() {
        var e = r.clone().add(1, 'h');
        N(e, 'h') && _(e);
      },
      incrementMinutes: function() {
        var e = r.clone().add(a.stepping, 'm');
        N(e, 'm') && _(e);
      },
      incrementSeconds: function() {
        var e = r.clone().add(1, 's');
        N(e, 's') && _(e);
      },
      decrementHours: function() {
        var e = r.clone().subtract(1, 'h');
        N(e, 'h') && _(e);
      },
      decrementMinutes: function() {
        var e = r.clone().subtract(a.stepping, 'm');
        N(e, 'm') && _(e);
      },
      decrementSeconds: function() {
        var e = r.clone().subtract(1, 's');
        N(e, 's') && _(e);
      },
      togglePeriod: function() {
        _(r.clone().add(r.hours() >= 12 ? -12 : 12, 'h'));
      },
      togglePicker: function(t) {
        var n; var r = e(t.target);


        var i = r.closest('ul');


        var o = i.find('.show');


        var s = i.find('.collapse:not(.show)');
        if (o && o.length) {
          if ((n = o.data('collapse')) && n.transitioning) return;
          o.collapse ? (o.collapse('hide'), s.collapse('show')) : (o.removeClass('show'), s.addClass('show')), r.is('span') ? r.toggleClass(a.icons.time + ' ' + a.icons.date) : r.find('span').toggleClass(a.icons.time + ' ' + a.icons.date);
        }
      },
      showPicker: function() {
        h.find('.timepicker > div:not(.timepicker-picker)').hide(), h.find('.timepicker .timepicker-picker').show();
      },
      showHours: function() {
        h.find('.timepicker .timepicker-picker').hide(), h.find('.timepicker .timepicker-hours').show();
      },
      showMinutes: function() {
        h.find('.timepicker .timepicker-picker').hide(), h.find('.timepicker .timepicker-minutes').show();
      },
      showSeconds: function() {
        h.find('.timepicker .timepicker-picker').hide(), h.find('.timepicker .timepicker-seconds').show();
      },
      selectHour: function(t) {
        var n = parseInt(e(t.target).text(), 10);
        s || (r.hours() >= 12 ? n !== 12 && (n += 12) : n === 12 && (n = 0)), _(r.clone().hours(n)), ae.showPicker.call(c);
      },
      selectMinute: function(t) {
        _(r.clone().minutes(parseInt(e(t.target).text(), 10))), ae.showPicker.call(c);
      },
      selectSecond: function(t) {
        _(r.clone().seconds(parseInt(e(t.target).text(), 10))), ae.showPicker.call(c);
      },
      clear: te,
      today: function() {
        var e = x();
        N(e, 'd') && _(e);
      },
      close: ee,
    };


    var re = function(t) {
      return !e(t.currentTarget).is('.disabled') && (ae[e(t.currentTarget).data('action')].apply(c, arguments), !1);
    };


    var ie = function() {
      var t; var n = {
        year: function(e) {
          return e.month(0).date(1).hours(0).seconds(0).minutes(0);
        },
        month: function(e) {
          return e.date(1).hours(0).seconds(0).minutes(0);
        },
        day: function(e) {
          return e.hours(0).seconds(0).minutes(0);
        },
        hour: function(e) {
          return e.seconds(0).minutes(0);
        },
        minute: function(e) {
          return e.seconds(0);
        },
      };
      return o.prop('disabled') || !a.ignoreReadonly && o.prop('readonly') || h ? c : (void 0 !== o.val() && o.val().trim().length !== 0 ? _(ne(o.val().trim())) : u && a.useCurrent && (a.inline || o.is('input') && o.val().trim().length === 0) && (t = x(), typeof a.useCurrent === 'string' && (t = n[a.useCurrent](t)), _(t)), h = I(), A(), V(), h.find('.timepicker-hours').hide(), h.find('.timepicker-minutes').hide(), h.find('.timepicker-seconds').hide(), $(), j(), e(window).on('resize', Y), h.on('click', '[data-action]', re), h.on('mousedown', !1), f && f.hasClass('btn') && f.toggleClass('active'), Y(), h.show(), a.focusOnShow && !o.is(':focus') && o.focus(), q({
        type: 'dp.show',
      }), c);
    };


    var oe = function() {
      return h ? ee() : ie();
    };


    var se = function(e) {
      var t; var n; var r; var i; var o = null;


      var s = [];


      var d = {};


      var l = e.which;
      D[l] = 'p';
      for (t in D) D.hasOwnProperty(t) && D[t] === 'p' && (s.push(t), parseInt(t, 10) !== l && (d[t] = !0));
      for (t in a.keyBinds)
        if (a.keyBinds.hasOwnProperty(t) && typeof a.keyBinds[t] === 'function' && (r = t.split(' ')).length === s.length && k[l] === r[r.length - 1]) {
          for (i = !0, n = r.length - 2; n >= 0; n--)
            if (!(k[r[n]] in d)) {
              i = !1;
              break;
            }
          if (i) {
            o = a.keyBinds[t];
            break;
          }
        }
      o && (o.call(c, h), e.stopPropagation(), e.preventDefault());
    };


    var de = function(e) {
      D[e.which] = 'r', e.stopPropagation(), e.preventDefault();
    };


    var le = function(t) {
      var n = e(t.target).val().trim();


      var a = n ? ne(n) : null;
      return _(a), t.stopImmediatePropagation(), !1;
    };


    var pe = function() {
      o.off({
        change: le,
        blur: blur,
        keydown: se,
        keyup: de,
        focus: a.allowInputToggle ? ee : '',
      }), n.is('input') ? o.off({
        focus: ie,
      }) : f && (f.off('click', oe), f.off('mousedown', !1));
    };


    var ce = function(t) {
      var n = {};
      return e.each(t, function() {
        var e = ne(this);
        e.isValid() && (n[e.format('YYYY-MM-DD')] = !0);
      }), !!Object.keys(n).length && n;
    };


    var ue = function(t) {
      var n = {};
      return e.each(t, function() {
        n[this] = !0;
      }), !!Object.keys(n).length && n;
    };


    var fe = function() {
      var e = a.format || 'L LT';
      d = e.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(e) {
        return (r.localeData().longDateFormat(e) || e).replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(e) {
          return r.localeData().longDateFormat(e) || e;
        });
      }), (l = a.extraFormats ? a.extraFormats.slice() : []).indexOf(e) < 0 && l.indexOf(d) < 0 && l.push(d), s = d.toLowerCase().indexOf('a') < 1 && d.replace(/\[.*?\]/g, '').indexOf('h') < 1, T('y') && (m = 2), T('M') && (m = 1), T('d') && (m = 0), p = Math.max(m, p), u || _(r);
    };
    if (c.destroy = function() {
      ee(), pe(), n.removeData('DateTimePicker'), n.removeData('date');
    }, c.toggle = oe, c.show = ie, c.hide = ee, c.disable = function() {
      return ee(), f && f.hasClass('btn') && f.addClass('disabled'), o.prop('disabled', !0), c;
    }, c.enable = function() {
      return f && f.hasClass('btn') && f.removeClass('disabled'), o.prop('disabled', !1), c;
    }, c.ignoreReadonly = function(e) {
      if (arguments.length === 0) return a.ignoreReadonly;
      if (typeof e !== 'boolean') throw new TypeError('ignoreReadonly () expects a boolean parameter');
      return a.ignoreReadonly = e, c;
    }, c.options = function(t) {
      if (arguments.length === 0) return e.extend(!0, {}, a);
      if (!(t instanceof Object)) throw new TypeError('options() options parameter should be an object');
      return e.extend(!0, a, t), e.each(a, function(e, t) {
        if (void 0 === c[e]) throw new TypeError('option ' + e + ' is not recognized!');
        c[e](t);
      }), c;
    }, c.date = function(e) {
      if (arguments.length === 0) return u ? null : r.clone();
      if (!(e === null || typeof e === 'string' || t.isMoment(e) || e instanceof Date)) throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
      return _(e === null ? null : ne(e)), c;
    }, c.format = function(e) {
      if (arguments.length === 0) return a.format;
      if (typeof e !== 'string' && (typeof e !== 'boolean' || !1 !== e)) throw new TypeError('format() expects a string or boolean:false parameter ' + e);
      return a.format = e, d && fe(), c;
    }, c.timeZone = function(e) {
      if (arguments.length === 0) return a.timeZone;
      if (typeof e !== 'string') throw new TypeError('newZone() expects a string parameter');
      return a.timeZone = e, c;
    }, c.dayViewHeaderFormat = function(e) {
      if (arguments.length === 0) return a.dayViewHeaderFormat;
      if (typeof e !== 'string') throw new TypeError('dayViewHeaderFormat() expects a string parameter');
      return a.dayViewHeaderFormat = e, c;
    }, c.extraFormats = function(e) {
      if (arguments.length === 0) return a.extraFormats;
      if (!1 !== e && !(e instanceof Array)) throw new TypeError('extraFormats() expects an array or false parameter');
      return a.extraFormats = e, l && fe(), c;
    }, c.disabledDates = function(t) {
      if (arguments.length === 0) return a.disabledDates ? e.extend({}, a.disabledDates) : a.disabledDates;
      if (!t) return a.disabledDates = !1, $(), c;
      if (!(t instanceof Array)) throw new TypeError('disabledDates() expects an array parameter');
      return a.disabledDates = ce(t), a.enabledDates = !1, $(), c;
    }, c.enabledDates = function(t) {
      if (arguments.length === 0) return a.enabledDates ? e.extend({}, a.enabledDates) : a.enabledDates;
      if (!t) return a.enabledDates = !1, $(), c;
      if (!(t instanceof Array)) throw new TypeError('enabledDates() expects an array parameter');
      return a.enabledDates = ce(t), a.disabledDates = !1, $(), c;
    }, c.daysOfWeekDisabled = function(e) {
      if (arguments.length === 0) return a.daysOfWeekDisabled.splice(0);
      if (typeof e === 'boolean' && !e) return a.daysOfWeekDisabled = !1, $(), c;
      if (!(e instanceof Array)) throw new TypeError('daysOfWeekDisabled() expects an array parameter');
      if (a.daysOfWeekDisabled = e.reduce(function(e, t) {
        return (t = parseInt(t, 10)) > 6 || t < 0 || isNaN(t) ? e : (e.indexOf(t) === -1 && e.push(t), e);
      }, []).sort(), a.useCurrent && !a.keepInvalid) {
        for (var t = 0; !N(r, 'd');) {
          if (r.add(1, 'd'), t === 31) throw 'Tried 31 times to find a valid date';
          t++;
        }
        _(r);
      }
      return $(), c;
    }, c.maxDate = function(e) {
      if (arguments.length === 0) return a.maxDate ? a.maxDate.clone() : a.maxDate;
      if (typeof e === 'boolean' && !1 === e) return a.maxDate = !1, $(), c;
      typeof e === 'string' && (e !== 'now' && e !== 'moment' || (e = x()));
      var t = ne(e);
      if (!t.isValid()) throw new TypeError('maxDate() Could not parse date parameter: ' + e);
      if (a.minDate && t.isBefore(a.minDate)) throw new TypeError('maxDate() date parameter is before options.minDate: ' + t.format(d));
      return a.maxDate = t, a.useCurrent && !a.keepInvalid && r.isAfter(e) && _(a.maxDate), i.isAfter(t) && (i = t.clone().subtract(a.stepping, 'm')), $(), c;
    }, c.minDate = function(e) {
      if (arguments.length === 0) return a.minDate ? a.minDate.clone() : a.minDate;
      if (typeof e === 'boolean' && !1 === e) return a.minDate = !1, $(), c;
      typeof e === 'string' && (e !== 'now' && e !== 'moment' || (e = x()));
      var t = ne(e);
      if (!t.isValid()) throw new TypeError('minDate() Could not parse date parameter: ' + e);
      if (a.maxDate && t.isAfter(a.maxDate)) throw new TypeError('minDate() date parameter is after options.maxDate: ' + t.format(d));
      return a.minDate = t, a.useCurrent && !a.keepInvalid && r.isBefore(e) && _(a.minDate), i.isBefore(t) && (i = t.clone().add(a.stepping, 'm')), $(), c;
    }, c.defaultDate = function(e) {
      if (arguments.length === 0) return a.defaultDate ? a.defaultDate.clone() : a.defaultDate;
      if (!e) return a.defaultDate = !1, c;
      typeof e === 'string' && (e = e === 'now' || e === 'moment' ? x() : x(e));
      var t = ne(e);
      if (!t.isValid()) throw new TypeError('defaultDate() Could not parse date parameter: ' + e);
      if (!N(t)) throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
      return a.defaultDate = t, (a.defaultDate && a.inline || o.val().trim() === '') && _(a.defaultDate), c;
    }, c.locale = function(e) {
      if (arguments.length === 0) return a.locale;
      if (!t.localeData(e)) throw new TypeError('locale() locale ' + e + ' is not loaded from moment locales!');
      return a.locale = e, r.locale(a.locale), i.locale(a.locale), d && fe(), h && (ee(), ie()), c;
    }, c.stepping = function(e) {
      return arguments.length === 0 ? a.stepping : (e = parseInt(e, 10), (isNaN(e) || e < 1) && (e = 1), a.stepping = e, c);
    }, c.useCurrent = function(e) {
      var t = ['year', 'month', 'day', 'hour', 'minute'];
      if (arguments.length === 0) return a.useCurrent;
      if (typeof e !== 'boolean' && typeof e !== 'string') throw new TypeError('useCurrent() expects a boolean or string parameter');
      if (typeof e === 'string' && t.indexOf(e.toLowerCase()) === -1) throw new TypeError('useCurrent() expects a string parameter of ' + t.join(', '));
      return a.useCurrent = e, c;
    }, c.collapse = function(e) {
      if (arguments.length === 0) return a.collapse;
      if (typeof e !== 'boolean') throw new TypeError('collapse() expects a boolean parameter');
      return a.collapse === e ? c : (a.collapse = e, h && (ee(), ie()), c);
    }, c.icons = function(t) {
      if (arguments.length === 0) return e.extend({}, a.icons);
      if (!(t instanceof Object)) throw new TypeError('icons() expects parameter to be an Object');
      return e.extend(a.icons, t), h && (ee(), ie()), c;
    }, c.tooltips = function(t) {
      if (arguments.length === 0) return e.extend({}, a.tooltips);
      if (!(t instanceof Object)) throw new TypeError('tooltips() expects parameter to be an Object');
      return e.extend(a.tooltips, t), h && (ee(), ie()), c;
    }, c.useStrict = function(e) {
      if (arguments.length === 0) return a.useStrict;
      if (typeof e !== 'boolean') throw new TypeError('useStrict() expects a boolean parameter');
      return a.useStrict = e, c;
    }, c.sideBySide = function(e) {
      if (arguments.length === 0) return a.sideBySide;
      if (typeof e !== 'boolean') throw new TypeError('sideBySide() expects a boolean parameter');
      return a.sideBySide = e, h && (ee(), ie()), c;
    }, c.viewMode = function(e) {
      if (arguments.length === 0) return a.viewMode;
      if (typeof e !== 'string') throw new TypeError('viewMode() expects a string parameter');
      if (b.indexOf(e) === -1) throw new TypeError('viewMode() parameter must be one of (' + b.join(', ') + ') value');
      return a.viewMode = e, p = Math.max(b.indexOf(e), m), j(), c;
    }, c.toolbarPlacement = function(e) {
      if (arguments.length === 0) return a.toolbarPlacement;
      if (typeof e !== 'string') throw new TypeError('toolbarPlacement() expects a string parameter');
      if (v.indexOf(e) === -1) throw new TypeError('toolbarPlacement() parameter must be one of (' + v.join(', ') + ') value');
      return a.toolbarPlacement = e, h && (ee(), ie()), c;
    }, c.widgetPositioning = function(t) {
      if (arguments.length === 0) return e.extend({}, a.widgetPositioning);
      if ({}.toString.call(t) !== '[object Object]') throw new TypeError('widgetPositioning() expects an object variable');
      if (t.horizontal) {
        if (typeof t.horizontal !== 'string') throw new TypeError('widgetPositioning() horizontal variable must be a string');
        if (t.horizontal = t.horizontal.toLowerCase(), w.indexOf(t.horizontal) === -1) throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + w.join(', ') + ')');
        a.widgetPositioning.horizontal = t.horizontal;
      }
      if (t.vertical) {
        if (typeof t.vertical !== 'string') throw new TypeError('widgetPositioning() vertical variable must be a string');
        if (t.vertical = t.vertical.toLowerCase(), g.indexOf(t.vertical) === -1) throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + g.join(', ') + ')');
        a.widgetPositioning.vertical = t.vertical;
      }
      return $(), c;
    }, c.calendarWeeks = function(e) {
      if (arguments.length === 0) return a.calendarWeeks;
      if (typeof e !== 'boolean') throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
      return a.calendarWeeks = e, $(), c;
    }, c.showTodayButton = function(e) {
      if (arguments.length === 0) return a.showTodayButton;
      if (typeof e !== 'boolean') throw new TypeError('showTodayButton() expects a boolean parameter');
      return a.showTodayButton = e, h && (ee(), ie()), c;
    }, c.showClear = function(e) {
      if (arguments.length === 0) return a.showClear;
      if (typeof e !== 'boolean') throw new TypeError('showClear() expects a boolean parameter');
      return a.showClear = e, h && (ee(), ie()), c;
    }, c.widgetParent = function(t) {
      if (arguments.length === 0) return a.widgetParent;
      if (typeof t === 'string' && (t = e(t)), t !== null && typeof t !== 'string' && !(t instanceof e)) throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
      return a.widgetParent = t, h && (ee(), ie()), c;
    }, c.keepOpen = function(e) {
      if (arguments.length === 0) return a.keepOpen;
      if (typeof e !== 'boolean') throw new TypeError('keepOpen() expects a boolean parameter');
      return a.keepOpen = e, c;
    }, c.focusOnShow = function(e) {
      if (arguments.length === 0) return a.focusOnShow;
      if (typeof e !== 'boolean') throw new TypeError('focusOnShow() expects a boolean parameter');
      return a.focusOnShow = e, c;
    }, c.inline = function(e) {
      if (arguments.length === 0) return a.inline;
      if (typeof e !== 'boolean') throw new TypeError('inline() expects a boolean parameter');
      return a.inline = e, c;
    }, c.clear = function() {
      return te(), c;
    }, c.keyBinds = function(e) {
      return arguments.length === 0 ? a.keyBinds : (a.keyBinds = e, c);
    }, c.getMoment = function(e) {
      return x(e);
    }, c.debug = function(e) {
      if (typeof e !== 'boolean') throw new TypeError('debug() expects a boolean parameter');
      return a.debug = e, c;
    }, c.allowInputToggle = function(e) {
      if (arguments.length === 0) return a.allowInputToggle;
      if (typeof e !== 'boolean') throw new TypeError('allowInputToggle() expects a boolean parameter');
      return a.allowInputToggle = e, c;
    }, c.showClose = function(e) {
      if (arguments.length === 0) return a.showClose;
      if (typeof e !== 'boolean') throw new TypeError('showClose() expects a boolean parameter');
      return a.showClose = e, c;
    }, c.keepInvalid = function(e) {
      if (arguments.length === 0) return a.keepInvalid;
      if (typeof e !== 'boolean') throw new TypeError('keepInvalid() expects a boolean parameter');
      return a.keepInvalid = e, c;
    }, c.datepickerInput = function(e) {
      if (arguments.length === 0) return a.datepickerInput;
      if (typeof e !== 'string') throw new TypeError('datepickerInput() expects a string parameter');
      return a.datepickerInput = e, c;
    }, c.parseInputDate = function(e) {
      if (arguments.length === 0) return a.parseInputDate;
      if (typeof e !== 'function') throw new TypeError('parseInputDate() sholud be as function');
      return a.parseInputDate = e, c;
    }, c.disabledTimeIntervals = function(t) {
      if (arguments.length === 0) return a.disabledTimeIntervals ? e.extend({}, a.disabledTimeIntervals) : a.disabledTimeIntervals;
      if (!t) return a.disabledTimeIntervals = !1, $(), c;
      if (!(t instanceof Array)) throw new TypeError('disabledTimeIntervals() expects an array parameter');
      return a.disabledTimeIntervals = t, $(), c;
    }, c.disabledHours = function(t) {
      if (arguments.length === 0) return a.disabledHours ? e.extend({}, a.disabledHours) : a.disabledHours;
      if (!t) return a.disabledHours = !1, $(), c;
      if (!(t instanceof Array)) throw new TypeError('disabledHours() expects an array parameter');
      if (a.disabledHours = ue(t), a.enabledHours = !1, a.useCurrent && !a.keepInvalid) {
        for (var n = 0; !N(r, 'h');) {
          if (r.add(1, 'h'), n === 24) throw 'Tried 24 times to find a valid date';
          n++;
        }
        _(r);
      }
      return $(), c;
    }, c.enabledHours = function(t) {
      if (arguments.length === 0) return a.enabledHours ? e.extend({}, a.enabledHours) : a.enabledHours;
      if (!t) return a.enabledHours = !1, $(), c;
      if (!(t instanceof Array)) throw new TypeError('enabledHours() expects an array parameter');
      if (a.enabledHours = ue(t), a.disabledHours = !1, a.useCurrent && !a.keepInvalid) {
        for (var n = 0; !N(r, 'h');) {
          if (r.add(1, 'h'), n === 24) throw 'Tried 24 times to find a valid date';
          n++;
        }
        _(r);
      }
      return $(), c;
    }, c.viewDate = function(e) {
      if (arguments.length === 0) return i.clone();
      if (!e) return i = r.clone(), c;
      if (!(typeof e === 'string' || t.isMoment(e) || e instanceof Date)) throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
      return i = ne(e), B(), c;
    }, n.is('input')) o = n;
    else if ((o = n.find(a.datepickerInput)).length === 0) o = n.find('input');
    else if (!o.is('input')) throw new Error('CSS class "' + a.datepickerInput + '" cannot be applied to non input element');
    if (n.hasClass('input-group') && (f = n.find('.datepickerbutton').length === 0 ? n.find('.input-group-addon') : n.find('.datepickerbutton')), !a.inline && !o.is('input')) throw new Error('Could not initialize DateTimePicker without an input element');
    return r = x(), i = r.clone(), e.extend(!0, a, (function() {
      var t; var r = {};
      return (t = n.is('input') || a.inline ? n.data() : n.find('input').data()).dateOptions && t.dateOptions instanceof Object && (r = e.extend(!0, r, t.dateOptions)), e.each(a, function(e) {
        var n = 'date' + e.charAt(0).toUpperCase() + e.slice(1);
        void 0 !== t[n] && (r[e] = t[n]);
      }), r;
    }())), c.options(a), fe(), o.on({
      change: le,
      blur: a.debug ? '' : ee,
      keydown: se,
      keyup: de,
      focus: a.allowInputToggle ? ie : '',
    }), n.is('input') ? o.on({
      focus: ie,
    }) : f && (f.on('click', oe), f.on('mousedown', !1)), o.prop('disabled') && c.disable(), o.is('input') && o.val().trim().length !== 0 ? _(ne(o.val().trim())) : a.defaultDate && void 0 === o.attr('placeholder') && _(a.defaultDate), a.inline && ie(), c;
  };
  return e.fn.datetimepicker = function(t) {
    t = t || {};
    var a; var r = Array.prototype.slice.call(arguments, 1);


    var i = !0;


    var o = ['destroy', 'hide', 'show', 'toggle'];
    if (typeof t === 'object') return this.each(function() {
      var a; var r = e(this);
      r.data('DateTimePicker') || (a = e.extend(!0, {}, e.fn.datetimepicker.defaults, t), r.data('DateTimePicker', n(r, a)));
    });
    if (typeof t === 'string') return this.each(function() {
      var n = e(this).data('DateTimePicker');
      if (!n) throw new Error('bootstrap-datetimepicker("' + t + '") method was called on an element that is not using DateTimePicker');
      a = n[t].apply(n, r), i = a === n;
    }), i || e.inArray(t, o) > -1 ? this : a;
    throw new TypeError('Invalid arguments for DateTimePicker: ' + t);
  }, e.fn.datetimepicker.defaults = {
    timeZone: '',
    format: !1,
    dayViewHeaderFormat: 'MMMM YYYY',
    extraFormats: !1,
    stepping: 1,
    minDate: !1,
    maxDate: !1,
    useCurrent: !0,
    collapse: !0,
    locale: t.locale(),
    defaultDate: !1,
    disabledDates: !1,
    enabledDates: !1,
    icons: {
      time: 'glyphicon glyphicon-time',
      date: 'glyphicon glyphicon-calendar',
      up: 'glyphicon glyphicon-chevron-up',
      down: 'glyphicon glyphicon-chevron-down',
      previous: 'glyphicon glyphicon-chevron-left',
      next: 'glyphicon glyphicon-chevron-right',
      today: 'glyphicon glyphicon-screenshot',
      clear: 'glyphicon glyphicon-trash',
      close: 'glyphicon glyphicon-remove',
    },
    tooltips: {
      today: 'Go to today',
      clear: 'Clear selection',
      close: 'Close the picker',
      selectMonth: 'Select Month',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      selectYear: 'Select Year',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      selectDecade: 'Select Decade',
      prevDecade: 'Previous Decade',
      nextDecade: 'Next Decade',
      prevCentury: 'Previous Century',
      nextCentury: 'Next Century',
      pickHour: 'Pick Hour',
      incrementHour: 'Increment Hour',
      decrementHour: 'Decrement Hour',
      pickMinute: 'Pick Minute',
      incrementMinute: 'Increment Minute',
      decrementMinute: 'Decrement Minute',
      pickSecond: 'Pick Second',
      incrementSecond: 'Increment Second',
      decrementSecond: 'Decrement Second',
      togglePeriod: 'Toggle Period',
      selectTime: 'Select Time',
    },
    useStrict: !1,
    sideBySide: !1,
    daysOfWeekDisabled: !1,
    calendarWeeks: !1,
    viewMode: 'days',
    toolbarPlacement: 'default',
    showTodayButton: !1,
    showClear: !1,
    showClose: !1,
    widgetPositioning: {
      horizontal: 'auto',
      vertical: 'auto',
    },
    widgetParent: null,
    ignoreReadonly: !1,
    keepOpen: !1,
    focusOnShow: !0,
    inline: !1,
    keepInvalid: !1,
    datepickerInput: '.datepickerinput',
    keyBinds: {
      up: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') ? this.date(t.clone().subtract(7, 'd')) : this.date(t.clone().add(this.stepping(), 'm'));
        }
      },
      down: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') ? this.date(t.clone().add(7, 'd')) : this.date(t.clone().subtract(this.stepping(), 'm'));
        } else this.show();
      },
      'control up': function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') ? this.date(t.clone().subtract(1, 'y')) : this.date(t.clone().add(1, 'h'));
        }
      },
      'control down': function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') ? this.date(t.clone().add(1, 'y')) : this.date(t.clone().subtract(1, 'h'));
        }
      },
      left: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') && this.date(t.clone().subtract(1, 'd'));
        }
      },
      right: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') && this.date(t.clone().add(1, 'd'));
        }
      },
      pageUp: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') && this.date(t.clone().subtract(1, 'M'));
        }
      },
      pageDown: function(e) {
        if (e) {
          var t = this.date() || this.getMoment();
          e.find('.datepicker').is(':visible') && this.date(t.clone().add(1, 'M'));
        }
      },
      enter: function() {
        this.hide();
      },
      escape: function() {
        this.hide();
      },
      'control space': function(e) {
        e && e.find('.timepicker').is(':visible') && e.find('.btn[data-action="togglePeriod"]').click();
      },
      t: function() {
        this.date(this.getMoment());
      },
      delete: function() {
        this.clear();
      },
    },
    debug: !1,
    allowInputToggle: !1,
    disabledTimeIntervals: !1,
    disabledHours: !1,
    enabledHours: !1,
    viewDate: !1,
  }, e.fn.datetimepicker;
}));
