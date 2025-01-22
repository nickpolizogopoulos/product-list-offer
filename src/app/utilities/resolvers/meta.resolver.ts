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

  const titleService = inject(Title);
  const metaService = inject(Meta);

  const title = route.data['title'];
  const description = route.data['description'];

  titleService.setTitle(title);

  metaService.updateTag({ 
    name: 'description', 
    content: description
  });

  metaService.updateTag({ 
    property: 'og:title',
    content: title 
  });

  metaService.updateTag({ 
    property: 'og:description', 
    content: description
  });

};
