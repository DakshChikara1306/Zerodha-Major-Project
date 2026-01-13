import React from 'react';
function Stats() {
    return ( 
        <div className='container p-3'>
            <div className='row p-5'>
                <div className='col-6 p-5'>
                    <h1 className='fs-2 mb-5'>Trust with confidence</h1>
                    <h2 className='fs-4'>Customer-first always</h2>
                    <p className='text-muted mb-5'>That's why 1.3+ crore  customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.</p>
                    <h2 className='fs-4'>No spam gimmicks</h2>
                    <p className='text-muted mb-5'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                    <h2 className='fs-4'>The Zerodha Universe</h2>
                    <p className='text-muted mb-5'>Not just an app , but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted mb-5'>With initiatives like nudge and kill switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className='col-6 p-5'>
                    <img src='media/images/ecosystem.png' style={{width:"110%"}}/>
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products <i class="fa-solid fa-arrow-right-long"></i></a>
                        <a href='' style={{textDecoration:"none"}}>Try kite demo <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Stats;