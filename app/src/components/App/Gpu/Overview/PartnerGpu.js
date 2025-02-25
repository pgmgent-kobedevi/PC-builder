import React, { useCallback, useState } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPartnerGpus } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "core/routing";
import ErrorAlert from "components/shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import ResultOther from "../forms/ResultOther";
import DeletePartnerGpu from "../Delete/DeletePartnerGpu";
import Pagination from "components/Design/Pagination";

const PartnerGpuOverview = ({query, setQuery}) => {
  const [info, setInfo] = useState();
  const [deleteGpu, setDeleteGpu] = useState();
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const apiCall = useCallback(() => {
    return fetchPartnerGpus(page, perPage);
  }, [page, perPage]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const onUpdate = () => {
    setDeleteGpu(null);
    setQuery(null);
    refresh();
  };

  return (
    <>
      <h4>GPU's:</h4>

      {
        error && (
          <ErrorAlert error={error} />
        )
      }

      {
        isLoading && (
          <Spinner />
        )
      }

      {data && (
        <>

          {
            info && <Alert color="info">{info}</Alert>
          }

          {
            query && <ResultOther updateChecker={deleteGpu} deleter={setDeleteGpu} result={query}/>
          }

          {
            !query && (
              <>
                <ul className="movieList">
                  {data.results.map((product) => (
                    <li key={product.idGpuPartner}>
                      <ProductCard
                        subtitle={`Chipset: ${product.ogCard}`}
                        deleter={setDeleteGpu}
                        product={product}
                        link={PossibleRoutes.GpuPartnerDetail}
                        id={product.idGpuPartner}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Vram: {product.vram} GB<br/>
                        Clockspeed: {product.clockspeed} MHz<br/>
                        Watercooled: {product.watercooled ? 'Yes': 'No'}
                      </ProductCard>
                    </li>
                  ))}
                </ul>
                <Pagination 
                  page={page}
                  perPage={perPage}
                  pageAmount={data.pageAmount}
                  perPageClick={handlePerPageClick}
                  onClick={handlePageClick}
                />
              </>
            )
          }

          {
            deleteGpu && (
              <DeletePartnerGpu
                gpu={deleteGpu}
                onUpdate={onUpdate}
                onDismiss={() => setDeleteGpu(null)}
                setError={setError}
                setInfo={setInfo}
              />
            )
          }

          </>

      )}

    </>
  );

};

export default PartnerGpuOverview;
