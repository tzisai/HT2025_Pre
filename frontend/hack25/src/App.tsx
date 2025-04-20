import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Nova from "./pages/pages_Services/Nova";

import Denarius from "./pages/pages_Services/Denarius";
import IntroductionToFinance from "./pages/pages_Services/pages_Services_Denauis/introduction-to-finance";
import FinanceForPyMEs from "./pages/pages_Services/pages_Services_Denauis/finance-for-pymes";
import MathsForFinancesI from "./pages/pages_Services/pages_Services_Denauis/maths-for-finances-i";

import NEX from "./pages/pages_Services/NEX";

function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Nova" element={<Nova />} />
        <Route path="/Denarius" element={<Denarius />} />

        <Route
          path="/Denarius/maths-for-finances-i"
          element={<MathsForFinancesI />}
        />
        <Route
          path="/Denarius/finance-for-pymes"
          element={<FinanceForPyMEs />}
        />
        <Route
          path="/Denarius/introduction-to-finance"
          element={<IntroductionToFinance />}
        />

        <Route path="/NEX" element={<NEX />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
