import React from 'react';
import person from '../utils/personData';

export default function UserInfo() {
  // compute age from DOB to show dynamic example
  const dob = new Date(person.dob);
  const ageFromDOB = (() => {
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  })();

  return (
    <section className="user-info">
      <div className="profile-card">
        <div className="avatar">
          <img src={person.image} alt={`${person.name} profile`} />
        </div>
        <div className="profile-details">
          <h2>{person.name}</h2>
          <p className="role">{person.profession} — {person.location}</p>

          <div className="meta">
            <div>
              <strong>Age:</strong> {person.age ?? ageFromDOB}
            </div>
            <div>
              <strong>DOB:</strong> {person.dob}
            </div>
          </div>

          <p className="bio">{person.bio}</p>

          <div className="contact">
            <a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>
            <a href={`tel:${person.contact.phone}`}>{person.contact.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}