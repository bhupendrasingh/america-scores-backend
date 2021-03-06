'use strict';

const autoParse = require('auto-parse');

const utils = require('../lib/utils');
const query = utils.query;
const isValidDate = utils.isValidDate;

const errors = require('../lib/errors');
const createMalformedDateError = errors.createMalformedDateError;

const q = require('../lib/constants/queries');

// TODO: THESE SHOULD 404 WHEN GIVEN INVALID IDS

function getEvents(req) {
  return query('SELECT * FROM Event');
}

function getEvent(req) {
  var id = req.params.event_id;
  return query('SELECT * FROM Event WHERE event_id = ?', [id]);
}

function getEventsByStudent(req) {
  var id = req.params.student_id;
  return query('SELECT * FROM Event WHERE event_id IN (Select event_id FROM Measurement WHERE student_id = ?)', [id]);
}

function getEventsByProgram(req) {
  var id = req.params.program_id;
  return query('SELECT * FROM Event WHERE program_id = ?', [id]);
}

// TODO: add season logic
// TODO: pull errors from lib/errors
const CREATE_EVENT_REQS = [
  new utils.Requirement('params', 'program_id'),
  new utils.Requirement('body', 'event_date'),
  new utils.Requirement('body', 'pre_season'),
];

function createEvent(req) {
  var missingReqs = utils.findMissingRequirements(req, CREATE_EVENT_REQS);

  if (missingReqs.length !== 0) {
    return errors.createMissingFieldError(missingReqs);
  }
  var program_id = req.params.program_id;
  var event_date = req.body.event_date;

  if (!isValidDate(event_date)) {
    return createMalformedDateError();
  }

  var pre_season = autoParse(req.body.pre_season, Boolean);

  return utils.getSeasonId(event_date).then(function(season_id) {
    return query('SELECT * FROM Program WHERE program_id = ?', [program_id]).then(function(data) {
      if (data.length == 1 && data[0].program_id == program_id) {
        return query(q.INSERT_EVENT, [program_id, season_id, event_date, pre_season]).then(function(data) {
          return query('SELECT * FROM Event WHERE event_id = ?', [data.insertId]);
        });
      }
      return Promise.resolve([]);
    });
  });
}

function deleteEvent(req) {
  var event_id = req.params.event_id;
  return query('SELECT * FROM Event WHERE event_id = ?', [event_id])
  .then(function(data) {
    if (data.length == 1 && data[0].event_id == event_id) {
      return query('DELETE FROM Measurement WHERE event_id = ?', [event_id])
      .then(function() {
        return query('DELETE FROM Event WHERE event_id = ?', [event_id]);
      })
      .then(function() {
        return data;
      });
    }
    return Promise.resolve([]);
  });
};

// TODO: Probably want an update season option?

module.exports = {
  getEvents,
  getEvent,
  getEventsByStudent,
  getEventsByProgram,
  createEvent,
  deleteEvent
};
