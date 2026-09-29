import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./slices/movieSlice";
import packageReducer from "./slices/packageSlice";
import episodeReducer from "./slices/episodeSlice";
import myListReducer from "./slices/mylistSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    package: packageReducer,
    episode: episodeReducer,
    mylist: myListReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export default store;
