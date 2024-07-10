import axios from "axios";


const REST_API_BASE_URL = "http://localhost:9080";


// ADD
export const createNewRegionMaster = (region) => axios.post(REST_API_BASE_URL+"/regionMasterApi/addRegion", region);


export const createNewExecutiveMaster = (executive) => axios.post(REST_API_BASE_URL+"/executiveMasterApi/addExecutive", executive);


export const createNewDistributorMaster = (distributor) => axios.post(REST_API_BASE_URL+"/distributorMasterApi/addDistributor", distributor);


export const createNewProductMaster = (product) => axios.post(REST_API_BASE_URL+"/products/addProduct", product);

export const createNewGodownMaster = (godown) => axios.post(REST_API_BASE_URL+"/godownMasterApi/addGodown", godown);

export const createNewVoucherTypeMaster = (voucher) => axios.post(REST_API_BASE_URL+"/voucherTypeMasterApi/addVoucherTypeMaster", voucher);

export const createNewLedgerMaster = (ledger) => axios.post(REST_API_BASE_URL+"/ledgerMasterApi/addLedgerMaster", ledger);

// DISPLAY
export const listOfRegions = () => {return axios.get(REST_API_BASE_URL+"/regionMasterApi/allRegions")};

export const listOfExecutives = () => {return axios.get(REST_API_BASE_URL+"/executiveMasterApi/allExecutives")};

export const listOfDistributors = () => {return axios.get(REST_API_BASE_URL+"/distributorMasterApi/allDistributors")};

export const listOfProducts = () => {return axios.get(REST_API_BASE_URL+"/products/allProducts")};

export const listOfGodowns = () => {return axios.get(REST_API_BASE_URL+"/godownMasterApi/allGodowns")};

export const listOfVoucherTypeNames = () => {return axios.get(REST_API_BASE_URL+"/voucherTypeMasterApi/allVouchers")};

export const listOfVoucherTypes = () => {return axios.get(REST_API_BASE_URL+"/voucherTypeApi/allVoucherTypes")};

export const listOfLedgers = () => {return axios.get(REST_API_BASE_URL+"/ledgerMasterApi/allLedgers")};


// ALTER
