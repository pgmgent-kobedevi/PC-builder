import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";

const CaseDetail = ({pccase}) => {
  return (
    <div className="fullSize">
      <div className="detail">
        {/* TODO: cpusockets mapping */}
        <DetailCard data={pccase} />
        <Link
          to={route(PossibleRoutes.CaseEdit, {
            id: pccase.idCase,
          })}
        >
          {pccase.modelName}
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model pccase={pccase} />
        </Layout>
      </div>
    </div>
  );
};

export default CaseDetail;