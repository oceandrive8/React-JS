import AuthListener from "../src/components/AuthListener";
import AppRouter from "./routes/AppRouter";
import useOfflineStatus from "./hooks/useOfflineStatus";
import "./App.css"; 

function App() {
  const offline = useOfflineStatus();

  return (
    <>
      {offline && (
        <div className="offline-toast">
          ⚠ You are offline
        </div>
      )}
      <AuthListener />
      <AppRouter />
    </>
  );
}

export default App;








