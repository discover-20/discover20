/* Node entry point: loads every engine module onto one `D20` object.
   In the browser, include the files with <script> tags in this same order. */
require('./domains');
require('./instruments/discover20-milestones');
require('./scoring');
require('./library');
require('./recommend');

module.exports = globalThis.D20;
