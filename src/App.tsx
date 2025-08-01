import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Restaurants } from "./components/Restaurants";
import { Container } from "./styles";

function App() {
  return (
    <>
      <Hero />
      <Container>
        <Restaurants />
      </Container>
      <Footer />
    </>
  );
}

export default App;
