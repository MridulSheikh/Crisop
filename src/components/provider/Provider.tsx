// src/components/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import {GoogleOAuthProvider} from "@react-oauth/google"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  );
}
