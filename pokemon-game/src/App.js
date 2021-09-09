import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import "./index.css";
import bg from "./assets/bg1.jpg";

function App() {
  return (
    <div className="App">
      <Header title="This is title" descr="This is the Description!" />
      <Layout
        title="This is the first title"
        descr="This is the Description!"
        urlBg={bg}
      />
      <Layout
        title="This is the second title"
        descr="This is the Description!"
        colorBg="red"
      />
      <Layout
        title="This is the third title"
        descr="This is the Description!"
        urlBg={bg}
        colorBg="green"
      />
      <Footer />
    </div>
  );
}

export default App;
