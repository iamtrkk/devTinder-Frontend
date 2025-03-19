import React from "react";

const User = ({
  user,
  showButtons,
  namePrimary,
  primaryAction,
  nameSeconday,
  secondaryAction,
}) => {
  const { firstName, lastName, gender, age, photoUrl, about, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user dp" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>
          {gender} {age}
        </p>
        <p hidden={!skills?.length}>Skills: {skills?.join(", ")}</p>

        <div hidden={!showButtons} className="card-actions justify-end">
          <button onClick={primaryAction} className="btn btn-primary">
            {namePrimary}
          </button>
          <button onClick={secondaryAction} className="btn btn-secondary">
            {nameSeconday}
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
