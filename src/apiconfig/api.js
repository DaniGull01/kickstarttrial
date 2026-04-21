import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const useAuthToken = () => {
  const token = Cookies.get("token") || Cookies.get("Updatetoken");

  return token;
};

const getFCMTokenArray = () => {
  const FCMToken = localStorage.getItem("fcmToken");
  return FCMToken ? [FCMToken] : [];
};

const publicRequest = async (endpoint, method = "GET", data = null) => {
  const url = `${apiBaseUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const protectedRequest = async (
  endpoint,
  method = "GET",
  data = null,
  cb = null
) => {
  const url = `${apiBaseUrl}${endpoint}`;
  const token = useAuthToken();
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const result = await response.json();

    if (typeof cb === "function") {
      cb();
    }

    return result;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Public endpoints (no authentication required)
export const login = async (email, password) => {
  return await publicRequest("auth/login", "POST", {
    email,
    password,
    FCMToken: getFCMTokenArray(),
  });
};

export const signup = async (
  name,
  email,
  password,
  agencyName,
  phone,
  role
) => {
  return await publicRequest("auth/signup", "POST", {
    name,
    email,
    password,
    agencyName,
    phone,
    role,
    FCMToken: getFCMTokenArray(),
  });
};

export const otpVerification = async (email, otp) => {
  return await publicRequest("auth/verifyOtp", "POST", {
    email,
    otp,
  });
};

export const SendForgetEmail = async (email) => {
  return await publicRequest("auth/forgotPasswordVerification", "POST", {
    email: email,
  });
};

export const ForgetPassword = async (password, confirmPassword) => {
  return await protectedRequest("auth/forgotPassword", "POST", {
    password,
    confirmPassword,
  });
};

export const ResendOTP = async (email) => {
  return await publicRequest("auth/resendOtp", "POST", {
    email,
  });
};

// Protected endpoints (require authentication)
export const propertyCreation = async (payload, cb) => {
  return await protectedRequest("property", "PATCH", payload, cb);
};

export const agencyCreation = async (payload, cb) => {
  return await protectedRequest("agency", "PATCH", payload, cb);
};

export const getAgency = async (agencyId) => {
  return await protectedRequest(`agency?agencyId=${agencyId}`, "GET", null);
};

export const getCardDetails = async () => {
  return await protectedRequest("payment/getPaymentMethods", "GET", null);
};

export const getUserProfile = async () => {
  return await protectedRequest("auth/profile", "GET", null);
};

export const updateUserProfile = async (payload, cb) => {
  return await protectedRequest("auth/updateProfile", "PATCH", payload, cb);
};

export const resetPassowrd = async (payload, cb) => {
  return await protectedRequest("auth/resetPassword", "POST", payload, cb);
};

export const getProperties = async () => {
  return await protectedRequest("property", "GET", null);
};

export const deleteProperty = async (id, cb) => {
  return await protectedRequest(`property/delete/${id}`, "DELETE", null, cb);
};

export const deleteProfilePicture = async () => {
  return await protectedRequest(
    `auth/deleteAgencyProfilePicture`,
    "PATCH",
    null
  );
};

export const getPropertById = async (id) => {
  return await protectedRequest(`property/${id}`, "GET", null);
};

export const getBidsByProperty = async (id, sortOrder) => {
  return await protectedRequest(
    `property/bids/${id}?orderBy=${sortOrder}`,
    "GET",
    null
  );
};

export const getFavouriteBidsByProperty = async (id) => {
  return await protectedRequest(`bid/favourite/${id}`, "GET", null);
};

export const getBidById = async (id) => {
  return await protectedRequest(`bid/getBid/${id}`, "GET", null);
};

export const createFavouriteBidByProperty = async (propertyId, bidId) => {
  const data = { propertyId, bidId };
  return await protectedRequest(`bid/favourite`, "POST", data);
};

export const selectAgent = async (payload) => {
  return await protectedRequest("bid/bidSelection", "PATCH", payload, null);
};

export const getPropertyCount = async () => {
  return await protectedRequest(`property/count`, "GET", null);
};

export const getCompareBidsByProperty = async (id) => {
  return await protectedRequest(`bid/compared/${id}`, "GET", null);
};

export const comparedBids = async (bidId, propertyId, cb) => {
  const url = `bid/${bidId}/compare?propertyId=${propertyId}`;
  return await protectedRequest(url, "PATCH", null, cb);
};

export const donNotShow = async (showPopup, cb) => {
  const data = { showPopup };
  const url = `property/updatePopup`;
  return await protectedRequest(url, "PATCH", data, cb);
};

export const stopWinningPopUp = async (winningShowPopup, cb) => {
  const data = { winningShowPopup };
  const url = `property/updateWinningPopup`;
  return await protectedRequest(url, "PATCH", data, cb);
};

export const fetchShowModal = async (cb) => {
  return await protectedRequest(`property/getPopup`, "GET", null, cb);
};

export const fetchShowWinningModal = async (cb) => {
  return await protectedRequest(`property/getWinningPopup`, "GET", null, cb);
};

export const cancelAuction = async (payload, id, cb) => {
  return await protectedRequest(
    `property/cancelAution/${id}`,
    "PATCH",
    payload,
    cb
  );
};

export const scheduleProperty = async (payload, id) => {
  return await protectedRequest(`property/schedule/${id}`, "POST", payload);
};

export const getAdminDashboardCount = async () => {
  return await protectedRequest(`admin/adminDashboardCounts`, "GET", null);
};

export const getNewListedProperties = async (page = 1, limit = 10, state) => {
  const url = `admin/newListedProperties?page=${page}&limit=${limit}&state=${state}`;
  return await protectedRequest(url, "GET", null);
};

export const getApprovedProperties = async (page = 1, limit = 10, state) => {
  return await protectedRequest(
    `admin/getApprovedProperties?page=${page}&limit=${limit}&state=${state}`,
    "GET",
    null
  );
};

export const getApprovedAgencies = async (page = 1, limit = 10, agencyName) => {
  return await protectedRequest(
    `admin/getApprovedAgencies?page=${page}&limit=${limit}&agencyName=${agencyName}`,
    "GET",
    null
  );
};

export const getAdminAgents = async (page = 1, limit = 10, agencyName) => {
  return await protectedRequest(
    `admin/newAgencies?agencyName=${agencyName}&page=${page}&limit=${limit}`,
    "GET",
    null
  );
};

export const RejectProperty = async (id, rejectedReason) => {
  return await protectedRequest(`admin/rejectProperty/${id}`, "POST", {
    rejectedReason,
  });
};

export const ApproveProperty = async (id) => {
  return await protectedRequest(`admin/approveProperty/${id}`, "POST", null);
};

export const RejectAgency = async (id, rejectedReason) => {
  return await protectedRequest(`admin/rejectAgency/${id}`, "POST", {
    rejectedReason,
  });
};

export const ApproveAgency = async (id) => {
  return await protectedRequest(`admin/approvedAgency/${id}`, "POST", null);
};

export const AgentPropertiesCount = async (id) => {
  return await protectedRequest(`agency/getAgencyDashboardCount`, "GET", null);
};

export const getAgencyNewListed = async (
  page = 1,
  limit = 10,
  address = "",
  state = "",
  city = "",
  listingType = ""
) => {
  return await protectedRequest(
    `agency/getNewListingProperties?page=${page}&limit=${limit}&formattedAddress=${address}&state=${state}&city=${city}&listingType=${listingType}`,
    "GET",
    null
  );
};

export const getSubmittedProperties = async (page = 1, limit = 10) => {
  return await protectedRequest(
    `agency/getBiddedProperties?page=${page}&limit=${limit}`,
    "GET",
    null
  );
};

export const getPendingProperties = async (page = 1, limit = 10) => {
  return await protectedRequest(
    `agency/getPendingBiddedProperties?page=${page}&limit=${limit}`,
    "GET",
    null
  );
};

export const getCompletedProperties = async (page = 1, limit = 10, status) => {
  return await protectedRequest(
    `agency/getCompletedBiddedProperties?status=${status}&page=${page}&limit=${limit}`,
    "GET",
    null
  );
};

export const bidCreation = async (payload, cb) => {
  return await protectedRequest("bid", "PATCH", payload, cb);
};

export const getFaqs = async () => {
  return await protectedRequest(`FAQs/getFAQs`, "GET", null);
};

export const getAgentTransactions = async () => {
  return await protectedRequest(`payment/getCustomerPayments`, "GET", null);
};

export const getCustomerCheck = async () => {
  return await protectedRequest(
    `customer/customerOnboardingCheck`,
    "GET",
    null
  );
};
export const getAgencyCheck = async () => {
  return await protectedRequest(`agency/agencyOnboardingCheck`, "GET", null);
};

export const getAllBiddedProperties = async (pageSubmit = 1, limit = 10) => {
  return await protectedRequest(
    `admin/allAgentsBiddedProperties?page=${pageSubmit}&limit=${limit}`,
    "GET",
    null
  );
};

export const getAllCompletedBiddedProperties = async (
  status,
  pageComplete = 1,
  limit = 10
) => {
  return await protectedRequest(
    `admin/allAgentsCompletedBiddedProperties?status=${status}&page=${pageComplete}&limit=${limit}`,
    "GET",
    null
  );
};

export const getBiddedProperties = async (
  id,
  pageAllSubmit = 1,
  limit = 10
) => {
  return await protectedRequest(
    `admin/agentBiddedProperties/${id}?page=${pageAllSubmit}&limit=${limit}`,
    "GET",
    null
  );
};

export const getCompletedBiddedProperties = async (
  id,
  status,
  pageAllComplete = 1,
  limit = 10
) => {
  return await protectedRequest(
    `admin/agentCompletedBiddedProperties/${id}?status=${status}&page=${pageAllComplete}&limit=${limit}`,
    "GET",
    null
  );
};

export const getCustomers = async (page = 1, limit = 10) => {
  return await protectedRequest(
    `admin/getCustomers?page=${page}&limit=${limit}`,
    "GET",
    null
  );
};

export const getCustomerProperties = async (id, type) => {
  return await protectedRequest(
    `admin/getCustomerPtoperties/${id}?listingType=${type}`,
    "GET",
    null
  );
};

export const getPaymentURL = async (id) => {
  return await protectedRequest(
    `payment/generateHostedInvoiceUrl/${id}`,
    "GET",
    null
  );
};

export const getCustomerDetails = async (id) => {
  return await protectedRequest(`agency/getCustomerDetails/${id}`, "GET", null);
};

export const PaymentDetails = async (update, updateOnboard) => {
  return await protectedRequest(`payment/createPaymentMethod`, "POST", {
    update: update,
    updateOnboard: updateOnboard,
  });
};

export const DeletePaymentDetails = async () => {
  return await protectedRequest(`payment/deleteOldPaymentMethod`, "POST", null);
};

export const CreatePayment = async (amount, bidId) => {
  return await protectedRequest(`payment/makePayment`, "POST", {
    amount,
    bidId,
  });
};

export const getTotaltransactions = async (search, id) => {
  return await protectedRequest(
    `admin/totalCustomerTransections?address=${search}&agencyId=${id}`,
    "GET",
    null
  );
};

export const getTotalAmount = async (id) => {
  return await protectedRequest(
    `payment/getTotalSuccessfulTransactions?customerId=${id}`,
    "GET",
    null
  );
};

export const downloadCSV = async () => {
  return await protectedRequest(
    `admin/allCustomerTransactionsCSV`,
    "GET",
    null
  );
};

export const getAllTransactions = async (
  search,
  listingType = "",
  payment = "",
  page,
  limit
) => {
  return await protectedRequest(
    `admin/totalTransection?address=${search}&page=${page}&limit=${limit}&listingType=${
      listingType || ""
    }&payment=${payment || ""}`,
    "GET",
    null
  );
};

export const RefundPayment = async (paymentIntentId, bidId) => {
  return await protectedRequest(`admin/paymentRefund`, "POST", {
    paymentIntentId,
    bidId,
  });
};

export const CreateContact = async (name, email, details) => {
  return await protectedRequest(`contact/createContact`, "POST", {
    name,
    email,
    details,
  });
};

export const getPropertyPrice = async () => {
  return await protectedRequest(`setPrice`, "GET", null);
};

export const UpdatePropertyPrice = async (id, price) => {
  return await protectedRequest(`setPrice/${id}`, "PATCH", { price });
};

export const GiveRating = async (rating, review, agency, property, bid) => {
  return await protectedRequest(`review`, "POST", {
    rating,
    review,
    agency,
    property,
    bid,
  });
};

export const deleteCustomerById = async (customerId) => {
  return await protectedRequest(`admin/deleteCustomer/${customerId}`, "PATCH");
};

export const deleteAgentById = async (agentId) => {
  return await protectedRequest(`admin/deleteAgent/${agentId}`, "PATCH");
};

export const CreateFaqs = async (payload) => {
  return await protectedRequest(`FAQs`, "POST", payload);
};
export const GetFaq = async () => {
  return await protectedRequest(`FAQs/getAllFAQs`, "GET", null);
};

export const GetAllReviews = async (agency, limit, page) => {
  return await protectedRequest(
    `review/getReviews?agency=${
      agency ? agency : ""
    }&limit=${limit}&page=${page}`,
    "GET",
    null
  );
};

export const EditFaq = async (id, payload) => {
  return await protectedRequest(`FAQs/${id}`, "PATCH", payload);
};
export const DeleteFaq = async (id) => {
  try {
    return await protectedRequest(`FAQs/${id}`, "DELETE");
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
};

export const SuccessRate = async (id) => {
  try {
    return await protectedRequest(`admin/agentSuccessRate/${id}`, "GET");
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
};
