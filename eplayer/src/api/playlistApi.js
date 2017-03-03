// import { apiConstants } from '../../const/Constants';
<<<<<<< HEAD
import { getAnndata, postAnnData, putAnnData, deleteAnnData } from './genericApi';

class PlaylistApi {
  static doGetAnnotation = filterData => get(filterData)
  static doPostAnnotation = data => postAnnData(data)
  static doPutAnnotation = data => putAnnData(data)
  static doDeleteAnnotation = data => deleteAnnData(data._id.$oid)// eslint-disable-line no-underscore-dangle
}

export default AnnotationApi;
=======
import { getBookDetails, getPlaylistDetails } from './genericApi';

class PlaylistApi {
  static doGetBookDetails = bookId => getBookDetails(bookId)
  static doGetPlaylistDetails = (bookId,tocurl) => getPlaylistDetails(bookId,tocurl)
}

export default PlaylistApi;
>>>>>>> c66fbd7d97a782c2f9eac4c89e68e1f3459a7e31
