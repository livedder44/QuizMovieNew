import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import PageRouter from "./PageRouter";

function App() {
  return (
    <Router basename="/QuizMovieNew">
      <div className={styles.wrapper}>
        <Header />
        <Routes>
          <Route path="/" element={<PageRouter defaultPage={1} />} />
          <Route path="/page/:pageId" element={<PageRouter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
