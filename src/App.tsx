import "./App.css";
import { Main } from "./components/Main/Main";

import { SettingsClientProvider } from "./store/SettingsClient/SettingsClientProvider";

function App() {
  return (
    <SettingsClientProvider>
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Awesome Bucket </h1>
        </header>
        <Main />
      </div>
    </SettingsClientProvider>
  );
}

export default App;
