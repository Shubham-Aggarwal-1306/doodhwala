import React from 'react';
import './FeaturesOfOrdering.css';

const FeaturesOfOrdering = () => {
    return (
        <div className='features-of-ordering'>
            <div className='features-of-ordering__title'>
                Features of Ordering
            </div>
            <div className='features-of-ordering__content'>
                <div className='features-of-ordering__content--item'>
                    <div className='features-of-ordering__content--item--icon'>
                        Book Trial
                    </div>
                    <div className='features-of-ordering__content--item--text'>
                        Book Trial
                    </div>
                </div>
                <div className='features-of-ordering__content--item'>
                    <div className='features-of-ordering__content--item--icon'>
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M48.4308 12.4717C47.9852 11.9607 47.3435 11.6667 46.6668 11.6667H14.4225L13.9675 8.95067C13.7808 7.826 12.8078 7 11.6668 7H6.41683C5.1265 7 4.0835 8.043 4.0835 9.33333C4.0835 10.6237 5.1265 11.6667 6.41683 11.6667H9.6905L14.0305 37.716C14.0492 37.821 14.1028 37.9073 14.1355 38.0053C14.1728 38.129 14.2032 38.2457 14.2615 38.3577C14.3362 38.5117 14.4365 38.6423 14.5415 38.7753C14.6138 38.8663 14.6792 38.9573 14.7632 39.0367C14.8985 39.1627 15.0548 39.2513 15.2135 39.34C15.3022 39.389 15.3792 39.4543 15.4748 39.4917C15.7455 39.6013 16.0302 39.6667 16.3312 39.6667H42.0002C43.2905 39.6667 44.3335 38.6237 44.3335 37.3333C44.3335 36.043 43.2905 35 42.0002 35H18.3098L17.9225 32.6667H44.3335C45.4955 32.6667 46.4802 31.8127 46.6435 30.6647L48.9768 14.3313C49.0725 13.6593 48.8718 12.9803 48.4308 12.4717ZM43.9765 16.3333L43.3115 21H35.0002V16.3333H43.9765ZM32.6668 16.3333V21H25.6668V16.3333H32.6668ZM32.6668 23.3333V28H25.6668V23.3333H32.6668ZM23.3335 16.3333V21H16.3335C16.2098 21 16.0978 21.035 15.9882 21.07L15.1995 16.3333H23.3335ZM16.3662 23.3333H23.3335V28H17.1432L16.3662 23.3333ZM35.0002 28V23.3333H42.9755L42.3105 28H35.0002Z" fill="white" />
                            <path d="M19.8335 49C21.7665 49 23.3335 47.433 23.3335 45.5C23.3335 43.567 21.7665 42 19.8335 42C17.9005 42 16.3335 43.567 16.3335 45.5C16.3335 47.433 17.9005 49 19.8335 49Z" fill="white" />
                            <path d="M40.8335 49C42.7665 49 44.3335 47.433 44.3335 45.5C44.3335 43.567 42.7665 42 40.8335 42C38.9005 42 37.3335 43.567 37.3335 45.5C37.3335 47.433 38.9005 49 40.8335 49Z" fill="white" />
                        </svg>
                    </div>
                    <div className='features-of-ordering__content--item--text'>
                        Buy One Time
                    </div>
                </div>
                <div className='features-of-ordering__content--item'>
                    <div className='features-of-ordering__content--item--icon'>
                        Subscription
                    </div>
                    <div className='features-of-ordering__content--item--text'>
                        Subscription
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesOfOrdering
