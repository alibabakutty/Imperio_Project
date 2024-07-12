import { useParams } from 'react-router-dom'


const MasterAlterFilter = () => {

  const { altFilter } = useParams();

  const renderComp = () => {
    switch(altFilter){
      case 'voucherTypeAlter':
        return <VoucherTypeAlter />
    }
  }
  return (
    <>
      <div></div>
    </>
  )
}

export default MasterAlterFilter