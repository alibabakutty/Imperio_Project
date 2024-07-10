import { BrowserRouter, Route, Routes } from "react-router-dom"

import RegionMaster from "./pages/master/region_master/RegionMaster"
import Gateway from "./components/Gateway"
import ExecutiveMaster from "./pages/master/executive_master/ExecutiveMaster"
import DistributorMaster from "./pages/master/distributor_master/DistributorMaster"
import ListofMasters from "./components/ListofMasters"
import RegionMasterAddedCheck from "./message/RegionMasterAddedCheck"
import ExecutiveMasterAddedCheck from "./message/ExecutiveMasterAddedCheck"
import DistributorMasterAddedCheck from "./message/DistributorMasterAddedCheck"
import ProductMasterAddedCheck from "./message/ProductMasterAddedCheck"

import DisplayOFMasters from "./components/DisplayOFMasters"
import RegionFilter from "./pages/master/region_master/RegionFilter"
import DisplayRegionMaster from "./pages/master/region_master/DisplayRegionMaster"
import ExecutiveFilter from "./pages/master/executive_master/ExecutiveFilter"
import DisplayExecutiveMaster from "./pages/master/executive_master/DisplayExecutiveMaster"
import DistributorFilter from "./pages/master/distributor_master/DistributorFilter"
import DisplayDistributorMaster from "./pages/master/distributor_master/DisplayDistributorMaster"
import ProductFilter from "./pages/master/product_master/ProductFilter"
import DisplayProductMaster from "./pages/master/product_master/DisplayProductMaster"
import RegionAlter from "./pages/master/region_master/RegionAlter"
import ExecutiveAlter from "./pages/master/executive_master/ExecutiveAlter"
import DistributorAlter from "./pages/master/distributor_master/DistributorAlter"
import ProductAlter from "./pages/master/product_master/ProductAlter"
import AlterOfMasters from "./components/AlterOfMasters"
import AlterRegionMaster from "./pages/master/region_master/AlterRegionMaster"
import RegionMasterAlteredCheck from "./message/RegionMasterAlteredCheck"
import AlterExecutiveMaster from "./pages/master/executive_master/AlterExecutiveMaster"
import AlterDistributorMaster from "./pages/master/distributor_master/AlterDistributorMaster"
import AlterProductMaster from "./pages/master/product_master/AlterProductMaster"
import ExecutiveMasterAlteredCheck from "./message/ExecutiveMasterAlteredCheck"
import DistributorMasterAlteredCheck from "./message/DistributorMasterAlteredCheck"
import ProductMasterAlteredCheck from "./message/ProductMasterAlteredCheck"
import GodownMaster from "./pages/master/godown_master/GodownMaster"
import GodownMasterAddedCheck from "./message/GodownMasterAddedCheck"
import GodownFilter from "./pages/master/godown_master/GodownFilter"
import GodownAlter from "./pages/master/godown_master/GodownAlter"
import DisplayGodownMaster from "./pages/master/godown_master/DisplayGodownMaster"
import AlterGodownMaster from "./pages/master/godown_master/AlterGodownMaster"
import GodownMasterAlteredCheck from "./message/GodownMasterAlteredCheck"
import VoucherTypeMaster from "./pages/master/voucher_type_master/VoucherTypeMaster"
import VoucherTypeMasterAddedCheck from "./message/VoucherTypeMasterAddedCheck"
import VoucherTypeFilter from "./pages/master/voucher_type_master/VoucherTypeFilter"
import DisplayVoucherTypeMaster from "./pages/master/voucher_type_master/DisplayVoucherTypeMaster"
import VoucherTypeAlter from "./pages/master/voucher_type_master/VoucherTypeAlter"
import AlterVoucherTypeMaster from "./pages/master/voucher_type_master/AlterVoucherTypeMaster"
import VoucherTypeMasterAlteredCheck from "./message/VoucherTypeMasterAlteredCheck"
import LedgerMaster from "./pages/master/ledger_master/LedgerMaster"
import LedgerMasterAddedCheck from "./message/LedgerMasterAddedCheck"
import LedgerFilter from "./pages/master/ledger_master/LedgerFilter"
import LedgerAlter from "./pages/master/ledger_master/LedgerAlter"
import DisplayLedgerMaster from "./pages/master/ledger_master/DisplayLedgerMaster"
import AlterLedgerMaster from "./pages/master/ledger_master/AlterLedgerMaster"
import LedgerMasterAlteredCheck from "./message/LedgerMasterAlteredCheck"
import ProductMaster from "./pages/master/product_master/ProductMaster"





