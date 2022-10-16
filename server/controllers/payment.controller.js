const { default: axios } = require("axios");
const { StatusCodes } = require("http-status-codes");
const flw = require("../config/flw.config");
const Course = require("../models/course");
const User = require("../models/user");
const uniqId = require("uniqid");
const Transaction = require("../models/transaction");

// Get All Banks
exports.fetchBanks = async (req, res) => {
  const { data } = await axios.get("https://api.flutterwave.com/v3/banks/GH", {
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
    },
  });

  res.status(StatusCodes.OK).json(data.data);
};

exports.fetchSubAccount = async (req, res) => {
  const payload = {
    id: "17434",
  };

  const response = await flw.Subaccount.fetch(payload);

  res.send(response);
};

// create SubAccount
exports.createSubAccount = async (req, res) => {
  const {
    bankDetails,
    accountNumber,
    business_name,
    business_email,
    businessContact,
  } = req.body;

  console.log(req.body);

  const payload = {
    account_bank: bankDetails.id,
    account_number: accountNumber,
    business_name: business_name,
    business_contact: business_email,
    business_email: business_email,
    business_contact_mobile: businessContact,
    country: "GH",
    split_type: "percentage",
    split_value: 0.05,
  };

  const response = await flw.Subaccount.create(payload);

  if (response.status === "success") {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $addToSet: {
          role: "Instructor",
        },
        flw_subAccount: response.data,
      },
      { new: true }
    );
  }

  res.status(StatusCodes.CREATED).json(response);
};

// make payments
exports.makePayment = async (req, res) => {
  const { slug } = req.params;
  const { userId } = req.user;

  const course = await Course.findOne({ slug })
    .populate("instructor", "flw_subAccount")
    .exec();

  const user = await User.findById(userId);
  // const instructor = await User.findById(course.instructor).exec();
  const transactionKey = uniqId().toLowerCase();

  const transaction = await Transaction.create({
    user: userId,
    course: course._id,
    amount: course.price,
    tx_ref: transactionKey,
  });

  // console.log(transaction);

  const { data } = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    {
      tx_ref: transactionKey,
      amount: course.price,
      currency: "GHS",
      redirect_url: `http://localhost:3000/payment/verification`,
      customer: {
        name: user.name,
        email: user.email,
      },
      customization: {
        title: course.name,
        logo: course.image.Location,
      },
      subaccounts: [
        {
          id: course.instructor.flw_subAccount.subaccount_id,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
    }
  );

  res.send(data);
};

// verify payment on web Page
exports.verifyCallback = async (req, res) => {
  const { status, transaction_id, tx_ref } = req.body;
  console.log(req.body);
  const transaction = await Transaction.findOne({ tx_ref });
  console.log(transaction);
  const response = await flw.Transaction.verify({ id: transaction_id });
  console.log(response);
  let success = false;

  if (
    transaction &&
    status === "successful" &&
    response.data.amount === transaction.amount &&
    response.data.currency === "GHS"
  ) {
    success = true;
  } else {
    success = false;
  }

  if (transaction) {
    const removeTransaction = await Transaction.findByIdAndRemove(
      transaction._id
    );
  }

  res.status(StatusCodes.OK).json({ success });
};

// verify payment webhook
exports.verifyPayment = async (req, res) => {
  console.log("payed");
  res.status(StatusCodes.OK).json({ status: "ok" });
};
