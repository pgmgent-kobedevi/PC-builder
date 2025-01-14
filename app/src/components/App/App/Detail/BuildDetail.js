import Nav from "../Homepage/Nav"
import { useCallback } from "react"
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import { fetchBuild } from "core/modules/Builds/api";
import { Link, useParams } from "react-router-dom";
import ErrorAlert from "components/shared/ErrorAlert";
import Spinner from "components/Design/Spinner";
import ItemListDetail from "components/Design/ItemListDetail";
import { PossibleRoutes, route } from "core/routing";
import EditIcon from "components/Design/EditIcon";
import { useAuth } from "components/Auth/AuthContainer";
import Layout from "components/Design/Models/Layout";
import Model from "../Builder/forms/Model/Model";


const BuildDetail = () => {
  
  const { id } = useParams();
  const auth = useAuth()
  
  const apiCall = useCallback(() => {
    return fetchBuild(id);
  }, [id]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);
  
  return (
    <>
      <header>
        <Nav/>
      </header>
      <div className="container" style={{marginTop:"6rem"}}>
        <div className="curvedContainer">
          {isLoading && (
            <Spinner/>
          )}
          {error && (
            <ErrorAlert error={error}/>
          )}
          {data && (
            <>
              <div>
                <ItemListDetail color="info" info={data} />
              </div>
              <div style={{width: "100%", minHeight:"500px", maxHeight:"1000px"}}>
                <Layout>
                  <group name="parts">
                    <Model motherboard={data.motherboard} psu={data.psu} pccase={data.case} gpu={data?.gpu ? data.gpu : null} cpucooler={data.cpucooler} ram={data.ram}/>
                  </group>
                </Layout>
                {data.user.id !== null  && (
                  <>
                    {(auth?.user?.idUser === data.user.id) && (
                      <Link className="edit" to={route(PossibleRoutes.BuilderEdit, {id: id})} state={
                        { 
                          data: {
                            name: data.name,
                            id,
                            case: {
                              idCase: data.case.id,
                              '2-5_slots': data.case.smallSlots,
                              '3-5_slots': data.case.bigSlots,
                              ...data.case,
                            },
                            cpu: {
                              ...data.cpu,
                              idProcessor: data.cpu.id,
                            },
                            cpucooler: {
                              ...data.cpucooler,
                              idCpuCooler: data.cpucooler.id,
                            },
                            gpu: {
                              ...data.gpu,
                              idGpuPartner: data.gpu.id,
                            },
                            motherboard: {
                              ...data.motherboard,
                              idMotherboard: data.motherboard.id,
                            },
                            psu: {
                              ...data.psu,
                              idPsu: data.psu.id,
                            },
                            ram: {
                              ...data.ram,
                              idRam: data.ram.id,
                            },
                            storage: [
                              ...data.storage,
                            ],
                          }
                        }
                      }><EditIcon/></Link>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BuildDetail