import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterReducer from "./filtersSlice";
import contactsReducer from "./contactsSlice";

const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};
const rootReducer = combineReducers({
  contacts: persistReducer(contactsPersistConfig, contactsReducer),
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
