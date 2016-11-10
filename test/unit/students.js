// TODO Errors reserved for exceptional cases: searching for student that doesn’t
//  exist happens often. Just send empty object UPDATE TESTS

// Set the env to test
process.env.NODE_ENV = 'test';

// Require the testing dependencies
var chai = require('chai');
var assert = chai.assert;

// The file to be tested
var students = require('../../routes/students');

// Get DB connection for use in asserts
// TODO: Replace calls to getStudents in unrelated tests with actual queries
// to the test DB using a DB connection (SELECT * FROM Student)

// A function for getting all the student data in the database
// TODO: Replace this with the SQL call mentioned above so that we don't depend
// on a function written by you in every test
function getAllStudents() {
  return students.getStudents({});
}

// Create example students for expected results
// TODO Update student ID values to match what's in the test DB
var percy = {
  'student_id': 1,
  'first_name': 'Percy',
  'last_name': 'Jackson',
  'dob': new Date(93, 7, 18)
};

var perseus = {
  'student_id': 1,
  'first_name': 'Perseus',
  'last_name': 'Jackson',
  'dob': new Date(93, 7, 18)
};

var annabethURL = {
  'first_name': 'Annabeth',
  'last_name': 'Chase',
  'dob': '07/12/1993'
};

var annabeth = {
  'student_id': 2,
  'first_name': 'Annabeth',
  'last_name': 'Chase',
  'dob': new Date(93, 6, 12)
};

var brian = {
  'student_id': 3,
  'first_name': 'Brian',
  'last_name': 'Smith',
  'dob': new Date(93, 4, 12)
};

var daveURL = {
  'first_name': 'Dave',
  'last_name': 'Strider',
  'dob': '12/03/1995'
};

var dave = {
  'student_id': 4,
  'first_name': 'Dave',
  'last_name': 'Strider',
  'dob': new Date(95, 11, 3)
};

