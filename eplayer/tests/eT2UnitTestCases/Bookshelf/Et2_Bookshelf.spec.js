import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import isEmpty from 'lodash/isEmpty';
import { BookshelfComponent } from '@pearson-incubator/bookshelf';
import BookshelfPage from '../../../src/routes/Bookshelf/components/Bookshelf';
import BookshelfHeader from '../../../src/components/BookshelfHeader';
import { fetch, storeBookDetails, storeSsoKey } from '../../../src/routes/Bookshelf/modules/bookshelfActions';


describe(" Bookshelf ", () => {
    it("should render my component", () => {
        const wrapper = shallow(<BookshelfPage />);
      });
})