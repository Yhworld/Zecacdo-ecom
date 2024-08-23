import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.css';

const Breadcrumb = ({ pathMapping = {}, extraBreadcrumbs = [] }) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  const breadcrumbLinks = paths.map((path, index) => {
    const to = `/${paths.slice(0, index + 1).join('/')}`;
    const isLast = index === paths.length - 1;
    const displayName = pathMapping[to] || path.charAt(0).toUpperCase() + path.slice(1);

    return (
      <li key={to} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
        {isLast ? (
          displayName
        ) : (
          <Link to={to}>{displayName}</Link>
        )}
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mx-auto container max-w-screen-xl pl-4">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {extraBreadcrumbs.map(({ name, path }, index) => (
          <li key={path} className={`breadcrumb-item ${index === extraBreadcrumbs.length - 1 ? 'active' : ''}`}>
            {index === extraBreadcrumbs.length - 1 ? (
              name
            ) : (
              <Link to={path}>{name}</Link>
            )}
          </li>
        ))}
        {!extraBreadcrumbs.length && breadcrumbLinks}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
