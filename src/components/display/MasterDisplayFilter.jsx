import { useParams } from 'react-router-dom'
import VoucherTypeFilter from '../../pages/master/voucher_type_master/VoucherTypeFilter'
import LedgerFilter from '../../pages/master/ledger_master/LedgerFilter'
import RegionFilter from '../../pages/master/region_master/RegionFilter';
import ExecutiveFilter from '../../pages/master/executive_master/ExecutiveFilter'
import DistributorFilter from '../../pages/master/distributor_master/DistributorFilter'
import ProductFilter from '../../pages/master/product_master/ProductFilter'
import GodownFilter from '../../pages/master/godown_master/GodownFilter'

const MasterDisplayFilter = () => {

  const {disFilter} = useParams();

  const renderComp = () => {
    switch(disFilter){
      case 'voucherTypeFilter':
        return <VoucherTypeFilter />
      case 'ledgerFilter':
        return <LedgerFilter />
      case 'regionFilter':
        return <RegionFilter />
      case 'executiveFilter':
        return <ExecutiveFilter />
      case 'distributorFilter':
        return <DistributorFilter />
      case 'productFilter':
        return <ProductFilter />
      case 'godownFilter':
        return <GodownFilter />
    }
  }
  return (
    <>
      <div>{renderComp()}</div>
    </>
  )
}

export default MasterDisplayFilter