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
    if (i.type === 'addProperties') {
      for (const key of Object.keys(i.extraData)) {
        stateClone[key] = i.extraData[key];
      }
    }

    if (i.type === 'removeProperties') {
      for (const n of i.keysToRemove) {
        for (const key of Object.keys(stateClone)) {
          if (key === n) {
            delete stateClone[key];
          }
        }
      }
    }

    if (i.type === 'clear') {
      for (const key of Object.keys(stateClone)) {
        delete stateClone[key];
      }
    }

    stateChangesLog.push({ ...stateClone });
  }

  return stateChangesLog;
}

module.exports = transformStateWithClones;
