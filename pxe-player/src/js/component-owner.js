// In React, an owner is the component that sets the props of other components, if desired.
// (see https://facebook.github.io/react/docs/multiple-components.html)
//
// NOTE: If you want to reference another Origami component in this file's JSX below, import
// its src/js/component-owner.js directly from this project's /node_modules.

//import '../scss/component-specific.scss';

import React, {PropTypes} from 'react';
import {injectIntl} from 'react-intl';

import PxePlayer from './PxePlayer';

class ComponentOwner extends React.Component {

  //
  // Modify or add prop types to validate the properties passed to this component!
  // This is defined using an ES7 class property (transpiled by Babel Stage 0)
  //
  static propTypes = {
    bootstrapParams:PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }

  //
  // Note that combining the fat arrow syntax with ES7 class properties (transpiled by Babel Stage 0), we eliminate the
  // need to do manual binding of the 'this' context in event handlers or callbacks. React binds all other contexts
  // as expected.
  //

  render() {
    const { bootstrapParams, applnCallback } = this.props;
    return (
      <div>
        <PxePlayer bootstrapParams={bootstrapParams} applnCallback={applnCallback} />
      </div>
    );
  };  
}

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
