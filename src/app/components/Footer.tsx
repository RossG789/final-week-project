export default function Footer() {
  // These all need actions to navigate to a page.
  // Also some kind of 'current page' indicator
  return (
    <ul className="menu menu-horizontal bg-base-200 fixed bottom-0 w-screen flex place-content-evenly py-5">
      <li className="btn btn-primary">
        <a href="/">Home</a>
      </li>
      <li className="btn btn-primary">
        <a href="/favourites">Favourites</a>
      </li>
      <li className="btn btn-primary">
        <a href="/profile">Profile</a>
      </li>
    </ul>
  );
}