// Students testing block
describe('Students', function() {
  describe('getStudents(req)', function() {
    it('should get all the students in the database', function() {
      // GET all doesn't need anything from the request, so pass in empty
      var promise = students.getStudents({});

      // When the promised data is returned, check it against the expected data
      promise.then(function(data) {
        assert.deepEqual([percy, annabeth], data);
        done();
      });
    });

    it('should be able to get a student using first, last name and birthday',
    function() {
      var req = {
        query: {
          first_name: 'Percy',
          last_name: 'Jackson',
          // NOTE: In the URL, this will be a string. Convert to date object.
          dob: '08/18/1993'
        }
      };

      var promise = students.getStudents(req);

      promise.then(function(data) {
        // Check that we received the correct student
        assert.deepEqual([percy], data);
      });
    });

    xit('should get all the students for a given site',
    function() {
      var req = {
        params: {
          site_id: 2
        }
      };

      var promise = students.getStudents(req);

      promise.then(function(data) {
        // Check that we received the correct students
        assert.deepEqual([brian], data);
      });
    });

    xit('should get all the students for a given roster/program',
    function() {
      var req = {
        params: {
          program_id: 1
        }
      };

      var promise = students.getStudents(req);

      promise.then(function(data) {
        // Check that we received the correct students
        assert.deepEqual([annabeth], data);
      });
    });

    xit('should get all the students associated with a given event',
    function() {
      var req = {
        params: {
          event_id: 5
        }
      };

      var promise = students.getStudents(req);

      promise.then(function(data) {
        // Check that we received the correct students
        assert.deepEqual([annabeth], data);
      });
    });

    xit('should give an error if birthdate is not parseable to a date object',
    function() {
      var req = {
        query: {
          first_name: 'Percy',
          last_name: 'Jackson',
          dob: '08/woof199!!!3'
        }
      };

      // Assert that an error is thrown when an invalid date is given
      assert.throw(function() {
        students.getStudents(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.getStudents(req);
      promise.then(function(result) {
        assert.equal(result.message,
        'Failed to get student due to invalid birthdate. Try mm/dd/yyyy.');
        done();
      });
    });
  });

  describe('getStudent(req)', function() {
    xit('should get an existing student by id', function() {
      var req = {
        params: {
          // The student_id is contained in the request
          student_id: 1
        }
      };

      var promise = students.getStudent(req);

      promise.then(function(data) {
        // Check that we received the correct student
        assert.deepEqual([percy], data);
        done();
      });
    });

    xit('should return nothing when given a student id that\'s not in the DB',
    function() {
      var req = {
        params: {
          // The student_id is contained in the request
          student_id: 617
        }
      };

      var promise = students.getStudent(req);

      promise.then(function(data) {
        // Check that we received an empty array
        assert.deepEqual([], data);
        done();
      });
    });

    xit('should return an error when given a student id of invalid type',
    function() {
      var req = {
        params: {
          // The student_id is contained in the request
          student_id: 'superbad'
        }
      };

      // Assert that an error is thrown when an invalid ID type is given
      assert.throw(function() {
        students.getStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.getStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        'Failed to get student. Invalid student_id type: must be an integer');
        done();
      });
    });
  });

  describe('createStudent(req)', function() {
    xit('should add a new student to the database', function() {
      var req = {data: daveURL};
      var studentCount;
      // Get the contents of the database before calling createStudent
      getAllStudents()
        .then(function(data) {
          // Count the number of students
          studentCount = data.length;
          // Call the function to be tested
          return students.createStudent(req);
        })
        .then(function() {
          // Get the contents of the database after calling createStudent
          return getAllStudents();
        })
        .then(function(data) {
          // Verify that the number of students in the DB increased by one
          assert.lengthOf(data, studentCount + 1);
          // Verify that the correct student data was added
          assert.deepEqual([percy, annabeth, dave], data);
          done();
        });
    });

    xit('should return an error and not post if the student already exists',
    function() {
      var req = {annabethURL};

      // Assert that an error is thrown when trying to add student already in DB
      assert.throw(function() {
        students.createStudent(req);
      },
      Error);
      // Assert that the error message is correct
      var promise = students.createStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        'Unable to add student because they already exist in the database');
        done();
      });
    });

    xit('should not post a student if the request is missing a last name',
    function() {
      var req = {
        data: {
          first_name: 'Korra',
          dob: '11/18/1994'
        }
      };

      // Assert that an error is thrown when last name is missing
      assert.throw(function() {
        students.createStudent(req);
      },
      Error);
      // Assert that the error message is correct
      var promise = students.createStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        // TODO(jacquelineali): for future JIRA, log which field is missing
        'Unable to add student due to missing fields');
        done();
      });
    });

    xit('should not post a student if the request is missing a birthdate',
    function() {
      var req = {
        data: {
          first_name: 'Asami',
          last_name: 'Sato'
        }
      };

      // Assert that an error is thrown when fields are missing
      assert.throw(function() {
        students.createStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.createStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        // TODO(jacquelineali): for future JIRA, log which fields are missing
        'Unable to add student due to missing fields');
        done();
      });
    });

    xit('should not post a student if the request is missing a first name',
    function() {
      var req = {
        data: {
          last_name: 'Lupin',
          dob: '03/10/1960'
        }
      };

      // Assert that an error is thrown when fields are missing
      assert.throw(function() {
        students.createStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.createStudent();
      promise.then(function(result) {
        assert.equal(result.message,
        // TODO(jacquelineali): for future JIRA, log which fields are missing
        'Unable to add student due to missing fields');
        done();
      });
    });

    xit('should not post a student if a field is repeated in the request',
    function() {
      var req = {
        data: {
          last_name: 'Lupin',
          last_name: 'Werewolf',
          dob: '03/10/1960'
        }
      };

      // Assert that an error is thrown when a field is repeated
      assert.throw(function() {
        students.createStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.createStudent();
      promise.then(function(result) {
        assert.equal(result.message,
        'Unable to add student due to a repeated field');
        done();
      });
    });
  });

  describe('updateStudent(req)', function() {
    xit('should update the information for a given student', function() {
      var req = {
        params: {
          student_id: 1
        },
        data: {
          updateValues: {
            first_name: 'Perseus'
          }
        }
      };

      var studentCount;
      var oldDB;
      // Check the state of the object before the update
      getAllStudents()
        .then(function(data) {
          // Remember the number of students and the state of data before update
          studentCount = data.length;
          oldDB = data;

          // Call updateStudent
          return students.updateStudent(req);
        })
        .then(function() {
          // Get the DB after the update
          // NOTE TODO (tomped), I THINK YOU SOULD JUST CHECK THE STATUS OF THE PERSON CHANGED AS YOUR OTHER TESTS
          // ADD STUDENTS TO THE DB AND TEST MAY BE RAN I DIFFERENT ORDERS
          return getAllStudents();
        })
        .then(function(data) {
          // Assert that the number of students is the same as before
          assert.lengthOf(data, studentCount);
          // Assert that the old data and new data aren't the same
          assert.notDeepEqual(oldDB, data);
          // Assert that the new data reflects the update changes
          assert.deepEqual([perseus, annabeth], data);
          done();
        });
    });

    xit('should return an error for attempts to update nonexistent student',
    function() {
      var req = {
        params: {
          student_id: 777
        },
        data: {
          updateValues: {
            first_name: 'Karkat'
          }
        }
      };

      // Assert that an error is thrown when a nonexistent student is given
      assert.throw(function() {
        students.updateStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.updateStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        'Unable to update student because they have not yet been added');
        done();
      });
    });
  });

  describe('deleteStudent(req)', function() {
    xit('should delete a given student from the database', function() {
      var req = {
        params: {
          student_id: 1
        }
      };

      var studentCount;
      var oldDB;
      // Check the state of the object before the update
      getAllStudents()
        .then(function(data) {
          // Remember the number of students and the state of data before update
          studentCount = data.length;

          // Call deleteStudent
          return students.deleteStudent(req);
        })
        .then(function() {
          // Get the current student data in the database
          return getAllStudents();
        })
        .then(function(data) {
          // Check that the number of students decreased by one
          assert.lengthOf(data, studentCount - 1);
          // Check that the data is not equal to the old DB state
          assert.notDeepEqual(oldDB, data);
          // Check that the correct student is no longer present
          // NOTE TODO, again change this to try and get the student that was removed
          assert.deepEqual([annabeth], data);
          done();
        });
    });

    xit('should return an error on attempt to delete nonexistent student',
    function() {
      var req = {
        params: {
          student_id: 617
        }
      };

      // Assert that an error is thrown when deleting nonexistent student
      assert.throw(function() {
        students.deleteStudent(req);
      }, Error);
      // Assert that the error message is correct
      var promise = students.deleteStudent(req);
      promise.then(function(result) {
        assert.equal(result.message,
        'Cannot delete student because they don\'t exist');
        done();
      });
    });
  });
});
