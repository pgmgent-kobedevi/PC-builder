import { useCallback, useState } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import { fetchCaseByIdBuilder, fetchCompatibleCases, fetchCompatibleCasesFilter } from "core/modules/Case/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import Pagination from "components/Design/Pagination";
import CaseResult from "./CaseResult";

const CaseSelect = ({currentBuild, updateBuild, idCase, formfactor, width, height, depth, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage)
  }

  const handlePageClick = (page) => {
    setPerPage(page)
  }

  const apiCall = useCallback(() => {
    return fetchCompatibleCases(width,height, depth, page, perPage);
  }, [width,height, depth, page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateBuild({
      case: product
    })
    updateFields({
      idCase: product.idCase,
    })
  }

  return (
    <>

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

      {
        data && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              isPublic={true}
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            {
              query &&
              <CaseResult 
                dimensions={{width, height, depth}}
                filter={fetchCompatibleCasesFilter}
                setProductInfo={setProductInfo}
                currentBuild={currentBuild}
                onClick={onClick}
                result={query}
              />
            }
            {(data.results.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <>
                <ul className="productList">
                  {data.results.map((product) => {
                    const disabled = product.idCase === currentBuild.case.idCase ? true : false;
                    return(
                    <li key={product.idCase}>
                      <BuilderProductCard
                        product={product}
                        setProductInfo={setProductInfo}
                        link={PossibleRoutes.Detail}
                        id={product.idCase}
                      >
                        <p>
                        Manufacturer: {product.manufacturerName}<br/>
                        Formfactor: {product.formfactor}<br/>
                        <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                        </p>
                        <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                      </BuilderProductCard>
                    </li>
                  )})}
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
              productInfo && (
                <InfoModal
                  onDismiss={() => setProductInfo(null)}
                  fetcher={fetchCaseByIdBuilder}
                  productInfo={productInfo}
                />
              )
            }
          </>
        )
      }
    </>
  );
};

export default CaseSelect;
