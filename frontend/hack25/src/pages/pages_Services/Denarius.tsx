import NavBar from "../../components/NavBar";
import Card from "../../components/components_Services/Card";
import IntroFin from "../../assets/intro_fin.svg";
import FinancePyMEs from "../../assets/Pymes.svg";
import MathsFin from "../../assets/maths_fin_i.svg";

function Denarius() {
  return (
    <>
      <NavBar />
      <h1> Courses </h1>
      <div className="container">
        <div className="row">
          <Card
            title="Introduction to Finance"
            titleLink="/Denarius/introduction-to-finance"
            level="Difficult"
            description="This course covers the basics of finance, including time value of money, risk and return, and financial markets."
            imageUrl={IntroFin}
          />
          <Card
            title="Finance for PyMEs"
            titleLink="/Denarius/finance-for-pymes"
            level="Difficult"
            description="This course covers the basics of finance for small and medium-sized enterprises (PyMEs), including financial statements, budgeting, and cash flow management."
            imageUrl={FinancePyMEs}
          />
          <Card
            title="Maths for Finances I"
            titleLink="/Denarius/maths-for-finances-i"
            level="Difficult"
            description="This course covers the basics of mathematics for finance, including algebra, calculus, and statistics."
            imageUrl={MathsFin}
          />
        </div>
      </div>
    </>
  );
}

export default Denarius;
