import React, { Component } from 'react';
import { withStyles, Grid, Typography } from 'material-ui';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

import { Page, DashboardFab } from '../../components';
import FaqItem from './FaqItem';

const styles = theme => {
  return {
    publicKey: {
      color: theme.palette.primary.main,
      overflowWrap: 'break-word'
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    }
  };
};

class FaqGridItem extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <FaqItem {...this.props} />
      </Grid>
    );
  }
}

@withStyles(styles)
@withRouter
@observer
class SubmitTransactionPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Page title="Frequently Asked Questions">
        <Helmet>
          <title>StellarGuard | FAQ</title>
        </Helmet>
        <Grid container spacing={0}>
          <FaqGridItem question="How does StellarGuard work?">
            <Typography paragraph>
              StellarGuard uses the Stellar&apos;s built in multi-signature
              technology to require a transaction to be signed both by you and
              by StellarGuard before it is considered valid.
            </Typography>

            <Typography paragraph>
              To activate StellarGuard, you first need to add your StellarGuard
              signer public key as an additional signer on your account. You
              also have the option to add a backup signer. The application makes
              it easy to build this transaction so you can submit it to Stellar.
              After adding StellarGuard as an additional signer you must click
              activate to finalize the link to your StellarGuard account. After
              this is done your account is protected by StellarGuard.
            </Typography>

            <Typography paragraph>
              After you have a verified your email address, when you submit a
              transaction to StellarGuard an email authorization code will be
              sent to you. This code will be required to authorize the
              transaction and submit it to the Stellar network.
            </Typography>

            <Typography paragraph>
              You may also choose to add enhanced security by enabling
              two-factor authentication via an authenticator application. When
              you add two-factor authentication to your account, a rotating
              passcode that is generated by a mobile app will required to sign
              in or authorize transactions.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="How much does it cost?">
            <Typography paragraph>
              StellarGuard is currently 100% free.
            </Typography>

            <Typography paragraph>
              In the future, if a paid plan is introduced you will ALWAYS have
              the option to remove the StellarGuard signers from your Stellar
              account, even you have not yet paid.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="If I am using StellarGuard and a hacker steals my private key, do I lose my XLM?">
            <Typography paragraph>
              No! StellarGuard was designed with this scenario. Because your
              account is protected with multisig, a hacker will not be able to
              create valid transactions without the other half of the signature,
              which is protected by StellarGuard.
            </Typography>

            <Typography paragraph>
              If StellarGuard was used during{' '}
              <a
                className={classes.link}
                href="https://cointelegraph.com/news/blackwallet-hack-400k-in-stellar-stolen-hosting-provider-possibly-at-fault"
              >
                the BlackWallet hack
              </a>, your XLM would have been completely safe.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="What would happen if StellarGuard was hacked? Do I lose my XLM?">
            <Typography paragraph>
              No! Because StellarGuard does not ask you for your own secret key,
              a hacker who is able to infiltrate StellarGuard still cannot
              create valid transactions.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="What does adding a backup signer do when setting up multisig?">
            <Typography paragraph>
              If you feel more comfortable not completely relying on
              StellarGuard, you have the option to add a &quot;Backup
              Signer&quot; when enabling multisig. A backup signer is an
              additional public key that you know the secret key to (does not
              have to be a funded account) which is added with the same weight
              as your source key and your StellarGuard key. This means that you
              can create valid transactions with any 2 of the 3 keys (this is
              known as 2/3 multisig).
            </Typography>
            <Typography paragraph>
              If you do choose to add a backup signer, you should make sure you
              keep it in a safe place and do not use it for day-to-day
              transactions, and only use it in an emergency.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="Does StellarGuard work with my existing wallet?">
            <Typography paragraph>
              StellarGuard requires you to use{' '}
              <a
                className={classes.link}
                href="https://www.stellar.org/developers/horizon/reference/xdr.html"
              >
                signed transaction XDRs
              </a>{' '}
              in order to submit a transaction. Your wallet must allow you to
              copy the signed XDR before it is submitted to the Stellar network.
            </Typography>
            <Typography paragraph>Wallets that support this are: </Typography>
            <Typography>
              <ul>
                <li>
                  <a
                    className={classes.link}
                    href="https://www.stellar.org/laboratory/#txbuilder?network=public"
                  >
                    Stellar.org Transaction Builder
                  </a>
                </li>
              </ul>
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="Why do I need to copy and paste transaction XDRs to StellarGuard instead of just submitting to Stellar network?">
            <Typography paragraph>
              Unfortunately Stellar does not have a notion of
              &quot;half-signed&quot; multi-signature transactions that can be
              submitted to the Stellar network -- those are just rejected with
              an authorization error and not stored anywhere. This means that in
              order to use StellarGuard you must submit your half-signed
              transaction to StellarGuard so it can sign it with its key and
              submit the fully-signed, valid transaction to the Stellar network.
            </Typography>
          </FaqGridItem>
          <FaqGridItem question="I'm a wallet developer, how do I submit my users' transactions directly to StellarGuard?">
            <Typography paragraph>
              There are two steps to submit transactions directly to
              StellarGuard via the API.
            </Typography>
            <Typography>
              <ol>
                <li>
                  Check if a Stellar account is protected by StellarGuard. This
                  can be done by looking at the account.signers property of a
                  Stellar account and checking if there is a signer
                  <span className={classes.publicKey}>
                    {' '}
                    GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD{' '}
                  </span>. If there is, this account is protected by
                  StellarGuard and transactions must be submitted directly to
                  it.
                </li>
                <li>
                  Make a POST call to https://stellarguard.me/api/transactions
                  with the a JSON object in the post body of:
                  <pre>
                    {JSON.stringify(
                      { xdr: '<signed transaction xdr>' },
                      null,
                      2
                    )}
                  </pre>
                </li>
              </ol>
            </Typography>
            <Typography paragraph>
              No authentication is required to submit transactions. That&apos;s
              it! You now support StellarGuard.
            </Typography>
          </FaqGridItem>
        </Grid>
        <DashboardFab />
      </Page>
    );
  }
}

export default SubmitTransactionPage;
