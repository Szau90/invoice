import type { AppProps } from "next/app";
import { League_Spartan } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store";

const league = League_Spartan({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={league.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
