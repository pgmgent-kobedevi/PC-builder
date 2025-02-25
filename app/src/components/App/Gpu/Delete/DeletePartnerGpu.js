import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deletePartnerGpu } from "../../../../core/modules/Gpu/api";

const DeletePartnerGpu = ({setError, gpu, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deletePartnerGpu(gpu.idGpuPartner))
        .then((data) => {
            onUpdate();
            setInfo(`GPU: '${data.modelName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete Partner GPU'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeletePartnerGpu;