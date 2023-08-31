import React, { useState } from 'react';
import './EditableProfileItem.css'

const EditableProfileItem = ({ title, value = "", setValue, editable = true, type = "text" }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className='editable-profile-item'>
      <div className='editable-profile-item__title'>
        {title}
      </div>
      <div className='editable-profile-item__input'>
        <input type={type} value={value} onChange={(e) => { setValue(e.target.value) }} disabled={!edit} placeholder={title} />
        <button onClick={() => { setEdit(!edit) }} style={(editable)?({display:"block"}):({display:"none"})}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.9612 0.917504C13.1314 0.0876422 11.786 0.0876351 10.9561 0.917504L9.76621 2.10736L4.16612 7.70741C4.07534 7.79822 4.01095 7.91198 3.97981 8.0365L3.27148 10.8698C3.21113 11.1112 3.28185 11.3666 3.45779 11.5425C3.63373 11.7184 3.88907 11.7892 4.13046 11.7288L6.96376 11.0205C7.08836 10.9893 7.20205 10.9249 7.29285 10.8341L12.8522 5.27483L14.0828 4.04424C14.9127 3.21437 14.9127 1.86889 14.0828 1.03903L13.9612 0.917504ZM11.9578 1.91924C12.2344 1.64262 12.6829 1.64262 12.9595 1.91924L13.0811 2.04076C13.3577 2.31739 13.3577 2.76589 13.0811 3.0425L12.3611 3.76254L11.2593 2.61774L11.9578 1.91924ZM10.2574 3.61965L11.3591 4.76445L6.42989 9.69372L4.93217 10.0681L5.30659 8.57044L10.2574 3.61965ZM1.83366 4.66663C1.83366 4.27544 2.15079 3.9583 2.54199 3.9583H6.08366C6.47487 3.9583 6.79199 3.64117 6.79199 3.24997C6.79199 2.85877 6.47487 2.54163 6.08366 2.54163H2.54199C1.36839 2.54163 0.416992 3.49303 0.416992 4.66663V12.4583C0.416992 13.6319 1.36839 14.5833 2.54199 14.5833H10.3337C11.5073 14.5833 12.4587 13.6319 12.4587 12.4583V8.9166C12.4587 8.52546 12.1415 8.20827 11.7503 8.20827C11.3591 8.20827 11.042 8.52546 11.042 8.9166V12.4583C11.042 12.8495 10.7249 13.1666 10.3337 13.1666H2.54199C2.15079 13.1666 1.83366 12.8495 1.83366 12.4583V4.66663Z" fill="black" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default EditableProfileItem
