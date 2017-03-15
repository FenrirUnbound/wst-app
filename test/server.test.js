'use strict';

const expect = require('chai').expect;

describe('server test', () => {
  let server;

  before(() => {
    const main = require('../lib/server');

    return main().then((testServer) => {
      server = testServer;
    });
  });

  after(() => {
    server = null;
  });

  it('works', () => {
    return server.inject({
      method: 'GET',
      url: '/sites/status'
    }).then((response) => {
      expect(response.statusCode).to.equal(200);

      const payload = JSON.parse(response.payload);

      expect(payload).to.deep.equal({
        status: 'OK'
      });
    });
  });
});
