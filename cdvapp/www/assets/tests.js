'use strict';

define("week-07/tests/acceptance/game-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | game', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /game', async function (assert) {
      await (0, _testHelpers.visit)('/game');
      assert.equal((0, _testHelpers.currentURL)(), '/game');
    });
  });
});
define("week-07/tests/integration/components/connect-four-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | connect-four', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ConnectFour />
      */
      {
        "id": "XOz1zxLQ",
        "block": "{\"symbols\":[],\"statements\":[[8,\"connect-four\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <ConnectFour>
              template block text
            </ConnectFour>
          
      */
      {
        "id": "/MMH6Hu6",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[8,\"connect-four\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("week-07/tests/test-helper", ["week-07/app", "week-07/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("week-07/tests/unit/models/game-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | game', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('game', {});
      assert.ok(model);
    });
  });
});
define('week-07/config/environment', [], function() {
  var prefix = 'week-07';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('week-07/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
