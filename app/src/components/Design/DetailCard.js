import { useState } from "react";
import ProductView from "./ProductView";
import { ObjectKeysToText } from "components/util/ObjectKeysToText";
import { showUnit } from "components/util/showUnit";

const DetailCard = ({ data }) => {

  const [productView, setProductView] = useState();

  return (
    <div className="contentScroller">
      <table className="mt-4">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            // hide show id fields
            if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted") && !key.startsWith("amount") && !key.startsWith("storage")) {
              return (
                <tr key={key}>
                  <td>
                    {ObjectKeysToText(key)}
                    :
                  </td>
                  <td>{value !== null ? (!Array.isArray(value) ? `${value} ${showUnit(key)}` : value.join(', ') ) : "unknown"} </td>
                </tr>
              );
            }
            return null;
          })}

          {(Array.isArray(data?.idStorageType) && data?.idStorageType.length > 0) && (
            <tr>
              <td>Storage methods:</td>
              <td>
              {
                data.idStorageType.map((x, index)=> {
                  return <span>{data.storageType[index]}: x{data.amount[index]}{(data.idStorageType.length-1 === index) ? '' : ', '}</span>
                })
              }
              </td>
            </tr>
          )}
          
          {data.image && (
            <tr key="image">
              <td>Product image:</td>
              <td onClick={() => setProductView(true)}><img className="productImage" src={data.image} alt="Product"/></td>
            </tr>
          )}
        </tbody>
      </table>

      {
        productView && (
          <ProductView
            image={data.image}
            center={true}
            onDismiss={() => setProductView(null)}
          />
        )
      }

    </div>

  );
};

export default DetailCard;
