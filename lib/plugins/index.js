'use strict';

const PLUGINS = [
  require('./status'),
  require('./logger')
];
const LOGGER_OPTIONS = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            log: '*',
            response: '*'
          }
        ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};
const OPTIONS = [
  {},
  LOGGER_OPTIONS
];

function registerPlugins(server) {
  const defaultRegistrations = PLUGINS.map((plugin) => {
    return server.register({
      register: plugin
    }, {
      routes: {
        prefix: `/_default/${plugin.register.attributes.name}`
      }
    });
  });

  return Promise.all(defaultRegistrations);
}

module.exports = registerPlugins;
