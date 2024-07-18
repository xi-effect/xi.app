import React from 'react';
import { ChevronRight } from '@xipkg/icons';

type BreadcrumbItemT = {
  title: string;
  href: string;
};

type BreadcrumbsPropsT = {
  isVisible: boolean;
  breadcrumbs: BreadcrumbItemT[];
};

const Breadcrumbs = ({ isVisible, breadcrumbs }: BreadcrumbsPropsT) => {
  if (!isVisible) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 hidden md:block">
      <ol className="text-brand-40 flex list-none p-0">
        {breadcrumbs.map((crumb, index) =>
          index < breadcrumbs.length - 1 ? (
            <li key={index} className="mr-0.5 flex items-center">
              <a className="mr-0.5" href={crumb.href}>
                {crumb.title}
              </a>
              <ChevronRight className="fill-brand-40 ml-auto mt-1 h-3 w-3" />
            </li>
          ) : (
            <li key={index} aria-current="page" className="text-brand-80">
              {crumb.title}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
