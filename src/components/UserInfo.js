import React from 'react';
import person from '../utils/personData';

export default function UserInfo() {
  const dob = new Date(person.dob);
  const ageFromDOB = (() => {
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  })();

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-4 text-center p-3">
          <img src={person.image} className="img-fluid rounded" alt={`${person.name} profile`} style={{maxHeight: '220px'}} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title">{person.name}</h4>
            <p className="card-subtitle mb-2 text-muted">{person.profession} — {person.location}</p>

            <ul className="list-unstyled mt-3 mb-4">
              <li><strong>Age:</strong> {person.age ?? ageFromDOB}</li>
              <li><strong>DOB:</strong> {person.dob}</li>
              <li><strong>Email:</strong> <a href={`mailto:${person.contact.email}`}>{person.contact.email}</a></li>
              <li><strong>Phone:</strong> <a href={`tel:${person.contact.phone}`}>{person.contact.phone}</a></li>
            </ul>

            <p className="card-text">{person.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}