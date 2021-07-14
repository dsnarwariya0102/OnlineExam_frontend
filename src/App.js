import { Provider } from "react-redux";
import "./App.css";
// import QuestionBank from "./auth/admin/view/questionbank/QuestionBank";
import ReduxQuestionBank from "./auth/admin/view/questionbank/ReduxQuestionBank";
import store from "./auth/reducer/store";
// import QuestionOptions from "./auth/admin/view/questionoptions/QuestionOptions";
// import AdminRouter from "./auth/router/AdminRouter";
// import Subject from "./auth/admin/view/Subject";
// import Quiz from "./auth/admin/view/quiz/Quiz";

function App() {
  return (
    <div>
      <Provider store={store}>
        <ReduxQuestionBank />
      </Provider>
    </div>
  );
}

export default App;
