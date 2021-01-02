'use strict';



;define("week-07/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("week-07/adapters/application", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  // import JSONAPIAdapter from '@ember-data/adapter/json-api';
  // export default class ApplicationAdapter extends JSONAPIAdapter {
  // }
  var _default = _emberData.default.JSONAPIAdapter.extend({
    host: 'http://localhost:4201'
  });

  _exports.default = _default;
});
;define("week-07/app", ["exports", "ember-resolver", "ember-load-initializers", "week-07/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("week-07/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("week-07/components/connect-four", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    
  {{#if playing}}
      {{#if winner}}
          <div>
              Player {{winner}} won!
          </div>
      {{/if}}
      {{#if draw}}
          Lets call it a draw.
      {{/if}}
      <button {{action 'start'}}>Restart</button>
  {{else}}
      <button {{action 'start'}}>Start</button>
  {{/if}}
  <canvas id="stage" width="380" height="380"></canvas>
  
  
  */
  {
    "id": "5bjas2T3",
    "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],[[35,4]],null,[[\"default\",\"else\"],[{\"statements\":[[6,[37,2],[[35,1]],null,[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"div\"],[12],[2,\"\\n            Player \"],[1,[34,1]],[2,\" won!\\n        \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[6,[37,2],[[35,3]],null,[[\"default\"],[{\"statements\":[[2,\"        Lets call it a draw.\\n\"]],\"parameters\":[]}]]],[2,\"    \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Restart\"],[13],[2,\"\\n\"]],\"parameters\":[]},{\"statements\":[[2,\"    \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Start\"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[10,\"canvas\"],[14,1,\"stage\"],[14,\"width\",\"380\"],[14,\"height\",\"380\"],[12],[13],[2,\"\\n\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"winner\",\"if\",\"draw\",\"playing\"]}",
    "meta": {
      "moduleName": "week-07/components/connect-four.hbs"
    }
  });
  /* PROJECT TO-DO LIST:
    - Fix GitHub repo. Commit and push changes
    - Create intial tests as per test stratergy
    - Create counters for each player 
  */


  // This function clones the state matrix. We need this functionality, because when the minimax algorithm creates the game tree, it has to hold all possible moves, so we need lots of copies of the state matrix. 
  function deepClone(state) {
    var new_state = [];

    for (var idx1 = 0; idx1 < state.length; idx1++) {
      new_state.push(state[idx1].slice(0));
    }

    return new_state;
  }

  function check_game_winner(state) {
    // winning patterns
    // The patterns variable is an array of patterns and each pattern itself is an array of x/y co-ordinates. 
    // What we are specifying for each pattern is the set of x/y/ co-ordinates that must all be the same for the player to win. 

    /*
    Get the state's current value at the pattern's first co-ordinates.
    If that value has a value (is not set to the initial undefined), then continue checking, otherwise move on to the next pattern. The logic here is that if nobody has played in the first square, then the pattern cannot match.
    Loop over all other co-ordinates in the pattern (starting at idx = 1) and if the winner value is different to the value at any of the other co-ordinates of the pattern, then set the winner to undefined. The logic here is that the value at all other co-ordinates specified in the pattern must be the same as the initial one. If it is not, then either another player has played or nobody has played that co-ordinate yet. In either case, it indicates that the pattern does not match completely.
    Finally, if after checking all co-ordinates in the pattern, the winner is still set to a value, then set that value as the component's "winner" property and stop checking any other patterns. 
    */
    var patterns = [// Vertical winning positions 
    [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]], [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]], [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]], [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]], [[6, 0], [6, 1], [6, 2], [6, 3]], [[6, 1], [6, 2], [6, 3], [6, 4]], [[6, 2], [6, 3], [6, 4], [6, 5]], // Horizontal winning positions
    [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]], [[3, 0], [4, 0], [5, 0], [6, 0]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]], [[3, 1], [4, 1], [5, 1], [6, 1]], [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]], [[3, 2], [4, 2], [5, 2], [6, 2]], [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]], [[3, 3], [4, 3], [5, 3], [6, 3]], [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]], [[3, 4], [4, 4], [5, 4], [6, 4]], [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]], [[3, 5], [4, 5], [5, 5], [6, 5]], // Diagonl winning ppositions
    [[0, 3], [1, 2], [2, 1], [3, 0]], [[0, 4], [1, 3], [2, 2], [3, 1]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[1, 3], [2, 2], [3, 1], [4, 0]], [[0, 5], [1, 4], [2, 3], [3, 2]], [[1, 4], [2, 3], [3, 2], [4, 1]], [[2, 3], [3, 2], [4, 1], [5, 0]], [[1, 5], [2, 4], [3, 3], [4, 2]], [[2, 4], [3, 3], [4, 2], [5, 1]], [[3, 3], [4, 2], [5, 1], [6, 0]], [[2, 5], [3, 4], [4, 3], [5, 2]], [[3, 4], [4, 3], [5, 2], [6, 1]], [[3, 5], [4, 4], [5, 3], [6, 2]], [[3, 0], [4, 1], [5, 2], [6, 3]], [[2, 0], [3, 1], [4, 2], [5, 3]], [[3, 1], [4, 2], [5, 3], [6, 4]], [[1, 0], [2, 1], [3, 2], [4, 3]], [[2, 1], [3, 2], [4, 3], [5, 4]], [[3, 2], [4, 3], [5, 4], [6, 5]], [[0, 0], [1, 1], [2, 2], [3, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]], [[2, 2], [3, 3], [4, 4], [5, 5]], [[0, 1], [1, 2], [2, 3], [3, 4]], [[1, 2], [2, 3], [3, 4], [4, 5]], [[0, 2], [1, 3], [2, 4], [3, 5]] // orginal patterns
    // [
    //   [0, 0],
    //   [1, 1],
    //   [2, 2]
    // ],
    // [
    //   [0, 2],
    //   [1, 1],
    //   [2, 0]
    // ],
    // [
    //   [0, 0],
    //   [0, 1],
    //   [0, 2]
    // ],
    // [
    //   [1, 0],
    //   [1, 1],
    //   [1, 2]
    // ],
    // [
    //   [2, 0],
    //   [2, 1],
    //   [2, 2]
    // ],
    // [
    //   [0, 0],
    //   [1, 0],
    //   [2, 0]
    // ],
    // [
    //   [0, 1],
    //   [1, 1],
    //   [2, 1]
    // ],
    // [
    //   [0, 2],
    //   [1, 2],
    //   [2, 2]
    // ]
    ]; // match winning patterns to the board

    for (var pidx = 0; pidx < patterns.length; pidx++) {
      var pattern = patterns[pidx];
      var winner = state[pattern[0][0]][pattern[0][1]];

      if (winner) {
        for (var idx = 0; idx < pattern.length; idx++) {
          if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
            winner = undefined;
            break;
          }
        }

        if (winner) {
          return winner;
        }
      }
    } // detect a draw


    var draw = true;

    for (var x = 0; x <= 2; x++) {
      for (var y = 0; y <= 2; y++) {
        if (!state[x][y]) {
          return undefined;
        }
      }
    }

    return '';
  } // the new heuristic function loops over a list of patterns (that we will define later). Then it uses a new match_pattern function to test if the pattern matches for that player. If it matches for the computer player, the pattern's score is added to the score. If it matches for the human player, the pattern's score is subtracted from the score. Using this approach, the final score value balances both how good the position is for the computer and how good it is for the human. A score above 0 indicates a state that benefits the computer, while a score below indicates a state benefitting the human.


  function heuristic(state) {
    var score = 0;

    for (var idx = 0; idx < patterns.length; idx++) {
      if (match_pattern(state, patterns[idx].pattern, 'o')) {
        score = score + patterns[idx].score;
      }

      if (match_pattern(state, patterns[idx].pattern, 'x')) {
        score = score - patterns[idx].score;
      }
    }

    return score;
  } // minimax algorithm takes three parameters. The current game state, the search depth limit, and the player to play next. The minimax algorithm is recursive and the limit is used to define the maximum search depth. The state is the current state in the search (which will only at the first level of recursion be the state the user sees).
  // start generating potential moves


  function minimax(state, limit, player) {
    var moves = [];

    if (limit > 0) {
      for (var idx1 = 0; idx1 < 3; idx1++) {
        for (var idx2 = 0; idx2 < 3; idx2++) {
          if (state[idx1][idx2] === undefined) {
            var move = {
              x: idx1,
              y: idx2,
              state: deepClone(state),
              score: 0
            };
            move.state[idx1][idx2] = player; // implementing the recursive state generation and score calculation

            if (limit === 1 || check_game_winner(move.state) !== undefined) {
              if (check_game_winner(move.state) !== undefined) {
                var winner = check_game_winner(move.state);

                if (winner === 'o') {
                  move.score = 1000;
                } else if (winner === 'x') {
                  move.score = -1000;
                }
              }
            } else {
              move.moves = minimax(move.state, limit - 1, player == 'x' ? 'o' : 'x');
              var score = undefined;

              for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                if (score === undefined) {
                  score = move.moves[idx3].score;
                } else if (player === 'x') {
                  score = Math.max(score, move.moves[idx3].score);
                } else if (player === 'o') {
                  score = Math.min(score, move.moves[idx3].score);
                }
              }

              move.score = score;
            }

            moves.push(move);
          }
        }
      }
    }

    return moves;
  } // he computer_move function takes the current state and returns an object with x and y properties that define where the computer wants to play. The rest of the code is the same as for the 'x' player.


  function computer_move(state) {
    var moves = minimax(state, 2, 'o');
    var max_score = undefined;
    var move = undefined;

    for (var idx = 0; idx < moves.length; idx++) {
      if (max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y
        };
      }
    }

    return move;
  } // Connect 4 componenet initilaise - GAME RULES: https://en.wikipedia.org/wiki/Connect_Four


  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember.Component.extend({
    /* Compoent varibvales to handle the state of the game, storing win, draw and playing variables
        - game state can then be used after to is the game is currently ac tive, then each turn to check winning position or end match resulting in a draw
    */
    playing: false,
    winner: undefined,
    draw: false,
    // On initiliasion of the game component register applications game sounds for interaction feedback using sound assets
    init: function () {
      this._super(...arguments);

      createjs.Sound.registerSound("assets/sounds/click.wav", "place-marker");
      createjs.Sound.registerSound("assets/sounds/falling.mp3", "falling");
    },

    /* Function to draw the game canavas/baord for connect 4 using a 6x7 grid
        1. Create a stage using create.js stage
        2. create.js saved in board varibale to draw shapes 
        3. graphics varible to implement the board layout/grid
        4. Create 'o' markers for each player to place their counter within the grid 
    */
    didInsertElement: function () {
      // Create a stage using create.js stage
      var stage = new createjs.Stage(this.$('#stage')[0]); // Draw the board game

      var board = new createjs.Shape();
      var graphics = board.graphics;
      graphics.beginFill('#192DA1');
      /* Draw a horizonalgrid 
      co-ordinate system in EaselJS 
      1st parameter - Upper top load of board 
      2nd parameter - distance between verticle line: 6 columns / 300 board canavs = 50
      3rd parameter - sets the endpoint lf the line 
      4th parameter - sets the width of the grid lines 
      */
      // Draw vertical grid 6 columns in total

      graphics.drawRect(0, 0, 294, 4);
      graphics.drawRect(0, 50, 294, 4);
      graphics.drawRect(0, 100, 294, 4);
      graphics.drawRect(0, 150, 294, 4);
      graphics.drawRect(0, 200, 294, 4);
      graphics.drawRect(0, 250, 294, 4);
      graphics.drawRect(0, 300, 298, 4); // Draw vertical grid 7 columns in total

      graphics.drawRect(0, 0, 4, 300);
      graphics.drawRect(42, 0, 4, 300);
      graphics.drawRect(84, 0, 4, 300);
      graphics.drawRect(126, 0, 4, 300);
      graphics.drawRect(168, 0, 4, 300);
      graphics.drawRect(210, 0, 4, 300);
      graphics.drawRect(252, 0, 4, 300);
      graphics.drawRect(294, 0, 4, 300); // Set padding for the outer grid line upon the x and y axis. top/bottom, left/right

      board.x = 30;
      board.y = 40; // board aplha ensures the board is transparents on init and made visible once the start button is clicked

      board.alpha = 0;
      this.set('board', board);
      stage.addChild(board);
      /* Create player counters for each player 
          - create a markers object that holds the "x" and "o" players' markers
          - loop and create the x counters for player 1. 21 needed for 6x7 grid
              - beginStroke to set the counter colour
              - setStrokeStyle to indicate that we want any line to be drawn 12 pixels wide
          - loop create the o counters for player 2. 21 needed for 6x7 grid
          - store the list of markers and the stage in the component's state
          - Update the canvas with both the x and o counters for each player 
      */

      var markers = {
        'x': [],
        'o': []
      }; // Create sufficent amoutn of markerks for x counter player. As per game rules 6x7 = 42 - 21 counters per platyer 

      for (var x = 0; x < 21; x++) {
        // create the circular red 'o' marker for player 1
        var circleMarker = new createjs.Shape();
        graphics = circleMarker.graphics;
        graphics.beginStroke('#DB2621');
        graphics.setStrokeStyle(12);
        graphics.drawCircle(0, 0, 8);
        circleMarker.visible = false;
        stage.addChild(circleMarker);
        markers.o.push(circleMarker); // create the circular yellow 'o' marker for player 2

        var crossMarker = new createjs.Shape();
        graphics = crossMarker.graphics;
        graphics.beginStroke('#F2E205');
        graphics.setStrokeStyle(12);
        graphics.drawCircle(0, 0, 8);
        crossMarker.visible = false;
        stage.addChild(crossMarker);
        markers.x.push(crossMarker);
      } // store the list of markers and the stage in the component's state, so when the user clicks on the board, we can get a marker to place and re-draw the stage


      this.set('markers', markers);
      this.set('stage', stage);
      createjs.Ticker.addEventListener("tick", stage);
    },

    /* Function to check the game winner or if the game results with a draw
      - get current game state and check against winning postions array or final draw state
    */
    check_winner: function () {
      var state = this.get('state');
      var winner = check_game_winner(state);

      if (winner !== undefined) {
        if (winner === '') {
          this.set('draw', true);
        } else {
          this.set('winner', winner);
        }
      }
    },

    /* Function to handle user clicks on the game canavs 
     - set x,y limit of marker placement on the canvas
     - Restrict the size limits of the board canvas
     - Determine which cell of the board the user clicked on
    */
    click: function (ev) {
      var component = this;

      if (component.get('playing') && !component.get('winner')) {
        if (ev.offsetX >= 30 && ev.offsetY >= 40 && ev.offsetX < 340 && ev.offsetY < 340) {
          var x = Math.floor((ev.offsetX - 40) / 42);
          var y = Math.floor((ev.offsetY - 40) / 100);
          var state = component.get('state');

          if (!state[x][y]) {
            createjs.Sound.play("place-marker");
            var move_count = component.get('moves')['x'];
            var marker = component.get('markers')['x'][move_count];
            state[x][y] = 'x'; // show the correct marker at the correct location

            marker.visible = true;
            marker.x = 70 + x * 100;
            marker.y = 70 + y * 100; // Update the game state with the new player and move counts

            component.check_winner();
            component.get('moves')['x'] = move_count + 1; //   add a computer player and move as long as no win or draw is dectected
            // we check that the user has not won or that it is a draw. If the game is still ongoing, then we use the computer_move function

            setTimeout(function () {
              if (!component.get('winner') && !component.get('draw')) {
                var move = computer_move(state);
                move_count = component.get('moves')['o'];
                state[move.x][move.y] = 'o';
                marker = component.get('markers')['o'][move_count];
                marker.visible = true;
                marker.x = 90 + move.x * 100;
                marker.y = 90 + move.y * 100;
                component.get('moves')['o'] = move_count + 1;
                component.get('stage').update();
                component.check_winner();
              }
            }, 500);
          }
        }
      }
    },

    /* Action functions to control the game state Start and restart the game.
        - start action function to first initilaise the game state and present the canvas with the applied createjs animation
        - set the playing state to true and the winner & draw state to undefined
        - state set to undefined for each grid space to ensure the first player can play any position upon start
        - set moves initialises the number of moves that each player has made so far in the game
        - loop over all the markers we created earlier and set their .visible property to false
    */
    actions: {
      start: function () {
        var board = this.get('board');
        board.aplha = 0;

        if (this.get('playing')) {
          var markers = this.get('markers');

          for (var idx = 0; idx < 5; idx++) {
            createjs.Tween.get(markers.x[idx]).to({
              y: 600
            }, 500);
            createjs.Tween.get(markers.o[idx]).to({
              y: 600
            }, 500);
          }

          createjs.Sound.play("falling");
          createjs.Tween.get(board).wait(500).to({
            alpha: 1
          }, 1000);
        } else {
          createjs.Tween.get(board).to({
            alpha: 1
          }, 1000);
        }

        this.set('playing', true);
        this.set('winner', undefined);
        this.set('draw', undefined);
        this.set('state', [[undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
        this.set('moves', {
          'x': 0,
          'o': 0
        });
        this.set('player', 'x');
        var markers = this.get('markers'); // hide all markers - not sure if this neededs ucommenting yet - check when click function is complete

        for (var idx = 0; idx < 5; idx++) {
          markers.x[idx].visible = false;
          markers.o[idx].visible = false;
        }

        this.get('stage').update();
      }
    }
  }));

  _exports.default = _default;
});
;define("week-07/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("week-07/controllers/game", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actions: {
      'save-highscore': function (name, score) {
        var controller = this;
        var highscore = controller.store.createRecord('highscore', {
          name: name,
          score: score
        });
        highscore.save().then(function () {
          controller.store.unloadAll();
          controller.transitionToRoute('highscores');
        });
      }
    }
  });

  _exports.default = _default;
});
;define("week-07/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("week-07/helpers/app-version", ["exports", "week-07/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("week-07/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("week-07/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("week-07/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "week-07/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("week-07/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("week-07/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("week-07/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("week-07/initializers/export-application-global", ["exports", "week-07/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("week-07/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("week-07/models/highscore", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  // import Model from '@ember-data/model';
  // export default class HighscoreModel extends Model {
  // }
  var _default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    score: _emberData.default.attr('number')
  });

  _exports.default = _default;
});
;define("week-07/router", ["exports", "week-07/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('game', {
      path: '/'
    });
    this.route('highscores');
  });
});
;define("week-07/routes/game", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class GameRoute extends Ember.Route {}

  _exports.default = GameRoute;
});
;define("week-07/routes/highscores", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model: function () {
      return this.store.findAll('highscore');
    }
  });

  _exports.default = _default;
});
;define("week-07/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("week-07/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("week-07/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("week-07/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("week-07/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "fEoAxKi8",
    "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[14,1,\"app\"],[12],[2,\"\\n    \"],[10,\"header\"],[12],[2,\"\\n        \"],[10,\"h1\"],[12],[6,[37,0],null,[[\"route\"],[\"game\"]],[[\"default\"],[{\"statements\":[[2,\"Connect\"],[10,\"span\"],[12],[2,\"4\"],[13]],\"parameters\":[]}]]],[13],[2,\"\\n    \"],[13],[2,\"\\n    \"],[10,\"article\"],[12],[2,\"\\n        \"],[1,[30,[36,2],[[30,[36,1],null,null]],null]],[2,\"\\n    \"],[13],[2,\"\\n    \"],[10,\"footer\"],[12],[2,\"\\n        \"],[10,\"div\"],[14,0,\"center\"],[12],[2,\"\\n            Powered by ember-cordova | Developed by Clarke Newsham\\n        \"],[13],[2,\"\\n    \"],[13],[2,\"\\n\"],[13]],\"hasEval\":false,\"upvars\":[\"link-to\",\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "week-07/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("week-07/templates/game", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3CXXTQXt",
    "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\\n\"],[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"connect-four\"]}",
    "meta": {
      "moduleName": "week-07/templates/game.hbs"
    }
  });

  _exports.default = _default;
});
;define("week-07/templates/highscores", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "lAj5JzQF",
    "block": "{\"symbols\":[\"item\"],\"statements\":[[10,\"div\"],[14,0,\"text-center\"],[12],[2,\"\\n    \"],[10,\"h2\"],[12],[2,\"High-scores\"],[13],[2,\"\\n\"],[13],[2,\"\\n\"],[10,\"ol\"],[12],[2,\"\\n\"],[6,[37,2],[[30,[36,1],[[30,[36,1],[[35,0]],null]],null]],null,[[\"default\"],[{\"statements\":[[2,\"    \"],[10,\"li\"],[12],[2,\"\\n        \"],[10,\"div\"],[14,0,\"float-left\"],[12],[1,[32,1,[\"name\"]]],[13],[2,\"\\n        \"],[10,\"div\"],[14,0,\"float-right\"],[12],[1,[32,1,[\"score\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[13]],\"hasEval\":false,\"upvars\":[\"model\",\"-track-array\",\"each\"]}",
    "meta": {
      "moduleName": "week-07/templates/highscores.hbs"
    }
  });

  _exports.default = _default;
});
;define("week-07/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("week-07/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("week-07/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("week-07/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('week-07/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("week-07/app")["default"].create({"name":"week-07","version":"0.0.0+65a2ff30"});
          }
        
//# sourceMappingURL=week-07.map