function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* http://localhost:4000 */}
          <Route path="/" element ={<Gateway />} />

          {/* http://localhost:4000/list */}
          <Route path="/list" element ={<ListofMasters />} />

          {/* http://localhost:4000/region */}
          <Route path="/region" element = {<RegionMaster />} />
          
          {/* http://localhost:4000/executive */}
          <Route path="/executive" element = {<ExecutiveMaster />} />

          {/* http://localhost:4000/distributor */}
          <Route path="/distributor" element = {<DistributorMaster />} />
          
         {/* http://localhost:4000/product */}
         <Route path="/product" element = {<ProductMaster />} />

          {/* http://localhost:4000/goodown */}
          <Route path="/godown" element = {<GodownMaster />} />

          {/* http://localhost:4000/voucherTypeMaster */}
          <Route path="/voucherType" element = {<VoucherTypeMaster />} />

          {/* http://localhost:4000/ledgerMaster */}
          <Route path="/ledger" element = {<LedgerMaster /> } />
          
         {/* http://localhost:4000/addedRegion */}
         <Route path="/addedRegion" element = {<RegionMasterAddedCheck />} />

         {/* http://localhost:4000/addedExecutive */}
         <Route path="addedExecutive" element = {<ExecutiveMasterAddedCheck />} />

         {/* http://localhost:4000/addedDistributor */}
         <Route path="addedDistributor" element = {<DistributorMasterAddedCheck />} />

         {/* http://localhost:4000/addedDistributor */}
         <Route path="addedProduct" element = {<ProductMasterAddedCheck />} />

         {/* http://localhost:4000/addedGodown */}
         <Route path="addedGodown" element = {<GodownMasterAddedCheck />} />

         {/* http://localhost:4000/addedVoucherType */}
         <Route path="addedVoucherType" element = {<VoucherTypeMasterAddedCheck />} />

         {/* http://localhost:4000/addedLedger */}
         <Route path="addedLedger" element = {<LedgerMasterAddedCheck /> } />

         {/* http://localhost:4000/display */}
         <Route path="/display" element = {<DisplayOFMasters /> } />

          {/* http://localhost:4000/regionFilter */}
          <Route path="/regionFilter" element = {<RegionFilter /> } />

          {/* http://localhost:4000/executiveFilter */}
          <Route path="/executiveFilter" element={<ExecutiveFilter />} />

          {/* http://localhost:4000/distributorFilter */}
          <Route path="/distributorFilter" element={<DistributorFilter />} />

          {/* http://localhost:4000/productFilter */}
          <Route path="/productFilter" element={<ProductFilter />} />

          {/* http://localhost:4000/godownFilter */}
          <Route path="/godownFilter" element = {<GodownFilter />} />

          {/* http://localhost:4000/voucherTypeFilter */}
          <Route path="/voucherTypeFilter" element = {<VoucherTypeFilter />} />

          {/* http://localhost:4000/ledgerFilter */}
          <Route path="/ledgerFilter" element = {<LedgerFilter /> } />

          {/* http://localhost:4000/alter */}
          <Route path="/alter" element = {<AlterOfMasters />} />

          {/* http://localhost:4000/regionAlter */}
          <Route path="/regionAlter" element={<RegionAlter />} />

          {/* http://localhost:4000/executiveAlter */}
          <Route path="/executiveAlter" element={<ExecutiveAlter />} />

          {/* http://localhost:4000/distributorAlter */}
          <Route path="/distributorAlter" element={<DistributorAlter />} />

          {/* http://localhost:4000/productAlter */}
          <Route path="/productAlter" element={<ProductAlter />} />

          {/* http://localhost:4000/godownAlter */}
          <Route path="/godownAlter" element = {<GodownAlter />} />

          {/* http://localhost:4000/voucherTypeAlter */}
          <Route path="/voucherTypeAlter" element = {<VoucherTypeAlter />} />

          {/* http://localhost:4000/ledgerAlter */}
          <Route path="ledgerAlter" element = {<LedgerAlter /> } />


         {/* http://localhost:4000/displayRegion */}
         <Route path="displayRegion/:regionMasterId" element = {<DisplayRegionMaster />} />

         {/* http://localhost:4000/displayExecutive */}
         <Route path="displayExecutive/:executiveCode" element = {<DisplayExecutiveMaster />} />

         {/* http://localhost:4000/displayDistributor */}
         <Route path="displayDistributor/:distributorCode" element={<DisplayDistributorMaster />} />

         {/* http://localhost:4000/displayProduct */}
         <Route path="displayProduct/:productCode" element={<DisplayProductMaster />} />

          {/* http://localhost:4000/displayGodown */}
          <Route path="displayGodown/:godownCode" element = {<DisplayGodownMaster />} />

          {/* http://localhost:4000/displayVoucherTypeName */}
          <Route path="displayVoucherTypeName/:voucherTypeName" element = {<DisplayVoucherTypeMaster />} />

          {/* http://localhost:4000/displayVoucherType */}
          <Route path="displayVoucherType/:voucherType" element = {<DisplayVoucherTypeMaster />} />

          {/* http://localhost:4000/displayLedger */}
          <Route path="displayLedger/:ledgerCode" element = {<DisplayLedgerMaster /> } />

         {/* http://localhost:4000/alterRegionMaster */}
         <Route path="alterRegionMaster/:regionMasterId" element = {<AlterRegionMaster />} />

         {/* http://localhost:4000/alterExecutiveMaster */}
         <Route path="alterExecutiveMaster/:executiveCode" element = {<AlterExecutiveMaster />} />

         {/* http://localhost:4000/alterDistributorMaster */}
         <Route path="alterDistributorMaster/:distributorCode" element = {<AlterDistributorMaster />} />

         {/* http://localhost:4000/alterProductMaster */}
         <Route path="alterProductMaster/:productCode" element = {<AlterProductMaster />} />

         {/* http://localhost:4000/alterGodownMaster */}
         <Route path="alterGodownMaster/:godownCode" element = {<AlterGodownMaster />} />

         {/* http://localhost:4000/alterVoucherTypeMaster */}
         <Route path="alterVoucherTypeMaster/:voucherTypeName" element = {<AlterVoucherTypeMaster />} />

         {/* http://localhost:4000/alterLedgerMaster */}
         <Route path="alterLedgerMaster/:ledgerCode" element = {<AlterLedgerMaster /> } />


         {/* http://localhost:4000/alteredRegion */}
         <Route path="/alteredRegion" element = {<RegionMasterAlteredCheck />} />

         {/* http://localhost:4000/alteredExecutive */}
         <Route path="/alteredExecutive" element = {<ExecutiveMasterAlteredCheck /> } />

         {/* http://localhost:4000/alteredDistributor */}
         <Route path="/alteredDistributor" element = {<DistributorMasterAlteredCheck /> } />

         {/* http://localhost:4000/alteredProduct */}
         <Route path="/alteredProduct" element = {<ProductMasterAlteredCheck /> } />

         {/* http://localhost:4000/alteredGodown */}
         <Route path="/alteredGodown" element = {<GodownMasterAlteredCheck />} />

         {/* http://localhost:4000/alteredVoucherTypeMaster */}
         <Route path="/alteredVoucherTypeMaster" element = {<VoucherTypeMasterAlteredCheck />} />

         {/* http://localhost:4000/alteredLedger */}
         <Route path="/alteredLedger" element = {<LedgerMasterAlteredCheck /> } />


        




          
        </Routes>
      </BrowserRouter>
      
      

    </>
  )
}

export default App