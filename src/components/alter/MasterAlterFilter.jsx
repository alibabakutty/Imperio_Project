import { useParams } from 'react-router-dom'
import VoucherTypeAlter from '../../pages/master/voucher_type_master/VoucherTypeAlter'
import LedgerAlter from '../../pages/master/ledger_master/LedgerAlter'
import RegionAlter from '../../pages/master/region_master/RegionAlter'
import ExecutiveAlter from '../../pages/master/executive_master/ExecutiveAlter'
import DistributorAlter from '../../pages/master/distributor_master/DistributorAlter'
import ProductAlter from '../../pages/master/product_master/ProductAlter'
import GodownAlter from '../../pages/master/godown_master/GodownAlter'

const MasterAlterFilter = () => {

  const { type } = useParams();

  const renderComp = () => {
    switch(type){
      case 'voucherTypeAlter':
        return <VoucherTypeAlter />
      case 'ledgerAlter':
        return <LedgerAlter />
      case 'regionAlter':
        return <RegionAlter />
      case 'executiveAlter':
        return <ExecutiveAlter />
      case 'distributorAlter':
        return <DistributorAlter />
      case 'productAlter':
        return <ProductAlter />
      case 'godownAlter':
        return <GodownAlter />
      default:
        return <div>404 Not Found</div>
    }
  }
  return (
    <>
      <div>{renderComp()}</div>
    </>
  )
}

export default MasterAlterFilter