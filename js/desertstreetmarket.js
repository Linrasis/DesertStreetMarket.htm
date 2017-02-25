'use strict';

function draw_logic(){
}

function logic(){
    if(input_keys[65]['state']){
        webgl_camera_move({
          'speed': -.1,
          'strafe': true,
          'y': 0,
        });
    }

    if(input_keys[68]['state']){
        webgl_camera_move({
          'speed': .1,
          'strafe': true,
          'y': 0,
        });
    }

    if(input_keys[83]['state']){
        webgl_camera_move({
          'speed': .1,
          'y': 0,
        });
    }

    if(input_keys[87]['state']){
        webgl_camera_move({
          'speed': -.1,
          'y': 0,
        });
    }

    webgl_camera['x'] = math_clamp({
      'max': 25,
      'min': -10,
      'value': webgl_camera['x'],
    });
    webgl_camera['z'] = math_clamp({
      'max': 5,
      'min': -30,
      'value': webgl_camera['z'],
    });
}

window.onload = function(e){
    input_init({
      'keybinds': {
        65: {},
        68: {},
        83: {},
        87: {},
      },
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              input_requestpointerlock({
                'id': 'canvas',
              });
          },
        },
        'mousemove': {
          'todo': function(){
              if(input_mouse['pointerlock-state']){
                  webgl_camera_rotate({
                    'x': input_mouse['movement-y'] / 10,
                    'y': input_mouse['movement-x'] / 10,
                    'z': 0,
                  });
              }
          },
        },
      },
    });
    webgl_init();
    webgl_clearcolor_set({
      'color': {
        'alpha': 1,
        'blue': .1,
        'green': .5,
        'red': .7,
      },
    });

    entity_create({
      'id': 'ground-inside',
      'properties': {
        'color': [
          0.4, 0.15, 0, 1,
          0.4, 0.15, 0, 1,
          0.4, 0.15, 0, 1,
          0.4, 0.15, 0, 1,
        ],
        'position': {
          'x': 0,
          'y': -2,
          'z': 20,
        },
        'vertices': [
          15, 0, -12,
          -12, 0, -12,
          -12, 0, 15,
          15, 0, 15,
        ],
      },
    });
    entity_create({
      'id': 'ground-outside-0',
      'properties': {
        'color': [
          0.4, 0.15, 0, 1,
          0.4, 0.15, 0, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
        ],
        'position': {
          'x': 0,
          'y': -2,
          'z': 0,
        },
        'vertices': [
          15, 0, -5,
          -15, 0, -5,
          -15, 0, 5,
          25, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'ground-outside-1',
      'properties': {
        'color': [
          0.5882, 0.4196, 0.0863, 1,
          0.4, 0.15, 0, 1,
          0.4, 0.15, 0, 1,
          0.5882, 0.4196, 0.0863, 1,
        ],
        'position': {
          'x': 20,
          'y': -2,
          'z': 20,
        },
        'vertices': [
          5, 0, -15,
          -5, 0, -15,
          -5, 0, 15,
          5, 0, 25,
        ],
      },
    });

    entity_create({
      'id': 'sand-0',
      'properties': {
        'color': [
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': 0,
          'y': -2,
          'z': -10,
        },
        'vertices': [
          25, 0, -5,
          -15, 0, -5,
          -15, -5, 20,
          45, -5, 20,
        ],
      },
    });
    entity_create({
      'id': 'sand-1',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': 30,
          'y': -2,
          'z': 20,
        },
        'vertices': [
          15, -5, -15,
          -5, 0, -15,
          -5, 0, 25,
          15, -5, 50,
        ],
      },
    });
    entity_create({
      'id': 'sand-2',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
        ],
        'position': {
          'x': -20,
          'y': -2,
          'z': 0,
        },
        'vertices': [
          5, -5, 30,
          5, -5, -5,
          5, 15, -10,
          5, 15, 5,
        ],
      },
    });
    entity_create({
      'id': 'sand-3',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.5882, 0.4196, 0.0863, 1,
          0.5882, 0.4196, 0.0863, 1,
        ],
        'position': {
          'x': 20,
          'y': -2,
          'z': 40,
        },
        'vertices': [
          25, -5, 5,
          25, 15, 5,
          -5, 15, 5,
          -5, 0, 5,
        ],
      },
    });

    entity_create({
      'id': 'wall-back',
      'properties': {
        'color': [
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
        ],
        'position': {
          'x': 0,
          'y': -2,
          'z': 37,
        },
        'vertices': [
          5, 0, 5,
          5, 10, 5,
          -5, 10, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'wall-left',
      'properties': {
        'color': [
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
          0.38, 0.12, 0, 1,
        ],
        'position': {
          'x': -17,
          'y': -2,
          'z': 20,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 10, -5,
          5, 10, 5,
        ],
      },
    });

    entity_create({
      'id': 'pillar-0-back',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          -5, 0, -5,
          -5, 42, -5,
          5, 42, -5,
          5, 0, -5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-0-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-0-left',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          -5, 42, 5,
          -5, 42, -5,
          -5, 0, -5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-0-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-1-back',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          -5, 0, -5,
          -5, 42, -5,
          5, 42, -5,
          5, 0, -5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-1-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-1-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-2-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-2-left',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          -5, 42, 5,
          -5, 42, -5,
          -5, 0, -5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-2-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-3-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-3-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-4-back',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -30,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          -5, 0, -5,
          -5, 42, -5,
          5, 42, -5,
          5, 0, -5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-4-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -30,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-4-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': -30,
          'y': -2,
          'z': 10,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-5-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -30,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-5-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': -30,
          'y': -2,
          'z': 30,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-6-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 50,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-6-left',
      'properties': {
        'color': [
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 50,
        },
        'vertices': [
          -5, 42, 5,
          -5, 42, -5,
          -5, 0, -5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-6-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': 10,
          'y': -2,
          'z': 50,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-7-front',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
          0.4, 0.1, 0, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 50,
        },
        'vertices': [
          5, 0, 5,
          5, 42, 5,
          -5, 42, 5,
          -5, 0, 5,
        ],
      },
    });
    entity_create({
      'id': 'pillar-7-right',
      'properties': {
        'color': [
          0.4, 0.1, 0, 1,
          0.4, 0.1, 0, 1,
          0.7, 0.5, 0.1, 1,
          0.7, 0.5, 0.1, 1,
        ],
        'position': {
          'x': -10,
          'y': -2,
          'z': 50,
        },
        'vertices': [
          5, 0, 5,
          5, 0, -5,
          5, 42, -5,
          5, 42, 5,
        ],
      },
    });
};
