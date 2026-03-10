'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateChangesLog = [];

  for (const i of actions) {
    switch (true) {
      case i.type === 'addProperties':
        for (const key of Object.keys(i.extraData)) {
          stateClone[key] = i.extraData[key];
        }
        break;

      case i.type === 'removeProperties':
        for (const n of i.keysToRemove) {
          delete stateClone[n];
        }
        break;

      case i.type === 'clear':
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }
    }

    stateChangesLog.push({ ...stateClone });
  }

  return stateChangesLog;
}

module.exports = transformStateWithClones;
