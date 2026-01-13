import React from 'react';
function CreateTicket() {
    return ( 
        <div className='container'>
            <div className='row mt-5 p-5 mb-5'>
                <h1 className='fs-2'>
                    To create a ticket, select a relevant topic
                </h1>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <div className='mb-5 '>
                    <h4 className='mb-5'><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Account opening</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Resident individual</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Minor</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Non Resident indian</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>company, partnership, HUF, LLP</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Glossary</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Contact</a><br/>
                     </div>
                     <div>
                     <h4 className='mb-5'><i class="fas fa-user-circle"></i>&nbsp;&nbsp;Your zerodha Account</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Your profile</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Account modification</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Client Master Report (CMR) and Depository Participant (DP)</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Nomination</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Transfer and conversion of securities</a><br/>
                     </div>

                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <div className='mb-5'>
                    <h4 className='mb-5'><i class="fa-brands fa-uikit"></i>&nbsp;&nbsp;Kite</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>IPO</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Trading FAQs</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Margin Trading Facility (MTF) and Margins
                     </a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Charts and orders</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Alerts and Nudges</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>General</a><br/>
                     </div>

                     <h4 className='mb-5'><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;&nbsp;Funds</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Add money</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Withdraw money</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Add bank Accounts</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>e-Mandates</a><br/>
                     

                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <div className='mb-5'>
                    <h4 className='mb-5'><i class="fa-regular fa-circle-dot"></i>&nbsp;&nbsp;Console</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Portfolio</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Corporate actions</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Funds statement</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Reports</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Profile</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Segments</a><br/>
                     </div>

                     <h4 className='mb-5'><i class="fa-solid fa-coins"></i>&nbsp;&nbsp;Coin</h4>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Mutual Funds</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>National Pension Scheme (NPS)</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Features on Coin</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>Payments and Orders</a><br/>
                     <a href='' style={{textDecoration:"none", lineHeight:"3.5"}}>General</a><br/>

                </div>

            </div>
        </div>
     );
}

export default CreateTicket;