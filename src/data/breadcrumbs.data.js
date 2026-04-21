const agentProfileInfo = [
  { label: "Proposal Details", url: "/proposal-page" },
  { label: "Agent Details" },
];

const cardDetails = [
  { label: "Account Management", url: "/account-management" },
  { label: "Card Details" },
];

const updatePersonalDetails = [
  { label: "Account Management", url: "/account-management" },
  { label: "Update Personal Details" },
];

const customerDetails = [
  { label: "Dashboard", url: "/admin-dashboard" },
  { label: "Properties", url: "/admin-properties?tab=new-listed" },
  { label: "Approved", url: "/admin-properties?tab=approved" },
  { label: "Customer Details" },
];

const agentDetails = [
  { label: "Account Management", url: "/account-management/agent/profile" },
  { label: "Agent Profile" },
];

const notifications = [
  { label: "Account Management", url: "/account-management" },
  { label: "Notifications" },
];

const agencyDetails = [
  { label: "Account Management", url: "/account-management/agent/profile" },
  { label: "Agency Profile" },
];

const agentProfile = [
  { label: "Dashboard", url: "/admin-dashboard" },
  { label: "Agent Profile" },
];

const customerPersonalDetails = [
  { label: "View Bids", url: "/bids-status" },
  { label: "Completed", url: "/bids-status" },
  { label: "Customer Contact Details" },
];
const breadCrumbs = {
  agentProfile,
  notifications,
  agencyDetails,
  customerDetails,
  cardDetails,
  agentProfileInfo,
  updatePersonalDetails,
  agentDetails,
  customerPersonalDetails,
};

export default breadCrumbs;
