import TokensStatus from "../components/dashboard/TokensStatus";
import PoolStatus from "../components/dashboard/PoolStatus";

import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValue";

const Home = () => {
  return (
    <div>
      <div className="top-container">
        <TokensStatus />
        <PoolStatus
          marketCap={"422063"}
          totalFrozen={"81833"}
          totalTokenSupply={"5812654"}
        />
      </div>
      <div className="bottom-container">
        <TotalValue totalValue={'112303.052'} />
      </div>
    </div>
  );
};

export default Home;
