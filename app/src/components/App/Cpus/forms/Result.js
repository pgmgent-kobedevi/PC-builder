import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredCpus} from "../../../../core/modules/CPU/api"
import Alert from "components/Design/Alert";
import { PossibleRoutes } from "core/routing";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredCpus(result);
    }, [result, ])

    const {
        data: products,
        error,
        isLoading
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorAlert error={error} />
    }

    if (products.message) {
        return (
            <div className="blobContainer">
                <p>{products.message}</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
            </div>
        )
    }

    return (
        <>
        {
            products && (
                <ul className='movieList'>
                    { products.map((product) => (
                        <li key={product.idProcessor}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idProcessor}
                                link={PossibleRoutes.Detail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Base Clock: {product.clockSpeed}Ghz<br/>
                                Cores: {product.cores}<br/>
                                Socket: {product.socketType}
                            </ProductCard>
                        </li>
                    ))}
                </ul>
            )
        }
        </>
    )
}

export default Result;