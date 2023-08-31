import React from 'react';
import './MeetOurTeam.css';
import profileSample from '../../Assets/profileSample.jpg';
const MeetTeam = () => {
    return (
        <div className='meet-our-team'>
            <div className='meet-our-team__description'>
                <div className='meet-our-team__description--title'>
                    Meet Our Team
                </div>
                <div className='meet-our-team__description--text'>
                    It’s at the farm, in the store and on your table. Dairy is feeding people today for whatever comes tomorrow.
                </div>
            </div>
            <div className='meet-our-team__members'>
                <div className='meet-our-team__members--member'>
                    <img src={profileSample} alt='profileSample' />
                </div>
                <div className='meet-our-team__members--member'>
                    <img src={profileSample} alt='profileSample' />
                </div>
                <div className='meet-our-team__members--member'>
                    <img src={profileSample} alt='profileSample' />
                </div>
                <div className='meet-our-team__members--member'>
                    <img src={profileSample} alt='profileSample' />
                </div>
            </div>
        </div>
    )
}

export default MeetTeam
