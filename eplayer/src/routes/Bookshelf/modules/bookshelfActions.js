import { clients } from '../../../components/common/client';


const bookshelfActions = {
  fetch(urn) {
    return {
      type: 'BOOKS',
      payload: clients.scapi.get('')
    };
  }

};

export default bookshelfActions;
