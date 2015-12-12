'use strict';

let Utils = require('./Utils');

/**
 * Get scene by id command
 *
 * Get a list of scenes
 */
class GetSceneById {
  /**
   * Constructor
   *
   * @param {int} sceneId Scene Id
   */
  constructor(sceneId) {
    this.sceneId = String(sceneId);
  }

  /**
   * Invoke command
   *
   * @param {Client} client Client
   *
   * @return {Promise} Promise for chaining
   */
  invoke(client) {
    let options = {
      path: `api/${client.username}/scenes`
    };

    return client.getTransport()
      .sendRequest(options)
      .then(result => {
        if (!(this.sceneId in result)) {
          throw new Error({
            description: `Scene ${this.sceneId} does not exist`
          });
        }

        result[this.sceneId].id = sceneId;

        return Utils.buildScene(result[this.sceneId]);
      });
  }
}

module.exports = GetSceneById;