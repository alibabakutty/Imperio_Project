import { BrowserRouter, Route, Routes } from "react-router-dom"

import RegionMaster from "./components/RegionMaster"
import Gateway from "./components/Gateway"
import ExecutiveMaster from "./components/ExecutiveMaster"
import DistributorMaster from "./components/DistributorMaster"
import Productmaster from "./components/Productmaster"
import ListofMasters from "./components/ListofMasters"
import RegionMasterAddedCheck from "./message/RegionMasterAddedCheck"
import ExecutiveMasterAddedCheck from "./message/ExecutiveMasterAddedCheck"
import DistributorMasterAddedCheck from "./message/DistributorMasterAddedCheck"
import ProductMasterAddedCheck from "./message/ProductMasterAddedCheck"

import './assets/css/font.css'
import DisplayOFMasters from "./components/DisplayOFMasters"
import RegionFilter from "./components/RegionFilter"
import DisplayRegionMaster from "./components/DisplayRegionMaster"
import ExecutiveFilter from "./components/ExecutiveFilter"
import DisplayExecutiveMaster from "./components/DisplayExecutiveMaster"
import DistributorFilter from "./components/DistributorFilter"
import DisplayDistributorMaster from "./components/DisplayDistributorMaster"
import ProductFilter from "./components/ProductFilter"
import DisplayProductMaster from "./components/DisplayProductMaster"
import RegionAlter from "./components/RegionAlter"
import ExecutiveAlter from "./components/ExecutiveAlter"
import DistributorAlter from "./components/DistributorAlter"
import ProductAlter from "./components/ProductAlter"
import AlterOfMasters from "./components/AlterOfMasters"
import AlterRegionMaster from "./components/AlterRegionMaster"
import RegionMasterAlteredCheck from "./message/RegionMasterAlteredCheck"
import AlterExecutiveMaster from "./components/AlterExecutiveMaster"
import AlterDistributorMaster from "./components/AlterDistributorMaster"
import AlterProductMaster from "./components/AlterProductMaster"
import ExecutiveMasterAlteredCheck from "./message/ExecutiveMasterAlteredCheck"
import DistributorMasterAlteredCheck from "./message/DistributorMasterAlteredCheck"
import ProductMasterAlteredCheck from "./message/ProductMasterAlteredCheck"
import GodownMaster from "./components/GodownMaster"
import GodownMasterAddedCheck from "./message/GodownMasterAddedCheck"
import GodownFilter from "./components/GodownFilter"
import GodownAlter from "./components/GodownAlter"
import DisplayGodownMaster from "./components/DisplayGodownMaster"
import AlterGodownMaster from "./components/AlterGodownMaster"
import GodownMasterAlteredCheck from "./message/GodownMasterAlteredCheck"
import PaymentVoucher from "./components/PaymentVoucher"
import VoucherTypeMaster from "./components/VoucherTypeMaster"
import VoucherTypeMasterAddedCheck from "./message/VoucherTypeMasterAddedCheck"
import ConditionalRenderingP from "./components/ConditionalRenderingP"
import VoucherTypeFilter from "./components/VoucherTypeFilter"
import DisplayVoucherTypeMaster from "./components/DisplayVoucherTypeMaster"
import VoucherTypeAlter from "./components/VoucherTypeAlter"
import AlterVoucherTypeMaster from "./components/AlterVoucherTypeMaster"
import VoucherTypeMasterAlteredCheck from "./message/VoucherTypeMasterAlteredCheck"


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
         <Route path="/product" element = {<Productmaster />} />

          {/* http://localhost:4000/goodown */}
          <Route path="/godown" element = {<GodownMaster />} />

          {/* http://localhost:4000/voucherTypeMaster */}
          <Route path="/voucherType" element = {<VoucherTypeMaster />} />
          
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


         {/* VOUCHERS */}
         {/* http://localhost:4000/paymentVoucher */}
         <Route path="/paymentVoucher" element = {<PaymentVoucher />} />


         <Route path="/conditional" element = {<ConditionalRenderingP /> } />



          
        </Routes>
      </BrowserRouter>
      
      

    </>
  )
}

export default App