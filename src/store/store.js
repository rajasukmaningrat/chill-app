import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./slices/movieSlice";
import userReducer from "./slices/userSlice";
import packageReducer from "./slices/packageSlice";
import episodeReducer from "./slices/episodeSlice";
import myListReducer from "./slices/mylistSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
    package: packageReducer,
    episode: episodeReducer,
    mylist: myListReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export default store;
