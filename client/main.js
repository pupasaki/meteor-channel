import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';
import { createStore } from 'redux'
import { appState } from '../imports/ui/reducers'
import { newPostClicked } from '../imports/ui/actions'

import '../imports/lib/config/at_config.js' // TODO: change to accounts templaet config
import '/imports/api/methods.js'


Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});

