import React from 'react';
function Brokerage() {
    return ( 
        <div className='container'>
            <div className='row'>
                <h1>Charges explained</h1>
                <div className='col-6 mt-5 '>
                    <h5 className='mb-4 text-muted'>Securities/Commodities transaction tax</h5>
                    <p>Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.</p>
                    <p className='mb-5'>When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.</p>
                    <h5 className='mb-4 text-muted'>Transaction/Turnover Charges</h5>
                    <p>Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
                    <p>BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
                    <p>BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</p>
                    <p>BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
                    <p className='mb-5'>BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>
                    <h5 className='mb-4 text-muted'>Call & trade</h5>
                    <p className='mb-5'>Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>
                    <h5 className='mb-4 text-muted'>Stamp charges</h5>
                    <p>Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>

                </div>
                <div className='col-6 mt-5'>
                <h5 className='mb-4 text-muted'>GST</h5>
                <p className='mb-5'>Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>
                <h5 className='mb-4 text-muted'>SEBI Charges</h5>
                <p className='mb-5'>Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>
                <h5 className='mb-4 text-muted'>DP (Depository participant) charges</h5>
                <p>₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
                <p>Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
                <p className='mb-5'>Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>
                <h5 className='mb-4 text-muted'>Pledging charges</h5>
                <p className='mb-5'>₹30 + GST per pledge request per ISIN.</p>
                <h5 className='mb-4 text-muted'>AMC (Account maintenance charges)</h5>
                <p>For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, Click here.</p>
                <p className='mb-5'>For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, Click here</p>
                <h5 className='mb-4 text-muted'>Corporate action order charges</h5>
                <p className='mb-5'>₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>
                <h5 className='mb-4 text-muted'>Off-market transfer charges</h5>
                <p>₹25 per transaction.</p>
                </div>

            </div>
            <div className='row mt-5 mb-5'>
                <h3>Disclaimer</h3>
                <p>For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
            </div>

        </div>
     );
}

export default Brokerage;