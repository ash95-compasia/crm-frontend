import Login from '../Components/Login.vue';
import Dashboard from '../Pages/ruleDashboard.vue';
import dataMapping from '../Pages/Configs/JsonViewer.vue';
import configList from '../Pages/Configs/ConfigurationsList.vue';
import ConfigurationDetails from '../Pages/Configs/ConfigurationDetails.vue';
import ruleSetup from '../Pages/ruleSetup/ruleSetup.vue';
import ruleList from '../Pages/ruleSetup/CreditRulesList.vue';
import endpointSetup from '../Pages/Endpoint/Endpoint.vue';
import customerList from '../Pages/Report/CustomerReportList.vue';
import EligibilityList from '../Pages/Report/EligibilityList.vue';
import SecondDeviceList from '../Pages/Report/SecondDeviceList.vue';
import customerDetails from '../Pages/Report/CustomerReportDetails.vue';
import RouteManager from '@/Pages/RouteManager.vue';
import RoleManagement from '@/Pages/rolesManager.vue';
import UserManagement from '@/Pages/userManager.vue';
import Error404 from '../Pages/Error/Error404.vue';
import SidebarConfig from '../Pages/SidebarConfig.vue';
import tnc from '../Pages/tnc.vue';
import program from '../Pages/program.vue';
import product from '../Pages/product.vue';
import deviceProgram from '../Pages/deviceProgram.vue';
import brands from '../Pages/brands.vue';
import category from '../Pages/category.vue';
import CustomerARManagement from '../Pages/AR/customerData.vue';
import customerARtable from '../Pages/AR/customerTable.vue';
import orderTable from '../Pages/AR/orderTable.vue';
import contractTable from '../Pages/AR/contractTable.vue';
import invoiceTable from '../Pages/AR/invoiceTable.vue';
import paymentTable from '../Pages/AR/paymentTable.vue';
import curlecDashboard from '../Pages/AR/curlecDashboard.vue';
import channelPartner from '../Pages/Partners/channelPartner.vue';
import finco from '../Pages/Partners/finco.vue';
import branch from '../Pages/Partners/branch.vue';
import configuration from '../Pages/config/configuration.vue';
import TenantManager from '../Pages/Tenant/tenant.vue';

export const componentsMap = {
    Login,
    Dashboard,
    JsonViewer: dataMapping,
    ConfigList: configList,
    ConfigurationDetails,
    RuleSetup: ruleSetup,
    RuleList: ruleList,
    CustomerList: customerList,
    EligibilityList: EligibilityList,
    SecondDeviceList: SecondDeviceList,
    CustomerDetails: customerDetails,
    EndpointSetup: endpointSetup,
    RouteManager,
    RoleManagement,
    CustomerARManagement,
    UserManagement,
    customerARtable,
    orderTable,
    invoiceTable,
    curlecDashboard,
    contractTable,
    paymentTable,
    SidebarConfig,
    TenantManager,
    channelPartner,
    branch,
    program,
    brands,
    product,
    category,
    deviceProgram,
    configuration,
    tnc,
    finco,
    Error404,
};