import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/">
            Search <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="navbar-item active">
          <a class="nav-link" href="/saved">
            Saved
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
