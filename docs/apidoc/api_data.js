define({ "api": [
  {
    "type": "post",
    "url": "/accounts",
    "title": "Create an account",
    "name": "CreateAccount",
    "group": "Accounts",
    "description": "<p>Creates an account in the backend database and in the Auth0 client. The username must be between 4 and 15 characters and be unique from usernames already existing for the Auth0 instance. The email must be valid and unique from emails already registered with the Auth0 instance. The password must be at least eight characters and include uppercase and lowercase letters and numbers. The account type must be one of 'Admin', 'Staff', 'Coach', or 'Volunteer'.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Account first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Account last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Account email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>Account type ('Admin', 'Staff', 'Coach', 'Volunteer')</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Account password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n first_name: \"Danny\",\n last_name: \"Porter\",\n username: \"d_porter\",\n email: \"d.porter@email.com\",\n acct_type: \"Volunteer\",\n password: \"passw0rd\"\n}",
        "type": "js"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "InvalidAccountType",
            "description": "<p>Account type must be Admin/Staff/Coach/Volunteer</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingFieldError",
            "description": "<p>Request was missing a parameter</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "EmptyFieldError",
            "description": "<p>Request had an empty parameter</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "PasswordTooWeek",
            "description": "<p>Password does not meet requirements</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error500",
            "optional": false,
            "field": "The",
            "description": "<p>server encountered an unexpected error</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "delete",
    "url": "/accounts/:account_id",
    "title": "Delete an account",
    "name": "DeleteAccount",
    "group": "Accounts",
    "description": "<p>Deletes an account from the backend database and from the Auth0 instance. If one deletion fails, a rollback will be performed so that the backend and Auth0 remain in sync.</p>",
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error404",
            "optional": false,
            "field": "ResourceNotFound",
            "description": "<p>No account with given id</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingFieldError",
            "description": "<p>Request was missing a parameter</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "EmptyFieldError",
            "description": "<p>Request had an empty parameter</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error500",
            "optional": false,
            "field": "The",
            "description": "<p>server encountered an unexpected error</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get account by Auth0 id",
    "name": "GetAccountByAuth0Id",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n auth0_id: 'auth0|abc123def456'\n}",
        "type": "js"
      }
    ],
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get account by id",
    "name": "GetAccountById",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n acct_id: 1\n}",
        "type": "js"
      }
    ],
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get account by name/email",
    "name": "GetAccountByName",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n first_name: 'Harry',\n last_name: 'Belvidere',\n email: 'h.belvidere@email.com'\n}",
        "type": "js"
      }
    ],
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get all accounts",
    "name": "GetAccounts",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get accounts by program",
    "name": "GetAccountsByProgram",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 501": [
          {
            "group": "Error501",
            "optional": false,
            "field": "UnsupportedRequestError",
            "description": "<p>Invalid param passed</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get accounts by site",
    "name": "GetAccountsBySite",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n site_id: 3\n}",
        "type": "js"
      }
    ],
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "Get accounts by type",
    "name": "GetAccountsByType",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"acct_id\": 1,\n  \"auth0_id\": \"auth0|abc123def456',\n  \"first_name\": \"Harry\",\n  \"last_name\": \"Belvidere\",\n  \"email\": \"h.belvidere@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n acct_type: 'Coach'\n}",
        "type": "js"
      }
    ],
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "put",
    "url": "/accounts/:account_id",
    "title": "Update an account",
    "name": "UpdateAccount",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name for update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name for update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email for update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>Account type ('Admin', 'Staff', 'Coach', 'Volunteer')</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "accts",
            "description": "<p>The accounts</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "acct_id",
            "description": "<p>The unique account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth0_id",
            "description": "<p>The unique auth0 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The account owner's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The account owner's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The account owner's email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acct_type",
            "description": "<p>'Admin', 'Staff', 'Coach', or 'Volunteer'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Result",
          "content": "[\n {\n  \"acct_id\": 4,\n  \"auth0_id\": \"auth0|987zyx654wvu\",\n  \"first_name\": \"Sarah\",\n  \"last_name\": \"Washington\",\n  \"email\": \"wash_s@email.com\",\n  \"acct_type\": \"Coach\"\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n first_name: \"Sarah\",\n acct_type: \"Coach\"\n}",
        "type": "js"
      }
    ],
    "error": {
      "fields": {
        "Error 501": [
          {
            "group": "Error501",
            "optional": false,
            "field": "UnsupportedRequestError",
            "description": "<p>No valid update fields given</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "InvalidArgumentError",
            "description": "<p>Given a non-positive integer field</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error500",
            "optional": false,
            "field": "The",
            "description": "<p>server encountered an unexpected error</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "docs/apidoc/main.js",
    "group": "C__Users_Kaila_Documents_Schoolwork_5_Sem2_CS4500_Project_america_scores_backend_docs_apidoc_main_js",
    "groupTitle": "C__Users_Kaila_Documents_Schoolwork_5_Sem2_CS4500_Project_america_scores_backend_docs_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/programs/:program_id/events",
    "title": "Add an event",
    "name": "CreateEvent",
    "group": "Events",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "event_date",
            "description": "<p>Event date in the form 'YYYY-MM-DD'</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "pre_season",
            "description": "<p>Flag indicating if the event is pre-season (true) or post-season (false)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n event_date: '2017-01-01',\n pre_season: false\n}",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "The",
            "description": "<p>created event</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.event_id",
            "description": "<p>The unique event id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.program_id",
            "description": "<p>The program that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.season_id",
            "description": "<p>The season that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "event.event_date",
            "description": "<p>The date of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "event.pre_season",
            "description": "<p>Whether this event was held pre-season (true) or post-season (false)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"event_id\": 7,\n   \"program_id\": 1,\n   \"season_id\": 2,\n   \"event_date\": \"2017-01-01T00:00:00.000Z\",\n   \"pre_season\": 0\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events",
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "MalformedDateError",
            "description": "<p>Date was not of the form 'YYYY-MM-DD'</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingField",
            "description": "<p>Request was missing event_date or pre_season flag</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/events/:event_id",
    "title": "Delete an event by id",
    "name": "DeleteEvent",
    "group": "Events",
    "description": "<p>Deletes an event and all its associated stats from the database.</p> <p>TODO: Currently does NOT return any indication of success and does not error if given an invalid id.</p>",
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events/:event_id",
    "title": "Get an event by id",
    "name": "GetEvent",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>The event identified by the given id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.event_id",
            "description": "<p>The unique event id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.program_id",
            "description": "<p>The program that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.season_id",
            "description": "<p>The season that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "event.event_date",
            "description": "<p>The date of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "event.pre_season",
            "description": "<p>Whether this event was held pre-season (true) or post-season (false)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"event_id\": 3,\n  \"program_id\": 2,\n  \"season_id\": 1,\n  \"event_date\": \"2017-02-01T00:00:00.000Z\",\n  \"pre_season\": 1\n}",
          "type": "Object"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/students/:student_id/events",
    "title": "Get events for a student",
    "name": "GetEventByStudent",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "events",
            "description": "<p>The events for a student</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.event_id",
            "description": "<p>The unique event id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.program_id",
            "description": "<p>The program that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.season_id",
            "description": "<p>The season that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "event.event_date",
            "description": "<p>The date of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "event.pre_season",
            "description": "<p>Whether this event was held pre-season (true) or post-season (false)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"event_id\": 5,\n   \"program_id\": 3,\n   \"season_id\": 1,\n   \"event_date\": \"2017-02-27T00:00:00.000Z\",\n   \"pre_season\": 1\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "Get all events",
    "name": "GetEvents",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "events",
            "description": "<p>The events</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.event_id",
            "description": "<p>The unique event id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.program_id",
            "description": "<p>The program that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.season_id",
            "description": "<p>The season that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "event.event_date",
            "description": "<p>The date of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "event.pre_season",
            "description": "<p>Whether this event was held pre-season (true) or post-season (false)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"event_id\": 1,\n   \"program_id\": 1,\n   \"season_id\": 1,\n   \"event_date\": \"2017-01-16T00:00:00.000Z\",\n   \"pre_season\": 1\n },\n {\n   \"event_id\": 2,\n   \"program_id\": 1,\n   \"season_id\": 1,\n   \"event_date\": \"2017-04-13T00:00:00.000Z\",\n   \"pre_season\": 0\n },\n {\n   \"event_id\": 3,\n   \"program_id\": 2,\n   \"season_id\": 1,\n   \"event_date\": \"2017-02-01T00:00:00.000Z\",\n   \"pre_season\": 1\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/programs/:program_id/events",
    "title": "Get events for a program",
    "name": "GetEventsByProgram",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "events",
            "description": "<p>The events for a program</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.event_id",
            "description": "<p>The unique event id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.program_id",
            "description": "<p>The program that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event.season_id",
            "description": "<p>The season that this event belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "event.event_date",
            "description": "<p>The date of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "event.pre_season",
            "description": "<p>Whether this event was held pre-season (true) or post-season (false)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "\n[\n {\n   \"event_id\": 1,\n   \"program_id\": 1,\n   \"season_id\": 1,\n   \"event_date\": \"2017-01-16T00:00:00.000Z\",\n   \"pre_season\": 1\n },\n {\n   \"event_id\": 2,\n   \"program_id\": 1,\n   \"season_id\": 1,\n   \"event_date\": \"2017-04-13T00:00:00.000Z\",\n   \"pre_season\": 0\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "/sites/:site_id/programs",
    "title": "Create a program",
    "name": "CreateProgram",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "delete",
    "url": "/programs/:program_id",
    "title": "Delete a program",
    "name": "DeleteProgram",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/programs/:program_id",
    "title": "Get a program",
    "name": "GetProgram",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/programs",
    "title": "Get all programs",
    "name": "GetPrograms",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/accounts/:account_id/programs",
    "title": "Get programs by account",
    "name": "GetProgramsByAccount",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/sites/:site_id/programs",
    "title": "Get programs by site",
    "name": "GetProgramsBySite",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/students/:student_id/programs",
    "title": "Get programs by student",
    "name": "GetProgramsByStudent",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "put",
    "url": "/programs/:program_id",
    "title": "Update a program",
    "name": "UpdateProgram",
    "group": "Programs",
    "version": "1.0.0",
    "filename": "docs/programs.js",
    "groupTitle": "Programs"
  },
  {
    "type": "get",
    "url": "/reports",
    "title": "Get all stats for a specific season",
    "name": "GetReport",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "season",
            "description": "<p>'Fall' or 'Spring'</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "year",
            "description": "<p>The year of the season</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n season: 'Fall',\n year: 2016\n}",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "statsList",
            "description": "<p>The season stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.student_id",
            "description": "<p>The student the stat belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stat.first_name",
            "description": "<p>The first name of the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stat.last_name",
            "description": "<p>The last name of the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stat.program_name",
            "description": "<p>The program that the student belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stat.site_name",
            "description": "<p>The site of the program</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "stat.pre_date",
            "description": "<p>The date of the pre-season data collection</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.pre_height",
            "description": "<p>The student's pre-season height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.pre_weight",
            "description": "<p>The student's pre-season weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.pacer",
            "description": "<p>The student's pre-season PACER level</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "stat.post_date",
            "description": "<p>The date of the post-season data collection</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.post_height",
            "description": "<p>The student's post-season height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "stat.post_weight",
            "description": "<p>The student's post-season weight (pounds)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"student_id\": 13,\n   \"first_name\": \"Amaya\",\n   \"last_name\": \"Heywood\",\n   \"site_name\": \"Baker Elementary School\",\n   \"program_name\": \"Baker Girls ES\",\n   \"pre_date\": \"2017-01-16T00:00:00.000Z\",\n   \"pre_height\": 49,\n   \"pre_weight\": 91,\n   \"pre_pacer\": 5,\n   \"post_date\": \"2017-04-13T00:00:00.000Z\",\n   \"post_height\": 49,\n   \"post_weight\": 90,\n   \"post_pacer\": 5\n },\n {\n   \"student_id\": 14,\n   \"first_name\": \"Ray\",\n   \"last_name\": \"Jackson\",\n   \"site_name\": \"Baker Elementary School\",\n   \"program_name\": \"Baker Boys ES\",\n   \"pre_date\": \"2017-02-01T00:00:00.000Z\",\n   \"pre_height\": 44,\n   \"pre_weight\": 91,\n   \"pre_pacer\": 6,\n   \"post_date\": \"2017-06-17T00:00:00.000Z\",\n   \"post_height\": 44,\n   \"post_weight\": 89,\n   \"post_pacer\": 7\n },\n]",
          "type": "Object[]"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error404",
            "optional": false,
            "field": "SeasonNotFound",
            "description": "<p>The requested season does not exist</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingField",
            "description": "<p>Request was missing event_date or pre_season flag</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/seasons",
    "title": "Get all seasons",
    "name": "GetSeasons",
    "group": "Seasons",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "seasons",
            "description": "<p>The seasons</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "season.season_id",
            "description": "<p>The unique season id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "season.season",
            "description": "<p>'Fall' or 'Spring'</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "season.year",
            "description": "<p>The season year</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"season_id\": 1,\n   \"season\": \"Spring\",\n   \"year\": 2017\n },\n {\n   \"season_id\": 2,\n   \"season\": \"Fall\",\n   \"year\": 2016\n }\n]",
          "type": "Object[]"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "docs/seasons.js",
    "groupTitle": "Seasons"
  },
  {
    "type": "post",
    "url": "/sites",
    "title": "Create a site",
    "name": "CreateSite",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "delete",
    "url": "/sites/:site_id",
    "title": "Delete a site",
    "name": "DeleteSite",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "get",
    "url": "/sites/:site_id",
    "title": "Get a site",
    "name": "GetSite",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "get",
    "url": "/sites",
    "title": "Get all sites",
    "name": "GetSites",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "get",
    "url": "/accounts/:account_id/sites",
    "title": "Get all sites for an account",
    "name": "GetSitesByAccount",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "put",
    "url": "/sites/:site_id",
    "title": "Update a site",
    "name": "UpdateSite",
    "group": "Sites",
    "version": "1.0.0",
    "filename": "docs/sites.js",
    "groupTitle": "Sites"
  },
  {
    "type": "get",
    "url": "/stats",
    "title": "Get all stats",
    "name": "GetStats",
    "group": "Stats",
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stats",
            "description": "<p>The stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "measurement_id",
            "description": "<p>The stat id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student for this stat</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event_id",
            "description": "<p>The event where this stat was recorded</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>The height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>The weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "pacer",
            "description": "<p>The PACER test result (level)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"measurement_id\": 1,\n   \"student_id\": 1,\n   \"event_id\": 5,\n   \"height\": 65,\n   \"weight\": 140,\n   \"pacer\": 9\n },\n {\n   \"measurement_id\": 2,\n   \"student_id\": 2,\n   \"event_id\": 5,\n   \"height\": 61,\n   \"weight\": 123,\n   \"pacer\": 10\n }\n]",
          "type": "Object[]"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/events/:event_id/stats",
    "title": "Get the stats by event",
    "name": "GetStatsByEvent",
    "group": "Stats",
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stats",
            "description": "<p>The stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "measurement_id",
            "description": "<p>The stat id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student for this stat</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event_id",
            "description": "<p>The event where this stat was recorded</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>The height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>The weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "pacer",
            "description": "<p>The PACER test result (level)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"measurement_id\": 1,\n   \"student_id\": 1,\n   \"event_id\": 5,\n   \"height\": 65,\n   \"weight\": 140,\n   \"pacer\": 9\n },\n {\n   \"measurement_id\": 2,\n   \"student_id\": 2,\n   \"event_id\": 5,\n   \"height\": 61,\n   \"weight\": 123,\n   \"pacer\": 10\n }\n]",
          "type": "Object[]"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/programs/:program_id/stats",
    "title": "Get the stats by program",
    "name": "GetStatsByProgram",
    "group": "Stats",
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stats",
            "description": "<p>The stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "measurement_id",
            "description": "<p>The stat id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student for this stat</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event_id",
            "description": "<p>The event where this stat was recorded</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>The height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>The weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "pacer",
            "description": "<p>The PACER test result (level)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"measurement_id\": 1,\n   \"student_id\": 1,\n   \"event_id\": 5,\n   \"height\": 65,\n   \"weight\": 140,\n   \"pacer\": 9\n },\n {\n   \"measurement_id\": 2,\n   \"student_id\": 2,\n   \"event_id\": 5,\n   \"height\": 61,\n   \"weight\": 123,\n   \"pacer\": 10\n }\n]",
          "type": "Object[]"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sites/:site_id/stats",
    "title": "Get the stats by site",
    "name": "GetStatsBySite",
    "group": "Stats",
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stats",
            "description": "<p>The stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "measurement_id",
            "description": "<p>The stat id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student for this stat</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event_id",
            "description": "<p>The event where this stat was recorded</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>The height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>The weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "pacer",
            "description": "<p>The PACER test result (level)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"measurement_id\": 1,\n   \"student_id\": 1,\n   \"event_id\": 5,\n   \"height\": 65,\n   \"weight\": 140,\n   \"pacer\": 9\n },\n {\n   \"measurement_id\": 2,\n   \"student_id\": 2,\n   \"event_id\": 5,\n   \"height\": 61,\n   \"weight\": 123,\n   \"pacer\": 10\n }\n]",
          "type": "Object[]"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/students/:student_id/stats",
    "title": "Get the stats by student",
    "name": "GetStatsByStudent",
    "group": "Stats",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"measurement_id\": 1,\n   \"student_id\": 1,\n   \"event_id\": 5,\n   \"height\": 65,\n   \"weight\": 140,\n   \"pacer\": 9\n },\n {\n   \"measurement_id\": 7,\n   \"student_id\": 1,\n   \"event_id\": 9,\n   \"height\": 66,\n   \"weight\": 138,\n   \"pacer\": 10\n }\n]",
          "type": "Object[]"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stats",
            "description": "<p>The stats</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "measurement_id",
            "description": "<p>The stat id</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student for this stat</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "event_id",
            "description": "<p>The event where this stat was recorded</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>The height (inches)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>The weight (pounds)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "pacer",
            "description": "<p>The PACER test result (level)</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "put",
    "url": "/events/:event_id/stats/bmi",
    "title": "Update BMI results",
    "name": "UploadBMIStats",
    "group": "Stats",
    "description": "<p>Given set of student ids, heights, and weights, updates the existing stats for the given student/event or creates them if they don't already exist. For created events, PACER will remain null.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "statsList",
            "description": "<p>The BMI results</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "stats.student_id",
            "description": "<p>The student the stat belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "stats.height",
            "description": "<p>The student's height (inches)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "stats.weight",
            "description": "<p>The student's weight (inches)</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "InvalidArgumentError",
            "description": "<p>Given a non-positive integer field</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingField",
            "description": "<p>Request was missing event_date or pre_season flag</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/events/:event_id/stats/pacer",
    "title": "Update PACER results",
    "name": "UploadPacerStats",
    "group": "Stats",
    "description": "<p>Given set of student ids and PACER results, updates the existing stats for the given student/event or creates them if they don't already exist. For created events, height and weight will remain null.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "statsList",
            "description": "<p>The PACER results</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "stats.student_id",
            "description": "<p>The student the stat belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "stats.pacer",
            "description": "<p>The PACER result (level)</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/stats.js",
    "groupTitle": "Stats",
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "InvalidArgumentError",
            "description": "<p>Given a non-positive integer field</p>"
          },
          {
            "group": "Error400",
            "optional": false,
            "field": "MissingField",
            "description": "<p>Request was missing event_date or pre_season flag</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/programs/:program_id/students",
    "title": "Create a student",
    "name": "CreateStudent",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "delete",
    "url": "/students/:student_id",
    "title": "Delete a student",
    "name": "DeleteStudent",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "get",
    "url": "/students/:student_id",
    "title": "Get a student by id",
    "name": "GetStudent",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "get",
    "url": "/students",
    "title": "Get student by name/dob",
    "name": "GetStudent",
    "group": "Students",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Student's first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Student's last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth 'YYYY-MM-DD'</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example request",
        "content": "{\n first_name: 'Sally',\n last_name: 'Douglas',\n dob: '2000-01-01'\n}",
        "type": "js"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error400",
            "optional": false,
            "field": "InvalidArgumentError",
            "description": "<p>Birth date not of the form 'YYYY-MM-DD</p>"
          }
        ],
        "Error 501": [
          {
            "group": "Error501",
            "optional": false,
            "field": "UnsupportedRequestError",
            "description": "<p>Invalid combination of params</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "students",
            "description": "<p>The students</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student.student_id",
            "description": "<p>The unique student id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "student.first_name",
            "description": "<p>The student's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "student.last_name",
            "description": "<p>The student's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "student.dob",
            "description": "<p>The student's date of birth</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/students",
    "title": "Get all students",
    "name": "GetStudents",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "students",
            "description": "<p>The students</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "student.student_id",
            "description": "<p>The unique student id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "student.first_name",
            "description": "<p>The student's first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "student.last_name",
            "description": "<p>The student's last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "student.dob",
            "description": "<p>The student's date of birth</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n   \"student_id\": 1,\n   \"first_name\": \"Alice\",\n   \"last_name\": \"Cooper\",\n   \"dob\": \"1999-05-18T00:00:00.000Z\"\n },\n {\n   \"student_id\": 2,\n   \"first_name\": \"Danny\",\n   \"last_name\": \"Hannigan\",\n   \"dob\": \"1998-12-13T00:00:00.000Z\"\n }\n]",
          "type": "Object[]"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/events/:event_id/students",
    "title": "",
    "name": "GetStudentsByEvent",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "get",
    "url": "/programs/:program_id/students",
    "title": "Get all students for a program",
    "name": "GetStudentsByProgram",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "put",
    "url": "/students/:student_id",
    "title": "Update a student",
    "name": "UpdateStudent",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  },
  {
    "type": "put",
    "url": "/students/:student_id/programs/:program_id",
    "title": "Update a student's program",
    "name": "UpdateStudentProgram",
    "group": "Students",
    "version": "1.0.0",
    "filename": "docs/students.js",
    "groupTitle": "Students"
  }
] });
