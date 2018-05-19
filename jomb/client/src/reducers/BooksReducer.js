import _ from "lodash";
import { FETCH_BOOKS, FETCH_BOOK } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BOOKS:
    case FETCH_BOOK:
      return _.mapKeys(action.payload.items, "id");
    default:
      return state;
  }
}
