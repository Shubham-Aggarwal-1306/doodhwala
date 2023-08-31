import React, { useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer'
import { useDispatch } from 'react-redux';
import "./ProfileImageModal.css";
import { updateProfileImage } from '../../Actions/User';
const ProfileImageModal = ({ open, setOpen }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(updateProfileImage(image));
        console.log(image);
        setOpen(false);
        setImage(null);
    }
    return (
        <ModalContainer open={open} setOpen={setOpen}>
            <div className="profile-image-modal">
                {/* Create a file Drag and Drop with file Choose */}
                {!image &&
                    <>
                        <div className="profile-image-modal__drag" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setImage(e.dataTransfer.files[0]) }}>
                            <div className="profile-image-modal__drag__text">
                                <p>Drag and drop your photo here</p>
                            </div>
                        </div>
                        <p>or</p>
                        <div className="profile-image-modal__drag__button">
                            <button className="profile-image-modal__drag__button__choose" onClick={() => document.getElementById('profile-image-modal__input').click()}>
                                Choose a photo
                            </button>
                        </div>
                        <div className="profile-image-modal__input">
                            <input type="file" id="profile-image-modal__input" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </>
                }
                {image && <div className="profile-image-modal__preview">
                    <div className="profile-image-modal__image">
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                    <div className="profile-image-modal__buttons">
                        <button className="profile-image-modal__buttons__cancel" onClick={() => setImage(null)}>
                            Cancel
                        </button>
                        <button className="profile-image-modal__buttons__save" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>}

            </div>

        </ModalContainer>
    )
}

export default ProfileImageModal;