import ErrorAlert from 'components/shared/ErrorAlert';
import CpuSelect from 'components/util/builder/CpuSelect'

const CpuPicker = ({idCpu, idCpuSocket, cooler, updateFields}) => {
  return (
    <div>
        cpu picker:
        <input tabIndex="-1" style={{color:"black"}} value={idCpu} required type="text"/>
        <CpuSelect
          cooler={cooler}
          idCpuSocket={idCpuSocket}
          updateFields={updateFields}
        />
    </div>
  )
}

export default CpuPicker