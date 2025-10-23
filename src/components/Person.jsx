export default function Person({ name, title, salary, phone, email, animal }) {
  return (
    <article className="person">
      <h3 className="person_name">{name}</h3>
      <p className="person_line">
        Title: <strong>{title}</strong>
      </p>
      <p className="person_line">
        Salary: <strong>{salary}</strong>
      </p>
      <p className="person_line">
        Phone: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <p className="person_line">
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className="person_line">
        Animal: <strong>{animal}</strong>
      </p>
    </article>
  );
}
