import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/selectors";
import { selectNameFilter } from "../../redux/selectors";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const visibleContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );
  return (
    <ul className={css["contact-list"]}>
      {visibleContacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
}
