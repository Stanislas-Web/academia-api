const express = require('express');
const app = express();
const cors = require('cors');
const UserRouter = require('./routers/user.router');
const ArticleRouter = require('./routers/article.router');
const VersionRouter = require('./routers/version.router');
const ImageRouter = require('./routers/image.router');
const OrderRouter = require('./routers/order.router');
const VersionAgentRouter = require('./routers/versionAgent.router');
const CardPaymentRouter = require('./routers/cardPayment.router');
const transactionRouter = require('./routers/transaction.router');
const ouvrageRouter = require('./routers/ouvrage.router');
const TransacademiaRouter = require('./routers/transacademia.router');
const CandidateRouter = require('./routers/candidat.router');
const VoteRouter = require('./routers/vote.router');
const AccountRouter = require('./routers/account.router');

app.use(cors());
app.use(express.json());

app.use('/api/v1/', UserRouter, ArticleRouter, VersionRouter, ImageRouter, OrderRouter, VersionAgentRouter, CardPaymentRouter, transactionRouter, ouvrageRouter, TransacademiaRouter, CandidateRouter, VoteRouter, AccountRouter);

module.exports = app;