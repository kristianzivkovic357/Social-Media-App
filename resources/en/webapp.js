'use strict';

module.exports = {
  navbar: {
    dashboard: 'Dashboard',
    myProfile: 'My profile',
    logOut: 'Log out',
    adminDashboard: 'Admin dashboard'
  },
  dashboard: {
    header: {
      title: 'This is the toal number of coins in your account.',
      subTitle: 'Current coins are valued at', // 44.8 fr
      buyBtn: 'BUY COINS',
      sendBtn: 'SEND COINS'
    },
    order: {
      title: 'PROCESSING ORDERS',
      columns: {
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
        actions: 'Actions'
      }
    },
    tx: {
      title: 'TRANSACTIONS HISTORY',
      columns: {
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
        actions: 'Actions'
      }
    },
    sidebars: {
      walletAddress: {
        title: 'Your CTX wallet address',
        text: 'You can receive CTX coins by giving the sender the following address:',
        cpy: 'Click to copy'
      },
      becomeValidator: {
        title: 'How to become a validator?',
        text: {
          part1: 'In order to become a validator you need to have more than',
          // 10.000
          // ???
          part2: 'coins in your account (X% of total available tokens).'
        }
      },
      needAssistance: {
        title: 'Need assistance?',
        text: 'If you ever happen to need some guidance, don’t hesitate to get in touch with us.'
      }
    }
  },
  buyCoins: {
    header: {
      title: 'Buy coins',
      subTitle: 'Your current balance:'
      // 0 CTX
    },
    steps: {
      paymentMethod: {
        title: 'Your payment method',
        text: 'Choose your preffered payment method to buy CTX coins:'
      },
      enterAmount: {
        title: 'Enter the amount in CHF',
        text: {
          part1: 'Current value of CTX coin is',
          // 41.89 Fr.
          part2: 'Since you already have',
          // 973436.59 CTX
          part3: 'coins, if you buy',
          part4: 'more than',
          // 169,351
          part5: 'coins, you will be submitted to further profile verification.'
        },
        inputMin: 'Min. is',
        // 10.000,00 CHF
        inputCoinsGet: 'Number of coins you get',
        nextBtn: 'NEXT'
      },
      confirm: {
        title: 'Confirm purchase',
        text: {
          part1: 'You are about to buy',
          // 118,013 CTX
          part2: 'coins valued at',
          // 93,21 Fr,
          par3: 'per coin. Your total payment is',
          // 11.000,00 CHF
          part4: 'and it needs to be paid within the',
          part5: 'next 72h',
          part6: 'or the order will be cancelled.Below are the bank details for the money transfer, please make sure that you have filled in the proper',
          part7: 'reference number.'
        },
        tableRows: {
          row1: 'Bank name:',
          row2: 'IBAN:',
          row3: 'SWIFT/BIC:',
          row4: 'Reference:',
          row5: 'Account holder:'
          // ['Bank name:', 'IBAN:', 'SWIFT/BIC:', 'Reference:', 'Account holder:']
        },
        note: {
          part1: 'Note:',
          part2: 'Reference number that you have to fill when making a payment is linked to this order and your account, so please be sure to use the right one shown above (110118).'
        },
        orderBtn: 'PLACE YOUR ORDER'
      }
    },
    sidebars: {
      howToBuy: {
        title: 'How to buy CTX coins?',
        text: {
          part1: 'In the first step, you are asked to choose your preffered payment method (Swiss franc, Bitcoin or Ethereum).',
          part2: 'Based on the entered amount, we’ll calculate the approx. number of coins you’ll get for your purchase, followed by payment instructions.'
        }
      },
      whatIsKYC: {
        title: 'What is KYC?',
        text: {
          part1: 'Since the minimum token amount for validators is more than',
          // 220,000CTX
          part2: '- you’ll need to go through KYC process.',
          part3: 'Basically, this means that in order to know our customers, we’ll ask for some additional documents to be able to verify your identity. This will help us to run a trusted and secured platform for our coins.'
        }
      },
      needAssistance: {
        title: 'Need assistance?',
        text: 'If you ever happen to need some guidance, don’t hesitate to get in touch with us.'
      }
    },
    endMessage: {
      title: 'Order successfully placed',
      // 10 CHF
      text: 'order has been placed on',
      // 15.3.2017. - 15:06h
      buyBtn: 'BUY MORE COINS'
    }
  },
  sendCoins: {
    header: {
      title: 'Send coins',
      text: 'Your current balance:'
      // 0 CTX
    },
    steps: {
      selectAmount: {
        title: 'Select the amount',
        text: 'Please choose the amount you want to send to the external address:',
        inputFrom: 'Max.amount',
        // 0 CTX
        inputTo: 'Value in',
        // CHF
        nextBtn: 'NEXT'
      },
      walletAddress: {
        title: 'Wallet address',
        text: {
          part1: 'Enter the address to which you want to send',
          // 213123 CTX
          part2: ':'
        },
        inputAddress: 'CTX wallet address',
        note: {
          part1: 'Note:',
          part2: 'Please use only CTX cryptocurrency wallets for now. It’s up to you to whom you are sending coins, so be careful when entering the address above.'
        },
        nextBtn: 'NEXT'
      },
      transactionDescription: {
        title: 'Transaction description',
        text: 'As an optional step, feel free to enter some notes for this transaction so you can easily search for it later:',
        inputDescription: 'Description',
        nextBtn: 'NEXT'
      },
      confirmation: {
        title: 'Confirmation',
        text: 'You are about to send CTX coins to some other hot wallet account. Please double check all the information you entered before confirming transaction:',
        table: {
          row1: 'Recipient address:',
          row2: 'Amount of coins:',
          row3: 'Currently valued at:',
          row4: 'Transaction fee:',
          row5: 'Total:'
        },
        confirmBtn: 'CONFIRM'
      },
      Verification: {
        title: '2-Step Verification',
        text: 'For the last step, please enter the verification code generated by your mobile application below:',
        inputDescription: 'Enter six digit code from the app above',
        sendCoinsBtn: 'SEND COINS'
      }
    },
    sidebars: {
      howToBuy: {
        title: 'How to buy CTX coins?',
        text: {
          part1: 'In the first step, you are asked to choose your preffered payment method (Swiss franc, Bitcoin or Ethereum).',
          part2: 'Based on the entered amount, we’ll calculate the approx. number of coins you’ll get for your purchase, followed by payment instructions.'
        }
      },
      whatIsKYC: {
        title: 'What is KYC?',
        text: {
          part1: 'Since the minimum token amount for validators is more than',
          // 220,000 CTX
          part2: '- you’ll need to go through KYC process.',
          part3: 'Basically, this means that in order to know our customers, we’ll ask for some additional documents to be able to verify your identity. This will help us to run a trusted and secured platform for our coins.'
        }
      },
      needAssistance: {
        title: 'Need assistance?',
        text: 'If you ever happen to need some guidance, don’t hesitate to get in touch with us.'
      }
    },
    endMessage: {
      title: 'successfully sent',
      text: 'Your current balance:',
      // 973424.59 CTX
      sendBtn: 'Send more coins?'
    }
  },
  myProfile: {
    header: {
      title: 'VERIFY YOUR E-MAIL',
      text: 'Please check your inbox and click on the link in the e-mail we’ve sent to you.'
    },
    account: {
      title: 'ACCOUNT',
      text: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        registryNumber: 'Trade registy number',
        password: 'Password',
        repeatPassword: 'Repeat Password'
      }
    },
    contactInformation: {
      title: 'CONTACT INFORMATION',
      text: {
        address: 'Address',
        zipCode: 'Zip Code',
        selectCountry: 'Select country',
        countryCode: 'Country code',
        city: 'City',
        phoneNumber: 'Mobile phone number'
      }
    },
    verification: {
      title: '2-STEP VERIFICATION',
      text: 'To set up a 2-Step verification, please scan QR code or enter the secret code on the right to your preffered two-step auth app. App will show you six digit code, please enter it here:',
      inputCode: 'Authentication code',
      inputClickToCopy: 'Click to copy'
    },
    sidebars: {
      howToReceive: {
        title: 'How to receive coins?',
        text: 'You can receive CTX coins by giving the sender the following address:'
      },
      becomeValidator: {
        title: 'How to become a validator?',
        text: {
          part1: 'In order to become a validator you need to have more than',
          // 10.000
          part2: 'coins in your account (X% of total available tokens).'
        }
      },
      needAssistance: {
        title: 'Need assistance?',
        text: 'If you ever happen to need some guidance, don’t hesitate to get in touch with us.'
      }
    }
  },
  registerBuyCoin: {
    welcome: {
      title: {
        part1: 'Welcome,',
        // Name
        part2: '!'
      },
      test: {
        part1: 'We haven`t linked any CTX coins with your account yet.',
        part2: 'To preceed to CompanyX dashboard, you would need to buy some at the current approx value at ',
        // 41.89 Fr.
        part3: 'Well done!'
      }
    },
    backBtn: 'back',
    selectAmount: {
      title: 'Select the amount',
      text: 'Choose your preffered payment method to buy CTX coins:'
    },
    enterAmount: {
      title: 'Enter the amount in CHF',
      text: {
        part1: 'Current value of CTX coin is',
        // 41.89 Fr.
        part2: 'Minimum amount is',
        // 10,000 CHF
        part3: 'which is roughly0'
        // 1,240 BTC
      },
      nextBtn: 'NEXT'
    },
    confirm: {
      title: 'Confirm purchase',
      text: {
        part1: 'You are about tu buy',
        // 118,013 CTX
        part2: 'coins valued at',
        // 93,21 Fr
        part3: 'per coin. Your total payment is',
        // 11.000,00 CHF
        part4: 'and it needs to be paid within the next 72h or the order will be cancelled.',
        part5: 'Below are the bank details for the money transfer, please make sure that you have filled in the proper reference number.'
      }
    },
    tableRows: {
      row1: 'Bank name:',
      row2: 'IBAN:',
      row3: 'SWIFT/BIC:',
      row4: 'Reference:',
      row5: 'Account holder:'
      // ['Bank name:', 'IBAN:', 'SWIFT/BIC:', 'Reference:', 'Account holder:']
    },
    node: 'Note: Reference number that you have to fill when making a payment is linked to this order and your account, so please be sure to use the right one shown above (110118).',
    orderBtn: 'PLACE YOUR ORDER'
  },
  welcome: {
    header: {
      title: 'CompanyX',
      loginBtn: 'Login',
      registerBtn: 'REGISTER NOW'
    },
    title: {
      part1: 'THE BEAUTY OF',
      part2: 'SIMPLICITY'
    },
    text: 'Here goes some additional copy and messaging. We`ll work on that later, for now only important thing here is being able to register. Everything else is marketing thing.',
    whitePaperBtn: 'WHITEPAPER',
    learnMoreBtn: 'Learn more...'
  },
  login: {
    inputEmail: 'Email',
    password: 'Password',
    loginBtn: 'LOGIN'
  },
  loginTotp: {
    title: '2-Step Verification',
    text: 'Enter the verification code generated by your mobile application below.',
    inputCode: 'Authentication code',
    verifyBtn: 'VERIFY',
    backToLoginBtn: 'Back to login',
    helpBtn: 'Need help?'
  },
  register1: {
    information: {
      title: 'Let`s create your account',
      text: {
        part1: 'With the companyX account, you`ll be able to buy and manage your CTX coins within out dashboard.',
        part2: 'Please fill out all necessary details on the right side.'
      },
      step: 'Step 1'
    },
    backBtn: 'Back',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'E-mail',
      password: 'Password',
      repeatPassword: 'Repeat password'
    },
    nextBtn: 'NEXT'
  },
  register2: {
    information: {
      title: 'Just a few more information...',
      text: {
        part1: 'Please provide more details such as your address, phone number and passpordID or trade registry number.',
        part2: 'We`re building a trusted community of members, that`s why we ask for these.'
      },
      step: 'Step 2'
    },
    backBtn: 'Back',
    fields: {
      address: 'Address',
      zipCode: 'Zip code',
      city: 'City',
      selectCountry: 'Select country',
      countryCode: 'Country code',
      mobile: 'Mobile phone number',
      documentType: 'Document type',
      idNumber: 'ID Number'
    },
    nextBtn: 'NEXT'
  },
  register3: {
    information: {
      title: 'Almost there, we promise!',
      text: 'Please download 2FA app to verify your profile. Something like Authy app, or Chrome add-on will be good enough. After scanning the QR code on the right, you`ll be provided with six digit code in the app.',
      step: 'Step 3: Last one...'
    },
    backBtn: 'Back',
    fields: {
      text: 'If you are unable to scan a QR code, enter this secret code in your two-step auth app instead:',
      inputCopy: 'Click to copy',
      inputCode: 'Enter six digit code from the app above',
      agreeBtn: 'I agree to Terms of Service',
      questionnaireBtn: {
        part1: 'I acknowledge that this company, token, web application is governed by Swiss legislation.',
        part2: ' I confirm, that I am not a citizen, national, resident (tax or otherwise) of any jurisdiction which prohibits the possession, dissemination, communication of the Whitepaper and/or prohibits the offering, purchase, possession, exchange of CTX Tokens.',
        part3: 'I am aware that during the Initial Distribution I am entitled to buy no more than 222 CTX Tokens without being submitted to further KYC (Know Your Customer) procedures.'
      }
    },
    finishBtn: 'FINISH'
  },
  adminNavbar: {
    admin: 'ADMIN',
    orders: 'Orders',
    users: 'Users',
    transactions: 'Transactions',
    logOut: 'Log out',
    switch: 'Switch to',
    holder: 'Holder dashboard'
  },
  adminHeader: {
    search: 'Type to search...',
    fromDate: 'From date',
    toDate: 'To date'
  },
  adminOrders: {
    title: 'PROCESSING ORDERS',
    columns: {
      amount: 'Amount',
      date: 'Date',
      status: 'Status',
      actions: 'Actions'
    },
    execute: {
      name: 'Execute',
      onClick: {
        title: 'Execute order and transfer coins?',
        text: {
          part1: 'You are about to sell',
          // 12 CTX
          part2: 'for',
          // 502.68 CHF.
          part3: 'Please confirm and that amoun of tokens will be transfered to',
          // stasda dsa’s -- name
          part4: '`s',
          part5: 'account.'
        },
        confirmBtn: 'CONFIRM ORDER',
        confirmOrder: {
          title: 'Please confirm the order',
          text: 'Enter the verification code generated by your mobile application below to confirm order:',
          inputCode: 'Authentication code',
          executeOrderBtn: 'EXECUTE ORDER',
          wellDone: {
            title: 'Well done! Order executed.',
            // Vladimir
            text: 'Order successfully executed!'
          }
        }
      },
      emailSendingFailure: {
        title: 'Whooops. Unable to execute order.',
        dontSendBtn: 'DON`T EXECUTE',
        againBtn: 'TRY AGAIN'
      }
    }
  },
  adminUsers: {
    title: 'USERS',
    columns: {
      name: 'Full name',
      email: 'Email',
      phoneNumber: 'Phone number',
      actions: 'Actions'
    },
    onClickUser: {
      idUser: 'User id',
      name: 'Full name',
      country: 'Country',
      zip: 'Zip code',
      documentType: 'Document type',
      email: 'Email',
      phoneNumber: 'Phone number',
      address: 'Address',
      city: 'City',
      idNumber: 'Id number'
    },
    onClickActions: {
      resendMailConfirmation: {
        name: 'Resend email',
        onClick: {
          title: 'Resend confirmation email?',
          text: {
            part1: 'You are about to resend confirmation email for'
            // Stefan Burscher stefan.burscher@mvpworkshop.co
          },
          confirmBtn: 'CONFIRM AND RESEND'
        },
        emailSendingFailure: {
          title: 'Whooops. Unable to send e-mail.',
          text: 'For some reason we were unable to resend confirmation email. Please try again.',
          dontSendBtn: 'DON`T SEND',
          againBtn: 'TRY AGAIN'
        },
        emailSendingSuccess: {
          title: 'Well done! Email sent.',
          // name
          text: 'should receive confirmation e-mail.',
          closeBtn: 'CLOSE'
        }
      },
      enableDisable: {
        name: 'Enable/Disable',
        enableConfirm: {
          title: 'Please confirm user enabling',
          text: {
            part1: 'Are you sure you want to enable',
            // V M’s (vladam.bg@gmail.com)
            part2: 'account?'
          },
          enableBtn: 'ENABLE USER'
        },
        disableConfirm: {
          title: 'Please confirm user disabling',
          text: {
            part1: 'Are you sure you want to disable',
            // V M’s (vladam.bg@gmail.com)
            part2: 'account?'
          },
          disableBtn: 'DISABLE USER'
        },
        disableError: {
          title: 'Whooops. Unable to disable user.',
          text: 'For some reason we were unable to disable user. Please try again.',
          dontSendBtn: 'DON`T DISABLE',
          againBtn: 'TRY AGAIN'
        },
        disableSuccess: {
          title: 'Well done! User disabled.',
          text: 'is disabled!',
          closeBtn: 'CLOSE'
        },
        enableError: {
          title: 'Whooops. Unable to enable user.',
          text: 'For some reason we were unable to enable user. Please try again.',
          dontSendBtn: 'DON`T ENABLE',
          againBtn: 'TRY AGAIN'
        },
        enableSuccess: {
          title: 'Well done! User enabled.',
          text: 'is enabled!',
          closeBtn: 'CLOSE'
        }
      }
    },
    adminTransactions: {
      title: 'TRANSACTIONS HISTORY',
      columns: {
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
        actions: 'Actions'
      },
      onClickDetails: {
        status: 'Status',
        walletAddressTo: 'Wallet address to',
        valuedAt: 'Valued at',
        description: 'Description',
        walletAddressFrom: 'Wallet address from'
      }
    }
  },
  backofficeRolepicker: {
    title: 'Choose the dashboard',
    text: 'We’ve detected that your account has multiple roles. In order to ease up your login process, please select to which dashboard you want to log in.',
    adminPanel: {
      title: 'Admin panel',
      text: 'Manage your creator`settings'
    },
    holderDashboard: {
      title: 'Holder dashboard',
      text: 'Manage coins and holder profile'
    }
  },
  somethingWentWrong: {
    title: 'Ooops, can’t find what you are looking for…',
    text: 'We can’t seem to find the page you’re looking for. It may be that this page doesn’t exist or that something went wrong. Please try refreshing the page, or go to the dashboard.'
  },
  resendMailOrder: {
    name: 'Resend email',
    onClick: {
      title: 'Resend email with instructions?',
      text: {
        part1: 'You are about to resend payment instructions for the order made on the date',
        // 24.5.2018.
        part2: 'at',
        // 00:15h. stasda dsa
        part3: 'will receive instructions at'
        // stefan.burscher@gmail.com
      },
      confirmBtn: 'CONFIRM AND RESEND'
    },
    emailSendingFailure: {
      title: 'Whooops. Unable to send e-mail.',
      text: 'For some reason we were unable to resend email with payment instructions. Please try again.',
      dontSendBtn: 'DON`T SEND',
      againBtn: 'TRY AGAIN'
    },
    emailSendingSuccess: {
      title: 'Well done! Email sent.',
      // name
      text: 'should receive e-mail with the payment instructions within a few minutes.',
      closeBtn: 'CLOSE'
    }
  },
  validation_errors: {
    req: 'required field',
    num: 'filed must be number',
    fn_req: 'first name is required',
    fn_long: 'first name is too long',
    ln_req: 'last name is required',
    ln_long: 'last name is too long',
    mail_req: 'email is required',
    mail_long: 'too many characters',
    mail_already_use: 'This email is already in use!',
    mail_valid: 'email must be a valid',
    pass_req: 'password is required',
    pass_min: 'password must have at least 8 characters',
    pass_equal: 'Passwords must be equal!',
    pass_digits: 'Passwords must contain digits!',
    pass_incorrect: 'password is incorrect',
    address_req: 'address is required',
    address_long: 'too many characters',
    zip_req: 'zip is required',
    zip_long: 'too many characters',
    city_req: 'city is required',
    city_alpha: 'city can`t contain number',
    city_long: 'too many characters',
    country_req: 'country is required',
    country_alpha: 'city can`t contain number',
    country_long: 'too many characters',
    country_invalid: 'country is invalid',
    code_req: 'country code is required',
    code_long: 'too many characters',
    code_invalid: 'country code is invalid',
    phone_req: 'phone number is required',
    phone_long: 'too many characters',
    document_req: 'document type is required',
    document_invalid: 'document id is invalid',
    id_number_req: 'document number is required',
    id_number_long: 'document number length is too big',
    token_req: '2FA is required',
    token_auth: 'Two Factor authentication failed!',
    token_secret: '2FA secret is empty',
    token_bad: 'bad token',
    from_req: 'from address is required',
    from_long: 'too many characters',
    from_valid: 'address is not valid',
    to_req: 'to address is required',
    to_long: 'too many characters',
    to_valid: 'address is not valid',
    amount_req: 'amount is required',
    amount_min_fee: 'must be number greater than min tx fee',
    amount_not_enough: 'there is not enough tokens',
    amount_invalid: 'amount is invalid',
    desc_long: 'description length is too long',
    currency_exist: 'currency doesnt exist',
    sort_order_req: 'sort order is required',
    sort_order_invalid: 'sort order is invalid',
    sort_column_req: 'sort column is required',
    sort_column_invalid: 'sort column is invalid',
    offset_req: 'offset is required',
    offset_invalid: 'offset is invalid',
    limit_req: 'limit is required',
    limit_invalid: 'limit is invalid',
    currency_invalid: 'currency is invalid',
    currency_req: 'currency is required',
    currency_id_req: 'currency id is required',
    date_invalid: 'date is invalid',
    old_pass_incorrect: 'old password is incorrect',
    api_key_invalid: 'api key is invalid',
    api_key_secret_invalid: 'secret api key is invalid',
    wallet_exists: 'wallet already exists',
    title_req: 'title is required',
    text_req: 'text is required',
    hashtag_req: 'hashtag id is required',
    hashtag_name_req: 'hashtag name is required',
    hashtag_long: 'hashtag name is too long',
    user_req: 'user id is required',
    day_req: 'day is required'
  }
};
