import { inject } from '@angular/core';
import {
  Title,
  Meta
} from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';

export const metaResolver: ResolveFn<void> = ( route: ActivatedRouteSnapshot ): void => {

  const title = inject(Title);
  const meta = inject(Meta);

  const routeTitle = route.data['title'];
  const description = route.data['description'];

  title.setTitle(routeTitle);

  meta.updateTag({ 
    name: 'description', 
    content: description
  });

  meta.updateTag({ 
    property: 'og:title',
    content: routeTitle 
  });

  meta.updateTag({ 
    property: 'og:description', 
    content: description
  });

};
